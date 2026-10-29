import { createDirectus, rest, staticToken } from "@directus/sdk";

const DIRECTUS_URL =
  import.meta.env.DIRECTUS_URL ||
  process.env.DIRECTUS_URL ||
  "https://directus.obambulo.studio";

/**
 * Read-only token for the "zacchary-me-site" Directus user.
 * Public read on content collections is disabled; this token is required.
 * Astro loads `.env.local` into `import.meta.env`; Wrangler secrets use
 * `process.env` at runtime on Workers (`nodejs_compat`).
 */
export const getDirectusToken = (): string | undefined =>
  import.meta.env.DIRECTUS_TOKEN ?? process.env.DIRECTUS_TOKEN;

const DIRECTUS_TOKEN = getDirectusToken();

if (!DIRECTUS_TOKEN) {
  console.warn(
    "DIRECTUS_TOKEN is not set; Directus requests are unauthenticated."
  );
}

const baseDirectus = createDirectus(DIRECTUS_URL).with(rest());

const directus = DIRECTUS_TOKEN
  ? baseDirectus.with(staticToken(DIRECTUS_TOKEN))
  : baseDirectus;

export default directus;
