"use client";

import Age from "@/components/age";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { ArrowLeftIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function NavigationClient({
  posts,
  videos,
}: {
  posts: any;
  videos: any;
}) {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href ? "text-blue-600 dark:text-blue-400" : "";

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <div className="p-4 px-6 w-full border-t-2 border-muted z-50 fixed bottom-0 left-0 bg-white/90 rounded-t-3xl dark:bg-background backdrop-blur-md lg:hidden leading-relaxed">
        <div className="flex justify-between">
          <Link
            href="/"
            className="text-xs my-auto text-muted-foreground hover:text-blue-400 dark:hover:text-blue-600 transition"
          >
            <ArrowLeftIcon className="inline-flex" /> /
          </Link>
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger
              aria-label="Open navigation"
              className="text-sm flex gap-1 my-auto hover:text-blue-400 dark:hover:text-blue-600 transition"
            >
              <HamburgerMenuIcon className="my-auto w-4 h-4" />
            </DrawerTrigger>
            <DrawerContent className="px-4 pb-4">
              <div className="flex flex-col pt-4 gap-6 lg:w-1/3 max-w-lg mx-auto w-full text-sm text-muted-foreground ">
                <div className="flex flex-col gap-2">
                  <Link
                    href="/work"
                    className={`${isActive("/work")} transition hover:text-blue-400 dark:hover:text-blue-600 flex justify-between`}
                    onClick={handleDrawerClose}
                  >
                    <p>Work</p>
                    <p>12 projects</p>
                  </Link>
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/timeline"
                      className={`${pathname.includes("/timeline") ? "text-blue-600 dark:text-blue-400" : ""} hover:text-blue-400 dark:hover:text-blue-600 transition flex justify-between`}
                      onClick={handleDrawerClose}
                    >
                      <p>Timeline</p>
                      <p>{posts.length} entries</p>
                    </Link>

                    {pathname.includes("/timeline") && (
                      <div className="ml-4 flex flex-col gap-2  h-40 overflow-y-hidden relative">
                        {posts.map((post: any) => (
                          <Link
                            key={post.url}
                            href={`/timeline${post.url}`}
                            aria-label={post.title}
                            className="hover:text-blue-400 dark:hover:text-blue-600 transition"
                            onClick={handleDrawerClose}
                          >
                            {post.title}
                          </Link>
                        ))}
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 z-40 bg-gradient-to-t from-white dark:from-background" />
                      </div>
                    )}
                  </div>
                  <Link
                    href="/videos"
                    className={`${isActive("/videos")} hover:text-blue-400 dark:hover:text-blue-600 transition flex justify-between`}
                    onClick={handleDrawerClose}
                  >
                    <p>Videos</p>
                    <p>{videos.length} entries</p>
                  </Link>
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/about"
                      className={`${pathname.includes("/about") ? "text-blue-600 dark:text-blue-400" : ""} hover:text-blue-400 dark:hover:text-blue-600 transition flex justify-between`}
                      onClick={handleDrawerClose}
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
                          className="hover:text-blue-400 dark:hover:text-blue-600 transition"
                        >
                          Read.cv
                        </a>
                        <a
                          href="https://shop.zacchary.me/"
                          target="_blank"
                          className="hover:text-blue-400 dark:hover:text-blue-600 transition"
                        >
                          Shop
                        </a>
                        <a
                          href="https://x.com/zpuckeridge"
                          target="_blank"
                          className="hover:text-blue-400 dark:hover:text-blue-600 transition"
                        >
                          X
                        </a>
                        <a
                          href="https://www.facebook.com/profile.php?id=61554733838731"
                          target="_blank"
                          className="hover:text-blue-400 dark:hover:text-blue-600 transition"
                        >
                          Facebook
                        </a>
                        <a
                          href="https://linkedin.com/zpuckeridge"
                          target="_blank"
                          className="hover:text-blue-400 dark:hover:text-blue-600 transition"
                        >
                          LinkedIn
                        </a>
                        <a
                          href="https://instagram.com/zpuckeridge"
                          target="_blank"
                          className="hover:text-blue-400 dark:hover:text-blue-600 transition"
                        >
                          Instagram
                        </a>
                        <a
                          href="https://cosmos.so/zpuckeridge"
                          target="_blank"
                          className="hover:text-blue-400 dark:hover:text-blue-600 transition"
                        >
                          Cosmos
                        </a>
                        <Link
                          href="/about/uses"
                          className={`${isActive("/about/uses")} hover:text-blue-400 dark:hover:text-blue-600 transition flex justify-between`}
                          onClick={handleDrawerClose}
                        >
                          Uses
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
                <hr />
                <div className="flex flex-col gap-2">
                  <Link
                    href="/colophon"
                    className={`${isActive("/colophon")} hover:text-blue-400 transition flex justify-between`}
                    onClick={handleDrawerClose}
                  >
                    <p>Colophon</p>
                    <p>5 topics</p>
                  </Link>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>

      <div className="lg:flex flex-col gap-6 lg:w-1/3 max-w-sm text-sm text-muted-foreground hidden leading-relaxed">
        <div className="lg:sticky top-8 space-y-6">
          <div className="flex flex-col gap-2">
            <Link
              href="/work"
              className={`${isActive("/work")} hover:text-blue-400 dark:hover:text-blue-600 transition flex justify-between`}
            >
              <p>Work</p>
              <p>12 projects</p>
            </Link>
            <div className="flex flex-col gap-2">
              <Link
                href="/timeline"
                className={`${pathname.includes("/timeline") ? "text-blue-600 dark:text-blue-400" : ""} hover:text-blue-400 dark:hover:text-blue-600 transition flex justify-between`}
              >
                <p>Timeline</p>
                <p>{posts.length} entries</p>
              </Link>

              {pathname.includes("/timeline") && (
                <div className="ml-4 flex flex-col gap-2  h-40 overflow-y-hidden relative">
                  {posts.map((post: any) => (
                    <Link
                      key={post.url}
                      href={`/timeline${post.url}`}
                      aria-label={post.title}
                      className="hover:text-blue-400 dark:hover:text-blue-600 transition"
                    >
                      {post.title}
                    </Link>
                  ))}
                  <div className="pointer-events-none absolute inset-x-0 bottom-10 lg:bottom-0 h-20 z-40 bg-gradient-to-t from-white dark:from-background" />
                </div>
              )}
            </div>

            <Link
              href="/videos"
              className={`${isActive("/videos")} hover:text-blue-400 dark:hover:text-blue-600 transition flex justify-between`}
            >
              <p>Videos</p>
              <p>{videos.length} entries</p>
            </Link>

            <div className="flex flex-col gap-2">
              <Link
                href="/about"
                className={`${pathname.includes("/about") ? "text-blue-600 dark:text-blue-400" : ""} hover:text-blue-400 dark:hover:text-blue-600 transition flex justify-between`}
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
                    className="hover:text-blue-400 dark:hover:text-blue-600 transition"
                  >
                    Read.cv
                  </a>
                  <a
                    href="https://shop.zacchary.me/"
                    target="_blank"
                    className="hover:text-blue-400 dark:hover:text-blue-600 transition"
                  >
                    Shop
                  </a>
                  <a
                    href="https://x.com/zpuckeridge"
                    target="_blank"
                    className="hover:text-blue-400 dark:hover:text-blue-600 transition"
                  >
                    X
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=61554733838731"
                    target="_blank"
                    className="hover:text-blue-400 dark:hover:text-blue-600 transition"
                  >
                    Facebook
                  </a>
                  <a
                    href="https://linkedin.com/zpuckeridge"
                    target="_blank"
                    className="hover:text-blue-400 dark:hover:text-blue-600 transition"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://instagram.com/zpuckeridge"
                    target="_blank"
                    className="hover:text-blue-400 dark:hover:text-blue-600 transition"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://cosmos.so/zpuckeridge"
                    target="_blank"
                    className="hover:text-blue-400 dark:hover:text-blue-600 transition"
                  >
                    Cosmos
                  </a>
                  <Link
                    href="/about/uses"
                    className={`${isActive("/about/uses")} hover:text-blue-400 dark:hover:text-blue-600 transition flex justify-between`}
                  >
                    Uses
                  </Link>
                </div>
              )}
            </div>
          </div>
          <hr />
          <div className="flex flex-col gap-2">
            <Link
              href="/colophon"
              className={`${isActive("/colophon")} hover:text-blue-400 dark:hover:text-blue-600 transition flex justify-between`}
            >
              <p>Colophon</p>
              <p>5 topics</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
