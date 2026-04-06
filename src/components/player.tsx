import MuxPlayer from "@mux/mux-player-react/lazy";

import { extractYoutubeVideoId, getMuxPlaybackId } from "@/lib/video-source";

const playerShell = "aspect-video w-full overflow-hidden rounded-lg";

export default function Player({ src }: { src: string }) {
  const youtubeId = extractYoutubeVideoId(src);
  if (youtubeId) {
    return (
      <div className={playerShell}>
        {/* YouTube embed requires full embed capabilities; sandbox breaks playback */}
        {/* oxlint-disable-next-line eslint-plugin-react/iframe-missing-sandbox */}
        <iframe
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="block h-full w-full border-0"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
          title="YouTube video player"
        />
      </div>
    );
  }

  return (
    <div className={playerShell}>
      <MuxPlayer
        accentColor="#2563eb"
        className="block h-full w-full"
        playbackId={getMuxPlaybackId(src)}
      />
    </div>
  );
}
