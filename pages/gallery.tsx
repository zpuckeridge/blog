import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiDownload,
  FiImage,
  FiX,
} from "react-icons/fi";
import cloudinary from "../lib/cloudinary";

interface ImageProps {
  id: number;
  height: string;
  width: string;
  public_id: string;
  format: string;
  blurDataUrl?: string;
}

export default function Gallery({ images }: { images: ImageProps[] }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string>("");
  const [downloadImage, setDownloadImage] = useState<string>("");
  const [imageIndex, setImageIndex] = useState(0); // add this state to keep track of the current image index

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

  useEffect(() => {
    // update the modalImage state based on the current imageIndex state
    const image = images[imageIndex];
    const fullUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_1280/${image.public_id}`;
    const fullImage = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${image.public_id}`;
    setDownloadImage(fullImage);
    setModalImage(fullUrl);
  }, [imageIndex, images]);

  return (
    <div>
      {modalOpen && images.length > 0 && (
        <div className="fixed z-[99] top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center text-white">
          <button className="ml-4 text-2xl" onClick={handleArrowLeft}>
            <FiArrowLeft />
          </button>
          <div className="mx-auto my-auto max-w-full">
            <div className="absolute flex items-center gap-2 p-4 text-white">
              <button
                className="bg-black bg-opacity-50 rounded-full p-2 text-white"
                onClick={closeModal}
              >
                <FiX className="w-9 h-9" />
              </button>
              <a href={downloadImage}>
                <button className="bg-black bg-opacity-50 rounded-full p-2 text-white">
                  <FiDownload className="w-9 h-9" />
                </button>
              </a>
            </div>
            <Image
              src={modalImage}
              width={1000}
              height={1000}
              quality={100}
              alt="test"
              className="rounded-lg"
            />
          </div>
          <button className="mr-4 text-2xl" onClick={handleArrowRight}>
            <FiArrowRight />
          </button>
        </div>
      )}

      <div className="mx-auto max-w-[1960px] p-4">
        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
          {images.map(({ id, public_id, format }) => (
            <button key={public_id} onClick={() => openModal(public_id)}>
              <Image
                alt="temp"
                className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
                width={720}
                height={480}
                sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const results = await cloudinary.v2.search
    .expression(`folder:blog/*`)
    .sort_by("public_id", "desc")
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
    });
    i++;
  }

  return {
    props: {
      images: reducedResults,
    },
  };
}
