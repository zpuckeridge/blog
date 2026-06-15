import SiteImage from "@/components/site-image";

import { ImageZoom } from "./zoom-image";

interface ImageWithDetailsProps {
  alt: string;
  author: string;
  location: string;
  name: string;
  src: string;
}

export default function ImageWithDetails({
  src,
  alt,
  name,
  location,
  author,
}: ImageWithDetailsProps) {
  return (
    <div className="group relative w-full overflow-hidden">
      <ImageZoom className="size-full">
        <SiteImage
          alt={alt}
          className="aspect-[2/3] w-full object-cover transition-all duration-200 group-hover:blur group-hover:brightness-70"
          height={1000}
          src={src}
          width={1000}
        />
      </ImageZoom>

      <div className="absolute right-4 bottom-4 left-4 opacity-0 transition-all duration-200 group-hover:opacity-100">
        <div className="flex w-full flex-col gap-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
          <div className="w-full text-sm text-white">{name}</div>
          <div className="w-full text-white/80 text-sm">{location}</div>
          <div className="w-full text-white/80 text-sm">{author}</div>
        </div>
      </div>
    </div>
  );
}
