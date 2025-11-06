import { createDirectus, rest } from "@directus/sdk";

const directus = createDirectus("https://directus.obambulo.studio").with(
  rest({
    onRequest: (options) => ({ ...options, next: { revalidate: 3600 } }), // Cache for 1 hour
  })
);

export default directus;
