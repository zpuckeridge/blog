"use client";

import { useState } from "react";

export default function Call() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const slides = [
    {
      location: "1",
      text: "For all have sinned and fall short of the glory of God.",
      verse: "Romans 3:23",
    },
    {
      location: "2",
      text: "For the wages of sin is death, but the free gift of God is eternal life in Christ Jesus our Lord!",
      verse: "Romans 6:23",
    },
    {
      location: "3",
      text: "God shows his love for us in that while we were still sinners, Christ died for us!",
      verse: "Romans 5:8",
    },
    {
      location: "4",
      text: "If you confess with your mouth that Jesus is Lord and believe in your heart that God raised him from the dead, you will be saved!",
      verse: "Romans 10:9",
    },
    {
      location: "5",
      text: "For everyone who calls on the name of the Lord will be saved.",
      verse: "Romans 10:13",
    },
    {
      location: "6",
      text: "Therefore, since we have been justified by faith, we have peace with God through our Lord Jesus Christ.",
      verse: "Romans 5:1",
    },
    {
      location: "7",
      text: "There is therefore now no condemnation for those who are in Christ Jesus!",
      verse: "Romans 8:1",
    },
  ];

  const nextSlide = () => {
    setActiveSlideIndex((activeSlideIndex + 1) % slides.length);
  };

  return (
    <div className="relative h-full w-full p-4">
      {slides.map((slide, index) => (
        <div
          key={index}
          onClick={nextSlide}
          className={`w-full h-full select-none text-black dark:text-white flex items-center justify-center rounded-lg ${
            activeSlideIndex === index ? "" : "hidden"
          }`}
        >
          {slide.text}
          <p className="absolute top-0 left-0 text-sm">{slide.location}</p>
          <p className="absolute bottom-0 left-0 text-sm">ESV</p>
          <p className="absolute bottom-0 right-0 text-sm">{slide.verse}</p>
        </div>
      ))}
    </div>
  );
}
