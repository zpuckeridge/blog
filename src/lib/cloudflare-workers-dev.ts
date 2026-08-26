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
  NEXT_PUBLIC_POSTHOG_HOST:
    import.meta.env.NEXT_PUBLIC_POSTHOG_HOST ??
    process.env.NEXT_PUBLIC_POSTHOG_HOST,
  NEXT_PUBLIC_POSTHOG_KEY:
    import.meta.env.NEXT_PUBLIC_POSTHOG_KEY ??
    process.env.NEXT_PUBLIC_POSTHOG_KEY,
  PUBLIC_POSTHOG_HOST:
    import.meta.env.PUBLIC_POSTHOG_HOST ?? process.env.PUBLIC_POSTHOG_HOST,
  PUBLIC_POSTHOG_KEY:
    import.meta.env.PUBLIC_POSTHOG_KEY ?? process.env.PUBLIC_POSTHOG_KEY,
  VIDEO_PASSWORD: import.meta.env.VIDEO_PASSWORD ?? process.env.VIDEO_PASSWORD,
};
