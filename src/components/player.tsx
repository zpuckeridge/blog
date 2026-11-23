import { useEffect, useRef, useState } from "react";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";
import {
  describeMuxEmbed,
  extractYoutubeVideoId,
  toMuxHlsUrl,
} from "@/lib/video-source";
import type { MuxEmbed } from "@/lib/video-source";
import {
  loadVideoJsPlayer,
  muxEmbedDataset,
  VIDEO_ACCENT,
} from "@/lib/videojs-player";
import { youtubeEmbedUrl } from "@/lib/youtube-facade";

const playerShell = "relative aspect-[16/9] w-full shrink-0 overflow-hidden";

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

/** Non-Mux iframe. Kept in this file so the sandbox exception stays with the YouTube embed. */
export const ExternalIframe = ({
  className,
  src,
  style,
  title,
  ...props
}: ComponentProps<"iframe">) => (
  // oxlint-disable-next-line react/iframe-missing-sandbox, react-doctor/iframe-missing-sandbox -- third-party embeds need the same capabilities as the YouTube player
  <iframe
    className={className}
    src={src}
    style={style}
    title={title}
    {...props}
  />
);

/** Placeholder upgraded by `initPostEnhancements` on timeline posts. */
export const DeferredMuxFrame = ({
  className,
  embed,
}: {
  className?: string;
  embed: MuxEmbed;
}) => (
  <div className={cn(playerShell, className)}>
    <div
      className="absolute inset-0 size-full bg-neutral-950"
      {...muxEmbedDataset(embed)}
    />
  </div>
);

const VideoJsEmbed = ({
  embed,
  onPlay,
}: {
  embed: MuxEmbed;
  onPlay?: () => void;
}) => {
  const shellRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const hls = toMuxHlsUrl(embed.src);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      await loadVideoJsPlayer();
      if (!cancelled) {
        setReady(true);
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!ready) {
      return;
    }

    const media = shellRef.current?.querySelector("mux-video");
    if (!media || !onPlay) {
      return;
    }

    const handlePlay = () => {
      onPlay();
    };
    media.addEventListener("play", handlePlay);
    return () => {
      media.removeEventListener("play", handlePlay);
    };
  }, [onPlay, ready]);

  if (!ready || !hls) {
    return <div className="absolute inset-0 size-full bg-neutral-950" />;
  }

  return (
    <div className="absolute inset-0 size-full" ref={shellRef}>
      <video-player
        content-title={embed.title ?? undefined}
        poster={embed.poster ?? undefined}
      >
        <video-skin
          className="absolute inset-0 block size-full"
          style={
            { "--media-accent-color": VIDEO_ACCENT } as React.CSSProperties
          }
        >
          <mux-video
            autoPlay={embed.autoplay || undefined}
            crossOrigin="anonymous"
            loop={embed.loop || undefined}
            muted={embed.muted || undefined}
            playsInline
            poster-time={embed.posterTime ?? undefined}
            src={hls}
          />
          <mux-data metadata-video-title={embed.title ?? undefined} />
        </video-skin>
      </video-player>
    </div>
  );
};

const Player = ({
  className,
  deferMux = false,
  onPlay,
  src,
  title = "Video",
}: {
  className?: string;
  /** When true, timeline `initPostEnhancements` upgrades the embed. */
  deferMux?: boolean;
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

  const described = describeMuxEmbed(src);
  if (!described) {
    return null;
  }

  const embed = { ...described, title };

  if (deferMux) {
    return <DeferredMuxFrame className={className} embed={embed} />;
  }

  return (
    <div className={cn(playerShell, className)}>
      <VideoJsEmbed embed={embed} onPlay={onPlay} />
    </div>
  );
};

export default Player;
