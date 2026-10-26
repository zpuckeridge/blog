import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  collectContentAssetIds,
  resolveContentImageAlt,
  resolveHeroAlt,
} from "./content-image.ts";
import { directusContentSrcSet } from "./directus-asset.ts";

describe("resolveContentImageAlt", () => {
  it("prefers markdown alt, then the file description, then the title", () => {
    const meta = { description: "A desk", title: "desk.jpg" };
    assert.equal(resolveContentImageAlt("Caption", meta), "Caption");
    assert.equal(resolveContentImageAlt("  ", meta), "A desk");
    assert.equal(
      resolveContentImageAlt(undefined, { title: "desk.jpg" }),
      "desk.jpg"
    );
    assert.equal(resolveContentImageAlt(""), "");
  });

  it("uses the post title for a hero only after file metadata", () => {
    assert.equal(
      resolveHeroAlt(
        { image_alt: "", title: "Post" },
        { description: "Cover" }
      ),
      "Cover"
    );
    assert.equal(
      resolveHeroAlt(
        { image_alt: "Hero", title: "Post" },
        { description: "Cover" }
      ),
      "Hero"
    );
  });
});

describe("collectContentAssetIds", () => {
  it("collects markdown asset ids and the hero id", () => {
    const ids = collectContentAssetIds(
      "![alt](https://directus.obambulo.studio/assets/14ec3b68-93c8-4393-9cb5-ad02c6a1a0f6)",
      "3E14144E-010A-4EB9-ADD7-AD17738A9843"
    );
    assert.deepEqual(ids, [
      "3e14144e-010a-4eb9-add7-ad17738a9843",
      "14ec3b68-93c8-4393-9cb5-ad02c6a1a0f6",
    ]);
  });
});

describe("directusContentSrcSet", () => {
  it("builds avif and webp srcsets through the image proxy", () => {
    const srcset = directusContentSrcSet(
      "14ec3b68-93c8-4393-9cb5-ad02c6a1a0f6",
      "avif"
    );
    assert.match(
      srcset,
      /\/img\/14ec3b68-93c8-4393-9cb5-ad02c6a1a0f6\?[^ ]*format=avif/u
    );
    assert.match(srcset, / 640w,/u);
    assert.match(srcset, / 960w,/u);
    assert.match(srcset, / 1280w$/u);
    assert.doesNotMatch(srcset, /directus\.obambulo\.studio/u);
  });
});
