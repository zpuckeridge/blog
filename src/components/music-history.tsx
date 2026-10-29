import { useCallback, useEffect, useRef, useState } from "react";

import {
  ListeningPlayRow,
  recordListeningClick,
} from "@/components/listening-play-row";
import { listenPlayedAt, listeningPlayKey } from "@/lib/listening-history";
import type { ListenPlay } from "@/lib/listening-history";

interface HistoryPayload {
  nextOffset: number | null;
  plays: ListenPlay[];
  total: number;
}

const playIdentity = (play: ListenPlay): string =>
  `${listeningPlayKey(play)}:${play.listenedAt}`;

const fetchHistory = async (offset: number): Promise<HistoryPayload> => {
  const response = await fetch(`/api/listening/history?offset=${offset}`);
  if (!response.ok) {
    throw new Error("Listening history unavailable");
  }

  return response.json() as Promise<HistoryPayload>;
};

const MusicHistory = ({
  initialPlays,
  total,
}: {
  initialPlays: ListenPlay[];
  total: number;
}) => {
  const [plays, setPlays] = useState(initialPlays);
  const [now, setNow] = useState(() => Date.now());
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [hasMore, setHasMore] = useState(initialPlays.length < total);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);
  const failedRef = useRef(false);
  const offsetRef = useRef(initialPlays.length);
  const totalRef = useRef(total);

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
        const seen = new Set(current.map((play) => playIdentity(play)));
        const next = payload.plays.filter(
          (play) => !seen.has(playIdentity(play))
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
    }, 60_000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

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

  let status = "";
  if (loading) {
    status = "Loading more songs";
  } else if (failed) {
    status = "Couldn't load more songs.";
  }

  return (
    <div>
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
