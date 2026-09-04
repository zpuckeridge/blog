import { defineMiddleware } from "astro:middleware";

const isProtectedPath = (pathname: string): boolean =>
  pathname === "/videos" ||
  pathname.startsWith("/video/") ||
  pathname === "/timeline" ||
  pathname.startsWith("/timeline/") ||
  pathname === "/api/video-auth";

export const onRequest = defineMiddleware(async (context, next) => {
  // oxlint-disable-next-line node/callback-return -- async Astro middleware must await next()
  const response = await next();
  const headers = new Headers(response.headers);

  /**
   * Cloudflare may inject `Referrer-Policy: same-origin`, which strips Referer
   * on cross-origin iframe loads and breaks YouTube embeds (Error 153).
   */
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  if (isProtectedPath(context.url.pathname)) {
    headers.set("Cache-Control", "private, no-store");
    headers.set("Vary", "Cookie");
  }

  return new Response(response.body, {
    headers,
    status: response.status,
    statusText: response.statusText,
  });
});
