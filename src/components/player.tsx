import type { MuxPlayerProps } from "@mux/mux-player-react";
import { createElement, useEffect, useState } from "react";
import type { ComponentType, ReactNode } from "react";

import { loadMuxPlayer } from "@/lib/mux-player";
import { cn } from "@/lib/utils";
import { extractYoutubeVideoId, getMuxPlaybackId } from "@/lib/video-source";
import { mountYoutubeIframe, youtubePosterUrl } from "@/lib/youtube-facade";
import {
  loadYoutubeMuxPlayer,
  youtubeWatchUrl,
} from "@/lib/youtube-mux-player";

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

/**
 * Fallback when `youtube-video-element` cannot load (blocked script, CSP, or
 * unknown element errors). Keeps the previous nocookie iframe behaviour.
 */
const YoutubeIframeFacade = ({
  className,
  onPlay,
  title,
  videoId,
}: {
  className?: string;
  onPlay?: () => void;
  title: string;
  videoId: string;
}) => {
  const poster = youtubePosterUrl(videoId);
  return (
    <div className={cn(playerShell, "bg-neutral-950", className)}>
      <button
        className="absolute inset-0 size-full cursor-pointer"
        data-youtube-facade=""
        data-youtube-id={videoId}
        data-youtube-title={title}
        onClick={(event) => {
          onPlay?.();
          const shell = event.currentTarget.parentElement;
          if (shell) {
            mountYoutubeIframe(shell, videoId, title);
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
          <span className="bg-black/70 px-3 py-2 text-sm text-white">Play</span>
        </span>
        <span className="sr-only">{title}</span>
      </button>
    </div>
  );
};

const YoutubeMuxEmbed = ({
  className,
  onPlay,
  title,
  videoId,
}: {
  className?: string;
  onPlay?: () => void;
  title: string;
  videoId: string;
}) => {
  const [youtubeMuxPlayer, setYoutubeMuxPlayer] =
    useState<ComponentType<MuxPlayerProps> | null>(null);
  const [useIframeFallback, setUseIframeFallback] = useState(false);
  const poster = youtubePosterUrl(videoId);
  const watchUrl = youtubeWatchUrl(videoId);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const player = await loadYoutubeMuxPlayer();
        if (!cancelled) {
          setYoutubeMuxPlayer(() => player);
        }
      } catch {
        if (!cancelled) {
          setUseIframeFallback(true);
        }
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (useIframeFallback) {
    return (
      <YoutubeIframeFacade
        className={className}
        onPlay={onPlay}
        title={title}
        videoId={videoId}
      />
    );
  }

  if (!youtubeMuxPlayer) {
    return (
      <div className={cn(playerShell, "bg-neutral-950", className)}>
        {poster ? (
          <img
            alt=""
            className="absolute inset-0 size-full object-cover"
            height={720}
            src={poster}
            width={1280}
          />
        ) : null}
        <span className="sr-only">{title}</span>
      </div>
    );
  }

  const YoutubeMuxPlayerView = youtubeMuxPlayer;
  return (
    <div className={cn(playerShell, className)}>
      <YoutubeMuxPlayerView
        accentColor="#2563eb"
        className="absolute inset-0 size-full"
        disableTracking
        onPlay={onPlay}
        onError={() => {
          setUseIframeFallback(true);
        }}
        poster={poster ?? undefined}
        proudlyDisplayMuxBadge={false}
        streamType="on-demand"
        title={title}
        videoTitle={title}
      >
        {
          createElement("youtube-video", {
            crossOrigin: "anonymous",
            poster: poster ?? undefined,
            slot: "media",
            src: watchUrl,
          }) as ReactNode
        }
      </YoutubeMuxPlayerView>
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
      <YoutubeMuxEmbed
        className={className}
        onPlay={onPlay}
        title={title}
        videoId={youtubeId}
      />
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
