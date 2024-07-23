import "@vidstack/react/player/styles/default/layouts/video.css";
import "@vidstack/react/player/styles/default/theme.css";

import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

export default function Player({ src }: { src: any }) {
  return (
    <MediaPlayer
      src={`https://stream.mux.com/${src}.m3u8`}
      className="rounded-none"
    >
      <MediaProvider />
      <DefaultVideoLayout noScrubGesture icons={defaultLayoutIcons} />
    </MediaPlayer>
  );
}
