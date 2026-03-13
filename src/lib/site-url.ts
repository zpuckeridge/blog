/**
 * Canonical site URL for sitemap, robots, metadata, and RSS.
 * Ensures https:// protocol in production.
 */
export const getSiteUrl = (): string => {
  const envUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.PAGE_URL ||
    process.env.NEXT_PUBLIC_VERCEL_URL;

  if (!envUrl) {
    return "http://localhost:3000";
  }

  // Vercel URLs may not include protocol
  if (envUrl.startsWith("http://") || envUrl.startsWith("https://")) {
    return envUrl;
  }

  return `https://${envUrl}`;
};
