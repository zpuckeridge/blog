import SiteImage from "@/components/site-image";
import { ImageZoom } from "@/components/zoom-image";

interface ContentThumbnailProps {
  alt: string;
  src: string;
}

export default function ContentThumbnail({ alt, src }: ContentThumbnailProps) {
  return (
    <div className="relative h-12 w-7 min-w-7 shrink-0 overflow-hidden">
      <ImageZoom className="size-full">
        <SiteImage
          alt={alt}
          className="size-full object-contain shadow"
          height={150}
          src={src}
          width={150}
        />
      </ImageZoom>
    </div>
  );
}
