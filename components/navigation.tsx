"use client";

import { buttonVariants } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CameraIcon,
  FileTextIcon,
  HamburgerMenuIcon,
  HomeIcon,
  PaperPlaneIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="fixed top-0 md:top-2 py-1 px-2 w-full max-w-7xl md:rounded-full z-40 bg-black/50 backdrop-blur-3xl flex justify-between">
        <div className="flex gap-2 justify-between w-full px-4">
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
                      className="h-8 w-8 rounded-full my-auto aspect-square"
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

          <div className="hidden md:flex gap-2">
            <div className="rounded-full bg-green-500/10 border text-xs text-white font-semibold px-2 my-auto py-0.5 border-green-500 flex gap-2">
              <div className="h-3 w-3 rounded-full animate-pulse bg-green-500/50 relative my-auto flex justify-center items-center">
                <div className="h-1.5 w-1.5 rounded-full animate-pulse bg-green-500" />
              </div>

              <div className="my-auto">I&apos;m available for work</div>
            </div>
            <Link
              className={`link text-muted-foreground my-auto text-sm hover:text-white transition-all duration-200 ${
                pathname === "/hire-me"
                  ? "text-white underline underline-offset-4"
                  : ""
              }`}
              href="/hire-me"
            >
              Hire Me
            </Link>
          </div>
        </div>

        <div className="flex md:hidden">
          <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger className="md:hidden flex">
              <HamburgerMenuIcon className="w-5 h-5 my-auto" />
            </DrawerTrigger>
            <DrawerContent className="space-y-2 px-8 my-10">
              <Link
                onClick={() => setIsOpen(false)}
                href="/"
                className={`flex gap-2 ${buttonVariants({
                  variant: "outline",
                  size: "lg",
                })}`}
              >
                <HomeIcon className="w-5 h-5" /> Home
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                href="/blog"
                className={`flex gap-2 ${buttonVariants({
                  variant: "outline",
                  size: "lg",
                })}`}
              >
                <FileTextIcon className="w-5 h-5" /> Blog
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                href="/gallery"
                className={`flex gap-2 ${buttonVariants({
                  variant: "outline",
                  size: "lg",
                })}`}
              >
                <CameraIcon className="w-5 h-5" /> Gallery <br />
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                href="/hire-me"
                className={`flex gap-2 ${buttonVariants({
                  variant: "outline",
                  size: "lg",
                })}`}
              >
                <PaperPlaneIcon className="w-5 h-5" /> Hire Me{" "}
              </Link>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
}
