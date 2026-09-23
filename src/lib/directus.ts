import { createDirectus, rest, staticToken } from "@directus/sdk";

const DIRECTUS_URL =
  import.meta.env.DIRECTUS_URL ||
  process.env.DIRECTUS_URL ||
  "https://directus.obambulo.studio";

const DIRECTUS_TOKEN =
  import.meta.env.DIRECTUS_TOKEN ?? process.env.DIRECTUS_TOKEN;

// Build the Directus client with optional static token authentication
const baseDirectus = createDirectus(DIRECTUS_URL).with(rest());

// Add static token authentication if provided
const directus = DIRECTUS_TOKEN
  ? baseDirectus.with(staticToken(DIRECTUS_TOKEN))
  : baseDirectus;

export default directus;
