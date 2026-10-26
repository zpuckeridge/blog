import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  buildEnclosureTag,
  enclosureLength,
  readContentLength,
} from "./rss-enclosure.ts";

describe("buildEnclosureTag", () => {
  it("includes length, using 0 when the size is unknown", () => {
    assert.equal(enclosureLength(null), 0);
    assert.equal(enclosureLength("512"), 512);
    assert.equal(readContentLength("3577041"), 3_577_041);
    assert.equal(readContentLength(null), 0);
    assert.equal(
      buildEnclosureTag({
        length: 0,
        url: "https://zacchary.me/img/file",
      }),
      '<enclosure url="https://zacchary.me/img/file" length="0" type="image/jpeg" />'
    );
    assert.match(
      buildEnclosureTag({
        length: 1200,
        type: "image/webp",
        url: "https://zacchary.me/img/file",
      }),
      /length="1200" type="image\/webp"/u
    );
  });
});
