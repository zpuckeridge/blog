"use client";

import Age from "@/components/age";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Badge } from "../ui/badge";

export default function NavigationClient({
  posts,
  videos,
}: {
  posts: any;
  videos: any;
}) {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const isActive = (href: string) => (pathname === href ? "text-white" : "");

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <div className="p-4 w-full border-t-2 border-muted z-50 fixed bottom-0 left-0 bg-[#111111] lg:hidden">
        <div className="flex justify-between">
          <p className="text-sm text-muted-foreground">/</p>
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger>
              <p className="text-sm flex gap-1 my-auto">
                Open navigation{" "}
                <HamburgerMenuIcon className="my-auto w-5 h-5" />
              </p>
            </DrawerTrigger>
            <DrawerContent className="px-4 pb-4">
              <div className="flex flex-col pt-4 gap-6 lg:w-1/3 max-w-md lg:max-w-none text-sm text-muted-foreground ">
                <div className="flex flex-col gap-2">
                  <Link
                    href="/work"
                    className={`${isActive("/work")} hover:text-white flex justify-between`}
                    onClick={handleDrawerClose}
                  >
                    <p>Work</p>
                    <p>7 projects</p>
                  </Link>
                  <Link
                    href="/timeline"
                    className={`${isActive("/timeline")} hover:text-white flex justify-between`}
                    onClick={handleDrawerClose}
                  >
                    <p>Timeline</p>
                    <p>{posts.length} entries</p>
                  </Link>
                  <Link
                    href="/about"
                    className={`${isActive("/about")} hover:text-white flex justify-between`}
                    onClick={handleDrawerClose}
                  >
                    <p>About</p>
                    <p>
                      <Age /> years
                    </p>
                  </Link>
                  <Link
                    href="/resources"
                    className={`${isActive("/resources")} hover:text-white flex justify-between`}
                    onClick={handleDrawerClose}
                  >
                    <p>Resources</p>
                    <p>9 entries</p>
                  </Link>
                </div>
                <hr />
                <div className="flex flex-col gap-2">
                  <Link
                    href="/colophon"
                    className={`${isActive("/colophon")} hover:text-white flex justify-between`}
                    onClick={handleDrawerClose}
                  >
                    <p>Colophon</p>
                    <p>5 topics</p>
                  </Link>
                  <Link
                    href="/imprint"
                    className={`${isActive("/imprint")} hover:text-white`}
                    onClick={handleDrawerClose}
                  >
                    Imprint
                  </Link>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>

      <div className="lg:flex flex-col gap-6 lg:w-1/3 max-w-md lg:max-w-none text-sm text-muted-foreground hidden">
        <div className="lg:sticky top-8 space-y-6">
          <div className="flex flex-col gap-2">
            <Link
              href="/work"
              className={`${isActive("/work")} hover:text-white flex justify-between`}
            >
              <p>Work</p>
              <p>7 projects</p>
            </Link>
            <div className="flex flex-col gap-2">
              <Link
                href="/timeline"
                className={`${pathname.includes("/timeline") ? "text-white" : ""} hover:text-white flex justify-between`}
              >
                <p>Timeline</p>
                <p>{posts.length} entries</p>
              </Link>

              {pathname.includes("/timeline") && (
                <div className="ml-4 flex flex-col gap-2  h-40 overflow-y-hidden relative">
                  {posts.map((post: any) => (
                    <Link
                      key={post.slug}
                      href={`/timeline/${post.slug}`}
                      aria-label={post.title}
                      className="hover:text-white"
                    >
                      {post.title}
                    </Link>
                  ))}
                  <div className="pointer-events-none absolute inset-x-0 bottom-10 lg:bottom-0 h-20 z-40 bg-gradient-to-t from-[#111111] dark:from-background" />
                </div>
              )}
            </div>

            <Link
              href="/videos"
              className={`${isActive("/videos")} hover:text-white flex justify-between`}
            >
              <p>Videos</p>
              <p>{videos.length} entries</p>
            </Link>

            <div className="flex flex-col gap-2">
              <Link
                href="/about"
                className={`${pathname.includes("/about") ? "text-white" : ""} hover:text-white flex justify-between`}
              >
                <p>About</p>
                <p>
                  <Age /> years
                </p>
              </Link>

              {pathname.includes("/about") && (
                <div className="ml-4 flex flex-col gap-2 overflow-y-hidden relative">
                  <a
                    href="https://read.cv/zpuckeridge"
                    target="_blank"
                    className="hover:text-white"
                  >
                    Read.cv
                  </a>
                  <a
                    href="https://shop.zacchary.me/"
                    target="_blank"
                    className="hover:text-white"
                  >
                    Shop
                  </a>
                  <a
                    href="https://x.com/zpuckeridge"
                    target="_blank"
                    className="hover:text-white"
                  >
                    X
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=61554733838731"
                    target="_blank"
                    className="hover:text-white"
                  >
                    Facebook
                  </a>
                  <a
                    href="https://linkedin.com/zpuckeridge"
                    target="_blank"
                    className="hover:text-white"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://instagram.com/zpuckeridge"
                    target="_blank"
                    className="hover:text-white"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://cosmos.so/zpuckeridge"
                    target="_blank"
                    className="hover:text-white"
                  >
                    Cosmos
                  </a>
                  <Link
                    href="/about/uses"
                    className="hover:text-white flex justify-between"
                  >
                    Uses
                    <Badge className="text-xs rounded-none hover:bg-muted hover:text-muted-foreground py-0 px-2 bg-muted text-muted-foreground">
                      WIP
                    </Badge>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <hr />
          <div className="flex flex-col gap-2">
            <Link
              href="/colophon"
              className={`${isActive("/colophon")} hover:text-white flex justify-between`}
            >
              <p>Colophon</p>
              <p>5 topics</p>
            </Link>
            <Link
              href="/imprint"
              className={`${isActive("/imprint")} hover:text-white`}
            >
              Imprint
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
