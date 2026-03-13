export interface MenuItem {
  href: string;
  label: string;
}

export const menuItems: MenuItem[] = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/timeline", label: "Timeline" },
  { href: "/videos", label: "Videos" },
  { href: "/cv", label: "CV" },
];
