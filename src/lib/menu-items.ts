interface MenuItem {
  href: string;
  label: string;
}

export const menuItems: MenuItem[] = [
  { href: "/about", label: "About" },
  { href: "/about/uses", label: "Uses" },
  { href: "/projects", label: "Projects" },
  { href: "/timeline", label: "Timeline" },
  { href: "/activity", label: "Activity" },
  { href: "/videos", label: "Videos" },
  { href: "/cv", label: "CV" },
];
