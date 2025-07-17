import MuxPlayer from "@mux/mux-player-react/lazy";

export default function Player({ src }: { src: string }) {
	return <MuxPlayer style={{ aspectRatio: 16 / 9 }} playbackId={src} accentColor="#2563eb" />;
}
