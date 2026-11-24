import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { resolveListeningArtistUrl } from "@/lib/listening-artist-url";

describe("resolveListeningArtistUrl", () => {
  it("keeps a stored Apple Music artist URL", () => {
    const url = "https://music.apple.com/au/artist/example/1";
    assert.equal(resolveListeningArtistUrl("Example", url), url);
  });

  it("falls back to Apple Music search when the stored URL is missing", () => {
    assert.equal(
      resolveListeningArtistUrl("Ruston Kelly", null),
      "https://music.apple.com/au/search?term=Ruston%20Kelly"
    );
  });
});
