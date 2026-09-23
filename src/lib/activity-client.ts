const MAX_CLIENT_LABEL_LENGTH = 80;

const normalizeUserAgent = (userAgent: string | null | undefined): string =>
  userAgent?.trim().slice(0, 512) ?? "";

export const formatActivityClientLabel = (
  userAgent: string | null | undefined
): string | null => {
  const ua = normalizeUserAgent(userAgent);
  if (!ua) {
    return null;
  }

  const browser = (() => {
    if (/Edg\//u.test(ua)) {
      return "Edge";
    }
    if (/OPR\//u.test(ua) || /Opera/u.test(ua)) {
      return "Opera";
    }
    if (/Firefox\//u.test(ua)) {
      return "Firefox";
    }
    if (/Chrome\//u.test(ua) && !/Chromium/u.test(ua)) {
      return "Chrome";
    }
    if (/Safari\//u.test(ua) && !/Chrome\//u.test(ua)) {
      return "Safari";
    }
    if (/CriOS\//u.test(ua)) {
      return "Chrome";
    }
    if (/FxiOS\//u.test(ua)) {
      return "Firefox";
    }
    return null;
  })();

  const os = (() => {
    if (/iPhone|iPad|iPod/u.test(ua)) {
      return "iOS";
    }
    if (/Android/u.test(ua)) {
      return "Android";
    }
    if (/Mac OS X|Macintosh/u.test(ua)) {
      return "macOS";
    }
    if (/Windows NT/u.test(ua)) {
      return "Windows";
    }
    if (/CrOS/u.test(ua)) {
      return "ChromeOS";
    }
    if (/Linux/u.test(ua)) {
      return "Linux";
    }
    return null;
  })();

  if (browser && os) {
    return `${browser} on ${os}`.slice(0, MAX_CLIENT_LABEL_LENGTH);
  }
  if (browser) {
    return browser.slice(0, MAX_CLIENT_LABEL_LENGTH);
  }
  if (os) {
    return os.slice(0, MAX_CLIENT_LABEL_LENGTH);
  }

  return null;
};

export const hashActivityVisitorKey = async (
  visitorId: string | null | undefined,
  userAgent: string | null | undefined
): Promise<string | null> => {
  if (!visitorId || visitorId.length > 200) {
    return null;
  }

  const material = `${visitorId}\u0000${normalizeUserAgent(userAgent)}`;
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(material)
  );
  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("");
};
