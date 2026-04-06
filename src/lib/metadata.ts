import type { Post, Video } from "@/interfaces/content-item";
import { getSiteUrl } from "@/lib/site-url";
import { resolveVideoMedia } from "@/lib/video-source";

interface SocialImage {
  alt: string;
  height?: number;
  url: string;
  width?: number;
}

interface CreatePageMetadataOptions {
  description: string;
  image?: SocialImage;
  keywords?: string[];
  noIndex?: boolean;
  path?: string;
  title: string;
}

const siteName = "zacchary.me";
const siteHandle = "@zpuckeridge";
const siteTitle = "Zacchary Puckeridge";

export const formatPageTitle = (pageTitle: string): string =>
  `${pageTitle} — ${siteTitle}`;

export const buildMetadataUrl = (path: string): string =>
  new URL(path, getSiteUrl()).toString();

const defaultSocialImage: SocialImage = {
  alt: siteTitle,
  url: buildMetadataUrl("/avatar-2026.avif"),
};

/** Plain metadata shape consumed by `base-head.astro` (replaces Next.js `Metadata`). */
export interface PageMetadata {
  alternates?: {
    canonical?: string;
    types?: Record<string, string>;
  };
  appleWebApp?: {
    statusBarStyle?: string;
    title?: string;
  };
  applicationName?: string;
  authors?: { name: string } | { name: string }[];
  creator?: string;
  description?: string;
  formatDetection?: {
    telephone?: boolean;
  };
  generator?: string;
  icons?: {
    icon?: string;
  };
  keywords?: string[];
  metadataBase?: URL;
  openGraph?: {
    authors?: string[];
    description?: string;
    images?: SocialImage | SocialImage[];
    locale?: string;
    modifiedTime?: string;
    publishedTime?: string;
    siteName?: string;
    tags?: string[];
    title?: string;
    type?: string;
    url?: string;
    videos?: { height: number; type: string; url: string; width: number }[];
  };
  publisher?: string;
  referrer?: string;
  robots?: {
    follow: boolean;
    index: boolean;
  };
  title?: string | { default: string; template: string };
  twitter?: {
    card?: string;
    creator?: string;
    creatorId?: string;
    description?: string;
    images?: SocialImage | SocialImage[];
    site?: string;
    title?: string;
  };
}

export const createPageMetadata = ({
  description,
  image = defaultSocialImage,
  keywords,
  noIndex = false,
  path,
  title,
}: CreatePageMetadataOptions): PageMetadata => {
  const canonicalUrl = path ? buildMetadataUrl(path) : undefined;
  const images = [image];

  return {
    description,
    ...(canonicalUrl
      ? {
          alternates: {
            canonical: canonicalUrl,
          },
        }
      : {}),
    ...(keywords?.length ? { keywords } : {}),
    ...(noIndex
      ? {
          robots: {
            follow: false,
            index: false,
          },
        }
      : {}),
    openGraph: {
      description,
      images,
      locale: "en_AU",
      siteName,
      title,
      type: "website",
      ...(canonicalUrl ? { url: canonicalUrl } : {}),
    },
    title,
    twitter: {
      card: "summary_large_image",
      creator: siteHandle,
      description,
      images,
      site: siteHandle,
      title,
    },
  };
};

export const buildTimelinePostMetadata = (
  post: Post,
  slug: string
): PageMetadata => {
  const { title } = post;
  const description = post.description || `Read ${title} on zacchary.me.`;

  const baseUrl = getSiteUrl();
  const directusUrl =
    process.env.DIRECTUS_URL || "https://directus.obambulo.studio";
  const imageUrl = post.image
    ? `${directusUrl}/assets/${post.image}`
    : `${baseUrl}/avatar-2026.avif`;
  const base = createPageMetadata({
    description,
    image: {
      alt: post.image_alt || title,
      height: 1080,
      url: imageUrl,
      width: 1920,
    },
    keywords: post.tags,
    path: `/timeline/${slug}`,
    title,
  });

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      authors: ["Zacchary Puckeridge"],
      modifiedTime: new Date(post.date_updated).toISOString(),
      publishedTime: new Date(post.date_created).toISOString(),
      tags: post.tags,
      type: "article",
    },
  };
};

export const buildVideoPageMetadata = (
  video: Video,
  slug: string
): PageMetadata => {
  const { title } = video;
  const description = video.description || `Watch ${title} on zacchary.me.`;
  const { thumbnailUrl, videoUrl, youtubeId } = resolveVideoMedia(
    video.playback_id
  );
  const socialImage = {
    alt: title,
    height: 1080,
    url: thumbnailUrl,
    width: 1920,
  };
  const metadata = createPageMetadata({
    description,
    image: socialImage,
    keywords: video.tags,
    path: `/video/${slug}`,
    title,
  });

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "video.other",
      ...(youtubeId
        ? {}
        : {
            videos: [
              {
                height: 1080,
                type: "video/mp4",
                url: videoUrl,
                width: 1920,
              },
            ],
          }),
    },
  };
};
