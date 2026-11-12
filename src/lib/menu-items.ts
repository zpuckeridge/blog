import { pagesWhere } from "@/lib/public-pages";

export interface MenuItem {
  href: string;
  label: string;
  /** Shows a lock icon; the page is password protected. */
  locked?: boolean;
}

export const menuItems: MenuItem[] = pagesWhere("menu").map((page) => ({
  href: page.href,
  label: page.label,
  ...(page.locked ? { locked: true } : {}),
}));
