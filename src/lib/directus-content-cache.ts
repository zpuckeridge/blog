interface CacheEntry<T> {
  expiresAt: number;
  value: T;
}

export const CONTENT_CACHE_TTL_MS = 1000 * 60 * 5;

const contentCache =
  (
    globalThis as typeof globalThis & {
      __blogContentCache?: Map<string, CacheEntry<unknown>>;
    }
  ).__blogContentCache ?? new Map<string, CacheEntry<unknown>>();

(
  globalThis as typeof globalThis & {
    __blogContentCache?: Map<string, CacheEntry<unknown>>;
  }
).__blogContentCache = contentCache;

const isThenable = (value: unknown): boolean => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  return typeof (value as { then?: unknown }).then === "function";
};

/**
 * Remember settled values only. Workers with
 * `handle_cross_request_promise_resolution` drop a settlement once the request
 * that created the promise has ended, so a later request awaiting a cached
 * in-flight fetch throws and the page returns 500.
 */
export const withContentCache = async <T>(
  key: string,
  fetcher: () => Promise<T>,
  options?: { shouldCache?: (value: T) => boolean }
): Promise<T> => {
  const now = Date.now();
  const cached = contentCache.get(key);
  if (cached && cached.expiresAt > now && !isThenable(cached.value)) {
    const cachedValue = cached.value as T;
    if (!options?.shouldCache || options.shouldCache(cachedValue)) {
      return cachedValue;
    }

    contentCache.delete(key);
  } else if (cached && isThenable(cached.value)) {
    contentCache.delete(key);
  }

  const result = await fetcher();
  const shouldCache = options?.shouldCache;
  if (!isThenable(result) && (!shouldCache || shouldCache(result))) {
    contentCache.set(key, {
      expiresAt: Date.now() + CONTENT_CACHE_TTL_MS,
      value: result,
    });
  }

  return result;
};
