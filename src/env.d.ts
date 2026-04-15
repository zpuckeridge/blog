/// <reference types="astro/client" />
/// <reference types="@cloudflare/workers-types" />

declare namespace Cloudflare {
  interface Env {
    /** Set via Wrangler secret, `vars`, or `.dev.vars` for local dev. */
    VIDEO_PASSWORD?: string;
  }
}

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_POSTHOG_KEY?: string;
  readonly PUBLIC_POSTHOG_HOST?: string;
  readonly PAGE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
