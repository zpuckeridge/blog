const VIDEO_AUTH_COOKIE = "video_auth";

const encoder = new TextEncoder();

const bytesToHex = (bytes: Uint8Array): string =>
  Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");

export const getVideoPassword = (): string | null => {
  const password = process.env.VIDEO_PASSWORD;

  if (!password) {
    return null;
  }

  return password;
};

export const getVideoAuthCookieName = (): string => VIDEO_AUTH_COOKIE;

export const createVideoAuthToken = async (
  password: string
): Promise<string> => {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    encoder.encode(password)
  );

  return bytesToHex(new Uint8Array(digest));
};

export const isVideoAuthTokenValid = async (
  cookieValue: string | undefined
): Promise<boolean> => {
  const password = getVideoPassword();

  if (!password || !cookieValue) {
    return false;
  }

  const expectedToken = await createVideoAuthToken(password);

  return cookieValue === expectedToken;
};

export const normalizeVideoRedirect = (redirectTo?: string | null): string => {
  if (!redirectTo) {
    return "/videos";
  }

  if (redirectTo === "/videos" || redirectTo.startsWith("/video/")) {
    return redirectTo;
  }

  return "/videos";
};

export const getVideoAccessErrorMessage = (
  errorCode?: string | null
): string | null => {
  switch (errorCode) {
    case "incorrect-password": {
      return "Incorrect password. Please try again.";
    }
    case "password-unavailable": {
      return "Video access is temporarily unavailable.";
    }
    default: {
      return null;
    }
  }
};
