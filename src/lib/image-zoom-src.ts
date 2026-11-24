/**
 * Normalize an image URL for comparison and fetching (absolute, origin-relative).
 */
export const normalizeImageSrc = (
  src: string,
  base = typeof window === "undefined"
    ? "http://localhost"
    : window.location.href
): string => {
  const trimmed = src.trim();
  if (!trimmed) {
    return trimmed;
  }

  try {
    return new URL(trimmed, base).href;
  } catch {
    return trimmed;
  }
};

/**
 * Pick a higher-res zoom URL when it differs from what the thumbnail is showing.
 */
export const resolveHiResZoomSrc = (
  displaySrc: string,
  dataZoomSrc: string | undefined,
  base?: string
): string | undefined => {
  const zoomRaw = dataZoomSrc?.trim();
  if (!zoomRaw) {
    return undefined;
  }

  const display = normalizeImageSrc(displaySrc, base);
  const zoom = normalizeImageSrc(zoomRaw, base);
  if (display === zoom) {
    return undefined;
  }

  return zoom;
};

const settledImages = new Set<string>();

export const isImageSrcCached = (src: string, base?: string): boolean =>
  settledImages.has(normalizeImageSrc(src, base));

const markImageSrcCached = (src: string, base?: string): void => {
  settledImages.add(normalizeImageSrc(src, base));
};

interface ImageReadyOptions {
  base?: string;
  image?: HTMLImageElement;
}

/**
 * Resolve when a URL is safe to show at full resolution. Handles images that are
 * already in the HTTP cache (Safari/WebKit may skip `load` in that case).
 */
export const whenImageReady = async (
  src: string,
  { base, image = new Image() }: ImageReadyOptions = {}
): Promise<void> => {
  const absolute = normalizeImageSrc(src, base);
  if (!absolute) {
    throw new Error("Empty image source");
  }

  if (settledImages.has(absolute)) {
    return;
  }

  image.src = absolute;

  try {
    await image.decode();
    markImageSrcCached(absolute, base);
  } catch {
    throw new Error(`Failed to load image: ${absolute}`);
  }
};
