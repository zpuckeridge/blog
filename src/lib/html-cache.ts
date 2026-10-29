export const HTML_CACHE_CONTROL =
  "public, max-age=0, must-revalidate, s-maxage=3600, stale-while-revalidate=86400";

export const CDN_CACHE_CONTROL =
  "public, s-maxage=3600, stale-while-revalidate=86400";

const CHARSET_TAG = /<meta\b[^>]*\bcharset\s*=\s*["']?utf-8["']?[^>]*>/giu;

export const isEdgeCacheablePath = (pathname: string): boolean => {
  if (
    pathname === "/videos" ||
    pathname.startsWith("/video/") ||
    pathname === "/api/video-auth"
  ) {
    return false;
  }

  if (pathname === "/api" || pathname.startsWith("/api/")) {
    return false;
  }

  // Listening history is read from KV on each request.
  if (pathname === "/music") {
    return false;
  }

  if (pathname === "/img" || pathname.startsWith("/img/")) {
    return false;
  }

  return true;
};

export const isEdgeCacheableHtml = ({
  contentType,
  hasSetCookie,
  method,
  pathname,
  status,
}: {
  contentType: string | null;
  hasSetCookie: boolean;
  method: string;
  pathname: string;
  status: number;
}): boolean => {
  if (method !== "GET" && method !== "HEAD") {
    return false;
  }
  if (!isEdgeCacheablePath(pathname)) {
    return false;
  }
  if (status !== 200) {
    return false;
  }
  if (hasSetCookie) {
    return false;
  }
  return (contentType ?? "").includes("text/html");
};

/** Put `<meta charset>` immediately after `<head>`, ahead of any injected tags. */
export const moveCharsetFirst = (html: string): string => {
  if (!/<head\b/iu.test(html)) {
    return html;
  }

  const without = html.replaceAll(CHARSET_TAG, "");
  return without.replace(
    /<head\b(?<attrs>[^>]*)>/iu,
    '<head$<attrs>><meta charset="utf-8">'
  );
};

export const getEdgeCache = (): Cache | null =>
  typeof caches !== "undefined" && "default" in caches
    ? (caches as unknown as { default: Cache }).default
    : null;
