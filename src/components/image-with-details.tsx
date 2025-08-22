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
		<div className="w-full relative group overflow-hidden rounded-xl">
			<ImageZoom>
				<Image
					src={src}
					width={1000}
					height={1000}
					alt={alt}
					className="w-full aspect-[2/3] object-cover group-hover:blur rounded-xl transition-all group-hover:brightness-70"
				/>
			</ImageZoom>

			<div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-200">
				<div className="flex flex-col gap-0.5 w-full">
					<div className="w-full text-sm">{name}</div>
					<div className="w-full text-xs text-neutral-400">{location}</div>
					<div className="w-full text-xs text-neutral-400">{author}</div>
				</div>
			</div>
		</div>
	);
}
