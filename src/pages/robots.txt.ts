import type { APIRoute } from "astro";

import { getSiteUrl } from "@/lib/site-url";
import { VIDEO_PATH_PREFIX, VIDEOS_INDEX_PATH } from "@/lib/video-paths";

export const GET: APIRoute = () => {
  const baseUrl = getSiteUrl();

  const body = `User-agent: *
Allow: /
Disallow: ${VIDEOS_INDEX_PATH}
Disallow: ${VIDEO_PATH_PREFIX}

Sitemap: ${baseUrl}/sitemap.xml
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
