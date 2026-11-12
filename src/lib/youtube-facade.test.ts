import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { youtubeEmbedUrl } from "./youtube-facade.ts";

describe("youtube embed URL", () => {
  it("uses the nocookie player without autoplay", () => {
    const id = "N6j-562xQSs";
    const embed = youtubeEmbedUrl(id);
    assert.ok(embed);
    const embedUrl = new URL(embed);
    assert.ok(embedUrl.hostname.endsWith("youtube-nocookie.com"));
    assert.ok(embedUrl.pathname.split("/").includes(id));
    assert.equal(embedUrl.search, "");

    assert.equal(youtubeEmbedUrl("not an id"), null);
  });
});
