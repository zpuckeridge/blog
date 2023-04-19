"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/Navbar/ThemeToggle";

export default function Navigation() {
  const pathname = usePathname();

  if (pathname.includes("/article")) {
    return (
      <div className="flex justify-between">
        <Link
          href="/blog"
          className="flex text-[#888888] hover:text-black dark:hover:text-white transition duration-100 my-auto"
        >
          <ArrowLeft size={18} className="mr-1 my-auto" />
          Blog
        </Link>
        <ThemeToggle />
      </div>
    );
  }

  if (pathname === "/") {
    return (
      <div className="flex justify-between">
        <div className="flex text-[#888888] my-auto" />
        <ThemeToggle />
      </div>
    );
  }

  return (
    <div className="flex justify-between">
      <Link
        href="/"
        className="flex text-[#888888] hover:text-black dark:hover:text-white transition duration-100 my-auto"
      >
        <ArrowLeft size={18} className="mr-1 my-auto" />
        Home
      </Link>
      <ThemeToggle />
    </div>
  );
}
