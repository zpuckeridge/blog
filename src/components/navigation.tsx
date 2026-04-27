import SiteImage from "@/components/site-image";
import { menuItems } from "@/lib/menu-items";

interface NavigationProps {
  pathname: string;
}

export default function Navigation({ pathname }: NavigationProps) {
  return (
    <div className="mx-auto flex max-w-lg items-center justify-between gap-4 px-6 pt-6 lg:pt-20">
      <a href="/">
        <SiteImage
          alt="Zacchary Puckeridge"
          className="aspect-square h-6 w-6 rounded object-cover"
          height={100}
          src="/avatar-2026-small.avif"
          width={100}
        />
      </a>

      <div className="flex flex-row items-center justify-end gap-4 text-muted-foreground text-xs">
        {menuItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.includes(item.href);

          return (
            <a
              className={`group inline-flex underline transition ease-in-out ${
                isActive
                  ? "text-foreground decoration-solid underline-offset-4"
                  : "decoration-dotted underline-offset-2 hover:decoration-solid hover:underline-offset-4"
              }`}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
