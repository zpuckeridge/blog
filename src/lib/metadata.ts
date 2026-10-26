import type { Post, Video } from "@/interfaces/content-item";
import {
  directusSocialImageAbsoluteUrl,
  SOCIAL_IMAGE_WIDTH,
} from "@/lib/directus-asset";
import { descriptionForPost, fitMetaDescription } from "@/lib/meta-description";
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
const titleSuffix = ` — ${siteTitle}`;

export const formatPageTitle = (pageTitle: string): string => {
  if (
    pageTitle === siteTitle ||
    pageTitle.startsWith(`${siteTitle} `) ||
    pageTitle.includes(titleSuffix)
  ) {
    return pageTitle;
  }

  return `${pageTitle}${titleSuffix}`;
};

/** Article headline without the site-title suffix used in the document title. */
export const articleHeadline = (pageTitle: string): string =>
  pageTitle.endsWith(titleSuffix)
    ? pageTitle.slice(0, -titleSuffix.length)
    : pageTitle;

export const buildMetadataUrl = (path: string): string =>
  new URL(path, getSiteUrl()).toString();

const defaultSocialImage: SocialImage = {
  alt: "Portrait of Zacchary Puckeridge",
  height: 630,
  url: buildMetadataUrl("/og-home.jpg"),
  width: 1200,
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
  const fittedDescription = fitMetaDescription(description);
  const formattedTitle = formatPageTitle(title);

  return {
    description: fittedDescription,
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
      description: fittedDescription,
      images,
      locale: "en_AU",
      siteName,
      title: formattedTitle,
      type: "website",
      ...(canonicalUrl ? { url: canonicalUrl } : {}),
    },
    title: formattedTitle,
    twitter: {
      card: "summary_large_image",
      creator: siteHandle,
      description: fittedDescription,
      images,
      site: siteHandle,
      title: formattedTitle,
    },
  };
};

export const buildTimelinePostMetadata = (
  post: Post,
  slug: string
): PageMetadata => {
  const { title } = post;
  const description = descriptionForPost(
    slug,
    post.description || `Read ${title} on zacchary.me.`
  );

  const base = createPageMetadata({
    description,
    image: post.image
      ? {
          alt: post.image_alt || title,
          url: directusSocialImageAbsoluteUrl(post.image),
          width: SOCIAL_IMAGE_WIDTH,
        }
      : defaultSocialImage,
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
  const { thumbnailUrl } = resolveVideoMedia(video.playback_id);
  const socialImage = {
    alt: title,
    height: 1080,
    url: thumbnailUrl,
    width: 1920,
  };

  return createPageMetadata({
    description,
    image: socialImage,
    keywords: video.tags,
    path: `/video/${slug}`,
    title,
  });
};
