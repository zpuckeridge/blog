const YOUTUBE_ID = /^[\w-]{11}$/u;

export const youtubeEmbedUrl = (videoId: string): string | null => {
  if (!YOUTUBE_ID.test(videoId)) {
    return null;
  }
  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`;
};

export const youtubePosterUrl = (videoId: string): string | null => {
  if (!YOUTUBE_ID.test(videoId)) {
    return null;
  }
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
};

/** Replace a click-to-load shell with the YouTube iframe. Idempotent. */
export const mountYoutubeIframe = (
  shell: HTMLElement,
  videoId: string,
  title: string
): void => {
  if (shell.dataset.youtubeReady === "true") {
    return;
  }

  const src = youtubeEmbedUrl(videoId);
  if (!src) {
    return;
  }

  shell.dataset.youtubeReady = "true";
  const iframe = document.createElement("iframe");
  iframe.src = src;
  iframe.title = title;
  iframe.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.allowFullscreen = true;
  iframe.className = "absolute inset-0 size-full border-0";
  iframe.referrerPolicy = "strict-origin-when-cross-origin";
  shell.replaceChildren(iframe);
};
