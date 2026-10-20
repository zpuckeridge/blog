/**
 * Canonical site URL for sitemap, robots, metadata, and RSS.
 * Ensures https:// protocol in production.
 */
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
    return envUrl;
  }

  return `https://${envUrl}`;
};
