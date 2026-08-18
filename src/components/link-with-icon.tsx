import type { ReactNode } from "react";

import { resolveSafeHref } from "@/lib/safe-href";
import { trimLinkChildren } from "@/lib/trim-link-children";
import { cn } from "@/lib/utils";

const linkClassNames = {
  default:
    "group inline-block max-w-full whitespace-nowrap px-1 text-sm text-muted-foreground leading-[inherit] hover:bg-muted",
  highlighted:
    "group inline-block max-w-full whitespace-nowrap px-1 leading-[inherit] bg-muted hover:bg-muted/80",
} as const;

type LinkVariant = keyof typeof linkClassNames;

const LinkWithIcon = ({
  "aria-label": ariaLabel,
  className,
  href,
  children,
  variant = "highlighted",
}: {
  "aria-label"?: string;
  className?: string;
  href: string;
  children: ReactNode;
  variant?: LinkVariant;
}) => {
  const linkClassName = cn(linkClassNames[variant], className);
  const safeHref = resolveSafeHref(href);
  const content = trimLinkChildren(children);
  if (!safeHref) {
    return <span className={linkClassName}>{content}</span>;
  }

  return (
    <a
      aria-label={ariaLabel}
      className={linkClassName}
      href={safeHref.href}
      rel={safeHref.isExternal ? "noopener noreferrer" : undefined}
      target={safeHref.isExternal ? "_blank" : undefined}
    >
      {content}
      {safeHref.isExternal ? (
        <span className="sr-only"> (opens in a new tab)</span>
      ) : null}
    </a>
  );
};

export default LinkWithIcon;
