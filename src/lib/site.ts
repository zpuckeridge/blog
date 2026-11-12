export const siteName = "zacchary.me";
export const siteHandle = "@zpuckeridge";
export const personName = "Zacchary Puckeridge";
export const titleSeparator = " — ";
export const titleSuffix = `${titleSeparator}${personName}`;
export const siteLocale = "en-AU";

export const socialProfiles = [
  { href: "https://x.com/zpuckeridge/", label: "X" },
  { href: "https://www.facebook.com/zpuckeridge/", label: "Facebook" },
  { href: "https://www.instagram.com/zpuckeridge/", label: "Instagram" },
  { href: "https://www.linkedin.com/in/zpuckeridge/", label: "LinkedIn" },
  { href: "https://github.com/zpuckeridge", label: "GitHub" },
] as const;
export const openGraphLocale = siteLocale.replaceAll("-", "_");

export const getSiteUrl = (): string => {
  const envUrl =
    (import.meta !== undefined && import.meta.env?.PUBLIC_SITE_URL) ||
    (typeof process !== "undefined" && process.env.PUBLIC_SITE_URL);

  if (!envUrl) {
    // Fall back to Astro's `site` config so production never emits localhost.
    const site = import.meta.env?.SITE;
    return (site || "https://zacchary.me").replace(/\/$/u, "");
  }

  if (envUrl.startsWith("http://") || envUrl.startsWith("https://")) {
    return envUrl.replace(/\/$/u, "");
  }

  return `https://${envUrl}`.replace(/\/$/u, "");
};

export const timelinePostPath = (slug: string): string => `/timeline/${slug}`;

export const timelineTagPath = (tag: string): string => `/timeline/tag/${tag}`;
