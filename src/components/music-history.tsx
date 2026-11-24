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
  trimListenHistoryDisplay,
} from "@/lib/listening-history";
import type { ListenPlay } from "@/lib/listening-history";
import { listeningIdentity } from "@/lib/listening-recents";
import { persistRecentSession } from "@/lib/record-listening-session";

interface HistoryPayload {
  plays: ListenPlay[];
}

const HISTORY_POLL_MS = 60_000;

const playIdentity = (play: ListenPlay): string =>
  `${listeningPlayKey(play)}:${play.listenedAt}`;

const fetchLatestHistory = async (
  monthKey: string
): Promise<HistoryPayload> => {
  const response = await fetch(
    `/api/listening/history?offset=0&month=${encodeURIComponent(monthKey)}`,
    {
      cache: "no-store",
    }
  );
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
  live = true,
  monthKey,
}: {
  initialPlays: ListenPlay[];
  live?: boolean;
  monthKey: string;
}) => {
  const [plays, setPlays] = useState(() =>
    trimListenHistoryDisplay(initialPlays)
  );
  const [pending, setPending] = useState<ListenPlay[]>([]);
  const [nowPlaying, setNowPlaying] = useState<ObservedListen | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const previousRef = useRef<ObservedListen | null>(null);
  const lastRecordedRef = useRef<ObservedListen | null>(null);
  const skipNetwork = isLikelyBot();

  const refreshLatest = useCallback(async () => {
    let payload: HistoryPayload;
    try {
      payload = await fetchLatestHistory(monthKey);
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
  }, [monthKey]);

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

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(Date.now());
    }, HISTORY_POLL_MS);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (skipNetwork || !live) {
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
  }, [live, onPresence, refreshLatest, skipNetwork]);

  useEffect(() => {
    if (skipNetwork || !live || !nowPlaying || !document.prerendering) {
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
  }, [live, nowPlaying, refreshLatest, skipNetwork]);

  const historyRows = withoutCurrentSession(plays, live ? nowPlaying : null);
  const pendingRows = pending.filter(
    (play) =>
      (nowPlaying === null || !overlapsCurrent(play, nowPlaying)) &&
      !plays.some((existing) => sameListeningSession(existing, play))
  );
  const rows = [...pendingRows, ...historyRows];

  if (!live && rows.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No plays logged this month.
      </p>
    );
  }

  if (live && nowPlaying === null && rows.length === 0) {
    return <p className="text-sm text-muted-foreground">No songs yet.</p>;
  }

  return (
    <ul className="m-0 flex list-none flex-col gap-1 p-0">
      {live && nowPlaying ? (
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
  );
};

export default MusicHistory;
