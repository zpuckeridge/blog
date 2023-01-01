import { useEffect, useState } from "react";
import Image from "next/image";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { NextSeo } from "next-seo";

export default function Gallery({
  images,
}: {
  images: {
    id: string;
    filename: string;
    uploaded: string;
    requireSignedURLs: boolean;
    variants: string[];
  }[];
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string>("");
  const [imageIndex, setImageIndex] = useState(0); // add this state to keep track of the current image index

  const openModal = (image: string) => {
    const imageIndex = images.findIndex((img) => img.variants[0] === image);
    setModalImage(image);
    setModalOpen(true);
    setImageIndex(imageIndex);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // add this function to handle arrow left clicks
  const handleArrowLeft = () => {
    // decrement the image index, wrapping around to the end of the images array if necessary
    setImageIndex((imageIndex + images.length - 1) % images.length);
  };

  // add this function to handle arrow right clicks
  const handleArrowRight = () => {
    // increment the image index, wrapping around to the start of the images array if necessary
    setImageIndex((imageIndex + 1) % images.length);
  };

  function replaceBlur(url: string) {
    if (url.endsWith("/blur")) {
      return url.replace("/blur", "/public");
    }
    return url;
  }

  function replacePublic(url: string) {
    if (url.endsWith("/public")) {
      return url.replace("/public", "/blur");
    }
    return url;
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
          {images.map((image) => (
            <Image
              key={image.id}
              src={replaceBlur(image.variants[0])}
              placeholder="blur"
              blurDataURL={replacePublic(image.variants[0])}
              width={250}
              height={250}
              quality={50}
              alt={"test"}
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
