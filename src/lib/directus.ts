import { createDirectus, rest } from "@directus/sdk";

const DIRECTUS_URL =
  process.env.DIRECTUS_URL || "https://directus.obambulo.studio";

const directus = createDirectus(DIRECTUS_URL).with(
  rest({
    onRequest: (options) => ({ ...options, next: { revalidate: 3600 } }), // Cache for 1 hour
  })
);

export default directus;
