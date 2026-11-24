import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { normalizeImageSrc, resolveHiResZoomSrc } from "./image-zoom-src.ts";

const base = "https://example.com/timeline/post";

describe("normalizeImageSrc", () => {
  it("resolves proxied paths against the page origin", () => {
    assert.equal(
      normalizeImageSrc("/img/abc?width=960", base),
      "https://example.com/img/abc?width=960"
    );
  });

  it("leaves absolute URLs unchanged apart from normalization", () => {
    assert.equal(
      normalizeImageSrc("https://example.com/img/abc?width=960", base),
      "https://example.com/img/abc?width=960"
    );
  });
});

describe("resolveHiResZoomSrc", () => {
  it("returns the zoom URL when display and zoom differ", () => {
    const display = normalizeImageSrc("/img/abc?format=avif&width=960", base);
    const zoom = resolveHiResZoomSrc(
      "https://example.com/img/abc?format=avif&width=960",
      "/img/abc?format=webp&width=2560",
      base
    );

    assert.ok(zoom);
    assert.equal(
      zoom,
      normalizeImageSrc("/img/abc?format=webp&width=2560", base)
    );
    assert.notEqual(zoom, display);
  });

  it("treats equivalent relative and absolute URLs as the same display source", () => {
    assert.equal(
      resolveHiResZoomSrc(
        "https://example.com/img/abc?width=2560",
        "/img/abc?width=2560",
        base
      ),
      undefined
    );
  });

  it("returns undefined when no zoom URL is provided", () => {
    assert.equal(resolveHiResZoomSrc("/img/x", undefined, base), undefined);
    assert.equal(resolveHiResZoomSrc("/img/x", "  ", base), undefined);
  });
});
