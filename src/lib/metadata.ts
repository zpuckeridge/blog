import type { Metadata } from "next";

import { getSiteUrl } from "@/lib/site-url";

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

export const siteName = "zacchary.me";
export const siteHandle = "@zpuckeridge";
export const siteTitle = "Zacchary Puckeridge";

export const buildMetadataUrl = (path: string): string =>
  new URL(path, getSiteUrl()).toString();

export const defaultSocialImage: SocialImage = {
  alt: siteTitle,
  url: buildMetadataUrl("/avatar-2026.avif"),
};

export const createPageMetadata = ({
  description,
  image = defaultSocialImage,
  keywords,
  noIndex = false,
  path,
  title,
}: CreatePageMetadataOptions): Metadata => {
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
