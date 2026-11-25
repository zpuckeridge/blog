export interface ImageFrame {
  height: number;
  left: number;
  top: number;
  width: number;
}

export interface ViewportSize {
  height: number;
  width: number;
}

/**
 * Largest frame of `aspectRatio` (width / height) that fits inside the viewport
 * inset by `margin`, centered in that inset.
 */
export const fitImageFrame = (
  aspectRatio: number,
  viewport: ViewportSize,
  margin: number
): ImageFrame => {
  const maxWidth = Math.max(0, viewport.width - margin * 2);
  const maxHeight = Math.max(0, viewport.height - margin * 2);
  const safeAspect =
    Number.isFinite(aspectRatio) && aspectRatio > 0 ? aspectRatio : 1;

  let width = maxWidth;
  let height = width / safeAspect;
  if (height > maxHeight) {
    height = maxHeight;
    width = height * safeAspect;
  }

  return {
    height,
    left: margin + (maxWidth - width) / 2,
    top: margin + (maxHeight - height) / 2,
    width,
  };
};
