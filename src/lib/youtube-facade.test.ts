import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { youtubeEmbedUrl, youtubePosterUrl } from "./youtube-facade.ts";

describe("youtube facade URLs", () => {
  it("uses the nocookie embed and a poster that exists for most videos", () => {
    assert.equal(
      youtubeEmbedUrl("N6j-562xQSs"),
      "https://www.youtube-nocookie.com/embed/N6j-562xQSs?autoplay=1"
    );
    assert.equal(
      youtubePosterUrl("N6j-562xQSs"),
      "https://i.ytimg.com/vi/N6j-562xQSs/hqdefault.jpg"
    );
    assert.equal(youtubeEmbedUrl("not an id"), null);
  });
});
