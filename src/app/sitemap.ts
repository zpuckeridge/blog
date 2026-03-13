import type { MetadataRoute } from "next";

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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();
  const now = new Date().toISOString();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    lastModified: now,
    url: `${baseUrl}${route}`,
  }));

  let dynamicEntries: MetadataRoute.Sitemap = [];

  try {
    const [posts, videos] = await Promise.all([getPosts(), getVideos()]);

    const timelineEntries = posts.map((post) => ({
      lastModified: post.date_updated
        ? new Date(post.date_updated).toISOString()
        : new Date(post.date_created).toISOString(),
      url: `${baseUrl}/timeline/${post.slug}`,
    }));

    const videoEntries = videos.map((video) => ({
      lastModified: video.date_updated
        ? new Date(video.date_updated).toISOString()
        : new Date(video.date_created).toISOString(),
      url: `${baseUrl}/video/${video.slug}`,
    }));

    dynamicEntries = [...timelineEntries, ...videoEntries];
  } catch (error) {
    console.error("Sitemap: Failed to fetch dynamic content:", error);
  }

  return [...staticEntries, ...dynamicEntries];
}
