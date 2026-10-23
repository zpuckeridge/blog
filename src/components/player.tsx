import { useEffect, useState } from "react";
import type { ComponentType } from "react";

import { loadMuxPlayer } from "@/lib/mux-player";
import type { MuxPlayerProps } from "@/lib/mux-player";
import { cn } from "@/lib/utils";
import { extractYoutubeVideoId, getMuxPlaybackId } from "@/lib/video-source";
import { mountYoutubeIframe, youtubePosterUrl } from "@/lib/youtube-facade";

const playerShell = "relative aspect-[16/9] w-full shrink-0 overflow-hidden";

const MuxEmbed = ({
  onPlay,
  playbackId,
  title,
}: {
  onPlay?: () => void;
  playbackId: string;
  title: string;
}) => {
  const [muxPlayer, setMuxPlayer] =
    useState<ComponentType<MuxPlayerProps> | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const player = await loadMuxPlayer();
      if (!cancelled) {
        setMuxPlayer(() => player);
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!muxPlayer) {
    return (
      <div
        className="absolute inset-0 size-full bg-neutral-950"
        data-mux-playback-id={playbackId}
        data-mux-player=""
        data-mux-title={title}
      />
    );
  }

  const MuxPlayerView = muxPlayer;
  return (
    <MuxPlayerView
      accentColor="#2563eb"
      className="absolute inset-0 size-full"
      onPlay={onPlay}
      playbackId={playbackId}
      title={title}
    />
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
    const poster = youtubePosterUrl(youtubeId);
    return (
      <div className={cn(playerShell, "bg-neutral-950", className)}>
        <button
          className="absolute inset-0 size-full cursor-pointer"
          data-youtube-facade=""
          data-youtube-id={youtubeId}
          data-youtube-title={title}
          onClick={(event) => {
            onPlay?.();
            const shell = event.currentTarget.parentElement;
            if (shell) {
              mountYoutubeIframe(shell, youtubeId, title);
            }
          }}
          type="button"
        >
          {poster ? (
            <img
              alt=""
              className="absolute inset-0 size-full object-cover"
              height={720}
              src={poster}
              width={1280}
            />
          ) : null}
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="bg-black/70 px-3 py-2 text-sm text-white">
              Play
            </span>
          </span>
          <span className="sr-only">{title}</span>
        </button>
      </div>
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
