import type { MuxEmbed } from "@/lib/video-source";
import { toMuxHlsUrl } from "@/lib/video-source";

/** Matches the accent previously set on Mux Player. */
export const VIDEO_ACCENT = "#2563eb";

let playerModules: Promise<void> | undefined;
let backgroundModules: Promise<void> | undefined;

const remember = (
  slot: Promise<void> | undefined,
  assign: (pending: Promise<void> | undefined) => void,
  load: () => Promise<unknown>
): Promise<void> => {
  if (slot) {
    return slot;
  }

  const pending = (async () => {
    try {
      await load();
    } catch (error) {
      assign(undefined);
      throw error;
    }
  })();
  assign(pending);
  return pending;
};

/** Registers `<video-player>`, the Default skin, `<mux-video>`, and Mux Data. */
export const loadVideoJsPlayer = (): Promise<void> =>
  remember(
    playerModules,
    (pending) => {
      playerModules = pending;
    },
    () =>
      Promise.all([
        import("@videojs/html/video/player"),
        import("@videojs/html/video/skin"),
        import("@videojs/html/media/mux-video"),
        import("@videojs/html/extensions/mux-data"),
      ])
  );

/** Registers the chrome-less background player and `<mux-background-video>`. */
export const loadVideoJsBackground = (): Promise<void> =>
  remember(
    backgroundModules,
    (pending) => {
      backgroundModules = pending;
    },
    () =>
      Promise.all([
        import("@videojs/html/background/player"),
        import("@videojs/html/background/skin"),
        import("@videojs/html/background/video"),
        import("@videojs/html/media/mux-background-video"),
      ])
  );

export const muxEmbedDataset = (
  embed: MuxEmbed
): Record<string, string | undefined> => ({
  "data-mux-autoplay": embed.autoplay ? "true" : undefined,
  "data-mux-background": embed.controls ? undefined : "true",
  "data-mux-loop": embed.loop ? "true" : undefined,
  "data-mux-muted": embed.muted ? "true" : undefined,
  "data-mux-playback-id": embed.playbackId,
  "data-mux-player": "",
  "data-mux-poster": embed.poster ?? undefined,
  "data-mux-poster-time":
    embed.posterTime === null ? undefined : String(embed.posterTime),
  "data-mux-src": embed.src,
  "data-mux-title": embed.title ?? undefined,
});

const posterTimeFrom = (value: string | undefined): number | null => {
  if (!value) {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

export const embedFromDataset = (host: HTMLElement): MuxEmbed | null => {
  const playbackId = host.dataset.muxPlaybackId;
  if (!playbackId) {
    return null;
  }

  return {
    autoplay: host.dataset.muxAutoplay === "true",
    controls: host.dataset.muxBackground !== "true",
    loop: host.dataset.muxLoop === "true",
    muted: host.dataset.muxMuted === "true",
    playbackId,
    poster: host.dataset.muxPoster ?? null,
    posterTime: posterTimeFrom(host.dataset.muxPosterTime),
    src: host.dataset.muxSrc || playbackId,
    title: host.dataset.muxTitle ?? null,
  };
};

const fillBox = "absolute inset-0 block size-full";

const createPlayer = (embed: MuxEmbed, hls: string): HTMLElement => {
  const player = document.createElement("video-player");
  player.className = fillBox;
  if (embed.title) {
    player.setAttribute("content-title", embed.title);
  }
  if (embed.poster) {
    player.setAttribute("poster", embed.poster);
  }

  const skin = document.createElement("video-skin");
  skin.className = fillBox;
  skin.style.setProperty("--media-accent-color", VIDEO_ACCENT);

  const media = document.createElement("mux-video");
  media.setAttribute("src", hls);
  media.setAttribute("playsinline", "");
  media.setAttribute("crossorigin", "anonymous");
  if (embed.autoplay) {
    media.setAttribute("autoplay", "");
  }
  if (embed.muted) {
    media.setAttribute("muted", "");
  }
  if (embed.loop) {
    media.setAttribute("loop", "");
  }
  if (embed.posterTime !== null) {
    media.setAttribute("poster-time", String(embed.posterTime));
  }

  const analytics = document.createElement("mux-data");
  if (embed.title) {
    analytics.setAttribute("metadata-video-title", embed.title);
  }

  skin.append(media, analytics);
  player.append(skin);
  return player;
};

const createBackground = (embed: MuxEmbed, hls: string): HTMLElement => {
  const player = document.createElement("background-video-player");
  player.className = fillBox;

  const skin = document.createElement("background-video-skin");
  skin.className = fillBox;

  const media = document.createElement("mux-background-video");
  media.setAttribute("src", hls);
  media.setAttribute("playsinline", "");
  media.setAttribute("crossorigin", "anonymous");
  if (!embed.autoplay) {
    media.setAttribute("noautoplay", "");
  }
  if (!embed.loop) {
    media.setAttribute("noloop", "");
  }

  const poster =
    embed.poster ?? `https://image.mux.com/${embed.playbackId}/thumbnail.jpg`;
  const image = document.createElement("img");
  image.alt = "";
  image.src = poster;
  media.append(image);
  skin.append(media);
  player.append(skin);
  return player;
};

/** Mount Video.js into a placeholder. Hidden controls use mux-background-video. */
export const mountMuxEmbed = async (host: HTMLElement): Promise<void> => {
  if (host.querySelector("video-player, background-video-player")) {
    return;
  }

  const embed = embedFromDataset(host);
  if (!embed) {
    return;
  }

  const hls = toMuxHlsUrl(embed.src);
  if (!hls) {
    return;
  }

  if (embed.controls) {
    await loadVideoJsPlayer();
    host.append(createPlayer(embed, hls));
    return;
  }

  await loadVideoJsBackground();
  host.append(createBackground(embed, hls));
};
