import type { APIRoute } from "astro";

import { getPosts } from "@/lib/directus-content";
import { buildMetadataUrl } from "@/lib/metadata";
import { pagesWhere } from "@/lib/public-pages";
import { tagSlugsFromPosts } from "@/lib/related-posts";
import { timelinePostPath, timelineTagPath } from "@/lib/site";
import { escapeXml } from "@/lib/xml-escape";

const STATIC_ROUTES = pagesWhere("sitemap").map((page) => page.href);

export const GET: APIRoute = async () => {
  const lastmod = new Date().toISOString().slice(0, 10);
  const staticEntries = STATIC_ROUTES.map(
    (route) => `
  <url>
    <loc>${escapeXml(buildMetadataUrl(route))}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`
  );

  let dynamicEntries = "";

  try {
    const posts = await getPosts();

    for (const post of posts) {
      const postLastmod = post.date_updated
        ? new Date(post.date_updated).toISOString()
        : new Date(post.date_created).toISOString();
      dynamicEntries += `
  <url>
    <loc>${escapeXml(buildMetadataUrl(timelinePostPath(post.slug)))}</loc>
    <lastmod>${escapeXml(postLastmod)}</lastmod>
  </url>`;
    }

    for (const tag of tagSlugsFromPosts(posts)) {
      dynamicEntries += `
  <url>
    <loc>${escapeXml(buildMetadataUrl(timelineTagPath(tag)))}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`;
    }
  } catch (error) {
    console.error("Sitemap: Failed to fetch dynamic content:", error);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticEntries.join("")}
${dynamicEntries}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
