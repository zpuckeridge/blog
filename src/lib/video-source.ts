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

const MUX_PLAYBACK_HOSTS = new Set([
  "image.mux.com",
  "player.mux.com",
  "stream.mux.com",
]);

const PLAYBACK_PARAM_NAMES = [
  ["asset-end-time", "asset_end_time"],
  ["asset-start-time", "asset_start_time"],
  ["asset_end_time", "asset_end_time"],
  ["asset_start_time", "asset_start_time"],
  ["default-subtitles-lang", "default_subtitles_lang"],
  ["default_subtitles_lang", "default_subtitles_lang"],
  ["max-resolution", "max_resolution"],
  ["max_resolution", "max_resolution"],
  ["min-resolution", "min_resolution"],
  ["min_resolution", "min_resolution"],
  ["playback-token", "token"],
  ["program-end-time", "program_end_time"],
  ["program-start-time", "program_start_time"],
  ["program_end_time", "program_end_time"],
  ["program_start_time", "program_start_time"],
  ["rendition-order", "rendition_order"],
  ["rendition_order", "rendition_order"],
  ["token", "token"],
] as const;

const MEDIA_EXTENSION = /\.(?:m3u8|m4s|mp4)$/iu;

export interface MuxEmbed {
  autoplay: boolean;
  /** False when the embed hides its controls. Those use mux-background-video. */
  controls: boolean;
  loop: boolean;
  muted: boolean;
  playbackId: string;
  poster: string | null;
  posterTime: number | null;
  src: string;
  title: string | null;
}

export type MuxEmbedKind = "iframe" | "mux-player" | "player" | "video";

const muxHost = (hostname: string): string => hostname.replace(/^www\./u, "");

const playbackIdFromUrl = (url: URL): string | null => {
  if (!MUX_PLAYBACK_HOSTS.has(muxHost(url.hostname))) {
    return null;
  }

  const segment = url.pathname.split("/").find(Boolean) ?? "";
  const playbackId = segment.replace(MEDIA_EXTENSION, "");
  return playbackId || null;
};

/** Mux playback id from a stream, player, or image URL, or the value unchanged if already an id. */
export const getMuxPlaybackId = function getMuxPlaybackId(src: string): string {
  const trimmed = src.trim();
  if (!trimmed) {
    return "";
  }

  const inline = trimmed.match(
    /(?:stream|player|image)\.mux\.com\/(?<playbackId>[^.?#/]+)/iu
  );
  if (inline?.groups?.playbackId) {
    return inline.groups.playbackId;
  }

  if (/^https?:\/\//iu.test(trimmed)) {
    return "";
  }

  return trimmed;
};

const flagFromSearch = (
  params: URLSearchParams,
  name: string
): boolean | null => {
  if (!params.has(name)) {
    return null;
  }

  const value = (params.get(name) ?? "").trim().toLowerCase();
  if (value === "false" || value === "0") {
    return false;
  }

  return true;
};

const readAutoplay = (
  params: URLSearchParams
): { autoplay: boolean; forceMuted: boolean } => {
  if (!params.has("autoplay")) {
    return { autoplay: false, forceMuted: false };
  }

  const value = (params.get("autoplay") ?? "").trim().toLowerCase();
  if (value === "false" || value === "0") {
    return { autoplay: false, forceMuted: false };
  }

  if (value === "muted") {
    return { autoplay: true, forceMuted: true };
  }

  return { autoplay: true, forceMuted: false };
};

const readPosterTime = (params: URLSearchParams): number | null => {
  const raw = params.get("poster-time") ?? params.get("thumbnail-time");
  if (raw === null || raw.trim() === "") {
    return null;
  }

  const value = Number(raw);
  return Number.isFinite(value) ? value : null;
};

const appendPlaybackParams = (
  target: URLSearchParams,
  source: URLSearchParams
): void => {
  for (const [name, output] of PLAYBACK_PARAM_NAMES) {
    const value = source.get(name);
    if (value) {
      target.set(output, value);
    }
  }
};

/** HLS URL for a playback id or any Mux player/stream URL, keeping playback query params. */
export const toMuxHlsUrl = function toMuxHlsUrl(src: string): string {
  const trimmed = src.trim();
  if (
    /^https?:\/\/(?:www\.)?stream\.mux\.com\/[^?#]+\.m3u8(?:\?|$)/iu.test(
      trimmed
    )
  ) {
    return trimmed;
  }

  const playbackId = getMuxPlaybackId(trimmed);
  if (!playbackId) {
    return "";
  }

  const params = new URLSearchParams();
  if (/^https?:\/\//iu.test(trimmed)) {
    try {
      appendPlaybackParams(params, new URL(trimmed).searchParams);
    } catch {
      // A non-URL id already fell through above.
    }
  }

  const query = params.toString();
  const base = `https://stream.mux.com/${playbackId}.m3u8`;
  return query ? `${base}?${query}` : base;
};

const emptyEmbed = (playbackId: string, src: string): MuxEmbed => ({
  autoplay: false,
  controls: true,
  loop: false,
  muted: false,
  playbackId,
  poster: null,
  posterTime: null,
  src,
  title: null,
});

/** Describe a Mux playback id or URL. Image URLs and other hosts are not embeds. */
export const describeMuxEmbed = function describeMuxEmbed(
  src: string | null | undefined
): MuxEmbed | null {
  if (src === null || src === undefined) {
    return null;
  }

  const trimmed = src.trim();
  if (!trimmed) {
    return null;
  }

  if (!/^https?:\/\//iu.test(trimmed)) {
    const playbackId = getMuxPlaybackId(trimmed);
    if (!playbackId) {
      return null;
    }

    return emptyEmbed(playbackId, trimmed);
  }

  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    return null;
  }

  const host = muxHost(url.hostname);
  if (host !== "player.mux.com" && host !== "stream.mux.com") {
    return null;
  }

  const playbackId = playbackIdFromUrl(url);
  if (!playbackId) {
    return null;
  }

  const autoplay = readAutoplay(url.searchParams);
  const muted = flagFromSearch(url.searchParams, "muted");
  const loop = flagFromSearch(url.searchParams, "loop");
  const controls = flagFromSearch(url.searchParams, "controls");
  const poster = url.searchParams.get("poster");

  return {
    autoplay: autoplay.autoplay,
    controls: controls ?? true,
    loop: loop ?? false,
    muted: autoplay.forceMuted || (muted ?? false),
    playbackId,
    poster: poster?.trim() ? poster : null,
    posterTime: readPosterTime(url.searchParams),
    src: trimmed,
    title:
      url.searchParams.get("metadata-video-title") ??
      url.searchParams.get("title") ??
      url.searchParams.get("video-title"),
  };
};

export const flagValue = (value: unknown): boolean | null => {
  if (value === undefined || value === null) {
    return null;
  }

  if (value === true) {
    return true;
  }

  if (value === false) {
    return false;
  }

  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim().toLowerCase();
  if (normalized === "" || normalized === "true" || normalized === "1") {
    return true;
  }

  if (normalized === "false" || normalized === "0") {
    return false;
  }

  return true;
};

export const controlsHiddenFromStyle = (style: unknown): boolean => {
  if (typeof style === "string") {
    return /--controls\s*:\s*none/iu.test(style);
  }

  if (style !== null && typeof style === "object" && "--controls" in style) {
    const value = (style as { "--controls"?: unknown })["--controls"];
    return typeof value === "string" && value.trim().toLowerCase() === "none";
  }

  return false;
};

interface MuxElementInput {
  autoplay?: unknown;
  controls?: unknown;
  kind: MuxEmbedKind;
  loop?: unknown;
  muted?: unknown;
  playbackId?: string | null;
  poster?: string | null;
  src?: string | null;
  style?: unknown;
  title?: string | null;
}

const controlsForElement = (
  input: MuxElementInput,
  fallback: boolean
): boolean => {
  const controls = flagValue(input.controls);
  if (controlsHiddenFromStyle(input.style)) {
    return false;
  }

  if (input.kind === "video" && controls === null) {
    return false;
  }

  return controls ?? fallback;
};

const withElementFlags = (
  base: MuxEmbed,
  input: MuxElementInput
): MuxEmbed => ({
  autoplay: flagValue(input.autoplay) ?? base.autoplay,
  controls: controlsForElement(input, base.controls),
  loop: flagValue(input.loop) ?? base.loop,
  muted: flagValue(input.muted) ?? base.muted,
  playbackId: base.playbackId,
  poster: input.poster?.trim() || base.poster,
  posterTime: base.posterTime,
  src: base.src,
  title: input.title?.trim() || base.title,
});

/**
 * Merge element attributes onto a Mux URL or playback id.
 * A raw `<video>` without `controls` is treated as a hidden-control embed.
 */
export const describeMuxElement = function describeMuxElement(
  input: MuxElementInput
): MuxEmbed | null {
  const source = input.src?.trim() ?? "";
  const fromSource = source ? describeMuxEmbed(source) : null;
  const playbackId = fromSource?.playbackId || input.playbackId?.trim() || "";
  if (!playbackId) {
    return null;
  }

  const base = fromSource ?? emptyEmbed(playbackId, source || playbackId);
  return withElementFlags(base, input);
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
