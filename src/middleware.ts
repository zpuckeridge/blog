import { defineMiddleware } from "astro:middleware";

/**
 * Cloudflare may inject `Referrer-Policy: same-origin`, which strips Referer on
 * cross-origin iframe loads and breaks YouTube embeds (Error 153). Override so
 * embeds and outbound links send the origin.
 */
export const onRequest = defineMiddleware(async (_context, next) => {
  const response = await next();
  const headers = new Headers(response.headers);
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  return new Response(response.body, {
    headers,
    status: response.status,
    statusText: response.statusText,
  });
});
