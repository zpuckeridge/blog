import SiteImage from "@/components/site-image";
import { ImageZoom } from "@/components/zoom-image";
import { directusAssetUrl, directusAssetZoomUrl } from "@/lib/directus-asset";

interface ContentThumbnailProps {
  alt: string;
  assetId: string;
}

const ContentThumbnail = ({ alt, assetId }: ContentThumbnailProps) => (
  <div className="relative h-12 w-7 min-w-7 shrink-0 overflow-hidden">
    <ImageZoom className="size-full">
      <SiteImage
        alt={alt}
        className="size-full object-contain shadow"
        height={150}
        src={directusAssetUrl(assetId, {
          height: 225,
          width: 150,
        })}
        width={150}
        zoomSrc={directusAssetZoomUrl(assetId)}
      />
    </ImageZoom>
  </div>
);

export default ContentThumbnail;
