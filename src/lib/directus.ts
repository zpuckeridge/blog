import { createDirectus, rest, staticToken } from "@directus/sdk";

const DIRECTUS_URL =
  import.meta.env.DIRECTUS_URL ||
  process.env.DIRECTUS_URL ||
  "https://directus.obambulo.studio";

/**
 * Read-only token for the "zacchary-me-site" Directus user.
 * Read from process.env only (Worker secret at runtime via nodejs_compat,
 * shell env / .dev.vars at build) so it is never inlined into the bundle.
 * Public read on content collections is being removed, so it is required.
 */
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN;

if (!DIRECTUS_TOKEN) {
  console.warn("DIRECTUS_TOKEN is not set; Directus requests are unauthenticated.");
}

const baseDirectus = createDirectus(DIRECTUS_URL).with(rest());

const directus = DIRECTUS_TOKEN
  ? baseDirectus.with(staticToken(DIRECTUS_TOKEN))
  : baseDirectus;

export default directus;
