const DIRECTUS_URL =
  import.meta.env.DIRECTUS_URL || "https://directus.obambulo.studio";

const DIRECTUS_ASSET_ID_PATTERN = /\/assets\/([^/?#]+)/;

interface DirectusAssetOptions {
  format?: "avif" | "jpeg" | "png" | "webp";
  height?: number;
  quality?: number;
  width?: number;
}

/** Directus asset URL with optional transform params for smaller transfers. */
export const directusAssetUrl = (
  assetId: string,
  options: DirectusAssetOptions = {}
): string => {
  const url = new URL(`${DIRECTUS_URL}/assets/${assetId}`);
  const { format = "webp", height, quality = 80, width = 300 } = options;

  url.searchParams.set("width", String(width));
  url.searchParams.set("quality", String(quality));
  url.searchParams.set("format", format);

  if (height) {
    url.searchParams.set("height", String(height));
  }

  return url.toString();
};

/** Higher-resolution Directus asset for image zoom overlays. */
export const directusAssetZoomUrl = (
  assetId: string,
  options: Pick<DirectusAssetOptions, "format" | "quality"> = {}
): string => {
  const url = new URL(`${DIRECTUS_URL}/assets/${assetId}`);
  const { format = "webp", quality = 90 } = options;

  url.searchParams.set("width", "2560");
  url.searchParams.set("quality", String(quality));
  url.searchParams.set("format", format);

  return url.toString();
};

const getDirectusAssetId = (src: string): string | undefined => {
  try {
    const url = new URL(src, DIRECTUS_URL);
    const match = url.pathname.match(DIRECTUS_ASSET_ID_PATTERN);
    return match?.[1];
  } catch {
    return undefined;
  }
};

/** Upgrade a transformed Directus thumbnail URL to a zoom-sized variant. */
export const resolveDirectusZoomSrc = (src: string): string | undefined => {
  const assetId = getDirectusAssetId(src);
  if (!assetId) {
    return undefined;
  }

  try {
    const url = new URL(src, DIRECTUS_URL);
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
  } catch {
    return directusAssetZoomUrl(assetId);
  }
};
