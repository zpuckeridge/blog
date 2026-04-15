import type { APIRoute } from "astro";

import { getPosts, getVideos } from "@/lib/directus-content";
import { getSiteUrl } from "@/lib/site-url";

const STATIC_ROUTES = [
  "",
  "/about",
  "/about/uses",
  "/about/books",
  "/about/movies",
  "/about/credits",
  "/projects",
  "/timeline",
  "/videos",
  "/cv",
  "/colophon",
  "/imprint",
];

const escapeXml = (s: string): string =>
  s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

export const GET: APIRoute = async () => {
  const baseUrl = getSiteUrl();
  const now = new Date().toISOString();

  const staticEntries = STATIC_ROUTES.map(
    (route) => `
  <url>
    <loc>${escapeXml(`${baseUrl}${route}`)}</loc>
    <lastmod>${escapeXml(now)}</lastmod>
  </url>`
  );

  let dynamicEntries = "";

  try {
    const [posts, videos] = await Promise.all([getPosts(), getVideos()]);

    for (const post of posts) {
      const lastMod = post.date_updated
        ? new Date(post.date_updated).toISOString()
        : new Date(post.date_created).toISOString();
      dynamicEntries += `
  <url>
    <loc>${escapeXml(`${baseUrl}/timeline/${post.slug}`)}</loc>
    <lastmod>${escapeXml(lastMod)}</lastmod>
  </url>`;
    }

    for (const video of videos) {
      const lastMod = video.date_updated
        ? new Date(video.date_updated).toISOString()
        : new Date(video.date_created).toISOString();
      dynamicEntries += `
  <url>
    <loc>${escapeXml(`${baseUrl}/video/${video.slug}`)}</loc>
    <lastmod>${escapeXml(lastMod)}</lastmod>
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
