import SiteImage from "@/components/site-image";
import { ImageZoom } from "@/components/zoom-image";
import { menuItems } from "@/lib/menu-items";

interface NavigationProps {
  pathname: string;
}

const Navigation = ({ pathname }: NavigationProps) => {
  const isHome = pathname === "/";
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

      <nav
        aria-label="Site"
        className="flex min-w-0 flex-wrap items-center justify-end gap-x-1 gap-y-1 text-muted-foreground text-sm sm:gap-x-2"
      >
        {menuItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.includes(item.href);

          return (
            <a
              className={`group inline-flex px-1 hover:bg-muted ${
                isActive ? "bg-muted text-foreground hover:bg-muted/80" : ""
              }`}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
    </div>
  );
};

export default Navigation;
