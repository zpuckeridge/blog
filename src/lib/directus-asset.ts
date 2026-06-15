const DIRECTUS_URL =
  import.meta.env.DIRECTUS_URL || "https://directus.obambulo.studio";

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
