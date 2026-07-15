/// <reference types="astro/client" />
/// <reference types="@cloudflare/workers-types" />

declare namespace Cloudflare {
  interface Env {
    /** Set via Wrangler secret, `vars`, or `.dev.vars` for local dev. */
    VIDEO_PASSWORD?: string;
    /** GitHub PAT with `read:user` for the contributions API. Same sources as `VIDEO_PASSWORD`. */
    GITHUB_TOKEN?: string;
    /** Bearer token for POST /api/location (iOS Shortcuts webhook). */
    LOCATION_WEBHOOK_SECRET?: string;
    /** KV namespace for coarse location status. */
    LOCATION_KV?: KVNamespace;
  }
}

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_POSTHOG_KEY?: string;
  readonly PUBLIC_POSTHOG_HOST?: string;
  readonly PAGE_URL?: string;
  readonly GITHUB_TOKEN?: string;
  readonly LOCATION_WEBHOOK_SECRET?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "bun:test" {
  export function describe(title: string, fn: () => void): void;
  export function test(title: string, fn: () => void): void;
  export const expect: (actual: unknown) => {
    toBe: (expected: unknown) => void;
  };
}
