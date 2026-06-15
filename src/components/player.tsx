import MuxPlayer from "@mux/mux-player-react/lazy";

import { cn } from "@/lib/utils";
import { extractYoutubeVideoId, getMuxPlaybackId } from "@/lib/video-source";

const playerShell = "relative aspect-[16/9] w-full shrink-0 overflow-hidden";

export default function Player({
  className,
  src,
  title = "YouTube video player",
}: {
  className?: string;
  src: string;
  title?: string;
}) {
  const youtubeId = extractYoutubeVideoId(src);
  if (youtubeId) {
    return (
      <div className={cn(playerShell, className)}>
        {/* YouTube embed requires full embed capabilities; sandbox breaks playback */}
        {/* oxlint-disable-next-line react-doctor/iframe-missing-sandbox */}
        <iframe
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 size-full border-0"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
          title={title}
        />
      </div>
    );
  }

  return (
    <div className={cn(playerShell, className)}>
      <MuxPlayer
        accentColor="#2563eb"
        className="absolute inset-0 size-full"
        playbackId={getMuxPlaybackId(src)}
      />
    </div>
  );
}
