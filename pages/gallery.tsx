import { useEffect, useState } from "react";
import Image from "next/image";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { NextSeo } from "next-seo";

export default function Gallery({ images }: any) {
  const [modalOpen, setModalOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const openModal = (image: any) => {
    setModalOpen(true);
    setImageIndex(
      images.findIndex((img: { variants: any[] }) => img.variants[0] === image)
    );
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleArrowLeft = () => {
    setImageIndex((imageIndex + images.length - 1) % images.length);
  };

  const handleArrowRight = () => {
    setImageIndex((imageIndex + 1) % images.length);
  };

  function replaceBlur(url: string) {
    return url.endsWith("/blur") ? url.replace("/blur", "/public") : url;
  }

  function replacePublic(url: string) {
    return url.endsWith("/public") ? url.replace("/public", "/blur") : url;
  }

  return (
    <>
      <NextSeo
        title="Gallery | Zacchary Puckeridge"
        description="View some of my favourite photos!"
      />
      <div className="mt-20 mb-10">
        {modalOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center">
            <button
              className="text-white ml-4 text-2xl"
              onClick={handleArrowLeft}
            >
              <FiArrowLeft />
            </button>
            <div className="mx-auto my-auto max-w-full">
              <p
                className="italic text-center mb-2 text-gray-400 text-sm cursor-pointer"
                onClick={closeModal}
              >
                Click here to exit
              </p>
              <Image
                src={replaceBlur(images[imageIndex].variants[0])}
                placeholder="blur"
                blurDataURL={replacePublic(images[imageIndex].variants[0])}
                width={1000}
                height={1000}
                quality={100}
                alt={images[imageIndex].filename}
                className="rounded-lg w-auto h-auto"
              />
              <div className="flex justify-between">
                <p className="mt-2 text-gray-400">
                  {images[imageIndex].filename}
                </p>
                <p className="mt-2 text-gray-400">
                  {images[imageIndex].uploaded}
                </p>
              </div>
            </div>
            <button
              className="text-white mr-4 text-2xl"
              onClick={handleArrowRight}
            >
              <FiArrowRight />
            </button>
          </div>
        )}

        <div className="columns-1 md:columns-2 lg:columns-3 gap-2 space-y-2 cursor-pointer">
          {images.map((image: { variants: any[]; filename: string }) => (
            <Image
              key={image.variants[0]}
              src={replaceBlur(image.variants[0])}
              placeholder="blur"
              blurDataURL={replacePublic(image.variants[0])}
              width={300}
              height={300}
              quality={100}
              alt={image.filename}
              className="rounded-lg w-auto h-auto"
              onClick={() => openModal(image.variants[0])}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  // Make a request to the API for images
  const response = await fetch(`${process.env.GALLERY_URL}/api/gallery`);
  // Parse the response as JSON and extract the images array
  const {
    result: { images },
  } = await response.json();

  // Return the full image objects
  return {
    props: {
      images,
    },
  };
}
