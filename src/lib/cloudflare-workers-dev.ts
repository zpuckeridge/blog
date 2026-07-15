const devKvStore = new Map<string, string>();

const createDevKv = (): KVNamespace => ({
  get: async (key, type) => {
    const value = devKvStore.get(key) ?? null;
    if (type === "json" && value !== null) {
      return JSON.parse(value) as unknown;
    }
    return value;
  },
  put: async (key, value) => {
    devKvStore.set(key, typeof value === "string" ? value : String(value));
  },
  delete: async (key) => {
    devKvStore.delete(key);
  },
  list: async () => ({
    keys: [],
    list_complete: true,
    cacheStatus: null,
  }),
  getWithMetadata: async (key, type) => {
    const value = devKvStore.get(key) ?? null;
    if (type === "json" && value !== null) {
      return {
        value: JSON.parse(value) as unknown,
        metadata: null,
        cacheStatus: null,
      };
    }
    return { value, metadata: null, cacheStatus: null };
  },
});

export const env = {
  GITHUB_TOKEN: import.meta.env.GITHUB_TOKEN ?? process.env.GITHUB_TOKEN,
  VIDEO_PASSWORD: import.meta.env.VIDEO_PASSWORD ?? process.env.VIDEO_PASSWORD,
  LOCATION_WEBHOOK_SECRET:
    import.meta.env.LOCATION_WEBHOOK_SECRET ??
    process.env.LOCATION_WEBHOOK_SECRET,
  LOCATION_KV: createDevKv(),
};
