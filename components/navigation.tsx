"use client";

import { usePathname } from "next/navigation";
import { ModeToggle } from "./mode-toggle";
import Back from "./back";
import { Button } from "./ui/button";
import Link from "next/link";

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
    <div className="sticky py-4 top-0 z-50 w-full bg-opacity-75 backdrop-blur-lg">
      <div className="flex justify-between container">
        <div>
          {isHomePage ? (
            <div>
              <div className="flex sm:hidden">
                <Link href="/">
                  <Button variant="ghost">Home</Button>
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
            <Back />
          )}
        </div>
        <div className="flex gap-2">
          <Link href="/about">
            <Button variant="ghost">About</Button>
          </Link>
          <Link href="/uses">
            <Button variant="ghost">Uses</Button>
          </Link>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
