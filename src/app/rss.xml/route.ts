import { compareDesc } from "date-fns";

import { getPosts } from "@/lib/directus-content";
import { getSiteUrl } from "@/lib/site-url";

const escapeXml = (unsafe: string): string =>
  unsafe
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

export const GET = async () => {
  const baseUrl = getSiteUrl();
  const directusUrl =
    process.env.DIRECTUS_URL || "https://directus.obambulo.studio";

  const posts = await getPosts();
  const sortedPosts = posts.toSorted((a, b) =>
    compareDesc(new Date(a.date_created), new Date(b.date_created))
  );

  const rssItems = sortedPosts
    .map(
      (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${baseUrl}/timeline/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/timeline/${post.slug}</guid>
      <description>${escapeXml(post.description || "")}</description>
      <pubDate>${new Date(post.date_created).toUTCString()}</pubDate>
      ${post.image ? `<enclosure url="${directusUrl}/assets/${post.image}" type="image/jpeg" />` : ""}
    </item>`
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Zacchary Puckeridge</title>
    <link>${baseUrl}</link>
    <description>Christian IT Administrator working for Rising Sun Pictures. Building better artist experiences by day, Web Developer by night.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
