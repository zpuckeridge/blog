import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { resolveListeningAlbumUrl } from "@/lib/listening-album-url";

describe("resolveListeningAlbumUrl", () => {
  it("builds an Apple Music search for album and artist", () => {
    const url = resolveListeningAlbumUrl("Blonde", "Frank Ocean");
    assert.ok(url?.includes("music.apple.com"));
    assert.ok(url?.includes(encodeURIComponent("Blonde Frank Ocean")));
  });

  it("returns null when album is missing", () => {
    assert.equal(resolveListeningAlbumUrl(null, "Artist"), null);
  });
});
