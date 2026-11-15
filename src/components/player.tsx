import { cn } from "@/lib/utils";
import { extractYoutubeVideoId, getMuxPlaybackId } from "@/lib/video-source";
import { youtubeEmbedUrl } from "@/lib/youtube-facade";

const playerShell = "relative aspect-[16/9] w-full shrink-0 overflow-hidden";

/** Placeholder upgraded by `initPostEnhancements` when the embed scrolls near view. */
const MuxEmbed = ({
  playbackId,
  title,
}: {
  onPlay?: () => void;
  playbackId: string;
  title: string;
}) => (
  <div
    className="absolute inset-0 size-full bg-neutral-950"
    data-mux-playback-id={playbackId}
    data-mux-player=""
    data-mux-title={title}
  />
);

const YoutubeEmbed = ({
  className,
  title,
  videoId,
}: {
  className?: string;
  title: string;
  videoId: string;
}) => {
  const src = youtubeEmbedUrl(videoId);
  if (!src) {
    return null;
  }

  return (
    <div className={cn(playerShell, className)}>
      <iframe
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 size-full border-0"
        referrerPolicy="strict-origin-when-cross-origin"
        src={src}
        title={title}
      />
    </div>
  );
};

const Player = ({
  className,
  onPlay,
  src,
  title = "Video",
}: {
  className?: string;
  onPlay?: () => void;
  src: string;
  title?: string;
}) => {
  const youtubeId = extractYoutubeVideoId(src);

  if (youtubeId) {
    return (
      <YoutubeEmbed className={className} title={title} videoId={youtubeId} />
    );
  }

  return (
    <div className={cn(playerShell, className)}>
      <MuxEmbed
        onPlay={onPlay}
        playbackId={getMuxPlaybackId(src)}
        title={title}
      />
    </div>
  );
};

export default Player;
