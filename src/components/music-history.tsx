import { useCallback, useEffect, useRef, useState } from "react";

import {
  ListeningPlayRow,
  recordListeningClick,
} from "@/components/listening-play-row";
import {
  expandableListMetaClassName,
  expandableListSectionHeaderMainClassName,
} from "@/lib/expandable-list";
import { isLikelyBot } from "@/lib/is-likely-bot";
import { watchLanyardPresence } from "@/lib/lanyard-presence-hub";
import { LANYARD_USER_ID, parseAppleMusicActivity } from "@/lib/lanyard-status";
import type { LanyardPresence, ObservedListen } from "@/lib/lanyard-status";
import {
  isPlayedToday,
  listenPlayedAt,
  listeningPlayKey,
  mergeLatestPlays,
  sameListeningSession,
  trimListenHistoryDisplay,
} from "@/lib/listening-history";
import type { ListenPlay } from "@/lib/listening-history";
import { listeningIdentity } from "@/lib/listening-recents";
import { siteLocale } from "@/lib/site";
import { cn } from "@/lib/utils";

interface HistoryPayload {
  plays: ListenPlay[];
}

const HISTORY_POLL_MS = 60_000;

const playIdentity = (play: ListenPlay): string =>
  `${listeningPlayKey(play)}:${play.listenedAt}`;

const songCountLabel = (count: number): string =>
  `${count.toLocaleString(siteLocale)} ${count === 1 ? "song" : "songs"}`;

const PlayGroupHeader = ({ meta, title }: { meta: string; title: string }) => (
  <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_minmax(5ch,max-content)] items-center gap-x-4">
    <div className={expandableListSectionHeaderMainClassName}>
      <p className="shrink-0 text-muted-foreground text-sm">{title}</p>
      <hr className="min-w-0 flex-1 border-dotted border-border" />
    </div>
    <p
      className={cn(
        expandableListMetaClassName,
        "text-muted-foreground text-sm"
      )}
    >
      {meta}
    </p>
  </div>
);

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

const PlayList = ({
  now,
  plays,
}: {
  now: number;
  plays: readonly ListenPlay[];
}) => (
  <ul className="m-0 flex list-none flex-col gap-1 p-0">
    {plays.map((play) => (
      <ListeningPlayRow
        key={playIdentity(play)}
        listen={{ ...play, playedAt: listenPlayedAt(play) }}
        now={now}
        onTrackClick={() => recordListeningClick(play)}
      />
    ))}
  </ul>
);

const TodayPlays = ({
  now,
  nowPlaying,
  plays,
}: {
  now: number;
  nowPlaying: ObservedListen | null;
  plays: readonly ListenPlay[];
}) => (
  <section className="space-y-2">
    <PlayGroupHeader
      meta={songCountLabel(plays.length + (nowPlaying ? 1 : 0))}
      title="Today"
    />
    {nowPlaying || plays.length > 0 ? (
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
        {plays.map((play) => (
          <ListeningPlayRow
            key={playIdentity(play)}
            listen={{ ...play, playedAt: listenPlayedAt(play) }}
            now={now}
            onTrackClick={() => recordListeningClick(play)}
          />
        ))}
      </ul>
    ) : (
      <p className="text-sm text-muted-foreground">Nothing played today.</p>
    )}
  </section>
);

const EarlierPlays = ({
  now,
  plays,
}: {
  now: number;
  plays: readonly ListenPlay[];
}) => (
  <section className="space-y-2">
    <PlayGroupHeader meta={songCountLabel(plays.length)} title="Earlier" />
    <PlayList now={now} plays={plays} />
  </section>
);

const partitionByToday = (plays: readonly ListenPlay[], now: number) => {
  const today: ListenPlay[] = [];
  const earlier: ListenPlay[] = [];
  for (const play of plays) {
    if (isPlayedToday(listenPlayedAt(play), now)) {
      today.push(play);
    } else {
      earlier.push(play);
    }
  }
  return { earlier, today };
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
  const [nowPlaying, setNowPlaying] = useState<ObservedListen | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const previousRef = useRef<ObservedListen | null>(null);
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
  }, [monthKey]);

  const onPresence = useCallback(
    (presence: LanyardPresence) => {
      const next = parseAppleMusicActivity(presence.activities);
      const previous = previousRef.current;
      previousRef.current = next;
      setNowPlaying(next);

      if (
        !document.prerendering &&
        previous &&
        (next === null || !sameListeningSession(previous, next))
      ) {
        void refreshLatest();
      }
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

  const rows = withoutCurrentSession(plays, live ? nowPlaying : null);
  const { earlier, today } = partitionByToday(rows, now);

  if (!live) {
    if (rows.length === 0) {
      return (
        <p className="text-sm text-muted-foreground">
          No plays logged this month.
        </p>
      );
    }

    return <PlayList now={now} plays={rows} />;
  }

  if (nowPlaying === null && rows.length === 0) {
    return <p className="text-sm text-muted-foreground">No songs yet.</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <TodayPlays now={now} nowPlaying={nowPlaying} plays={today} />
      {earlier.length > 0 ? <EarlierPlays now={now} plays={earlier} /> : null}
    </div>
  );
};

export default MusicHistory;
