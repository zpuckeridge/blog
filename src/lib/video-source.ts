/** Extract YouTube video id from common URL shapes or a bare 11-character id. */
export function extractYoutubeVideoId(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) {
    return null;
  }

  try {
    if (/^https?:\/\//i.test(trimmed)) {
      const url = new URL(trimmed);
      const host = url.hostname.replace(/^www\./, "");

      if (host === "youtu.be") {
        const id = url.pathname.split("/").filter(Boolean)[0] ?? "";
        return /^[\w-]{11}$/.test(id) ? id : null;
      }

      if (
        host === "youtube.com" ||
        host === "m.youtube.com" ||
        host === "youtube-nocookie.com"
      ) {
        const fromQuery = url.searchParams.get("v");
        if (fromQuery && /^[\w-]{11}$/.test(fromQuery)) {
          return fromQuery;
        }

        const fromPath =
          trimmed.match(/\/(?:embed|shorts|live)\/([\w-]{11})/)?.[1] ?? null;
        if (fromPath && /^[\w-]{11}$/.test(fromPath)) {
          return fromPath;
        }
      }

      return null;
    }

    return null;
  } catch {
    return null;
  }
}

/** Mux playback id from a stream URL, or the value unchanged if already an id. */
export function getMuxPlaybackId(src: string): string {
  const match = src.match(/stream\.mux\.com\/([^.?#/]+)/);
  return match ? match[1] : src;
}

export function resolveVideoMedia(src: string): {
  muxPlaybackId: string;
  thumbnailUrl: string;
  videoUrl: string;
  youtubeId: string | null;
} {
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
}
