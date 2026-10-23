import { defineMiddleware } from "astro:middleware";

import {
  CDN_CACHE_CONTROL,
  getEdgeCache,
  HTML_CACHE_CONTROL,
  isEdgeCacheableHtml,
  isEdgeCacheablePath,
  moveCharsetFirst,
} from "@/lib/html-cache";
import { HTML_CONTENT_SECURITY_POLICY } from "@/lib/security-headers";

const REFERRER_POLICY = "strict-origin-when-cross-origin";

const isProtectedPath = (pathname: string): boolean =>
  pathname === "/videos" ||
  pathname.startsWith("/video/") ||
  pathname === "/api/video-auth";

const waitUntilFrom = (
  locals: unknown
): ((promise: Promise<unknown>) => void) | undefined => {
  if (!locals || typeof locals !== "object" || !("cfContext" in locals)) {
    return undefined;
  }

  const context = locals.cfContext;
  if (!context || typeof context !== "object" || !("waitUntil" in context)) {
    return undefined;
  }

  const { waitUntil } = context as {
    waitUntil?: (promise: Promise<unknown>) => void;
  };
  return typeof waitUntil === "function" ? waitUntil.bind(context) : undefined;
};

export const onRequest = defineMiddleware(async (context, next) => {
  const cache =
    import.meta.env.DEV || context.request.method !== "GET"
      ? null
      : getEdgeCache();

  if (cache && isEdgeCacheablePath(context.url.pathname)) {
    const hit = await cache.match(context.request);
    if (hit) {
      const headers = new Headers(hit.headers);
      headers.set("Referrer-Policy", REFERRER_POLICY);
      return new Response(hit.body, {
        headers,
        status: hit.status,
        statusText: hit.statusText,
      });
    }
  }

  // oxlint-disable-next-line node/callback-return -- async Astro middleware must await next()
  const response = await next();
  const headers = new Headers(response.headers);
  headers.set("Referrer-Policy", REFERRER_POLICY);

  const protectedPath = isProtectedPath(context.url.pathname);
  if (protectedPath) {
    headers.set("Cache-Control", "private, no-store");
    headers.set("Vary", "Cookie");
  }

  const contentType = headers.get("content-type");
  const isHtml = (contentType ?? "").includes("text/html");
  if (!isHtml) {
    return new Response(response.body, {
      headers,
      status: response.status,
      statusText: response.statusText,
    });
  }

  headers.set("Content-Security-Policy", HTML_CONTENT_SECURITY_POLICY);
  headers.delete("content-length");

  const cacheable =
    !import.meta.env.DEV &&
    !protectedPath &&
    isEdgeCacheableHtml({
      contentType,
      hasSetCookie: headers.has("set-cookie"),
      method: context.request.method,
      pathname: context.url.pathname,
      status: response.status,
    });

  if (cacheable) {
    headers.set("Cache-Control", HTML_CACHE_CONTROL);
    headers.set("Cloudflare-CDN-Cache-Control", CDN_CACHE_CONTROL);
  }

  const outgoing = new Response(moveCharsetFirst(await response.text()), {
    headers,
    status: response.status,
    statusText: response.statusText,
  });

  if (cacheable && cache) {
    const waitUntil = waitUntilFrom(context.locals);
    if (waitUntil) {
      waitUntil(cache.put(context.request, outgoing.clone()));
    }
  }

  return outgoing;
});
