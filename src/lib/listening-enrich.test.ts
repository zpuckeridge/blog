import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  mergePreservedListenGenres,
  playNeedsGenreBackfill,
} from "@/lib/listening-enrich";
import type { ListenPlay } from "@/lib/listening-history";

const play = (
  track: string,
  listenedAt: number,
  genres: string[] | null
): ListenPlay => ({
  album: null,
  artist: "Artist",
  artistUrl: null,
  artworkUrl: null,
  catalogId: genres ? "1" : null,
  genres,
  listenedAt,
  source: "lanyard",
  startedAt: listenedAt,
  track,
  trackUrl: null,
});

describe("playNeedsGenreBackfill", () => {
  it("is true when genres are missing or only Music", () => {
    assert.equal(playNeedsGenreBackfill(play("Missing", 1, null)), true);
    assert.equal(playNeedsGenreBackfill(play("Empty", 1, [])), true);
    assert.equal(playNeedsGenreBackfill(play("Generic", 1, ["Music"])), true);
  });

  it("is false when a real genre is stored", () => {
    assert.equal(playNeedsGenreBackfill(play("Specific", 1, ["Jazz"])), false);
    assert.equal(
      playNeedsGenreBackfill(play("Mixed", 1, ["Music", "Jazz"])),
      false
    );
  });
});

describe("mergePreservedListenGenres", () => {
  it("keeps genres from the stored history when the incoming batch lacks them", () => {
    const stored = [play("Kept", 2, ["Rock"]), play("New", 1, null)];
    const incoming = [
      play("Kept", 2, null),
      { ...play("New", 1, ["Pop"]), catalogId: "9" },
    ];

    const merged = mergePreservedListenGenres(stored, incoming);

    assert.deepEqual(merged[0]?.genres, ["Rock"]);
    assert.deepEqual(merged[1]?.genres, ["Pop"]);
    assert.equal(merged[1]?.catalogId, "9");
  });

  it("applies incoming genres onto a longer stored history", () => {
    const stored = [play("Latest", 3, null), play("Older", 2, ["Rock"])];
    const incoming = [play("Older", 2, ["Jazz"])];

    const merged = mergePreservedListenGenres(stored, incoming);

    assert.equal(merged.length, 2);
    assert.equal(merged[0]?.genres, null);
    assert.deepEqual(merged[1]?.genres, ["Jazz"]);
  });
});
