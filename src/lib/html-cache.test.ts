import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  isEdgeCacheableHtml,
  isEdgeCacheablePath,
  moveCharsetFirst,
} from "./html-cache.ts";

describe("moveCharsetFirst", () => {
  it("moves charset ahead of the theme script", () => {
    const html = '<head><script>theme()</script><meta charset="utf-8"></head>';
    assert.equal(
      moveCharsetFirst(html),
      '<head><meta charset="utf-8"><script>theme()</script></head>'
    );
  });
});

describe("isEdgeCacheableHtml", () => {
  it("caches public HTML and skips APIs, images, and video", () => {
    assert.equal(isEdgeCacheablePath("/"), true);
    assert.equal(isEdgeCacheablePath("/timeline"), true);
    assert.equal(isEdgeCacheablePath("/api/subscribe"), false);
    assert.equal(isEdgeCacheablePath("/img/file"), false);
    assert.equal(isEdgeCacheablePath("/videos"), false);
    assert.equal(
      isEdgeCacheableHtml({
        contentType: "text/html; charset=utf-8",
        hasSetCookie: false,
        method: "GET",
        pathname: "/",
        status: 200,
      }),
      true
    );
    assert.equal(
      isEdgeCacheableHtml({
        contentType: "text/html",
        hasSetCookie: true,
        method: "GET",
        pathname: "/",
        status: 200,
      }),
      false
    );
  });
});
