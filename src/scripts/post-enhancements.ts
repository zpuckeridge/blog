import { mountYoutubeIframe } from "@/lib/youtube-facade";

let listening = false;

const announce = (message: string): void => {
  const status = document.querySelector("[data-copy-status]");
  if (status) {
    status.textContent = message;
  }
};

const copyText = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
    announce("Copied");
  } catch {
    announce("Could not copy");
  }
};

const onDocumentClick = (event: MouseEvent): void => {
  const { target } = event;
  if (!(target instanceof Element)) {
    return;
  }

  const copyButton = target.closest("[data-copy-link], [data-copy-article]");
  if (copyButton instanceof HTMLButtonElement) {
    const article = document.querySelector("article");
    const text = Object.hasOwn(copyButton.dataset, "copyArticle")
      ? (article?.textContent ?? "")
      : window.location.href;
    void copyText(text);
    return;
  }

  const youtube = target.closest("[data-youtube-facade]");
  if (youtube instanceof HTMLButtonElement) {
    const shell = youtube.parentElement;
    const videoId = youtube.dataset.youtubeId;
    if (shell && videoId) {
      mountYoutubeIframe(
        shell,
        videoId,
        youtube.dataset.youtubeTitle ?? "YouTube video"
      );
    }
  }
};

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
  if (!listening) {
    listening = true;
    document.addEventListener("click", onDocumentClick);
  }
  observeMuxPlayers();
};
