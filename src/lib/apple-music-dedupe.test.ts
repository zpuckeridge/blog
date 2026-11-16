import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  APPLE_LANYARD_DEDUPE_WINDOW_MS,
  isDuplicateListenAcrossSources,
} from "@/lib/apple-music-dedupe";
import type { ListenPlay } from "@/lib/listening-history";

const play = (
  track: string,
  artist: string,
  listenedAt: number,
  source: ListenPlay["source"] = "lanyard"
): ListenPlay => ({
  album: null,
  artist,
  artistUrl: null,
  artworkUrl: null,
  listenedAt,
  source,
  startedAt: listenedAt,
  track,
  trackUrl: null,
});

describe("isDuplicateListenAcrossSources", () => {
  it("matches the same song inside the dedupe window", () => {
    const existing = [play("Song", "Artist", 10_000, "lanyard")];
    assert.equal(
      isDuplicateListenAcrossSources(
        "Song",
        "Artist",
        10_000 + 60_000,
        existing
      ),
      true
    );
  });

  it("allows the same song outside the dedupe window", () => {
    const existing = [play("Song", "Artist", 10_000, "lanyard")];
    assert.equal(
      isDuplicateListenAcrossSources(
        "Song",
        "Artist",
        10_000 + APPLE_LANYARD_DEDUPE_WINDOW_MS + 1,
        existing
      ),
      false
    );
  });

  it("ignores different songs", () => {
    const existing = [play("Song", "Artist", 10_000)];
    assert.equal(
      isDuplicateListenAcrossSources("Other", "Artist", 10_000, existing),
      false
    );
  });
});
