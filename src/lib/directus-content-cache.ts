interface CacheEntry<T> {
  expiresAt: number;
  value: Promise<T>;
}

const CONTENT_CACHE_TTL_MS = 1000 * 60 * 5;
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

export const withContentCache = <T>(
  key: string,
  fetcher: () => Promise<T>,
  options?: { shouldCache?: (value: T) => boolean }
): Promise<T> => {
  const now = Date.now();
  const cached = contentCache.get(key);
  if (cached && cached.expiresAt > now) {
    const cachedValue = cached.value as Promise<T>;
    if (!options?.shouldCache) {
      return cachedValue;
    }

    const { shouldCache } = options;
    return cachedValue.then((result) => {
      if (shouldCache(result)) {
        return result;
      }
      contentCache.delete(key);
      return withContentCache(key, fetcher, options);
    });
  }

  const value = (async () => {
    try {
      return await fetcher();
    } catch (error) {
      contentCache.delete(key);
      throw error;
    }
  })();

  const shouldCache = options?.shouldCache;
  if (shouldCache) {
    return value.then((result) => {
      if (shouldCache(result)) {
        contentCache.set(key, {
          expiresAt: Date.now() + CONTENT_CACHE_TTL_MS,
          value: Promise.resolve(result),
        });
      }
      return result;
    });
  }

  contentCache.set(key, {
    expiresAt: now + CONTENT_CACHE_TTL_MS,
    value,
  });
  return value;
};
