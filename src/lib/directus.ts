import { createDirectus, rest, staticToken } from "@directus/sdk";

const DIRECTUS_URL =
  process.env.DIRECTUS_URL || "https://directus.obambulo.studio";

// Build the Directus client with optional static token authentication
const baseDirectus = createDirectus(DIRECTUS_URL).with(
  rest({
    // Cache for 1 hour
    onRequest: (options) => ({ ...options, next: { revalidate: 3600 } }),
  })
);

// Add static token authentication if provided
const directus = process.env.DIRECTUS_TOKEN
  ? baseDirectus.with(staticToken(process.env.DIRECTUS_TOKEN))
  : baseDirectus;

export default directus;
