"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { useCallback, useEffect, useRef, useState } from "react";

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

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const currentSlide = slides[currentSlideIndex];

  const [timeLeft, setTimeLeft] = useState(5); // 5 seconds
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  const radius = 90;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (timeLeft / 5) * circumference;

  const animate = useCallback((time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          return 5; // Reset to 5 when it reaches 0
        }
        return Math.max(0, prevTime - deltaTime / 1000);
      });
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [animate]);

  const goToPreviousSlide = () => {
    setCurrentSlideIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length,
    );
  };

  const goToNextSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  return (
    <div className="w-full">
      <div className="my-auto flex place-items-center">
        <div className="flex flex-col gap-2 text-sm w-full">
          <BlurFade key={currentSlideIndex} delay={0.25} inView>
            <div className="h-[4rem] flex items-center">
              <p className="text-sm leading-relaxed">{currentSlide.text}</p>
            </div>
          </BlurFade>
          <div className="flex justify-between gap-2">
            <div className="flex gap-2">
              <p className="text-xs text-muted-foreground">
                {currentSlide.reference} — {currentSlide.index} /{" "}
                {slides.length}
              </p>

              <svg
                width="14"
                height="14"
                viewBox="0 0 200 200"
                className="my-auto"
              >
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="none"
                  stroke="#e2e8f0"
                  className="dark:stroke-[#a3a3a3]"
                  strokeWidth="20"
                />
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="none"
                  stroke="#65a8ec"
                  className="dark:stroke-[#245fe0]"
                  strokeWidth="20"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  transform="rotate(-90 100 100)"
                  style={{ transition: "stroke-dashoffset 0.1s linear" }}
                />
              </svg>
            </div>

            <div className="flex my-auto gap-4">
              <button
                onClick={goToPreviousSlide}
                className="hover:text-blue-400 dark:hover:text-blue-600 transition text-muted-foreground" // Added padding for larger touch target
                aria-label="Previous slide"
              >
                <ArrowLeftIcon className="w-4 h-4" />
              </button>
              <button
                onClick={goToNextSlide}
                className="hover:text-blue-400 dark:hover:text-blue-600 transition text-muted-foreground" // Added padding for larger touch target
                aria-label="Next slide"
              >
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// TODO:
// Need to make sure that the timer is reset when the user clicks on the previous or next button.
