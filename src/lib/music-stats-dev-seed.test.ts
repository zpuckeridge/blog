import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  LISTENING_STATS_TOP_LIMIT,
  monthStatsView,
  rebuildListeningStats,
} from "@/lib/listening-stats";
import {
  buildDevMusicListeningPlays,
  DEV_MUSIC_DEMO_TRACK_COUNT,
  DEV_MUSIC_SEED_MARKER,
  devMusicMonthKeys,
} from "@/lib/music-stats-dev-seed";

describe("music stats dev seed", () => {
  it("builds plays with genres across multiple Brisbane months", () => {
    const plays = buildDevMusicListeningPlays("2026-03-15");
    assert.ok(plays.length > 200);
    assert.ok(plays.every((play) => play.genres?.length));

    const stats = rebuildListeningStats(plays);
    assert.ok(stats.months["2026-01"]);
    assert.ok(stats.months["2026-03"]);
    const dreamPop = Object.values(stats.months).some(
      (month) => (month.genres[DEV_MUSIC_SEED_MARKER] ?? 0) > 5
    );
    assert.equal(dreamPop, true);
  });

  it("spans from January 2026 through the given today", () => {
    const months = devMusicMonthKeys("2026-06-15");
    assert.ok(months.includes("2026-01"));
    assert.ok(months.includes("2026-06"));
    assert.ok(months.length >= 6);
  });

  it("fills top 5 tracks, artists, and albums in active months", () => {
    assert.ok(DEV_MUSIC_DEMO_TRACK_COUNT >= LISTENING_STATS_TOP_LIMIT);

    const plays = buildDevMusicListeningPlays("2026-11-24");
    const stats = rebuildListeningStats(plays);
    const march = stats.months["2026-03"];
    assert.ok(march);
    const view = monthStatsView(march);

    assert.equal(view.tracks.length, LISTENING_STATS_TOP_LIMIT);
    assert.equal(view.artists.length, LISTENING_STATS_TOP_LIMIT);
    assert.equal(view.albums.length, LISTENING_STATS_TOP_LIMIT);
  });
});
