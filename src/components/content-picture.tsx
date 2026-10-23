import SiteImage from "@/components/site-image";
import {
  CONTENT_IMAGE_SIZES,
  directusAssetUrl,
  directusAssetZoomUrl,
  directusContentSrcSet,
} from "@/lib/directus-asset";

const ContentPicture = ({
  alt,
  assetId,
  className,
  priority = false,
  sizes = CONTENT_IMAGE_SIZES,
  title,
}: {
  alt: string;
  assetId: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  title?: string;
}) => (
  <picture className="block w-full">
    <source
      sizes={sizes}
      srcSet={directusContentSrcSet(assetId, "avif")}
      type="image/avif"
    />
    <source
      sizes={sizes}
      srcSet={directusContentSrcSet(assetId, "webp")}
      type="image/webp"
    />
    <SiteImage
      alt={alt}
      className={className}
      height={720}
      priority={priority}
      sizes={sizes}
      src={directusAssetUrl(assetId, { format: "webp", width: 960 })}
      style={{ height: "auto", width: "100%" }}
      title={title}
      width={1280}
      zoomSrc={directusAssetZoomUrl(assetId)}
    />
  </picture>
);

export default ContentPicture;
