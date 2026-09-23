const isSameOrigin = (requestUrl: URL, value: string): boolean => {
  try {
    return new URL(value).origin === requestUrl.origin;
  } catch {
    return false;
  }
};

/**
 * Activity requests are sent by same-origin browser beacons. Fetch Metadata
 * headers cannot be set by a cross-origin webpage, so require the browser's
 * same-origin signal before trusting the Referer as the visited page.
 */
export const getSameOriginActivityReferer = (request: Request): URL | null => {
  const requestUrl = new URL(request.url);
  if (request.headers.get("Sec-Fetch-Site") !== "same-origin") {
    return null;
  }

  const origin = request.headers.get("Origin");
  if (origin && origin !== requestUrl.origin) {
    return null;
  }

  const referer = request.headers.get("Referer");
  if (!referer || !isSameOrigin(requestUrl, referer)) {
    return null;
  }

  try {
    return new URL(referer);
  } catch {
    return null;
  }
};
