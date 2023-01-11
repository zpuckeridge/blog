import { NextSeo } from "next-seo";
import Image from "next/image";
import { useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type ImageType = {
  id: string;
  filename: string;
  uploaded: string;
  variants: string[];
};

export default function Gallery({ images }: { images: ImageType[] | null }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string>("");
  const [imageIndex, setImageIndex] = useState(0); // add this state to keep track of the current image index

  // if no images, return null
  if (!images) {
    return null;
  }

  const openModal = (image: string) => {
    const imageIndex = images.findIndex((img) => img.variants[0] === image);
    setModalImage(image);
    setModalOpen(true);
    setImageIndex(imageIndex);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // handle arrow left clicks
  const handleArrowLeft = () => {
    // decrement the image index, wrapping around to the end of the images array if necessary
    setImageIndex((imageIndex + images.length - 1) % images.length);
  };

  // handle arrow right clicks
  const handleArrowRight = () => {
    // increment the image index, wrapping around to the start of the images array if necessary
    setImageIndex((imageIndex + 1) % images.length);
  };

  return (
    <div className="mt-20 mb-20">
      {modalOpen && (
        <div className="fixed z-40 top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center">
          <button className="ml-4 text-2xl" onClick={handleArrowLeft}>
            <FiArrowLeft />
          </button>
          <div className="mx-auto my-auto max-w-full">
            <p
              className="italic text-center mb-2 text-sm cursor-pointer"
              onClick={closeModal}
            >
              Click here to exit
            </p>
            <Image
              src={images[imageIndex].variants[0]}
              width={1000}
              height={1000}
              quality={100}
              alt={images[imageIndex].filename}
              className="rounded-lg"
            />
            <div className="flex justify-between">
              <p className="mt-2">{images[imageIndex].filename}</p>
              <p className="mt-2">{images[imageIndex].uploaded}</p>
            </div>
          </div>
          <button className="mr-4 text-2xl" onClick={handleArrowRight}>
            <FiArrowRight />
          </button>
        </div>
      )}

      <div className="mx-auto">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {images.map((image) => (
            <button key={image.id} onClick={() => openModal(image.variants[0])}>
              <BlurImage image={image} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function BlurImage({ image }: { image: ImageType }) {
  const [isLoading, setLoading] = useState(true);

  // convert image.uploaded to readable date
  const date = new Date(image.uploaded);
  const readableDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <NextSeo
        title="Gallery | Zacchary Puckeridge"
        description="Zacchary's Gallery"
      />
      <div className="mr-2 ml-2 mb-4 transform hover:scale-[1.05] transition-all bg-white dark:bg-white/5 border border-zinc-800/50 rounded-lg flex flex-col overflow-hidden hover:ring-2 ring-gray-300">
        <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
          <Image
            alt={image.filename}
            src={image.variants[0]}
            height={1000}
            width={1000}
            className={cn(
              "group-hover:opacity-75 duration-700 ease-in-out",
              isLoading
                ? "grayscale blur-2xl scale-110"
                : "grayscale-0 blur-0 scale-100"
            )}
            onLoadingComplete={() => setLoading(false)}
          />
        </div>
        <div className="flex justify-between p-4">
          <p className="mt-1 text-sm">{image.filename}</p>
          <p className="mt-1 text-sm">{image.uploaded}</p>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  // Make a request to the API for images
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ID}/images/v1`,
    {
      method: "GET",
      headers: {
        "X-Auth-Key": `${process.env.CLOUDFLARE_TOKEN}`,
        "X-Auth-Email": `${process.env.CLOUDFLARE_EMAIL}`,
        "Content-Type": "application/json",
      },
    }
  );

  // Parse the response as JSON and extract the images array
  const {
    result: { images },
  } = await response.json();

  // Convert date to readable date
  images.forEach((image: ImageType) => {
    const date = new Date(image.uploaded);
    image.uploaded = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  // Remove .ext from filename
  images.forEach((image: ImageType) => {
    image.filename = image.filename.split(".")[0];
  });

  // Return the full image objects
  return {
    props: {
      images,
    },
  };
}
