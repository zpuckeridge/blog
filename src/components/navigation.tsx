import { Drawer } from "@base-ui/react/drawer";
import { Menu } from "@base-ui/react/menu";
import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

import SiteImage from "@/components/site-image";
import { ImageZoom } from "@/components/zoom-image";
import { menuItems } from "@/lib/menu-items";
import { cn } from "@/lib/utils";

interface NavigationProps {
  pathname: string;
}

const menuEase = "ease-[cubic-bezier(0.23,1,0.32,1)]";
const drawerEase = "ease-[cubic-bezier(0.32,0.72,0,1)]";
const drawerLinkClassName =
  "flex min-h-14 items-center justify-center border border-border px-3 text-center text-base text-muted-foreground active:bg-background active:text-foreground";
const mobileNavQuery = "(max-width: 767px)";

const isCurrentItem = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

const isEditableTarget = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  const { tagName } = target;
  return (
    target.isContentEditable ||
    tagName === "INPUT" ||
    tagName === "TEXTAREA" ||
    tagName === "SELECT"
  );
};

const Navigation = ({ pathname }: NavigationProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.repeat ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.key !== "m" ||
        menuOpen ||
        drawerOpen ||
        isEditableTarget(event.target)
      ) {
        return;
      }

      event.preventDefault();
      if (window.matchMedia(mobileNavQuery).matches) {
        setDrawerOpen(true);
        return;
      }

      setMenuOpen(true);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [drawerOpen, menuOpen]);
  const avatar = (
    <SiteImage
      alt="Zacchary Puckeridge"
      className="aspect-square size-6 object-cover"
      height={100}
      src="/avatar-2026-small.avif"
      width={100}
      zoomSrc="/avatar-2026.avif"
    />
  );

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-lg items-center justify-between gap-3 px-6 pt-6 pb-10 sm:gap-4 lg:pt-20">
      {isHome ? (
        <div className="size-6 shrink-0">
          <ImageZoom>{avatar}</ImageZoom>
        </div>
      ) : (
        <a className="size-6 shrink-0" href="/">
          {avatar}
        </a>
      )}

      <nav aria-label="Site" className="max-md:hidden">
        <Menu.Root onOpenChange={setMenuOpen} open={menuOpen}>
          <Menu.Trigger
            aria-keyshortcuts="m"
            aria-label="Menu"
            className={cn(
              "hidden items-center px-1 text-muted-foreground transition-transform duration-150 hover:bg-muted focus-visible:bg-muted active:scale-[0.97] data-[popup-open]:bg-muted data-[popup-open]:text-foreground md:inline-flex",
              menuEase
            )}
          >
            <RxHamburgerMenu aria-hidden="true" className="size-4" />
          </Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner align="end" sideOffset={6}>
              <Menu.Popup
                className={cn(
                  "z-50 min-w-36 origin-(--transform-origin) bg-muted text-foreground text-sm outline-hidden dark:bg-neutral-900 dark:text-muted-foreground",
                  "transition-[scale,opacity] duration-150 data-[instant]:transition-none data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
                  menuEase
                )}
                onKeyDown={(event) => {
                  if (event.altKey || event.ctrlKey || event.metaKey) {
                    return;
                  }

                  const index = Math.trunc(Number(event.key)) - 1;
                  const item = menuItems[index];
                  if (!Number.isInteger(index) || !item) {
                    return;
                  }

                  event.preventDefault();
                  window.location.assign(item.href);
                }}
              >
                {menuItems.map((item, index) => {
                  const isActive = isCurrentItem(pathname, item.href);

                  return (
                    <Menu.LinkItem
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "flex items-baseline gap-2 px-3 py-1 outline-hidden select-none data-highlighted:bg-background data-highlighted:text-foreground",
                        isActive && "text-foreground"
                      )}
                      href={item.href}
                      key={item.href}
                    >
                      <span
                        aria-hidden="true"
                        className="w-3 shrink-0 tabular-nums text-muted-foreground"
                      >
                        {index + 1}
                      </span>
                      {item.label}
                    </Menu.LinkItem>
                  );
                })}
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      </nav>
      <Drawer.Root
        onOpenChange={setDrawerOpen}
        open={drawerOpen}
        swipeDirection="down"
      >
        <Drawer.Trigger
          aria-keyshortcuts="m"
          className={cn(
            "fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-40 inline-flex -translate-x-1/2 items-center gap-2 border border-border bg-muted px-4 py-3 text-foreground text-sm transition-transform duration-150 active:scale-[0.97] md:hidden dark:bg-neutral-900",
            menuEase
          )}
        >
          <RxHamburgerMenu aria-hidden="true" className="size-4" />
          Menu
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Backdrop
            className={cn(
              "fixed inset-0 bg-black/40 opacity-[calc(1-var(--drawer-swipe-progress))] transition-opacity duration-300 data-ending-style:opacity-0 data-starting-style:opacity-0 data-swiping:duration-0 data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)]",
              drawerEase
            )}
          />
          <Drawer.Viewport className="fixed inset-0 z-50 flex items-end">
            <Drawer.Popup
              className={cn(
                "-mb-12 w-full max-h-[calc(80vh+3rem)] touch-auto overflow-y-auto overscroll-contain border-t border-border bg-muted px-6 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px)+3rem)] text-foreground outline-hidden dark:bg-neutral-900",
                "[transform:translateY(var(--drawer-swipe-movement-y))] transition-transform duration-300 data-ending-style:[transform:translateY(calc(100%-3rem+2px))] data-starting-style:[transform:translateY(calc(100%-3rem+2px))] data-swiping:select-none data-swiping:duration-0 data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)]",
                drawerEase
              )}
            >
              <div
                aria-hidden="true"
                className="mx-auto mb-4 h-px w-10 bg-border"
              />
              <Drawer.Title className="sr-only">Menu</Drawer.Title>
              <nav
                aria-label="Site"
                className="mx-auto grid w-full max-w-lg grid-cols-2 gap-2"
              >
                {menuItems.map((item) => {
                  const isActive = isCurrentItem(pathname, item.href);

                  return (
                    <a
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        drawerLinkClassName,
                        isActive && "bg-background text-foreground"
                      )}
                      href={item.href}
                      key={item.href}
                    >
                      {item.label}
                    </a>
                  );
                })}
                <a className={drawerLinkClassName} href="mailto:hi@zacchary.me">
                  Email
                </a>
              </nav>
            </Drawer.Popup>
          </Drawer.Viewport>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
};

export default Navigation;
