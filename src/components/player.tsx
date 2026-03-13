import MuxPlayer from "@mux/mux-player-react/lazy";

const getPlaybackId = (src: string): string => {
  const match = src.match(/stream\.mux\.com\/([^.]+)/);
  return match ? match[1] : src;
};

export default function Player({ src }: { src: string }) {
  return (
    <MuxPlayer
      accentColor="#2563eb"
      playbackId={getPlaybackId(src)}
      style={{ aspectRatio: 16 / 9 }}
    />
  );
}
