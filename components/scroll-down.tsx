"use client";

import { ArrowDownIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const SmoothScrollLink = () => {
  const handleClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const aboutSection = document.getElementById("about");
    aboutSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="hidden sm:flex absolute bottom-8 right-0">
      <Link
        href="/#about"
        onClick={handleClick}
        className="font-mono uppercase text-sm font-semibold px-2 py-1 bg-neutral-900 hover:bg-neutral-800 transition-all duration-200 border-2 w-full relative"
      >
        Scroll Down <ArrowDownIcon className="inline-block w-4 h-4" />
        <div className="h-2 w-2 rounded-full bg-white animate-ping absolute -top-1 -right-1"></div>
      </Link>
    </div>
  );
};

export default SmoothScrollLink;
