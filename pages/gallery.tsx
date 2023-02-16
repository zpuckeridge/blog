import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiCopy,
  FiExternalLink,
  FiX,
} from "react-icons/fi";
import cloudinary from "../lib/cloudinary";

// @ts-ignore
import useKeypress from "react-use-keypress";
import CopyLink from "../components/CopyLink";

interface ImageProps {
  id: number;
  height: number;
  width: number;
  public_id: string;
  format: string;
  blurDataUrl?: string;
  filename: string;
}

export default function Gallery({ images }: { images: ImageProps[] }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [modalImage, setModalImage] = useState<string>("");
  const [downloadImage, setDownloadImage] = useState<string>("");
  const [imageIndex, setImageIndex] = useState(0); // add this state to keep track of the current image index

  useKeypress(["ArrowLeft", "ArrowRight", "Escape"], (event: any) => {
    if (event.key === "ArrowLeft") {
      handleArrowLeft();
    } else if (event.key === "ArrowRight") {
      handleArrowRight();
    } else if (event.key === "Escape") {
      closeModal();
    }
  });

  useEffect(() => {
    // update the modalImage state based on the current imageIndex state
    const image = images[imageIndex];
    const fullUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_1280/${image.public_id}`;
    const fullImage = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${image.public_id}`;
    setDownloadImage(fullImage);
    setModalImage(fullUrl);
  }, [imageIndex, images]);

  // if no images, return null
  if (!images) {
    return null;
  }

  const openModal = (image: string) => {
    const imageIndex = images.findIndex((img) => img.public_id === image);
    const fullUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_1280/${image}`;

    setModalImage(fullUrl);
    setModalOpen(true);
    setImageIndex(imageIndex);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleArrowLeft = () => {
    setImageIndex((imageIndex - 1 + images.length) % images.length);
  };

  // handle right arrow click, wrapping around to start of images array if necessary
  const handleArrowRight = () => {
    setImageIndex((imageIndex + 1) % images.length);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(downloadImage);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div>
      {modalOpen && images.length > 0 && (
        <div className="fixed z-[99] inset-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center text-white">
          <div className="relative max-w-[1280px] p-8">
            <button
              className="absolute top-[calc(50%-16px)] left-10 text-2xl rounded-full bg-black/50 p-3 text-white/75 text-gray-300 backdrop-blur-lg transition hover:bg-black/75"
              onClick={handleArrowLeft}
              title="Previous Image">
              <FiArrowLeft />
            </button>
            <button
              className="absolute top-[calc(50%-16px)] right-10 text-2xl rounded-full bg-black/50 p-3 text-white/75 text-gray-300 backdrop-blur-lg transition hover:bg-black/75"
              onClick={handleArrowRight}
              title="Next Image">
              <FiArrowRight />
            </button>
            <button
              className="top-10 left-10 absolute flex items-center rounded-full bg-black/50 p-3 text-white/75 text-gray-300 backdrop-blur-lg transition hover:bg-black/75"
              onClick={closeModal}
              title="Close">
              <FiX />
            </button>
            <a href={downloadImage} title="Open Fullsize Image">
              <button className="top-10 right-10 absolute flex items-center rounded-full bg-black/50 p-3 text-white/75 text-gray-300 backdrop-blur-lg transition hover:bg-black/75">
                <FiExternalLink />
              </button>
            </a>
            <Image
              src={modalImage}
              width={images[imageIndex].width}
              height={images[imageIndex].height}
              alt={images[imageIndex].filename}
              className="pointer-events-none rounded-lg"
              priority={true}
            />
            <div className="flex justify-between">
              <p className="font-semibold text-xl mt-1">
                {images[imageIndex].filename}
              </p>
              <button onClick={handleCopy} title="Copy URL">
                {copied ? (
                  <div className="inline-flex">
                    <p className="mr-2">URL Copied!</p>
                    <FiCheck className="my-auto" />
                  </div>
                ) : (
                  <FiCopy />
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-20 mb-20 max-w-[1960px] columns-1 sm:columns-2 xl:columns-3 2xl:columns-4">
        {images.map(({ public_id, format }) => (
          <button key={public_id} onClick={() => openModal(public_id)}>
            <Image
              alt="temp"
              className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
              src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
              width={720}
              height={480}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const results = await cloudinary.v2.search
    .expression(`folder:blog/*`)
    .sort_by("uploaded_at", "asc")
    .max_results(400)
    .execute();
  let reducedResults: ImageProps[] = [];

  let i = 0;
  for (let result of results.resources) {
    reducedResults.push({
      id: i,
      height: result.height,
      width: result.width,
      public_id: result.public_id,
      format: result.format,
      filename: result.filename,
    });
    i++;
  }

  return {
    props: {
      images: reducedResults,
    },
  };
}
