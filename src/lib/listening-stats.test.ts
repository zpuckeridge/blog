import assert from "node:assert/strict";
import { describe, it } from "node:test";

import type { ListenPlay } from "@/lib/listening-history";
import {
  applyListenPlayToStats,
  LISTENING_STATS_UNKNOWN_GENRE,
  rebuildListeningStats,
  resolveListeningStatsMonth,
} from "@/lib/listening-stats";

const play = (
  track: string,
  artist: string,
  listenedAt: number,
  genres: string[] | null = null
): ListenPlay => ({
  album: "Album",
  artist,
  artistUrl: null,
  artworkUrl: null,
  catalogId: null,
  genres,
  listenedAt,
  source: "lanyard",
  startedAt: listenedAt,
  track,
  trackUrl: `https://music.apple.com/au/song/1`,
});

describe("listening stats", () => {
  it("counts genres and ranks tracks within a Brisbane month", () => {
    // November 2026 in Brisbane
    const first = play("A", "Artist", Date.UTC(2026, 10, 1, 14, 0), [
      "Rock",
      "Alternative",
    ]);
    const second = play("A", "Artist", Date.UTC(2026, 10, 2, 14, 0), ["Rock"]);
    const store = rebuildListeningStats([first, second]);
    const monthKey = "2026-11";
    const month = store.months[monthKey];

    assert.ok(month);
    assert.equal(month.plays, 2);
    assert.equal(month.genres.Rock, 2);
    assert.equal(month.genres.Alternative, 1);
    assert.equal(month.tracks["a::artist"]?.count, 2);
    assert.equal(month.artists.artist?.count, 2);
  });

  it("resolves month from query when present in stats", () => {
    const store = rebuildListeningStats([
      play("A", "Artist", Date.UTC(2026, 9, 1, 14, 0)),
      play("B", "Other", Date.UTC(2026, 10, 1, 14, 0)),
    ]);

    const resolved = resolveListeningStatsMonth(store, "2026-10");
    assert.equal(resolved.initialMonth, "2026-10");
    assert.ok(resolved.months.includes("2026-10"));
  });

  it("uses Unknown when genres are missing", () => {
    const store = applyListenPlayToStats(
      { months: {}, version: 1 },
      play("B", "Other", Date.UTC(2026, 10, 3, 14, 0), null)
    );

    assert.equal(
      store.months["2026-11"]?.genres[LISTENING_STATS_UNKNOWN_GENRE],
      1
    );
  });
});
