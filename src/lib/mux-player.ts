import type { MuxPlayerProps } from "@mux/mux-player-react";
import type { ComponentType } from "react";

export const loadMuxPlayer = async (): Promise<
  ComponentType<MuxPlayerProps>
> => {
  const module = await import("@mux/mux-player-react");
  return module.default;
};
