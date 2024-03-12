"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  BookmarkIcon,
  CameraIcon,
  FileTextIcon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-0 py-1 border-b-2 w-full z-40 bg-background/75 backdrop-blur-lg">
      <div className="flex gap-2 justify-between px-4 max-w-7xl mx-auto">
        <div className="my-auto flex gap-6">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Link href="/" className="flex gap-2">
                  <Image
                    src="/avatar.jpg"
                    width={500}
                    height={500}
                    alt="Zacchary Puckeridge"
                    priority
                    className="h-10 w-10 rounded-lg border-2 border-muted my-auto aspect-square"
                  />
                  <p className="my-auto font-semibold hover:text-muted-foreground transition-all duration-200">
                    Zacchary Puckeridge
                  </p>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-mono uppercase font-semibold">
                  Christ is Lord
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="hidden md:flex gap-6 ">
            <Link
              className={`link text-muted-foreground my-auto text-sm hover:text-white transition-all duration-200 ${
                pathname.startsWith("/blog")
                  ? "text-white underline underline-offset-4"
                  : ""
              }`}
              href="/blog"
            >
              Blog
            </Link>
            <Link
              className={`link text-muted-foreground my-auto text-sm hover:text-white transition-all duration-200 ${
                pathname === "/gallery"
                  ? "text-white underline underline-offset-4"
                  : ""
              }`}
              href="/gallery"
            >
              Gallery
            </Link>
          </div>
        </div>

        <Link
          className={`link text-muted-foreground my-auto text-sm hover:text-white transition-all duration-200 hidden md:flex ${
            pathname === "/hire-me"
              ? "text-white underline underline-offset-4"
              : ""
          }`}
          href="/hire-me"
        >
          Hire Me
        </Link>

        <div className="flex md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger>
              <HamburgerMenuIcon className="w-10 h-10 p-1 border-2 rounded-lg" />
            </SheetTrigger>
            <SheetContent className="w-full">
              <div className="flex flex-col gap-2 py-10">
                <Link
                  onClick={() => setIsOpen(false)}
                  href="/blog"
                  className="font-mono uppercase text-sm font-semibold my-auto bg-neutral-900 hover:bg-neutral-800 transition-all duration-200 border-2 px-2 py-3 w-full"
                >
                  <FileTextIcon className="inline-block w-4 h-4" /> Blog
                </Link>
                <Link
                  onClick={() => setIsOpen(false)}
                  href="/gallery"
                  className="font-mono uppercase text-sm font-semibold my-auto bg-neutral-900 hover:bg-neutral-800 transition-all duration-200 border-2 px-2 py-3 w-full"
                >
                  <CameraIcon className="inline-block w-4 h-4" /> Gallery
                </Link>
                <Link
                  onClick={() => setIsOpen(false)}
                  href="/hire-me"
                  className="font-mono uppercase text-sm font-semibold my-auto bg-neutral-900 hover:bg-neutral-800 transition-all duration-200 border-2 px-2 py-3 w-full"
                >
                  <BookmarkIcon className="inline-block w-4 h-4" /> Hire Me
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
