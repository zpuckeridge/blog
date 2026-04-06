/**
 * Canonical site URL for sitemap, robots, metadata, and RSS.
 * Ensures https:// protocol in production.
 */
export const getSiteUrl = (): string => {
  const envUrl =
    (import.meta !== undefined && import.meta.env?.PUBLIC_SITE_URL) ||
    (import.meta !== undefined && import.meta.env?.PAGE_URL) ||
    (typeof process !== "undefined" && process.env.PUBLIC_SITE_URL) ||
    (typeof process !== "undefined" && process.env.PAGE_URL) ||
    (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SITE_URL) ||
    (typeof process !== "undefined" && process.env.NEXT_PUBLIC_VERCEL_URL);

  if (!envUrl) {
    return "http://localhost:4321";
  }

  if (envUrl.startsWith("http://") || envUrl.startsWith("https://")) {
    return envUrl;
  }

  return `https://${envUrl}`;
};
