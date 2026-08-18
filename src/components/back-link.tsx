import type { ReactNode } from "react";

import LinkWithIcon from "@/components/link-with-icon";
import { cn } from "@/lib/utils";

export const backLinkClassName = cn(
  "inline-flex w-fit self-start px-1 text-sm text-muted-foreground leading-[inherit] hover:bg-muted"
);

const BackLink = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => {
  const destination =
    href === "/" ? "home" : href.replace(/^\//u, "").replaceAll("/", " ");

  return (
    <LinkWithIcon
      aria-label={`Back to ${destination}`}
      className="w-fit self-start"
      href={href}
      variant="default"
    >
      {children}
    </LinkWithIcon>
  );
};

export default BackLink;
