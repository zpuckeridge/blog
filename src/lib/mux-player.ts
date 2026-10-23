import type { ComponentType } from "react";

export interface MuxPlayerProps {
  accentColor?: string;
  className?: string;
  onPlay?: () => void;
  playbackId: string;
  title?: string;
}

export const loadMuxPlayer = async (): Promise<
  ComponentType<MuxPlayerProps>
> => {
  const module = await import("@mux/mux-player-react");
  return module.default;
};
