import assert from "node:assert/strict";
import { describe, it } from "node:test";

import type { ObservedListen } from "@/lib/lanyard-status";
import {
  LISTENING_HISTORY_CHUNK_SIZE,
  LISTENING_HISTORY_MAX,
  LISTENING_SESSION_WINDOW_MS,
  appendListenPlay,
  listenPlayedAt,
  listeningPlayKey,
  collapseListenSessions,
  mergeLatestPlays,
  parseListenHistory,
  parseListenHistoryOffset,
  readListenHistory,
  sameListeningSession,
  sliceListenHistory,
} from "@/lib/listening-history";
import type { ListenPlay } from "@/lib/listening-history";

const observed = (
  track: string,
  startedAt: number | null,
  artist = "Artist"
): ObservedListen => ({
  album: "Album",
  artist,
  artistUrl: "https://music.apple.com/au/artist/example/1",
  artworkUrl:
    "https://is1-ssl.mzstatic.com/image/thumb/Music/example/100x100bb.jpg",
  startedAt,
  track,
  trackUrl: "https://music.apple.com/au/album/example/1?i=2",
});

const play = (
  track: string,
  startedAt: number | null,
  listenedAt = startedAt ?? 1
): ListenPlay => ({
  ...observed(track, startedAt),
  listenedAt,
});

describe("appendListenPlay", () => {
  it("keeps one row when the same Discord start is seen again", () => {
    const first = appendListenPlay([], observed("Song", 100), 100);
    const again = appendListenPlay(first.plays, observed("Song", 100), 160);

    assert.equal(first.appended, true);
    assert.deepEqual(again, {
      appended: false,
      changed: false,
      plays: first.plays,
    });
  });

  it("counts a later replay as a new play and keeps the newest first", () => {
    const start = 1_700_000_000_000;
    const replayStart = start + LISTENING_SESSION_WINDOW_MS + 1;
    const first = appendListenPlay([], observed("Song", start), start);
    const replay = appendListenPlay(
      first.plays,
      observed("Song", replayStart),
      replayStart
    );

    assert.equal(replay.appended, true);
    assert.deepEqual(
      replay.plays.map((item) => item.startedAt),
      [replayStart, start]
    );
    assert.equal(replay.plays[0]?.listenedAt, replayStart);
  });

  it("keeps the first row when a later poll shifts the start by a millisecond", () => {
    const start = 1_793_597_828_604;
    const first = appendListenPlay([], observed("Song", start), start + 10_000);
    const drifted = appendListenPlay(
      first.plays,
      observed("Song", start + 1),
      start + 128_000
    );

    assert.equal(drifted.appended, false);
    assert.equal(drifted.changed, false);
    assert.equal(drifted.plays.length, 1);
    assert.equal(drifted.plays[0]?.startedAt, start);
  });

  it("treats a one second start drift as the same play", () => {
    const start = 1_793_370_440_470;
    const first = appendListenPlay([], observed("For Now", start), start);
    const drifted = appendListenPlay(
      first.plays,
      observed("For Now", start + 985),
      start + 180_000
    );

    assert.equal(drifted.appended, false);
    assert.equal(drifted.plays.length, 1);
    assert.equal(drifted.plays[0]?.startedAt, start);
  });

  it("does not duplicate a play that is no longer the newest row", () => {
    const start = 1_700_000_000_000;
    const first = appendListenPlay([], observed("Song", start), start);
    const other = appendListenPlay(
      first.plays,
      observed("Other", start + 180_000),
      start + 180_000
    );
    const again = appendListenPlay(
      other.plays,
      observed("Song", start + 1),
      start + 240_000
    );

    assert.equal(again.appended, false);
    assert.equal(again.changed, false);
    assert.equal(again.plays.length, 2);
  });

  it("treats another poll with no start time as the same play", () => {
    const first = appendListenPlay([], observed("Song", null), 100);
    const again = appendListenPlay(first.plays, observed("Song", null), 160);

    assert.equal(again.appended, false);
    assert.equal(again.plays.length, 1);
  });

  it("keeps a replay with no start time once another song has been stored", () => {
    const first = appendListenPlay([], observed("Song", null), 100);
    const other = appendListenPlay(first.plays, observed("Other", null), 200);
    const replay = appendListenPlay(other.plays, observed("Song", null), 300);

    assert.equal(replay.appended, true);
    assert.deepEqual(
      replay.plays.map((item) => item.track),
      ["Song", "Other", "Song"]
    );
  });

  it("stamps a start time onto the current row instead of adding a duplicate", () => {
    const first = appendListenPlay([], observed("Song", null), 100);
    const stamped = appendListenPlay(first.plays, observed("Song", 100), 160);

    assert.equal(stamped.appended, false);
    assert.equal(stamped.changed, true);
    assert.equal(stamped.plays.length, 1);
    assert.equal(stamped.plays[0]?.startedAt, 100);
    assert.equal(stamped.plays[0]?.listenedAt, 100);
  });

  it("drops the oldest play past 1,000", () => {
    const existing = Array.from({ length: LISTENING_HISTORY_MAX }, (_, index) =>
      play(`Track ${index}`, 1_000_000 - index, 1_000_000 - index)
    );
    const added = appendListenPlay(
      existing,
      observed("Newest", 2_000_000),
      2_000_000
    );

    assert.equal(added.plays.length, LISTENING_HISTORY_MAX);
    assert.equal(added.plays[0]?.track, "Newest");
    assert.equal(
      added.plays.some((item) => item.track === "Track 999"),
      false
    );
    assert.equal(
      added.plays.some((item) => item.track === "Track 998"),
      true
    );
  });
});

describe("parseListenHistory", () => {
  it("drops invalid rows and repeated start times", () => {
    const older = 1_700_000_000_000;
    const raw = JSON.stringify([
      play("Newest", 1_700_000_300_000, 1_700_000_300_000),
      { artist: "Nope", listenedAt: 1, track: " " },
      play("Newest", 1_700_000_300_001, 1_700_000_300_999),
      play("Older", null, older),
      play("Older", null, older - 10 * 60_000),
      { nope: true },
    ]);

    const plays = readListenHistory(raw);

    assert.deepEqual(
      plays.map((item) => [item.track, item.listenedAt]),
      [
        ["Newest", 1_700_000_300_000],
        ["Older", older],
        ["Older", older - 10 * 60_000],
      ]
    );
  });

  it("collapses one play session whose start drifted", () => {
    const start = 1_793_370_440_494;
    const stored = [
      play("For Now", start, start + 180_000),
      play("For Now", start - 24, start + 120_000),
      play("For Now", start + 961, start + 60_000),
      play("For Now", start + 54, start),
      play("Wave", start - 30 * 60_000, start - 30 * 60_000),
      play("Wave", start - 30 * 60_000 + 1, start - 29 * 60_000),
    ];

    assert.equal(parseListenHistory(JSON.stringify(stored)).length, 6);

    const plays = collapseListenSessions(stored);

    assert.deepEqual(
      plays.map((item) => [item.track, item.startedAt]),
      [
        ["For Now", start],
        ["Wave", start - 30 * 60_000],
      ]
    );
  });

  it("returns an empty list for missing or broken values", () => {
    assert.deepEqual(parseListenHistory(null), []);
    assert.deepEqual(parseListenHistory("{"), []);
    assert.deepEqual(parseListenHistory("{}"), []);
  });

  it("stays under one megabyte at the cap", () => {
    const plays = Array.from({ length: LISTENING_HISTORY_MAX }, (_, index) =>
      play(`A Reasonably Long Track Title ${index}`, 1_700_000_000_000 + index)
    );
    const bytes = new TextEncoder().encode(JSON.stringify(plays)).byteLength;

    assert.ok(bytes < 1_048_576);
  });
});

describe("listening history chunks", () => {
  const plays = Array.from(
    { length: LISTENING_HISTORY_CHUNK_SIZE + 1 },
    (_, index) => play(`Track ${index}`, index + 1)
  );

  it("returns the newest chunk first and a cursor for the rest", () => {
    const first = sliceListenHistory(plays, 0);

    assert.equal(first.total, LISTENING_HISTORY_CHUNK_SIZE + 1);
    assert.equal(first.plays.length, LISTENING_HISTORY_CHUNK_SIZE);
    assert.equal(first.plays[0]?.track, "Track 0");
    assert.equal(first.nextOffset, LISTENING_HISTORY_CHUNK_SIZE);

    const rest = sliceListenHistory(plays, first.nextOffset ?? 0);
    assert.equal(rest.plays.length, 1);
    assert.equal(rest.plays[0]?.track, `Track ${LISTENING_HISTORY_CHUNK_SIZE}`);
    assert.equal(rest.nextOffset, null);
  });

  it("rejects an offset that is not a whole number in range", () => {
    assert.equal(parseListenHistoryOffset(null), 0);
    assert.equal(parseListenHistoryOffset(""), 0);
    assert.equal(parseListenHistoryOffset("0"), 0);
    assert.equal(parseListenHistoryOffset("20"), 20);
    assert.equal(parseListenHistoryOffset("nope"), null);
    assert.equal(parseListenHistoryOffset("-1"), null);
    assert.equal(
      parseListenHistoryOffset(String(LISTENING_HISTORY_MAX + 1)),
      null
    );
  });
});

describe("listen timing", () => {
  it("prefers the Discord start time when showing when a song was played", () => {
    const startedAt = Date.UTC(2026, 9, 29, 5, 42);

    assert.equal(
      listenPlayedAt(play("Song", startedAt, startedAt + 60_000)),
      startedAt
    );
  });

  it("uses the start time to tell a replay from the play already on screen", () => {
    const start = 1_700_000_000_000;

    assert.notEqual(
      listeningPlayKey(observed("Song", start)),
      listeningPlayKey(observed("Song", start + 1))
    );
    assert.equal(listeningPlayKey(observed("Song", null)), "song::artist");
    assert.equal(
      sameListeningSession(
        observed("Song", start),
        observed("Song", start + 1)
      ),
      true
    );
    assert.equal(
      sameListeningSession(
        observed("Song", start),
        observed("Song", start + LISTENING_SESSION_WINDOW_MS + 1)
      ),
      false
    );
    assert.equal(
      sameListeningSession(observed("Song", null), observed("Song", null)),
      true
    );
    assert.equal(
      sameListeningSession(observed("Song", null), observed("Other", null)),
      false
    );
  });
});

describe("mergeLatestPlays", () => {
  it("prepends a new play and skips a drifted copy of one already shown", () => {
    const start = 1_700_000_000_000;
    const current = [play("Song", start, start)];
    const incoming = [
      play("Next", start + 300_000, start + 300_000),
      play("Song", start + 2, start + 120_000),
    ];

    assert.deepEqual(
      mergeLatestPlays(current, incoming).map((item) => item.track),
      ["Next", "Song"]
    );
    assert.equal(
      mergeLatestPlays(current, [play("Song", start + 1, start)]),
      current
    );
  });
});
