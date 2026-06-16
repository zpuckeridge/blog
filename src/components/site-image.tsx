import type { CSSProperties, ImgHTMLAttributes } from "react";

import { resolveDirectusZoomSrc } from "@/lib/directus-asset";

type SiteImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "alt" | "width" | "height"
> & {
  alt: string;
  height?: number | string;
  priority?: boolean;
  quality?: number;
  src: string;
  unoptimized?: boolean;
  width?: number | string;
  /** Higher-resolution source used by ImageZoom when present. */
  zoomSrc?: string;
};

/**
 * Drop-in replacement for `next/image` static & remote URLs used in this project.
 */
export default function SiteImage({
  alt,
  className,
  decoding = "async",
  height,
  loading,
  priority,
  quality: _quality,
  sizes,
  src,
  style,
  unoptimized: _unoptimized,
  width,
  zoomSrc,
  ...rest
}: SiteImageProps) {
  const resolvedSrc = src;
  const resolvedZoomSrc = zoomSrc ?? resolveDirectusZoomSrc(resolvedSrc);
  const resolvedLoading = loading ?? (priority ? "eager" : "lazy");

  return (
    <img
      {...rest}
      alt={alt}
      className={className}
      data-zoom-src={resolvedZoomSrc}
      decoding={decoding}
      fetchPriority={priority ? "high" : undefined}
      height={height}
      loading={resolvedLoading}
      sizes={sizes}
      src={resolvedSrc}
      style={style as CSSProperties | undefined}
      width={width}
    />
  );
}
