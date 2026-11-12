import { createDirectus, rest, staticToken } from "@directus/sdk";

import { getDirectusUrl } from "@/lib/directus-config";
import { getDirectusToken } from "@/lib/directus-token";

const DIRECTUS_TOKEN = getDirectusToken();

if (!DIRECTUS_TOKEN) {
  console.warn(
    "DIRECTUS_TOKEN is not set; Directus requests are unauthenticated."
  );
}

const baseDirectus = createDirectus(getDirectusUrl()).with(rest());

const directus = DIRECTUS_TOKEN
  ? baseDirectus.with(staticToken(DIRECTUS_TOKEN))
  : baseDirectus;

export default directus;
