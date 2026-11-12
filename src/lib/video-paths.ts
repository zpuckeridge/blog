export const VIDEOS_INDEX_PATH = "/videos";
export const VIDEO_PATH_PREFIX = "/video/";
export const VIDEO_AUTH_PATH = "/api/video-auth";

export const isVideoPagePath = (pathname: string): boolean =>
  pathname === VIDEOS_INDEX_PATH || pathname.startsWith(VIDEO_PATH_PREFIX);

/** Password-gated HTML and the auth endpoint. These must not enter the edge cache. */
export const isProtectedVideoPath = (pathname: string): boolean =>
  isVideoPagePath(pathname) || pathname === VIDEO_AUTH_PATH;
