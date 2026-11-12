import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { pagesWhere, sitePages } from "./public-pages.ts";

describe("site pages", () => {
  it("lists activity in the sitemap and keeps the video gate out", () => {
    const sitemap = new Set(pagesWhere("sitemap").map((page) => page.href));
    assert.equal(sitemap.has("/activity"), true);
    assert.equal(sitemap.has("/videos"), false);
    assert.equal(sitemap.has("/video/"), false);
  });

  it("puts every unlocked menu page in the sitemap", () => {
    const sitemap = new Set(pagesWhere("sitemap").map((page) => page.href));
    for (const page of sitePages) {
      if (page.menu && !page.locked) {
        assert.equal(sitemap.has(page.href), true, page.href);
      }
    }
  });
});
