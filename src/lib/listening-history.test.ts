import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { formatBrisbaneDateTime } from "@/lib/format-in-brisbane";
import type { ObservedListen } from "@/lib/lanyard-status";
import {
  LISTENING_HISTORY_MAX,
  LISTENING_HISTORY_PAGE_SIZE,
  appendListenPlay,
  listenHistoryPageHref,
  listenPlayedAt,
  listeningPlayKey,
  parseListenHistory,
  resolveListenHistoryPage,
  sliceListenHistoryPage,
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
    const first = appendListenPlay([], observed("Song", 100), 100);
    const replay = appendListenPlay(first.plays, observed("Song", 400), 400);

    assert.equal(replay.appended, true);
    assert.deepEqual(
      replay.plays.map((item) => item.startedAt),
      [400, 100]
    );
    assert.equal(replay.plays[0]?.listenedAt, 400);
  });

  it("does not duplicate a play that is no longer the newest row", () => {
    const first = appendListenPlay([], observed("Song", 100), 100);
    const other = appendListenPlay(first.plays, observed("Other", 200), 200);
    const again = appendListenPlay(other.plays, observed("Song", 100), 300);

    assert.equal(again.appended, false);
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
    const raw = JSON.stringify([
      play("Newest", 300, 300),
      { artist: "Nope", listenedAt: 1, track: " " },
      play("Newest", 300, 999),
      play("Older", null, 200),
      play("Older", null, 100),
      { nope: true },
    ]);

    const plays = parseListenHistory(raw);

    assert.deepEqual(
      plays.map((item) => [item.track, item.listenedAt]),
      [
        ["Newest", 300],
        ["Older", 200],
        ["Older", 100],
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

describe("listening history pages", () => {
  const plays = Array.from(
    { length: LISTENING_HISTORY_PAGE_SIZE + 1 },
    (_, index) => play(`Track ${index}`, index + 1)
  );

  it("shows the newest page first", () => {
    const page = sliceListenHistoryPage(plays, 1);

    assert.equal(page.total, LISTENING_HISTORY_PAGE_SIZE + 1);
    assert.equal(page.pageCount, 2);
    assert.equal(page.plays.length, LISTENING_HISTORY_PAGE_SIZE);
    assert.equal(page.plays[0]?.track, "Track 0");
  });

  it("sends invalid and overflowing pages back to a real page", () => {
    assert.deepEqual(resolveListenHistoryPage(null, plays.length), {
      page: 1,
      redirectTo: null,
    });
    assert.equal(
      resolveListenHistoryPage("1", plays.length).redirectTo,
      "/music"
    );
    assert.equal(
      resolveListenHistoryPage("nope", plays.length).redirectTo,
      "/music"
    );
    assert.deepEqual(resolveListenHistoryPage("9", plays.length), {
      page: 2,
      redirectTo: "/music?page=2",
    });
    assert.equal(resolveListenHistoryPage("2", plays.length).redirectTo, null);
    assert.equal(listenHistoryPageHref(1), "/music");
    assert.equal(listenHistoryPageHref(2), "/music?page=2");
  });
});

describe("listen timing", () => {
  it("prefers the Discord start time when showing when a song was played", () => {
    const startedAt = Date.UTC(2026, 9, 29, 5, 42);

    assert.equal(
      listenPlayedAt(play("Song", startedAt, startedAt + 60_000)),
      startedAt
    );
    assert.equal(formatBrisbaneDateTime(startedAt), "29 Oct 2026, 3:42 pm");
  });

  it("uses the start time to tell a replay from the play already on screen", () => {
    assert.equal(
      listeningPlayKey(observed("Song", 100)),
      listeningPlayKey(observed("Song", 100))
    );
    assert.notEqual(
      listeningPlayKey(observed("Song", 100)),
      listeningPlayKey(observed("Song", 200))
    );
    assert.equal(listeningPlayKey(observed("Song", null)), "song::artist");
  });
});
