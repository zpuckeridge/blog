/// <reference types="astro/client" />

interface SiteKv {
  get: (key: string) => Promise<string | null>;
  put: (key: string, value: string) => Promise<void>;
}

declare namespace Cloudflare {
  interface Env {
    /** Set via Wrangler secret, `vars`, or `.dev.vars` for local dev. */
    VIDEO_PASSWORD?: string;
    /** GitHub PAT with `read:user` for the contributions API. Same sources as `VIDEO_PASSWORD`. */
    GITHUB_TOKEN?: string;
    /** Bearer token for POST /api/location (iOS Shortcuts webhook). */
    LOCATION_WEBHOOK_SECRET?: string;
    /** KV namespace for location status and listening recents. */
    LOCATION_KV?: SiteKv;
  }
}

declare module "cloudflare:workers" {
  export const env: Cloudflare.Env;
}

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_POSTHOG_KEY?: string;
  readonly PUBLIC_POSTHOG_HOST?: string;
  readonly GITHUB_TOKEN?: string;
  readonly LOCATION_WEBHOOK_SECRET?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
