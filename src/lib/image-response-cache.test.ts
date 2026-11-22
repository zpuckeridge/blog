import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  IMAGE_CACHE_CONTROL,
  IMAGE_CDN_CACHE_CONTROL,
  IMAGE_EDGE_TTL_SECONDS,
} from "./image-response-cache.ts";

const blocksEdgeCache = /s-maxage|no-store|private|no-cache|max-age=0\b/u;

describe("image response cache", () => {
  it("gives /img transforms a Cache-Control the edge can store", () => {
    assert.equal(
      IMAGE_CACHE_CONTROL,
      `public, max-age=${IMAGE_EDGE_TTL_SECONDS}`
    );
    assert.equal(
      IMAGE_CDN_CACHE_CONTROL,
      `public, max-age=${IMAGE_EDGE_TTL_SECONDS}, stale-while-revalidate=86400`
    );
    assert.doesNotMatch(IMAGE_CACHE_CONTROL, blocksEdgeCache);
    assert.doesNotMatch(
      IMAGE_CDN_CACHE_CONTROL,
      /s-maxage|no-store|private|no-cache/u
    );
  });
});
