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

export interface ImageSize {
  height: number;
  width: number;
}

const settledImages = new Map<string, ImageSize>();

export const isImageSrcCached = (src: string, base?: string): boolean =>
  settledImages.has(normalizeImageSrc(src, base));

export const cachedImageSize = (
  src: string,
  base?: string
): ImageSize | undefined => settledImages.get(normalizeImageSrc(src, base));

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
): Promise<ImageSize> => {
  const absolute = normalizeImageSrc(src, base);
  if (!absolute) {
    throw new Error("Empty image source");
  }

  const cached = settledImages.get(absolute);
  if (cached) {
    return cached;
  }

  image.src = absolute;

  try {
    await image.decode();
  } catch {
    throw new Error(`Failed to load image: ${absolute}`);
  }

  const size = {
    height: image.naturalHeight,
    width: image.naturalWidth,
  };
  if (size.width > 0 && size.height > 0) {
    settledImages.set(absolute, size);
  }
  return size;
};
