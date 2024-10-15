import Image from "next/image";

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
    <div className="w-full relative group overflow-hidden rounded-xl">
      <Image
        src={src}
        width={1000}
        height={1000}
        alt={alt}
        className="w-full aspect-square object-cover group-hover:blur-sm rounded-xl transition-all"
      />
      <div className="absolute inset-0 bg-black text-white bg-opacity-0 group-hover:bg-opacity-50 opacity-0 group-hover:opacity-100 rounded-xl transition-all">
        <div className="absolute z-10 bottom-4 left-4 right-4">
          <div className="flex flex-col gap-0.5 w-full">
            <div className="w-full text-sm">{name}</div>
            <div className="w-full text-xs text-neutral-400">{location}</div>
            <div className="w-full text-xs text-neutral-400">{author}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
