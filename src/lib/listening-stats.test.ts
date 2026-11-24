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
  genres: string[] | null = null,
  overrides: Partial<
    Pick<ListenPlay, "artistUrl" | "catalogId" | "trackUrl">
  > = {}
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
  trackUrl: "https://music.apple.com/au/song/1",
  ...overrides,
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

  it("drops the generic Music genre label", () => {
    const store = rebuildListeningStats([
      play("A", "Artist", Date.UTC(2026, 10, 1, 14, 0), ["Pop", "Music"]),
      play("B", "Artist", Date.UTC(2026, 10, 2, 14, 0), ["Music"]),
    ]);
    const month = store.months["2026-11"];

    assert.ok(month);
    assert.equal(month.genres.Pop, 1);
    assert.equal(month.genres.Music, undefined);
    assert.equal(month.genres[LISTENING_STATS_UNKNOWN_GENRE], 1);
  });

  it("backfills missing track and artist urls from a later play", () => {
    const first = play("A", "Artist", Date.UTC(2026, 10, 1, 14, 0), null, {
      artistUrl: null,
      catalogId: null,
      trackUrl: null,
    });
    const second = play("A", "Artist", Date.UTC(2026, 10, 2, 14, 0), null, {
      artistUrl: "https://music.apple.com/au/artist/example/9",
      catalogId: "9",
      trackUrl: "https://music.apple.com/au/song/9",
    });
    const store = rebuildListeningStats([first, second]);
    const track = store.months["2026-11"]?.tracks["a::artist"];
    const artist = store.months["2026-11"]?.artists.artist;

    assert.ok(track);
    assert.equal(track.count, 2);
    assert.equal(track.trackUrl, "https://music.apple.com/au/song/9");
    assert.equal(
      track.artistUrl,
      "https://music.apple.com/au/artist/example/9"
    );
    assert.equal(track.catalogId, "9");
    assert.ok(artist);
    assert.equal(
      artist.artistUrl,
      "https://music.apple.com/au/artist/example/9"
    );
    assert.equal(artist.trackUrl, "https://music.apple.com/au/song/9");
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
