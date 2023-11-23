"use client";

import { usePathname } from "next/navigation";
import { ModeToggle } from "./mode-toggle";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import {
  CameraIcon,
  ImageIcon,
  MoveLeftIcon,
  PocketKnife,
  UserIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isEditPage = pathname.includes("/dashboard/edit");
  const isArticlePage = pathname.includes("/article/");
  const [hasShadow, setHasShadow] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setHasShadow(true);
    } else {
      setHasShadow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Return null if it's an edit page to hide the navigation
  if (isEditPage || isArticlePage) {
    return null;
  }

  return (
    <div
      className={`sticky py-4 px-4 top-4 z-50 max-w-4xl mx-auto rounded-lg bg-opacity-75 backdrop-blur-lg font-mono border ${
        hasShadow
          ? "shadow-2xl backdrop-blur-lg bg-muted/50 transition-all duration-300"
          : "shadow-none bg-none transition-all duration-300"
      }`}
    >
      <div className="flex justify-between">
        <div>
          {isHomePage ? (
            <div>
              <div className="flex sm:hidden">
                <Link
                  href="/"
                  className={buttonVariants({ variant: "ghost" })}
                  aria-label="Home Page"
                >
                  Home
                </Link>
              </div>
              <div className="hidden sm:flex">
                <div>
                  <p>zpuckeridge</p>
                  <p className="text-xs">
                    Zacchary /ˈzækəri/ - ˈthe Lord has rememberedˈ
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <Link
              href="/"
              className={`flex gap-2 ${buttonVariants({
                variant: "ghost",
              })}`}
            >
              <MoveLeftIcon className="w-4 h-4" /> Back
            </Link>
          )}
        </div>
        <div className="flex gap-2">
          <Link
            href="/about"
            className={`flex gap-2 ${buttonVariants({
              variant: "ghost",
            })}`}
            aria-label="About Page"
          >
            <UserIcon className="w-4 h-4" />
            <span className="hidden sm:inline">About</span>
          </Link>
          <Link
            href="/gallery"
            className={`flex gap-2 ${buttonVariants({
              variant: "ghost",
            })}`}
            aria-label="Gallery Page"
          >
            <ImageIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Gallery</span>
          </Link>
          <Link
            href="/uses"
            className={`flex gap-2 ${buttonVariants({
              variant: "ghost",
            })}`}
            aria-label="Uses Page"
          >
            <PocketKnife className="w-4 h-4" />
            <span className="hidden sm:inline">Uses</span>
          </Link>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
