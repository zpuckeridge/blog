import type { APIRoute } from "astro";
import { compareDesc } from "date-fns";

import {
  DIRECTUS_ORIGIN,
  directusAssetAbsoluteUrl,
} from "@/lib/directus-asset";
import { getDirectusFileMeta, getPosts } from "@/lib/directus-content";
import { descriptionForPost } from "@/lib/meta-description";
import { buildEnclosureTag } from "@/lib/rss-enclosure";
import { getSiteUrl } from "@/lib/site-url";

const escapeXml = (unsafe: string): string =>
  unsafe
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const probeAsset = async (
  assetId: string
): Promise<{ length: number; type: string | null }> => {
  const token = process.env.DIRECTUS_TOKEN;
  if (!token) {
    return { length: 0, type: null };
  }

  try {
    const response = await fetch(`${DIRECTUS_ORIGIN}/assets/${assetId}`, {
      headers: { Authorization: `Bearer ${token}` },
      method: "HEAD",
    });
    const length = Number(response.headers.get("content-length"));
    const type =
      response.headers.get("content-type")?.split(";")[0]?.trim() ?? null;
    return {
      length: Number.isFinite(length) && length > 0 ? Math.round(length) : 0,
      type: type?.startsWith("image/") ? type : null,
    };
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
  const metas = await getDirectusFileMeta(
    sortedPosts.flatMap((post) => (post.image ? [post.image] : []))
  );
  const metaById = new Map(metas.map((meta) => [meta.id, meta]));

  const rssItems = await Promise.all(
    sortedPosts.map(async (post) => {
      let enclosure = "";
      if (post.image) {
        const meta = metaById.get(post.image.toLowerCase());
        let { filesize: length = 0, type = null } = meta ?? {};
        if (!length) {
          const probed = await probeAsset(post.image);
          const { length: probedLength, type: probedType } = probed;
          length = probedLength;
          type ??= probedType;
        }
        enclosure = buildEnclosureTag({
          length: length ?? 0,
          type,
          url: directusAssetAbsoluteUrl(post.image),
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
