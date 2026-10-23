import { assetIdFromSrc, isDirectusAssetId } from "@/lib/directus-asset";

export interface ContentImageMeta {
  description?: string | null;
  title?: string | null;
}

const UUID_IN_TEXT =
  /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/giu;

export const collectContentAssetIds = (
  source: string,
  extra?: string | null
): string[] => {
  const ids = new Set<string>();
  if (extra && isDirectusAssetId(extra)) {
    ids.add(extra.toLowerCase());
  }

  for (const match of source.matchAll(UUID_IN_TEXT)) {
    ids.add(match[0].toLowerCase());
  }

  return [...ids];
};

/** Markdown alt, then the Directus file description, then its title. */
export const resolveContentImageAlt = (
  markdownAlt?: string,
  meta?: ContentImageMeta
): string => {
  const alt = markdownAlt?.trim();
  if (alt) {
    return alt;
  }

  const description = meta?.description?.trim();
  if (description) {
    return description;
  }

  const title = meta?.title?.trim();
  if (title) {
    return title;
  }

  return "";
};

export const resolveHeroAlt = (
  post: { image_alt?: string | null; title: string },
  meta: ContentImageMeta | undefined
): string => {
  const explicit = post.image_alt?.trim();
  if (explicit) {
    return explicit;
  }

  return resolveContentImageAlt(undefined, meta) || post.title;
};

export const imageMetaForSrc = (
  src: string,
  metas: Readonly<Record<string, ContentImageMeta>>
): ContentImageMeta | undefined => {
  const id = assetIdFromSrc(src);
  return id ? metas[id] : undefined;
};
