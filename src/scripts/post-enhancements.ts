import { watchHeadingArrival } from "@/lib/heading-arrival";
import { describeMuxElement } from "@/lib/video-source";
import type { MuxEmbed, MuxEmbedKind } from "@/lib/video-source";
import {
  embedFromDataset,
  mountMuxEmbed,
  muxEmbedDataset,
} from "@/lib/videojs-player";

const stringAttr = (value: string | null): string | null => {
  const trimmed = value?.trim() ?? "";
  return trimmed || null;
};

const embedFromNode = (node: Element): MuxEmbed | null => {
  if (!(node instanceof HTMLElement)) {
    return null;
  }

  if (node.dataset.muxPlaybackId) {
    return embedFromDataset(node);
  }

  const kind: MuxEmbedKind | null = (() => {
    if (node instanceof HTMLIFrameElement) {
      return "iframe";
    }
    if (node instanceof HTMLVideoElement) {
      return "video";
    }
    if (node.localName === "mux-player") {
      return "mux-player";
    }
    return null;
  })();

  if (!kind) {
    return null;
  }

  return describeMuxElement({
    autoplay: node.getAttribute("autoplay"),
    controls: node.getAttribute("controls"),
    kind,
    loop: node.getAttribute("loop"),
    muted: node.getAttribute("muted"),
    playbackId: stringAttr(node.getAttribute("playback-id")),
    poster: stringAttr(node.getAttribute("poster")),
    src: stringAttr(node.getAttribute("src")),
    style: node.getAttribute("style"),
    title:
      stringAttr(node.getAttribute("title")) ??
      stringAttr(node.getAttribute("metadata-video-title")),
  });
};

const placeholderFor = (node: Element, embed: MuxEmbed): HTMLElement => {
  if (node instanceof HTMLElement && node.dataset.muxPlaybackId) {
    return node;
  }

  const host = document.createElement("div");
  host.className = "absolute inset-0 size-full bg-neutral-950";
  if (node instanceof HTMLElement && node.className) {
    host.className = `${node.className} bg-neutral-950`;
  }
  if (node instanceof HTMLElement) {
    host.style.cssText = node.style.cssText;
  }

  for (const [name, value] of Object.entries(muxEmbedDataset(embed))) {
    if (value !== undefined) {
      host.setAttribute(name, value);
    }
  }

  node.replaceWith(host);
  return host;
};

const upgradeMuxPlayer = async (host: HTMLElement): Promise<void> => {
  if (host.dataset.muxReady === "true") {
    return;
  }

  if (!host.dataset.muxPlaybackId) {
    return;
  }

  host.dataset.muxReady = "true";
  try {
    await mountMuxEmbed(host);
  } catch {
    host.dataset.muxReady = "false";
  }
};

const collectHosts = (): HTMLElement[] => {
  const nodes = [
    ...document.querySelectorAll(
      "[data-mux-player], iframe[src*='player.mux.com'], iframe[src*='stream.mux.com'], mux-player, video[src*='mux.com']"
    ),
  ];
  const hosts: HTMLElement[] = [];

  for (const node of nodes) {
    const embed = embedFromNode(node);
    if (!embed) {
      continue;
    }

    hosts.push(placeholderFor(node, embed));
  }

  return hosts;
};

const observeMuxPlayers = (): void => {
  const hosts = collectHosts().filter(
    (host) => host.dataset.muxObserved !== "true"
  );

  if (hosts.length === 0) {
    return;
  }

  if (typeof IntersectionObserver === "undefined") {
    for (const host of hosts) {
      host.dataset.muxObserved = "true";
      void upgradeMuxPlayer(host);
    }
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting || !(entry.target instanceof HTMLElement)) {
          continue;
        }
        observer.unobserve(entry.target);
        void upgradeMuxPlayer(entry.target);
      }
    },
    { rootMargin: "200px" }
  );

  for (const host of hosts) {
    host.dataset.muxObserved = "true";
    observer.observe(host);
  }
};

export const initPostEnhancements = (): void => {
  observeMuxPlayers();
  watchHeadingArrival();
};
