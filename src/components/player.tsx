import MuxPlayer from "@mux/mux-player-react";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";
import { extractYoutubeVideoId, getMuxPlaybackId } from "@/lib/video-source";

const playerShell = "relative aspect-[16/9] w-full shrink-0 overflow-hidden";

interface YoutubePlayerEvent {
  data: number;
}

interface YoutubePlayer {
  destroy: () => void;
}

interface YoutubeApi {
  Player: new (
    element: HTMLElement,
    options: {
      events: {
        onStateChange: (event: YoutubePlayerEvent) => void;
      };
      playerVars: {
        origin: string;
      };
    }
  ) => YoutubePlayer;
  PlayerState: {
    PLAYING: number;
  };
}

declare global {
  interface Window {
    YT?: YoutubeApi;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let youtubeApiPromise: Promise<YoutubeApi> | null = null;

const loadYoutubeApi = (): Promise<YoutubeApi> => {
  if (window.YT) {
    return Promise.resolve(window.YT);
  }

  if (youtubeApiPromise) {
    return youtubeApiPromise;
  }

  // oxlint-disable-next-line promise/avoid-new
  youtubeApiPromise = new Promise<YoutubeApi>((resolve, reject) => {
    const previousReadyCallback = window.onYouTubeIframeAPIReady;
    // oxlint-disable-next-line unicorn/prefer-add-event-listener
    window.onYouTubeIframeAPIReady = () => {
      previousReadyCallback?.();
      if (window.YT) {
        resolve(window.YT);
      } else {
        reject(new Error("YouTube IFrame API did not initialise"));
      }
    };

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.youtube.com/iframe_api";
    script.addEventListener("error", () => {
      reject(new Error("Failed to load YouTube IFrame API"));
    });
    document.head.append(script);
  });

  return youtubeApiPromise;
};

const Player = ({
  className,
  onPlay,
  src,
  title = "YouTube video player",
}: {
  className?: string;
  onPlay?: () => void;
  src: string;
  title?: string;
}) => {
  const youtubeId = extractYoutubeVideoId(src);
  const youtubeIframeRef = useRef<HTMLIFrameElement>(null);
  const onPlayRef = useRef(onPlay);

  useEffect(() => {
    onPlayRef.current = onPlay;
  }, [onPlay]);

  useEffect(() => {
    if (!youtubeId || !youtubeIframeRef.current) {
      return;
    }

    let player: YoutubePlayer | undefined;
    let cancelled = false;

    const initializeYoutubePlayer = async () => {
      try {
        const youtube = await loadYoutubeApi();
        if (cancelled || !youtubeIframeRef.current) {
          return;
        }

        player = new youtube.Player(youtubeIframeRef.current, {
          events: {
            onStateChange: (event) => {
              if (event.data === youtube.PlayerState.PLAYING) {
                onPlayRef.current?.();
              }
            },
          },
          playerVars: {
            origin: window.location.origin,
          },
        });
      } catch {
        // The iframe remains playable if the API cannot be loaded.
      }
    };
    void initializeYoutubePlayer();

    return () => {
      cancelled = true;
      player?.destroy();
    };
  }, [youtubeId]);

  if (youtubeId) {
    return (
      <div className={cn(playerShell, className)}>
        {/* YouTube embed requires full embed capabilities; sandbox breaks playback */}
        {/* oxlint-disable-next-line react-doctor/iframe-missing-sandbox */}
        <iframe
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 size-full border-0"
          referrerPolicy="strict-origin-when-cross-origin"
          ref={youtubeIframeRef}
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?enablejsapi=1`}
          title={title}
        />
      </div>
    );
  }

  return (
    <div className={cn(playerShell, className)}>
      <MuxPlayer
        accentColor="#2563eb"
        aria-label={title}
        className="absolute inset-0 size-full"
        onPlay={onPlay}
        playbackId={getMuxPlaybackId(src)}
        title={title}
      />
    </div>
  );
};

export default Player;
