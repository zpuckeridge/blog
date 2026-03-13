"use client";

import { useCallback } from "react";

const FootnotesNavigation = ({
  href,
  children,
  ...props
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const handleClick = useCallback(
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
      onClick={handleClick}
    >
      {children}
    </a>
  );
};

export default FootnotesNavigation;
