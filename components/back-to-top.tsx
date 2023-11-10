"use client";

import { ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "./ui/button";
import React, { useState, useEffect } from "react";

export default function BackToTop() {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      setIsAtTop(scrollTop === 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTopOrBottom = () => {
    if (isAtTop) {
      // Scroll to the bottom
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    } else {
      // Scroll to the top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Button
      onClick={scrollToTopOrBottom}
      variant="secondary"
      size="sm"
      className="hidden lg:flex fixed bottom-12 right-12"
    >
      {isAtTop ? <ArrowDown size={20} /> : <ArrowUp size={20} />}
    </Button>
  );
}
