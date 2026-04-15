import type { APIRoute } from "astro";

import { getSiteUrl } from "@/lib/site-url";

export const GET: APIRoute = () => {
  const baseUrl = getSiteUrl();

  const body = `User-agent: *
Allow: /

Host: ${baseUrl.replace(/^https?:\/\//, "")}
Sitemap: ${baseUrl}/sitemap.xml
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
