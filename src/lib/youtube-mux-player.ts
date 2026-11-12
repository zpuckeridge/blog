import type { MuxPlayerProps } from "@mux/mux-player-react";
import type { ComponentType } from "react";

/** Registers `youtube-video` and returns Mux Player React for custom media slots. */
export const loadYoutubeMuxPlayer = async (): Promise<
  ComponentType<MuxPlayerProps>
> => {
  await import("youtube-video-element");
  const module = await import("@mux/mux-player-react");
  return module.default;
};

export const youtubeWatchUrl = (videoId: string): string =>
  `https://www.youtube.com/watch?v=${videoId}`;
