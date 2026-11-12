import { workersEnv } from "@/lib/workers-env";

/**
 * Read-only token for the "zacchary-me-site" Directus user.
 * Public read on content collections is disabled; this token is required.
 * Astro loads `.env.local` into `import.meta.env`; Wrangler secrets use
 * `process.env` at runtime on Workers (`nodejs_compat`).
 */
export const getDirectusToken = (): string | undefined =>
  workersEnv.DIRECTUS_TOKEN ??
  import.meta.env.DIRECTUS_TOKEN ??
  process.env.DIRECTUS_TOKEN;
