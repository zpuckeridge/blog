"use client";

import { useCallback } from "react";

import { trimLinkChildren } from "@/lib/trim-link-children";

type FootnotesNavigationProps = React.ComponentPropsWithoutRef<"a"> & {
  href: string;
  children: React.ReactNode;
};

const FootnotesNavigation = ({
  href,
  children,
  ...props
}: FootnotesNavigationProps) => {
  const scrollToFootnote = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const targetElement = document.querySelector(`#${targetId}`);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    },
    [href]
  );

  return (
    <a
      href={href}
      {...props}
      className="text-muted-foreground"
      onClick={scrollToFootnote}
    >
      {trimLinkChildren(children)}
    </a>
  );
};

export default FootnotesNavigation;
