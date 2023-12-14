"use client";

import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import Tilt from "react-parallax-tilt";

export default function BooksSection({
  direction = "left",
  speed = "slow",
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
      image: "/media/it's-good-to-be-a-man.webp",
      review:
        "This book opened my eyes to how far we, as men, have failed by falling into the lie of egalitarianism and feminism. It expoesd parts of my heart that had yet to be dealt with or even considered and laid out a Biblical framework for a return to a right and sanctified masculinity.",
      rating: 5,
      url: "https://canonpress.com/products/its-good-to-be-a-man?_pos=1&_sid=e60b13112&_ss=r",
    },
    {
      id: 2,
      title: "Future Men",
      image: "/media/future-men.jpg",
      review:
        "This book preceeds It's Good To Be A Man and is more directed at parents raising young men. However, I found great value in this book - not only from a future parenting perspective but also from a personal perspective. It exposed areas that my parents failed and laid out the consequences of those failures, which lined up perfectly with my experience. This book has helped me understand why I am the way I am and how to begin changing that.",
      rating: 5,
      url: "https://canonpress.com/products/future-men-raising-boys-to-fight-giants?_pos=1&_sid=6196922ef&_ss=r",
    },
    {
      id: 3,
      title: "Fight by Flight",
      image: "/media/fight-by-flight.jpg",
      review:
        "This book couldn't have come at a more perfect time. At the time of reading, I was weighing up my options between moving to rural Queensland or staying in Brisbane. There were a few reasons I was considering the change, the main factor being employment and the cost of living. This book helped me to make the decision to remain in Brisbane and to continue building God's kingdom where I was.",
      rating: 5,
      url: "https://www.amazon.com.au/Fight-Flight-Leaving-Godless-Places/dp/B0C2SCMRBZ/ref=sr_1_1?crid=25W1Z733200ZK&keywords=fight+by+flight&qid=1702275370&sprefix=fight+by+fli%2Caps%2C342&sr=8-1",
    },
    {
      id: 4,
      title: "Mere Christianity",
      image: "/media/mere-christianity.jpg",
      review:
        "The Haddon Institute is phase one of a much loftier project to create a seminary. This website lays the ground work for the future of the seminary.",
      rating: 5,
      url: "https://www.amazon.com.au/Mere-Christianity-C-S-Lewis/dp/0007461216/ref=sr_1_3?crid=37WN5RAOH0A00&keywords=mere+christianity+c.s.+lewis&qid=1702259670&sprefix=mere+christiant%2Caps%2C389&sr=8-3",
    },
    {
      id: 5,
      title: "Confessions of a Food Catholic",
      image: "/media/confessions-of-a-food-catholic.jpg",
      review:
        "The Haddon Institute is phase one of a much loftier project to create a seminary. This website lays the ground work for the future of the seminary.",
      rating: 5,
      url: "https://canonpress.com/products/confessions-of-a-food-catholic?_pos=1&_sid=e582c7a3f&_ss=r",
    },
    {
      id: 6,
      title: "The Screwtape Letters",
      image: "/media/the-screwtape-letters.jpg",
      review:
        "The Haddon Institute is phase one of a much loftier project to create a seminary. This website lays the ground work for the future of the seminary.",
      rating: 5,
      url: "https://www.amazon.com.au/Screwtape-Letters-Senior-Junior-Devil-ebook/dp/B002RI9F5E/ref=reads_cwrtbar_d_sccl_1_6/358-6367346-9762325?pd_rd_w=RPSnv&content-id=amzn1.sym.c5c1c4a3-451f-4098-854a-da1c70e0a494&pf_rd_p=c5c1c4a3-451f-4098-854a-da1c70e0a494&pf_rd_r=68P4VBHG8FXM2S3RAF34&pd_rd_wg=Uc5c5&pd_rd_r=0f7d4c0d-a67f-48c6-80ea-71ebd647dae8&pd_rd_i=B002RI9F5E&psc=1",
    },
    {
      id: 7,
      title: "Mere Christendom",
      image: "/media/mere-christendom.jpg",
      review:
        "The Haddon Institute is phase one of a much loftier project to create a seminary. This website lays the ground work for the future of the seminary.",
      rating: 5,
      url: "https://canonpress.com/products/mere-christendom?_pos=1&_sid=741f43936&_ss=r",
    },
    {
      id: 8,
      title: "The Case for Christian Nationalism",
      image: "/media/the-case-for-christian-nationalism.webp",
      review:
        "The Haddon Institute is phase one of a much loftier project to create a seminary. This website lays the ground work for the future of the seminary.",
      rating: 5,
      url: "https://canonpress.com/products/the-case-for-christian-nationalism?_pos=1&_sid=4d4a1370a&_ss=r",
    },
    {
      id: 9,
      title: "Christian Nationalism",
      image: "/media/christian-nationalism.jpg",
      review:
        "The Haddon Institute is phase one of a much loftier project to create a seminary. This website lays the ground work for the future of the seminary.",
      rating: 5,
      url: "https://www.amazon.com.au/Christian-Nationalism-Biblical-Dominion-Discipling/dp/B0BCRZSHM3/ref=sr_1_1?crid=1QM4LUIWRL4VQ&keywords=Christian+Nationalism+andrew+torba&qid=1702259524&sprefix=christian+nationalism+andrew+to%2Caps%2C379&sr=8-1",
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
        "scroller relative z-20 group max-w-7xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
      )}
    >
      <ul
        ref={scrollerRef}
        className={twMerge(
          " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
      >
        {mediaData.map((media, idx) => (
          <Tilt
            key={idx}
            glareEnable
            glarePosition="all"
            glareMaxOpacity={0.1}
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
          >
            <a href={media.url} target="_blank">
              <Image
                src={media.image}
                width={200}
                height={200}
                quality={100}
                alt={media.title}
                className="object-cover w-44 h-full rounded-md"
              />
            </a>
          </Tilt>
        ))}
      </ul>
    </div>
  );
}
