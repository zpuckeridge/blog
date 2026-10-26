import { getSiteUrl } from "@/lib/site-url";

/**
 * Directus images are served through this site's `/img/<id>` Worker route,
 * which fetches them from Directus with a private token. Browsers never talk
 * to Directus directly.
 */
export const DIRECTUS_ORIGIN = "https://directus.obambulo.studio";
export const IMAGE_PROXY_PATH = "/img";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/iu;
const ASSET_PATH_PATTERN = /^\/(?:assets|img)\/(?<assetId>[^/?#]+)/u;

export const IMAGE_FORMATS = ["avif", "jpeg", "png", "webp"] as const;
export const IMAGE_FITS = ["contain", "cover", "inside", "outside"] as const;
type ImageFormat = (typeof IMAGE_FORMATS)[number];

interface DirectusAssetOptions {
  format?: ImageFormat;
  height?: number;
  quality?: number;
  width?: number;
}

export const isDirectusAssetId = (value: string): boolean =>
  UUID_PATTERN.test(value);

/** Site-relative proxied path for a Directus file id. */
export const directusAssetPath = (assetId: string): string =>
  `${IMAGE_PROXY_PATH}/${assetId}`;

const withParams = (
  assetId: string,
  params: Record<string, string | number | undefined>
): string => {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      search.set(key, String(value));
    }
  }
  const query = search.toString();
  return `${directusAssetPath(assetId)}${query ? `?${query}` : ""}`;
};

/** Open Graph and RSS use a transformed JPEG of about this width, not the original. */
export const SOCIAL_IMAGE_WIDTH = 1200;

/** Proxied ~1200px JPEG for `og:image` and RSS enclosures. */
export const directusSocialImagePath = (assetId: string): string =>
  withParams(assetId, { format: "jpeg", width: SOCIAL_IMAGE_WIDTH });

export const directusSocialImageAbsoluteUrl = (assetId: string): string =>
  `${getSiteUrl()}${directusSocialImagePath(assetId)}`;

/** Proxied Directus image URL with transform params for smaller transfers. */
export const directusAssetUrl = (
  assetId: string,
  options: DirectusAssetOptions = {}
): string => {
  const { format = "webp", height, quality = 80, width = 300 } = options;
  return withParams(assetId, { format, height, quality, width });
};

export const CONTENT_IMAGE_WIDTHS = [640, 960, 1280] as const;

/** Content column is `max-w-lg` with `px-6` (about 29rem once the padding clears). */
export const CONTENT_IMAGE_SIZES =
  "(min-width: 32rem) 29rem, calc(100vw - 3rem)";

export const directusContentSrcSet = (
  assetId: string,
  format: "avif" | "webp"
): string =>
  CONTENT_IMAGE_WIDTHS.map(
    (width) =>
      `${directusAssetUrl(assetId, { format, quality: 80, width })} ${width}w`
  ).join(", ");

/** Higher-resolution proxied image for image zoom overlays. */
export const directusAssetZoomUrl = (
  assetId: string,
  options: Pick<DirectusAssetOptions, "format" | "quality"> = {}
): string => {
  const { format = "webp", quality = 90 } = options;
  return withParams(assetId, { format, quality, width: 2560 });
};

const parseAssetUrl = (src: string): URL | undefined => {
  try {
    const url = new URL(src, getSiteUrl());
    const isDirectus = url.origin === DIRECTUS_ORIGIN;
    const isProxy = url.pathname.startsWith(`${IMAGE_PROXY_PATH}/`);
    return isDirectus || isProxy ? url : undefined;
  } catch {
    return undefined;
  }
};

const getDirectusAssetId = (url: URL): string | undefined => {
  const assetId = url.pathname.match(ASSET_PATH_PATTERN)?.groups?.assetId;
  return assetId && isDirectusAssetId(assetId) ? assetId : undefined;
};

/** Directus file id from a proxied `/img/<id>` URL, a Directus asset URL, or a bare UUID. */
export const assetIdFromSrc = (src: string): string | undefined => {
  if (isDirectusAssetId(src)) {
    return src.toLowerCase();
  }
  const url = parseAssetUrl(src);
  return url ? getDirectusAssetId(url)?.toLowerCase() : undefined;
};

/**
 * Rewrite a raw Directus `/assets/<id>` URL (e.g. inside post Markdown)
 * to the proxied `/img/<id>` path. Other URLs are returned unchanged.
 */
export const toProxiedAssetSrc = (src: string): string => {
  const url = parseAssetUrl(src);
  if (!url || url.origin !== DIRECTUS_ORIGIN) {
    return src;
  }
  const assetId = getDirectusAssetId(url);
  if (!assetId) {
    return src;
  }
  return `${directusAssetPath(assetId)}${url.search}`;
};

/** Upgrade a transformed Directus thumbnail URL to a zoom-sized variant. */
export const resolveDirectusZoomSrc = (src: string): string | undefined => {
  const url = parseAssetUrl(src);
  const assetId = url ? getDirectusAssetId(url) : undefined;
  if (!url || !assetId) {
    return undefined;
  }

  const currentWidth = Number(url.searchParams.get("width"));
  if (Number.isFinite(currentWidth) && currentWidth >= 2000) {
    return undefined;
  }

  const format = url.searchParams.get("format");
  return directusAssetZoomUrl(assetId, {
    format:
      format === "avif" ||
      format === "jpeg" ||
      format === "png" ||
      format === "webp"
        ? format
        : undefined,
  });
};
