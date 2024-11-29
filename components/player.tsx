import MuxPlayer from "@mux/mux-player-react";

export default function Player({ src }: { src: any }) {
  return <MuxPlayer playbackId={src} accentColor="#2563eb" />;
}
