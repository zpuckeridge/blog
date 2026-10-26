import type { APIRoute } from "astro";
import { compareDesc } from "date-fns";

import {
  DIRECTUS_ORIGIN,
  directusSocialImageAbsoluteUrl,
  SOCIAL_IMAGE_WIDTH,
} from "@/lib/directus-asset";
import { getPosts } from "@/lib/directus-content";
import { descriptionForPost } from "@/lib/meta-description";
import { buildEnclosureTag, readContentLength } from "@/lib/rss-enclosure";
import { getSiteUrl } from "@/lib/site-url";

const escapeXml = (unsafe: string): string =>
  unsafe
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const imageType = (header: string | null): string | null => {
  const type = header?.split(";")[0]?.trim() ?? null;
  return type?.startsWith("image/") ? type : null;
};

/** Byte size of the transformed JPEG the enclosure URL actually serves. */
const probeSocialImage = async (
  assetId: string
): Promise<{ length: number; type: string | null }> => {
  const token = process.env.DIRECTUS_TOKEN;
  const headers: HeadersInit = token
    ? { Authorization: `Bearer ${token}` }
    : {};
  const query = new URLSearchParams({
    format: "jpeg",
    width: String(SOCIAL_IMAGE_WIDTH),
  });
  const url = `${DIRECTUS_ORIGIN}/assets/${assetId.toLowerCase()}?${query.toString()}`;

  try {
    const head = await fetch(url, { headers, method: "HEAD" });
    const headLength = readContentLength(head.headers.get("content-length"));
    const headType = imageType(head.headers.get("content-type"));
    if (head.ok && headLength > 0) {
      return { length: headLength, type: headType };
    }

    const response = await fetch(url, { headers });
    if (!response.ok) {
      return { length: 0, type: null };
    }
    const type = imageType(response.headers.get("content-type")) ?? headType;
    const headerLength = readContentLength(
      response.headers.get("content-length")
    );
    if (headerLength > 0) {
      return { length: headerLength, type };
    }
    const bytes = await response.arrayBuffer();
    return { length: bytes.byteLength, type };
  } catch {
    return { length: 0, type: null };
  }
};

export const GET: APIRoute = async () => {
  const baseUrl = getSiteUrl();
  const posts = await getPosts();
  const sortedPosts = posts.toSorted((a, b) =>
    compareDesc(new Date(a.date_created), new Date(b.date_created))
  );
  const rssItems = await Promise.all(
    sortedPosts.map(async (post) => {
      let enclosure = "";
      if (post.image) {
        const probed = await probeSocialImage(post.image);
        enclosure = buildEnclosureTag({
          length: probed.length,
          type: probed.type,
          url: directusSocialImageAbsoluteUrl(post.image),
        });
      }

      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${baseUrl}/timeline/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/timeline/${post.slug}</guid>
      <description>${escapeXml(descriptionForPost(post.slug, post.description || ""))}</description>
      <pubDate>${new Date(post.date_created).toUTCString()}</pubDate>
      ${enclosure}
    </item>`;
    })
  );

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Zacchary Puckeridge</title>
    <link>${baseUrl}</link>
    <description>IT Operations Lead at Star Compass and Haddon Institute. Also runs obambulo studio.</description>
    <language>en-AU</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${rssItems.join("")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
