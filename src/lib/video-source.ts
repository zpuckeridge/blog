const isYoutubeVideoId = (value: string): boolean =>
  /^[A-Za-z0-9_-]{11}$/u.test(value);

/** Extract YouTube video id from common URL shapes or a bare 11-character id. */
export const extractYoutubeVideoId = function extractYoutubeVideoId(
  input: string | null | undefined
): string | null {
  if (input === undefined || input === null || typeof input !== "string") {
    return null;
  }

  const trimmed = input.trim();
  if (!trimmed) {
    return null;
  }

  try {
    if (/^https?:\/\//iu.test(trimmed)) {
      const url = new URL(trimmed);
      const host = url.hostname.replace(/^www\./u, "");

      if (host === "youtu.be") {
        const id = url.pathname.split("/").find(Boolean) ?? "";
        return isYoutubeVideoId(id) ? id : null;
      }

      if (
        host === "youtube.com" ||
        host === "m.youtube.com" ||
        host === "youtube-nocookie.com"
      ) {
        const fromQuery = url.searchParams.get("v");
        if (fromQuery && isYoutubeVideoId(fromQuery)) {
          return fromQuery;
        }

        const fromPath =
          trimmed.match(/\/(?:embed|shorts|live)\/(?<id>[A-Za-z0-9_-]{11})/u)
            ?.groups?.id ?? null;
        if (fromPath && isYoutubeVideoId(fromPath)) {
          return fromPath;
        }
      }

      return null;
    }

    return null;
  } catch {
    return null;
  }
};

/** Mux playback id from a stream URL, or the value unchanged if already an id. */
export const getMuxPlaybackId = function getMuxPlaybackId(src: string): string {
  const match = src.match(/stream\.mux\.com\/(?<playbackId>[^.?#/]+)/u);
  return match?.groups?.playbackId ?? src;
};

const missingPlaybackPlaceholder = "/avatar-2026.avif";

export const resolveVideoMedia = function resolveVideoMedia(
  src: string | null | undefined
): {
  muxPlaybackId: string;
  thumbnailUrl: string;
  videoUrl: string;
  youtubeId: string | null;
} {
  if (src === undefined || src === null || String(src).trim() === "") {
    return {
      muxPlaybackId: "",
      thumbnailUrl: missingPlaybackPlaceholder,
      videoUrl: "",
      youtubeId: null,
    };
  }

  const youtubeId = extractYoutubeVideoId(src);
  if (youtubeId) {
    return {
      muxPlaybackId: "",
      thumbnailUrl: `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`,
      videoUrl: `https://www.youtube.com/embed/${youtubeId}`,
      youtubeId,
    };
  }

  const muxPlaybackId = getMuxPlaybackId(src);
  return {
    muxPlaybackId,
    thumbnailUrl: `https://image.mux.com/${muxPlaybackId}/thumbnail.jpg`,
    videoUrl: `https://stream.mux.com/${muxPlaybackId}/highest.mp4`,
    youtubeId: null,
  };
};
