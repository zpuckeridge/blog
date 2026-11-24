import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  CONTENT_CACHE_TTL_MS,
  withContentCache,
} from "./directus-content-cache.ts";

interface CacheEntry {
  expiresAt: number;
  value: unknown;
}

const contentCache = (): Map<string, CacheEntry> | undefined =>
  (
    globalThis as typeof globalThis & {
      __blogContentCache?: Map<string, CacheEntry>;
    }
  ).__blogContentCache;

const isPromise = (value: unknown): boolean =>
  typeof value === "object" &&
  value !== null &&
  "then" in value &&
  typeof (value as { then?: unknown }).then === "function";

const cacheNonEmpty = (items: readonly string[]): boolean => items.length > 0;

describe("withContentCache", () => {
  it("reuses a settled value inside a new promise", async () => {
    let calls = 0;
    const key = "test:settled-value";

    const firstPromise = withContentCache(key, () => {
      calls += 1;
      return Promise.resolve({ items: ["post"] });
    });
    assert.deepEqual(await firstPromise, { items: ["post"] });

    const secondPromise = withContentCache(key, () => {
      calls += 1;
      return Promise.resolve({ items: ["other"] });
    });

    assert.notEqual(firstPromise, secondPromise);
    assert.deepEqual(await secondPromise, { items: ["post"] });
    assert.equal(calls, 1);
    assert.equal(isPromise(contentCache()?.get(key)?.value), false);
  });

  it("does not share an in-flight fetch with another caller", async () => {
    let calls = 0;
    const gate = Promise.withResolvers<undefined>();
    const key = "test:inflight";

    const first = withContentCache(key, async () => {
      calls += 1;
      await gate.promise;
      return "first";
    });
    const second = withContentCache(key, () => {
      calls += 1;
      return Promise.resolve("second");
    });

    assert.equal(calls, 2);
    assert.equal(await second, "second");
    gate.resolve(undefined);
    assert.equal(await first, "first");

    const third = await withContentCache(key, () => {
      calls += 1;
      return Promise.resolve("third");
    });
    assert.equal(third, "first");
    assert.equal(calls, 2);
    assert.equal(isPromise(contentCache()?.get(key)?.value), false);
  });

  it("retries after a failure instead of caching the rejection", async () => {
    let calls = 0;
    const key = "test:failure";

    await assert.rejects(
      withContentCache(key, () => {
        calls += 1;
        return Promise.reject(new Error("directus down"));
      }),
      { message: "directus down" }
    );

    const value = await withContentCache(key, () => {
      calls += 1;
      return Promise.resolve("ok");
    });

    assert.equal(value, "ok");
    assert.equal(calls, 2);
  });

  it("skips caching when shouldCache rejects the value", async () => {
    let calls = 0;
    const key = "test:should-cache";

    assert.deepEqual(
      await withContentCache(
        key,
        () => {
          calls += 1;
          return Promise.resolve([]);
        },
        { shouldCache: cacheNonEmpty }
      ),
      []
    );
    assert.equal(contentCache()?.has(key), false);
    assert.deepEqual(
      await withContentCache(
        key,
        () => {
          calls += 1;
          return Promise.resolve(["a"]);
        },
        { shouldCache: cacheNonEmpty }
      ),
      ["a"]
    );
    assert.deepEqual(
      await withContentCache(
        key,
        () => {
          calls += 1;
          return Promise.resolve(["b"]);
        },
        { shouldCache: cacheNonEmpty }
      ),
      ["a"]
    );
    assert.equal(calls, 2);
  });

  it("serves an unexpired entry and refetches once the TTL has passed", async () => {
    const cache = contentCache();
    const freshKey = "test:fresh-entry";
    const staleKey = "test:stale-entry";
    const storedKey = "test:stored-ttl";
    cache?.set(freshKey, {
      expiresAt: Date.now() + CONTENT_CACHE_TTL_MS,
      value: "cached",
    });
    cache?.set(staleKey, {
      expiresAt: Date.now() - 1,
      value: "old",
    });

    let freshCalls = 0;
    let staleCalls = 0;
    assert.equal(
      await withContentCache(freshKey, () => {
        freshCalls += 1;
        return Promise.resolve("fetched");
      }),
      "cached"
    );
    assert.equal(
      await withContentCache(staleKey, () => {
        staleCalls += 1;
        return Promise.resolve("fetched");
      }),
      "fetched"
    );

    const before = Date.now();
    await withContentCache(storedKey, () => Promise.resolve("stored"));
    const stored = cache?.get(storedKey);
    assert.equal(freshCalls, 0);
    assert.equal(staleCalls, 1);
    assert.ok(stored);
    assert.ok(stored.expiresAt >= before + CONTENT_CACHE_TTL_MS);
    assert.ok(stored.expiresAt <= Date.now() + CONTENT_CACHE_TTL_MS);
  });

  it("ignores a promise left in the cache by an older isolate", async () => {
    const key = "test:stale-promise";
    contentCache()?.set(key, {
      expiresAt: Date.now() + CONTENT_CACHE_TTL_MS,
      value: Promise.resolve("poisoned"),
    });

    let calls = 0;
    const value = await withContentCache(key, () => {
      calls += 1;
      return Promise.resolve("fresh");
    });

    assert.equal(value, "fresh");
    assert.equal(calls, 1);
    assert.equal(isPromise(contentCache()?.get(key)?.value), false);
  });
});
