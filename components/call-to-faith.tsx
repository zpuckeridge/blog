"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

export default function CallToFaith() {
  const slides = [
    {
      text: "For all have sinned and fall short of the glory of God.",
      reference: "Romans 3:23",
      index: 1,
    },
    {
      text: "For the wages of sin is death, but the free gift of God is eternal life in Christ Jesus our Lord.",
      reference: "Romans 6:23",
      index: 2,
    },
    {
      text: "God shows his love for us in that while we were still sinners, Christ died for us.",
      reference: "Romans 5:8",
      index: 3,
    },
    {
      text: "So, confess with your mouth that Jesus is Lord and believe in your heart that God raised Him from the dead.",
      reference: "Romans 10:9",
      index: 4,
    },
    {
      text: "For everyone who calls on the name of the Lord will be saved.",
      reference: "Romans 10:13",
      index: 5,
    },
    {
      text: "Therefore, since we have been justified by faith alone, we have peace with God through our Lord Jesus Christ.",
      reference: "Romans 5:1",
      index: 6,
    },
    {
      text: "There is therefore now no condemnation for those who are in Christ Jesus!",
      reference: "Romans 8:1",
      index: 7,
    },
  ];

  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));

  return (
    <Carousel
      className="w-full"
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {slides.map((slide) => (
          <CarouselItem key={slide.index}>
            <div className="my-auto h-[15vh] flex place-items-center ">
              <div className="flex flex-col gap-2 text-sm">
                <p>{slide.text}</p>
                <p className="text-xs">
                  {slide.reference} — {slide.index} / 7
                </p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
