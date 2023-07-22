"use client";

import { MousePointerClick } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export default function Call() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const slides = [
    {
      location: "1 / 7",
      text: "For all have sinned and fall short of the glory of God.",
      verse: "Romans 3:23",
    },
    {
      location: "2 / 7",
      text: "For the wages of sin is death, but the free gift of God is eternal life in Christ Jesus our Lord!",
      verse: "Romans 6:23",
    },
    {
      location: "3 / 7",
      text: "God shows his love for us in that while we were still sinners, Christ died for us!",
      verse: "Romans 5:8",
    },
    {
      location: "4 / 7",
      text: "If you confess with your mouth that Jesus is Lord and believe in your heart that God raised him from the dead, you will be saved!",
      verse: "Romans 10:9",
    },
    {
      location: "5 / 7",
      text: "For everyone who calls on the name of the Lord will be saved.",
      verse: "Romans 10:13",
    },
    {
      location: "6 / 7",
      text: "Therefore, since we have been justified by faith, we have peace with God through our Lord Jesus Christ.",
      verse: "Romans 5:1",
    },
    {
      location: "7 / 7",
      text: "There is therefore now no condemnation for those who are in Christ Jesus!",
      verse: "Romans 8:1",
    },
  ];

  const nextSlide = () => {
    setActiveSlideIndex((activeSlideIndex + 1) % slides.length);
  };

  return (
    <Button variant="ghost" className="relative h-48 w-full border p-4">
      {slides.map((slide, index) => (
        <div
          key={index}
          onClick={nextSlide}
          className={`w-full h-full flex items-center justify-center ${
            activeSlideIndex === index ? "" : "hidden"
          }`}
        >
          <p className="mx-12 select-none">{slide.text}</p>
          <p className="absolute top-4 left-4 text-sm select-none">
            {slide.location}
          </p>
          <p className="absolute bottom-4 left-4 text-sm select-none">ESV</p>
          <p className="absolute bottom-4 right-4 text-sm select-none">
            {slide.verse}
          </p>
          <p className="absolute top-4 right-4 text-sm select-none">
            <MousePointerClick className="w-4 h-4" />
          </p>
        </div>
      ))}
    </Button>
  );
}
