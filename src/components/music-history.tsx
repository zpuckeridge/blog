import { useCallback, useEffect, useRef, useState } from "react";

import {
  ListeningPlayRow,
  recordListeningClick,
} from "@/components/listening-play-row";
import { isLikelyBot } from "@/lib/is-likely-bot";
import { watchLanyardPresence } from "@/lib/lanyard-presence-hub";
import { LANYARD_USER_ID, parseAppleMusicActivity } from "@/lib/lanyard-status";
import type { LanyardPresence, ObservedListen } from "@/lib/lanyard-status";
import {
  listenPlayedAt,
  listeningPlayKey,
  mergeLatestPlays,
  sameListeningSession,
} from "@/lib/listening-history";
import type { ListenPlay } from "@/lib/listening-history";
import { listeningIdentity } from "@/lib/listening-recents";
import { persistRecentSession } from "@/lib/record-listening-session";

interface HistoryPayload {
  nextOffset: number | null;
  plays: ListenPlay[];
  total: number;
}

const HISTORY_POLL_MS = 60_000;

const playIdentity = (play: ListenPlay): string =>
  `${listeningPlayKey(play)}:${play.listenedAt}`;

const fetchHistory = async (offset: number): Promise<HistoryPayload> => {
  const response = await fetch(`/api/listening/history?offset=${offset}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Listening history unavailable");
  }

  return response.json() as Promise<HistoryPayload>;
};

const observedToPlay = (song: ObservedListen): ListenPlay => {
  const listenedAt = song.startedAt ?? Date.now();

  return {
    album: song.album,
    artist: song.artist,
    artistUrl: song.artistUrl,
    artworkUrl: song.artworkUrl,
    listenedAt,
    startedAt: song.startedAt,
    track: song.track,
    trackUrl: song.trackUrl,
  };
};

const overlapsCurrent = (play: ListenPlay, song: ObservedListen): boolean => {
  if (sameListeningSession(play, song)) {
    return true;
  }

  if (song.startedAt !== null) {
    return false;
  }

  return listeningIdentity(play) === listeningIdentity(song);
};

const withoutCurrentSession = (
  plays: readonly ListenPlay[],
  song: ObservedListen | null
): readonly ListenPlay[] => {
  if (!song) {
    return plays;
  }

  if (song.startedAt === null) {
    const [latest] = plays;
    if (latest && listeningIdentity(latest) === listeningIdentity(song)) {
      return plays.slice(1);
    }

    return plays;
  }

  return plays.filter((play) => !sameListeningSession(play, song));
};

const MusicHistory = ({
  initialPlays,
  total,
}: {
  initialPlays: ListenPlay[];
  total: number;
}) => {
  const [plays, setPlays] = useState(initialPlays);
  const [pending, setPending] = useState<ListenPlay[]>([]);
  const [nowPlaying, setNowPlaying] = useState<ObservedListen | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [hasMore, setHasMore] = useState(initialPlays.length < total);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);
  const failedRef = useRef(false);
  const offsetRef = useRef(initialPlays.length);
  const totalRef = useRef(total);
  const previousRef = useRef<ObservedListen | null>(null);
  const lastRecordedRef = useRef<ObservedListen | null>(null);
  const skipNetwork = isLikelyBot();

  const refreshLatest = useCallback(async () => {
    let payload: HistoryPayload;
    try {
      payload = await fetchHistory(0);
    } catch {
      return;
    }

    setPlays((current) => {
      const next = mergeLatestPlays(current, payload.plays);
      return next === current ? current : [...next];
    });
    setPending((current) =>
      current.filter(
        (play) =>
          !payload.plays.some((incoming) =>
            sameListeningSession(incoming, play)
          )
      )
    );
    totalRef.current = payload.total;
    setHasMore(offsetRef.current < payload.total);
  }, []);

  const onPresence = useCallback(
    (presence: LanyardPresence) => {
      const next = parseAppleMusicActivity(presence.activities);
      const previous = previousRef.current;

      if (document.prerendering) {
        previousRef.current = next;
        setNowPlaying(next);
        return;
      }

      previousRef.current = next;
      setNowPlaying(next);

      if (
        previous &&
        (next === null || !sameListeningSession(previous, next))
      ) {
        const ended = observedToPlay(previous);
        setPending((current) =>
          current.some((play) => sameListeningSession(play, ended))
            ? current
            : [ended, ...current]
        );
      }

      if (next === null) {
        if (previous) {
          void refreshLatest();
        }
        return;
      }

      void persistRecentSession(next, lastRecordedRef, async () => {
        await refreshLatest();
      });
    },
    [refreshLatest]
  );

  const loadMore = useCallback(async () => {
    if (
      loadingRef.current ||
      failedRef.current ||
      offsetRef.current >= totalRef.current
    ) {
      return;
    }

    loadingRef.current = true;
    setLoading(true);

    try {
      const payload = await fetchHistory(offsetRef.current);
      setPlays((current) => {
        const next = payload.plays.filter(
          (play) =>
            !current.some((existing) => sameListeningSession(existing, play))
        );
        return next.length > 0 ? [...current, ...next] : current;
      });
      offsetRef.current = payload.nextOffset ?? payload.total;
      totalRef.current = payload.total;
      setHasMore(payload.nextOffset !== null);
      loadingRef.current = false;
      setLoading(false);
    } catch {
      failedRef.current = true;
      setFailed(true);
      loadingRef.current = false;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(Date.now());
    }, HISTORY_POLL_MS);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (skipNetwork) {
      return;
    }

    const unsubscribe = watchLanyardPresence(LANYARD_USER_ID, onPresence);
    const poll = window.setInterval(() => {
      void refreshLatest();
    }, HISTORY_POLL_MS);
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        void refreshLatest();
      }
    };

    document.addEventListener("visibilitychange", onVisible);

    return () => {
      unsubscribe();
      window.clearInterval(poll);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [onPresence, refreshLatest, skipNetwork]);

  useEffect(() => {
    if (skipNetwork || !nowPlaying || !document.prerendering) {
      return;
    }

    const song = nowPlaying;
    const onActivate = () => {
      void persistRecentSession(song, lastRecordedRef, async () => {
        await refreshLatest();
      });
    };

    document.addEventListener("prerenderingchange", onActivate, { once: true });

    return () => {
      document.removeEventListener("prerenderingchange", onActivate);
    };
  }, [nowPlaying, refreshLatest, skipNetwork]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !hasMore || plays.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          void loadMore();
        }
      },
      { rootMargin: "240px" }
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, loadMore, plays.length]);

  const retry = () => {
    failedRef.current = false;
    setFailed(false);
    void loadMore();
  };

  const historyRows = withoutCurrentSession(plays, nowPlaying);
  const pendingRows = pending.filter(
    (play) =>
      (nowPlaying === null || !overlapsCurrent(play, nowPlaying)) &&
      !plays.some((existing) => sameListeningSession(existing, play))
  );
  const rows = [...pendingRows, ...historyRows];

  let status = "";
  if (loading) {
    status = "Loading more songs";
  } else if (failed) {
    status = "Couldn't load more songs.";
  }

  if (nowPlaying === null && rows.length === 0) {
    return <p className="text-sm text-muted-foreground">No songs yet.</p>;
  }

  return (
    <div>
      <ul className="m-0 flex list-none flex-col gap-1 p-0">
        {nowPlaying ? (
          <ListeningPlayRow
            key="now-playing"
            listen={{
              ...nowPlaying,
              playedAt: nowPlaying.startedAt ?? now,
            }}
            now={now}
            onTrackClick={() => recordListeningClick(nowPlaying)}
            timeLabel="Now playing"
          />
        ) : null}
        {rows.map((play) => (
          <ListeningPlayRow
            key={playIdentity(play)}
            listen={{ ...play, playedAt: listenPlayedAt(play) }}
            now={now}
            onTrackClick={() => recordListeningClick(play)}
          />
        ))}
      </ul>
      {hasMore ? (
        <div aria-hidden="true" className="h-px" ref={sentinelRef} />
      ) : null}
      <p className="sr-only" aria-live="polite">
        {status}
      </p>
      {failed ? (
        <button
          className="mt-2 cursor-pointer border-0 bg-transparent p-0 text-sm text-muted-foreground hover:bg-muted"
          onClick={retry}
          type="button"
        >
          Try again
        </button>
      ) : null}
    </div>
  );
};

export default MusicHistory;
