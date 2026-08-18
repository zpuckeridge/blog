import type { APIRoute } from "astro";

import { getSiteUrl } from "@/lib/site-url";

export const GET: APIRoute = () => {
  const baseUrl = getSiteUrl().replace(/\/$/u, "");

  const body = `# Zacchary Puckeridge

${baseUrl} is the personal site of Zacchary Puckeridge, a web developer and writer in Brisbane, Australia. He is IT Operations Lead at Star Compass and Haddon Institute, and runs obambulo studio.

## Key URLs

- Home: ${baseUrl}/
- About: ${baseUrl}/about
- Timeline: ${baseUrl}/timeline
- Projects: ${baseUrl}/projects
- CV: ${baseUrl}/cv
- Uses: ${baseUrl}/about/uses
- Colophon: ${baseUrl}/colophon

## Feeds

- RSS: ${baseUrl}/rss.xml
`;

  return new Response(body, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
