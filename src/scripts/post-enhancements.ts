import { watchHeadingArrival } from "@/lib/heading-arrival";

const upgradeMuxPlayer = async (host: HTMLElement): Promise<void> => {
  if (host.dataset.muxReady === "true") {
    return;
  }

  const playbackId = host.dataset.muxPlaybackId;
  if (!playbackId) {
    return;
  }

  host.dataset.muxReady = "true";
  try {
    await import("@mux/mux-player");
  } catch {
    host.dataset.muxReady = "false";
    return;
  }

  const player = document.createElement("mux-player");
  player.setAttribute("playback-id", playbackId);
  player.setAttribute("accent-color", "#2563eb");
  const title = host.dataset.muxTitle;
  if (title) {
    player.setAttribute("title", title);
  }
  player.className = "absolute inset-0 size-full";
  host.append(player);
};

const observeMuxPlayers = (): void => {
  const hosts = [
    ...document.querySelectorAll<HTMLElement>("[data-mux-player]"),
  ].filter((host) => host.dataset.muxObserved !== "true");

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
