"use client";

import Link from "next/link";
import { ArrowDownIcon } from "@radix-ui/react-icons";

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
        className="font-mono uppercase text-sm font-semibold px-2 py-1 bg-neutral-900 hover:bg-neutral-800 transition-all duration-200 border-2 w-full"
      >
        Scroll Down <ArrowDownIcon className="inline-block w-4 h-4" />
      </Link>
    </div>
  );
};

export default SmoothScrollLink;
