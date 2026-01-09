import Image from "next/image";
import { ImageZoom } from "./zoom-image";

interface ImageWithDetailsProps {
  src: string;
  alt: string;
  name: string;
  location: string;
  author: string;
}

export default function ImageWithDetails({
  src,
  alt,
  name,
  location,
  author,
}: ImageWithDetailsProps) {
  return (
    <div className="group relative w-full overflow-hidden rounded-xl">
      <ImageZoom>
        <Image
          alt={alt}
          className="aspect-[2/3] w-full rounded-xl object-cover transition-all group-hover:blur group-hover:brightness-70"
          height={1000}
          src={src}
          width={1000}
        />
      </ImageZoom>

      <div className="absolute right-4 bottom-4 left-4 opacity-0 transition-all duration-200 group-hover:opacity-100">
        <div className="flex w-full flex-col gap-0.5">
          <div className="w-full text-sm">{name}</div>
          <div className="w-full text-neutral-400 text-xs">{location}</div>
          <div className="w-full text-neutral-400 text-xs">{author}</div>
        </div>
      </div>
    </div>
  );
}
