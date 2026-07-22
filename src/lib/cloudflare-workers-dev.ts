const devKvStore = new Map<string, string>();

const createDevKv = (): NonNullable<Cloudflare.Env["LOCATION_KV"]> => ({
  get: (key) => Promise.resolve(devKvStore.get(key) ?? null),
  put: (key, value) => {
    devKvStore.set(key, value);
    return Promise.resolve();
  },
});

export const env: Cloudflare.Env = {
  GITHUB_TOKEN: import.meta.env.GITHUB_TOKEN ?? process.env.GITHUB_TOKEN,
  LOCATION_KV: createDevKv(),
  LOCATION_WEBHOOK_SECRET:
    import.meta.env.LOCATION_WEBHOOK_SECRET ??
    process.env.LOCATION_WEBHOOK_SECRET,
  VIDEO_PASSWORD: import.meta.env.VIDEO_PASSWORD ?? process.env.VIDEO_PASSWORD,
};
