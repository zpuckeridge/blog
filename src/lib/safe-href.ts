const hasExplicitScheme = (value: string): boolean =>
  /^[A-Za-z][A-Za-z\d+.-]*:/u.test(value);

export const resolveSafeHref = (
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
