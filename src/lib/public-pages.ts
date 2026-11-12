import { VIDEOS_INDEX_PATH } from "@/lib/video-paths";

export const ACTIVITY_PATH = "/activity";

export interface SitePage {
  href: string;
  jsonLd?: boolean;
  label: string;
  llms?: boolean;
  locked?: boolean;
  menu?: boolean;
  sitemap?: boolean;
}

/**
 * One list for navigation, the sitemap, llms.txt, and JSON-LD page names.
 * Menu order is the order of entries with `menu`.
 */
export const sitePages: SitePage[] = [
  { href: "/", label: "Home", llms: true, sitemap: true },
  { href: "/about", label: "About", llms: true, menu: true, sitemap: true },
  {
    href: "/projects",
    jsonLd: true,
    label: "Projects",
    llms: true,
    menu: true,
    sitemap: true,
  },
  {
    href: "/timeline",
    label: "Timeline",
    llms: true,
    menu: true,
    sitemap: true,
  },
  { href: "/cv", label: "CV", llms: true, menu: true, sitemap: true },
  {
    href: ACTIVITY_PATH,
    jsonLd: true,
    label: "Activity",
    llms: true,
    menu: true,
    sitemap: true,
  },
  {
    href: "/uses",
    jsonLd: true,
    label: "Uses",
    llms: true,
    menu: true,
    sitemap: true,
  },
  {
    href: "/music",
    jsonLd: true,
    label: "Music",
    llms: true,
    menu: true,
    sitemap: true,
  },
  { href: VIDEOS_INDEX_PATH, label: "Videos", locked: true, menu: true },
  {
    href: "/about/books",
    jsonLd: true,
    label: "Books",
    llms: true,
    sitemap: true,
  },
  {
    href: "/about/movies",
    jsonLd: true,
    label: "Movies",
    llms: true,
    sitemap: true,
  },
  {
    href: "/about/credits",
    jsonLd: true,
    label: "Credits",
    llms: true,
    sitemap: true,
  },
  {
    href: "/colophon",
    jsonLd: true,
    label: "Colophon",
    llms: true,
    sitemap: true,
  },
  {
    href: "/imprint",
    jsonLd: true,
    label: "Imprint",
    llms: true,
    sitemap: true,
  },
  { href: "/rss.xml", label: "RSS", llms: true },
];

export const pagesWhere = (
  flag: "jsonLd" | "llms" | "menu" | "sitemap"
): SitePage[] => sitePages.filter((page) => page[flag]);
