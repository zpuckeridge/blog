"use client";

import { ChevronUpIcon } from "@radix-ui/react-icons";
import { useState, useEffect } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const atTop = window.scrollY === 0;
      const shouldShow = window.scrollY > 300 || atTop;
      setIsVisible(shouldShow);
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`transition-opacity duration-200 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed z-40 bottom-8 right-8 bg-neutral-900 border-2 aspect-square h-10 w-10 text-white rounded-full flex place-items-center justify-center"
        >
          <ChevronUpIcon />
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
