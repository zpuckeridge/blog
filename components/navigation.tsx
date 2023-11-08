"use client";

import { usePathname } from "next/navigation";
import { ModeToggle } from "./mode-toggle";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import { MoveLeftIcon } from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isEditPage = pathname.includes("/dashboard/edit");
  const isArticlePage = pathname.includes("/article/");

  // Return null if it's an edit page to hide the navigation
  if (isEditPage || isArticlePage) {
    return null;
  }

  return (
    <div className="sticky py-4 px-4 top-4 z-50 max-w-4xl mx-auto rounded-lg bg-opacity-75 backdrop-blur-lg font-mono border">
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
              <MoveLeftIcon /> Back
            </Link>
          )}
        </div>
        <div className="flex gap-2">
          <Link
            href="/about"
            className={buttonVariants({ variant: "ghost" })}
            aria-label="About Page"
          >
            About
          </Link>
          <Link
            href="/gallery"
            className={buttonVariants({ variant: "ghost" })}
            aria-label="Gallery Page"
          >
            Gallery
          </Link>
          <Link
            href="/uses"
            className={buttonVariants({ variant: "ghost" })}
            aria-label="Uses Page"
          >
            Uses
          </Link>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
