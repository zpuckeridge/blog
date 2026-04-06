import type { CSSProperties, ImgHTMLAttributes } from "react";

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
  ...rest
}: SiteImageProps) {
  const resolvedSrc = src;
  const resolvedLoading = loading ?? (priority ? "eager" : "lazy");

  return (
    <img
      {...rest}
      alt={alt}
      className={className}
      decoding={decoding}
      height={height}
      loading={resolvedLoading}
      sizes={sizes}
      src={resolvedSrc}
      style={style as CSSProperties | undefined}
      width={width}
    />
  );
}
