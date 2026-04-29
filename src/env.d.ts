/// <reference types="astro/client" />
/// <reference types="@cloudflare/workers-types" />

declare namespace Cloudflare {
  interface Env {
    /** Set via Wrangler secret, `vars`, or `.dev.vars` for local dev. */
    VIDEO_PASSWORD?: string;
    /** GitHub PAT with `read:user` for the contributions API. Same sources as `VIDEO_PASSWORD`. */
    GITHUB_TOKEN?: string;
  }
}

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_POSTHOG_KEY?: string;
  readonly PUBLIC_POSTHOG_HOST?: string;
  readonly PAGE_URL?: string;
  readonly GITHUB_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
