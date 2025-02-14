"use client";

import { StarFilledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function BooksSection({
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
}: {
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
}) {
  const mediaData = [
    {
      id: 1,
      title: "It's Good To Be A Man",
      image: "/recommended-books/it's-good-to-be-a-man.avif",
      review: "",
      rating: 5,
      url: "https://canonpress.com/products/its-good-to-be-a-man?_pos=1&_sid=e60b13112&_ss=r",
    },
    {
      id: 2,
      title: "Future Men",
      image: "/recommended-books/future-men.avif",
      review: "",
      rating: 5,
      url: "https://canonpress.com/products/future-men-raising-boys-to-fight-giants?_pos=1&_sid=6196922ef&_ss=r",
    },
    {
      id: 3,
      title: "Fight by Flight",
      image: "/recommended-books/fight-by-flight.avif",
      review: "",
      rating: 5,
      url: "https://www.amazon.com.au/Fight-Flight-Leaving-Godless-Places/dp/B0C2SCMRBZ/ref=sr_1_1?crid=25W1Z733200ZK&keywords=fight+by+flight&qid=1702275370&sprefix=fight+by+fli%2Caps%2C342&sr=8-1",
    },
    {
      id: 4,
      title: "Mere Christianity",
      image: "/recommended-books/mere-christianity.avif",
      review: "",
      rating: 5,
      url: "https://www.amazon.com.au/Mere-Christianity-C-S-Lewis/dp/0007461216",
    },
    {
      id: 5,
      title: "Confessions of a Food Catholic",
      image: "/recommended-books/confessions-of-a-food-catholic.avif",
      review: "",
      rating: 5,
      url: "https://canonpress.com/products/confessions-of-a-food-catholic",
    },
    {
      id: 6,
      title: "The Screwtape Letters",
      image: "/recommended-books/the-screwtape-letters.avif",
      review: "",
      rating: 5,
      url: "https://www.amazon.com.au/Screwtape-Letters-Senior-Junior-Devil-ebook/dp/B002RI9F5E",
    },
    {
      id: 7,
      title: "Mere Christendom",
      image: "/recommended-books/mere-christendom.avif",
      review:
        "The Haddon Institute is phase one of a much loftier project to create a seminary. This website lays the ground work for the future of the seminary.",
      rating: 5,
      url: "https://canonpress.com/products/mere-christendom",
    },
    {
      id: 8,
      title: "The Case for Christian Nationalism",
      image: "/recommended-books/the-case-for-christian-nationalism.avif",
      review: "",
      rating: 5,
      url: "https://canonpress.com/products/the-case-for-christian-nationalism",
    },
    {
      id: 9,
      title: "Christian Nationalism",
      image: "/recommended-books/christian-nationalism.avif",
      review:
        "The Haddon Institute is phase one of a much loftier project to create a seminary. This website lays the ground work for the future of the seminary.",
      rating: 5,
      url: "https://www.amazon.com.au/Christian-Nationalism-Biblical-Dominion-Discipling/dp/B0BCRZSHM3",
    },
    {
      id: 10,
      title: "The Chronicles of Narnia",
      image: "/recommended-books/the-chronicles-of-narnia.avif",
      review: "",
      rating: 5,
      url: "https://www.amazon.com.au/Chronicles-Narnia-box-set/dp/0007528094",
    },
    {
      id: 11,
      title: "Live Like a Narnian",
      image: "/recommended-books/live-like-a-narnian.avif",
      review: "",
      rating: 5,
      url: "https://canonpress.com/products/live-like-a-narnian",
    },
    {
      id: 12,
      title: "What I Learned in Narnia",
      image: "/recommended-books/what-i-learned-in-narnia.avif",
      review: "",
      rating: 5,
      url: "https://canonpress.com/products/what-i-learned-in-narnia",
    },
    {
      id: 13,
      title: "How to Read a Book: Advice for Christian Readers",
      image: "/recommended-books/how-to-read-a-book.avif",
      review: "",
      rating: 5,
      url: "https://canonpress.com/products/how-to-read-a-book",
    },
  ];

  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  const [start, setStart] = useState(false);

  useEffect(() => {
    function addAnimation() {
      if (containerRef.current && scrollerRef.current && !start) {
        const scrollerContent = Array.from(scrollerRef.current.children);

        // Check if items are not duplicated already
        if (scrollerContent.length === mediaData.length) {
          scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true);
            if (scrollerRef.current) {
              scrollerRef.current.appendChild(duplicatedItem);
            }
          });

          const getDirection = () => {
            if (containerRef.current) {
              if (direction === "left") {
                containerRef.current.style.setProperty(
                  "--animation-direction",
                  "forwards",
                );
              } else {
                containerRef.current.style.setProperty(
                  "--animation-direction",
                  "reverse",
                );
              }
            }
          };

          const getSpeed = () => {
            if (containerRef.current) {
              if (speed === "fast") {
                containerRef.current.style.setProperty(
                  "--animation-duration",
                  "20s",
                );
              } else {
                containerRef.current.style.setProperty(
                  "--animation-duration",
                  "80s",
                );
              }
            }
          };

          getDirection();
          getSpeed();
          setStart(true);
        }
      }
    }

    addAnimation();
  }, [direction, mediaData.length, speed, start]);

  return (
    <div
      ref={containerRef}
      className={twMerge(
        "scroller relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
      )}
    >
      <ul
        ref={scrollerRef}
        className={twMerge(
          "flex min-w-full shrink-0 gap-2 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {mediaData.map((media) => (
          <a
            href={media.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group overflow-hidden rounded-xl"
            key={media.id}
          >
            <div>
              <Image
                src={media.image}
                width={205}
                height={320}
                priority
                quality={100}
                alt={media.title}
                className="object-cover w-auto h-64 aspect-auto group-hover:blur-xs rounded-xl transition-all"
              />
            </div>

            <div className="absolute inset-0 bg-black text-white bg-black/0 group-hover:bg-black/50 opacity-0 group-hover:opacity-100 rounded-xl transition-all">
              <div className="absolute z-10 bottom-4 left-4 right-4">
                <div className="flex items-end gap-1">
                  {[...Array(media.rating)].map((_, index) => (
                    <StarFilledIcon className="w-3 h-3" key={index} />
                  ))}
                </div>
              </div>
            </div>
          </a>
        ))}
      </ul>
    </div>
  );
}
