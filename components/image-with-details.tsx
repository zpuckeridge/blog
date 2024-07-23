import Image from "next/image";
import React from "react";

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
    <div className="w-full relative group overflow-hidden">
      <Image
        src={src}
        width={1000}
        height={1000}
        priority
        alt={alt}
        className="w-full aspect-square object-cover group-hover:blur-sm"
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 opacity-0 group-hover:opacity-100">
        <div className="absolute z-10 bottom-4 left-4 right-4">
          <div className="flex flex-col gap-2 w-full">
            <hr className="border-muted-foreground" />
            <div className="flex justify-between gap-4 w-full">
              <div>Name</div>
              <div className="w-full">{name}</div>
            </div>
            <hr className="border-muted-foreground" />
            <div className="flex justify-between gap-4 w-full">
              <div>Location</div>
              <div className="w-full">{location}</div>
            </div>
            <hr className="border-muted-foreground" />
            <div className="flex justify-between gap-4 w-full">
              <div>By</div>
              <div className="w-full">{author}</div>
            </div>
            <hr className="border-muted-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
}
