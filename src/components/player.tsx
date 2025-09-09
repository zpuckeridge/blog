import MuxPlayer from "@mux/mux-player-react/lazy";

export default function Player({ src }: { src: string }) {
	return <MuxPlayer accentColor="#2563eb" playbackId={src} style={{ aspectRatio: 16 / 9 }} />;
}
