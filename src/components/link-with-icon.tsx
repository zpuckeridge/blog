import type { ReactNode } from "react";

const linkClassName =
  "group inline-flex w-fit underline decoration-dotted underline-offset-2 transition ease-in-out hover:decoration-solid hover:underline-offset-4";

const hasExplicitScheme = (value: string): boolean =>
  /^[A-Za-z][A-Za-z\d+.-]*:/.test(value);

const resolveSafeHref = (
  href: string
): { href: string; isExternal: boolean } | null => {
  const trimmedHref = href.trim();
  if (!trimmedHref || trimmedHref.startsWith("//")) {
    return null;
  }

  if (
    trimmedHref.startsWith("#") ||
    trimmedHref.startsWith("/") ||
    trimmedHref.startsWith("./") ||
    trimmedHref.startsWith("../")
  ) {
    return { href: trimmedHref, isExternal: false };
  }

  if (!hasExplicitScheme(trimmedHref)) {
    return { href: trimmedHref, isExternal: false };
  }

  try {
    const parsedHref = new URL(trimmedHref);
    if (!["http:", "https:", "mailto:"].includes(parsedHref.protocol)) {
      return null;
    }

    return {
      href: trimmedHref,
      isExternal:
        parsedHref.protocol === "http:" || parsedHref.protocol === "https:",
    };
  } catch {
    return null;
  }
};

const LinkWithIcon = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => {
  const safeHref = resolveSafeHref(href);
  if (!safeHref) {
    return <span className={linkClassName}>{children}</span>;
  }

  return (
    <a
      className={linkClassName}
      href={safeHref.href}
      rel={safeHref.isExternal ? "noopener noreferrer" : undefined}
      target={safeHref.isExternal ? "_blank" : undefined}
    >
      {children}
      {/* <ArrowTopRightIcon className="w-3 h-3 text-muted-foreground mt-1 group-hover:translate-x-[0.125rem] group-hover:-translate-y-[0.125rem] ease-in-out transition-all " /> */}
    </a>
  );
};

export default LinkWithIcon;
