import { getSiteUrl } from "@/lib/site-url";

export default function robots() {
  const baseUrl = getSiteUrl();

  return {
    host: baseUrl,
    rules: [
      {
        userAgent: "*",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
