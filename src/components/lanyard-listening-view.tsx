import { useCallback, useEffect, useRef, useState } from "react";
import { RxChevronDown } from "react-icons/rx";
import useSWR from "swr";

import {
  ArtworkPlaceholder,
  ListeningArtwork,
  ListeningLink,
  ListeningPlayRow,
  recordListeningClick,
} from "@/components/listening-play-row";
import { isLikelyBot } from "@/lib/is-likely-bot";
import { watchLanyardPresence } from "@/lib/lanyard-presence-hub";
import { LANYARD_USER_ID, parseAppleMusicActivity } from "@/lib/lanyard-status";
import type {
  LanyardPresence,
  NowListening,
  ObservedListen,
} from "@/lib/lanyard-status";
import { listeningPlayKey } from "@/lib/listening-history";
import { listeningIdentity } from "@/lib/listening-recents";
import type { RecentListen } from "@/lib/listening-recents";
import { formatLocationRelativeTime } from "@/lib/location-status";
import { cn } from "@/lib/utils";

const ROW_CLASS = "flex min-h-9 min-w-0 items-center gap-2.5";
const TEXT_CLASS = "min-w-0 flex-1 leading-none";
const LISTENING_LINKS_ROW_CLASS = "-mx-1 min-w-0 px-1";
const LISTENING_TRACKS_CLASS =
  "flex min-w-0 items-baseline gap-2 text-sm leading-tight";
const RECENTS_REVEAL_EASE = "cubic-bezier(0.23, 1, 0.32, 1)";

const ListeningEmptyState = () => (
  <div className={ROW_CLASS}>
    <ArtworkPlaceholder />
    <div className={TEXT_CLASS}>
      <p className="truncate text-sm leading-tight text-muted-foreground">
        Nothing playing
      </p>
      <p
        aria-hidden="true"
        className="truncate text-sm leading-tight text-transparent select-none"
      >
        —
      </p>
    </div>
  </div>
);

const ListeningTrackState = ({
  expanded,
  label,
  listenedAt,
  listening,
  now,
  onTrackClick,
  onToggle,
}: {
  expanded: boolean;
  label: string;
  listenedAt?: number;
  listening: NowListening;
  now: number;
  onTrackClick: () => void;
  onToggle: () => void;
}) => (
  <div
    className={cn(
      ROW_CLASS,
      "hover:bg-muted has-[a:hover]:bg-transparent has-[[data-listening-interactive]:hover]:bg-transparent"
    )}
  >
    <ListeningArtwork listening={listening} />

    <button
      aria-controls="listening-recents"
      aria-expanded={expanded}
      aria-label={
        expanded ? "Hide recently played tracks" : "Show recently played tracks"
      }
      className="flex min-h-9 min-w-0 flex-1 cursor-pointer items-center gap-2.5 border-0 bg-transparent p-0 text-left"
      onClick={onToggle}
      type="button"
    >
      <div className={cn(TEXT_CLASS, LISTENING_LINKS_ROW_CLASS)}>
        <p className="flex min-w-0 items-baseline gap-2 text-sm leading-tight text-muted-foreground">
          <span className="min-w-0 truncate">{label}</span>
          {listenedAt === undefined ? null : (
            <>
              <span aria-hidden="true" className="shrink-0 select-none">
                •
              </span>
              <span className="shrink-0 tabular-nums">
                {formatLocationRelativeTime(listenedAt, now)}
              </span>
            </>
          )}
        </p>
        <div
          className={LISTENING_TRACKS_CLASS}
          title={`${listening.track} • ${listening.artist}`}
        >
          <ListeningLink
            className="text-inherit"
            href={listening.trackUrl}
            label={listening.track}
            onClick={onTrackClick}
            truncate
          />
          <span
            aria-hidden="true"
            className="shrink-0 text-muted-foreground select-none"
          >
            •
          </span>
          <ListeningLink
            className="text-muted-foreground"
            href={listening.artistUrl}
            label={listening.artist}
            truncate
          />
        </div>
      </div>

      <RxChevronDown
        aria-hidden="true"
        className={cn(
          "size-3.5 shrink-0 self-end text-muted-foreground transition-transform duration-200 motion-reduce:transition-none",
          expanded && "rotate-180"
        )}
      />
    </button>
  </div>
);

const fetchRecents = async (): Promise<RecentListen[]> => {
  try {
    const response = await fetch("/api/listening/recents");
    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as { recents?: RecentListen[] };
    return Array.isArray(payload.recents) ? payload.recents : [];
  } catch {
    return [];
  }
};

const recordRecent = async (): Promise<RecentListen[] | null> => {
  try {
    const response = await fetch("/api/listening/recents", { method: "POST" });
    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as { recents?: RecentListen[] };
    return Array.isArray(payload.recents) ? payload.recents : null;
  } catch {
    return null;
  }
};

const RECENTS_KEY = "/api/listening/recents";

const LanyardListeningView = () => {
  const [listening, setListening] = useState<ObservedListen | null>(null);
  const [showRecents, setShowRecents] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const lastRecordedKeyRef = useRef<string | null>(null);
  const skipNetwork = isLikelyBot();

  const { data: recents = [], mutate } = useSWR(
    skipNetwork ? null : RECENTS_KEY,
    fetchRecents,
    { revalidateOnFocus: false }
  );

  const onPresence = useCallback(
    (presence: LanyardPresence) => {
      const next = parseAppleMusicActivity(presence.activities);
      setListening(next);
      if (!next) {
        return;
      }

      if (document.prerendering) {
        return;
      }

      const key = listeningPlayKey(next);
      if (lastRecordedKeyRef.current === key) {
        return;
      }

      lastRecordedKeyRef.current = key;

      void (async () => {
        const recorded = await recordRecent();
        if (recorded) {
          await mutate(recorded, false);
        }
      })();
    },
    [mutate]
  );

  useEffect(() => {
    if (skipNetwork || !listening || !document.prerendering) {
      return;
    }

    let cancelled = false;

    const onActivate = () => {
      if (
        cancelled ||
        lastRecordedKeyRef.current === listeningPlayKey(listening)
      ) {
        return;
      }

      lastRecordedKeyRef.current = listeningIdentity(listening);

      void (async () => {
        const recorded = await recordRecent();
        if (recorded) {
          await mutate(recorded, false);
        }
      })();
    };

    document.addEventListener("prerenderingchange", onActivate, {
      once: true,
    });

    return () => {
      cancelled = true;
      document.removeEventListener("prerenderingchange", onActivate);
    };
  }, [listening, mutate, skipNetwork]);

  useEffect(() => {
    if (skipNetwork) {
      return;
    }

    const unsubscribe = watchLanyardPresence(LANYARD_USER_ID, onPresence);

    const nowTimer = window.setInterval(() => {
      setNow(Date.now());
    }, 60_000);

    return () => {
      unsubscribe();
      window.clearInterval(nowTimer);
    };
  }, [onPresence, skipNetwork]);

  const mostRecent = recents[0] ?? null;
  const featured = listening ?? mostRecent;
  const featuredLabel = listening ? "Listening to" : "Recently listened to";
  const featuredKey = featured ? listeningIdentity(featured) : null;
  const panelRecents = (
    featuredKey
      ? recents.filter((listen) => listeningIdentity(listen) !== featuredKey)
      : recents
  ).slice(0, 10);

  return (
    <div className="flex min-w-0 flex-col">
      {featured ? (
        <ListeningTrackState
          expanded={showRecents}
          label={featuredLabel}
          listenedAt={listening ? undefined : mostRecent?.listenedAt}
          listening={featured}
          now={now}
          onTrackClick={() => recordListeningClick(featured)}
          onToggle={() => setShowRecents((open) => !open)}
        />
      ) : (
        <ListeningEmptyState />
      )}

      <div
        aria-hidden={!showRecents}
        className={cn(
          "grid transition-[grid-template-rows,opacity,margin] duration-200 motion-reduce:transition-none",
          showRecents
            ? "mt-1 grid-rows-[1fr] opacity-100"
            : "mt-0 grid-rows-[0fr] opacity-0"
        )}
        id="listening-recents"
        style={{ transitionTimingFunction: RECENTS_REVEAL_EASE }}
      >
        <div className="min-h-0 overflow-hidden">
          {panelRecents.length > 0 ? (
            <ul className="m-0 flex list-none flex-col gap-1 p-0">
              {panelRecents.map((listen) => (
                <ListeningPlayRow
                  key={`${listeningIdentity(listen)}-${listen.listenedAt}`}
                  listen={{ ...listen, playedAt: listen.listenedAt }}
                  now={now}
                  onTrackClick={() => recordListeningClick(listen)}
                />
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No recent songs</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LanyardListeningView;
