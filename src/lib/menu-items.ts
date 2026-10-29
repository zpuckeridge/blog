interface MenuItem {
  href: string;
  label: string;
  /** Shows a lock icon; the page is password protected. */
  locked?: boolean;
}

export const menuItems: MenuItem[] = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/timeline", label: "Timeline" },
  { href: "/cv", label: "CV" },
  { href: "/activity", label: "Activity" },
  { href: "/uses", label: "Uses" },
  { href: "/music", label: "Music" },
  { href: "/videos", label: "Videos", locked: true },
];
