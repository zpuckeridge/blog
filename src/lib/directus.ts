import { createDirectus, rest, staticToken } from "@directus/sdk";

const DIRECTUS_URL =
  process.env.DIRECTUS_URL || "https://directus.obambulo.studio";

// Build the Directus client with optional static token authentication
let directus = createDirectus(DIRECTUS_URL).with(
  rest({
    onRequest: (options) => ({ ...options, next: { revalidate: 3600 } }), // Cache for 1 hour
  })
);

// Add static token authentication if provided
if (process.env.DIRECTUS_TOKEN) {
  directus = directus.with(staticToken(process.env.DIRECTUS_TOKEN));
}

export default directus;
