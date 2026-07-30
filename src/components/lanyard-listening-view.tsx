"use client";

import { useEffect, useRef, useState } from "react";
import type { SyntheticEvent } from "react";
import { RxChevronDown } from "react-icons/rx";

import { ImageZoom } from "@/components/zoom-image";
import { isLikelyBot } from "@/lib/is-likely-bot";
import { watchLanyardPresence } from "@/lib/lanyard-presence-hub";
import {
  LANYARD_USER_ID,
  parseAppleMusicActivity,
  resolveArtworkZoomUrl,
} from "@/lib/lanyard-status";
import type { NowListening } from "@/lib/lanyard-status";
import { listeningIdentity } from "@/lib/listening-recents";
import type { RecentListen } from "@/lib/listening-recents";
import { formatLocationRelativeTime } from "@/lib/location-status";
import { resolveSafeHref } from "@/lib/safe-href";
import { cn } from "@/lib/utils";

const ROW_CLASS = "flex min-h-9 min-w-0 items-center gap-2.5";
const TEXT_CLASS = "min-w-0 flex-1 leading-none";
const LISTENING_LINKS_ROW_CLASS = "-mx-1 min-w-0 px-1";
/** px + -mx keeps text position fixed while hover bg bleeds sideways. */
const LISTENING_LINK_CLASS =
  "rounded-sm px-1 -mx-1 leading-[inherit] hover:bg-muted/80";
const LISTENING_TRACKS_CLASS =
  "flex min-w-0 items-baseline gap-2 text-sm leading-tight";
const RECENTS_REVEAL_EASE = "cubic-bezier(0.23, 1, 0.32, 1)";

const stopRowToggle = (event: SyntheticEvent) => {
  event.stopPropagation();
};

const ArtworkPlaceholder = ({ className }: { className?: string }) => (
  <div
    aria-hidden="true"
    className={cn("h-8 w-8 shrink-0 rounded-sm bg-muted/50", className)}
  />
);

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

const ListeningLink = ({
  className,
  href,
  label,
  truncate = false,
}: {
  className?: string;
  href: string | null;
  label: string;
  truncate?: boolean;
}) => {
  const safeHref = href ? resolveSafeHref(href) : null;
  // Truncate must live on the link (not a parent) or overflow:hidden clips px bleed.
  const linkClassName = cn(
    LISTENING_LINK_CLASS,
    truncate ? "min-w-0 truncate" : "inline-block shrink-0",
    className
  );

  if (safeHref) {
    return (
      <a
        className={linkClassName}
        href={safeHref.href}
        onClick={stopRowToggle}
        rel={safeHref.isExternal ? "noopener noreferrer" : undefined}
        target={safeHref.isExternal ? "_blank" : undefined}
      >
        {label}
      </a>
    );
  }

  return <span className={linkClassName}>{label}</span>;
};

const ListeningArtwork = ({
  listening,
  sizeClass = "h-8 w-8",
}: {
  listening: Pick<NowListening, "artworkUrl" | "track" | "artist">;
  sizeClass?: string;
}) => {
  if (!listening.artworkUrl) {
    return (
      <div data-listening-interactive="">
        <ArtworkPlaceholder className={sizeClass} />
      </div>
    );
  }

  const artworkAlt = `${listening.track} by ${listening.artist}`;

  return (
    <button
      className={cn(
        "relative shrink-0 overflow-hidden rounded-sm border-0 bg-muted p-0",
        sizeClass
      )}
      data-listening-interactive=""
      onClick={stopRowToggle}
      type="button"
    >
      <ImageZoom className="size-full">
        <img
          alt={artworkAlt}
          className="size-full object-cover"
          data-zoom-src={
            resolveArtworkZoomUrl(listening.artworkUrl) ?? undefined
          }
          height={32}
          loading="lazy"
          src={listening.artworkUrl}
          width={32}
        />
      </ImageZoom>
    </button>
  );
};

const ListeningTrackState = ({
  expanded,
  label,
  listenedAt,
  listening,
  now,
  onToggle,
}: {
  expanded: boolean;
  label: string;
  listenedAt?: number;
  listening: NowListening;
  now: number;
  onToggle: () => void;
}) => (
  <button
    aria-controls="listening-recents"
    aria-expanded={expanded}
    aria-label={
      expanded ? "Hide recently played tracks" : "Show recently played tracks"
    }
    className={cn(
      ROW_CLASS,
      "w-full cursor-pointer border-0 bg-transparent p-0 text-left hover:bg-muted has-[a:hover]:bg-transparent has-[[data-listening-interactive]:hover]:bg-transparent"
    )}
    onClick={onToggle}
    type="button"
  >
    <ListeningArtwork listening={listening} />

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
);

const RecentListenRow = ({
  listen,
  now,
}: {
  listen: RecentListen;
  now: number;
}) => (
  <li className={ROW_CLASS}>
    <ListeningArtwork listening={listen} />
    <div className={cn(TEXT_CLASS, LISTENING_LINKS_ROW_CLASS)}>
      <p className="truncate text-sm leading-tight text-muted-foreground tabular-nums">
        {formatLocationRelativeTime(listen.listenedAt, now)}
      </p>
      <div
        className={LISTENING_TRACKS_CLASS}
        title={`${listen.track} • ${listen.artist}`}
      >
        <ListeningLink
          className="text-inherit"
          href={listen.trackUrl}
          label={listen.track}
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
          href={listen.artistUrl}
          label={listen.artist}
          truncate
        />
      </div>
    </div>
  </li>
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

export default function LanyardListeningView() {
  const [listening, setListening] = useState<NowListening | null>(null);
  const [recents, setRecents] = useState<RecentListen[]>([]);
  const [showRecents, setShowRecents] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const lastRecordedKeyRef = useRef<string | null>(null);

  useEffect(() => {
    if (isLikelyBot()) {
      return;
    }

    let cancelled = false;

    void (async () => {
      const nextRecents = await fetchRecents();
      if (!cancelled) {
        setRecents(nextRecents);
      }
    })();

    const unsubscribe = watchLanyardPresence(LANYARD_USER_ID, (presence) => {
      setListening(parseAppleMusicActivity(presence.activities));
    });

    const nowTimer = window.setInterval(() => {
      setNow(Date.now());
    }, 60_000);

    return () => {
      cancelled = true;
      unsubscribe();
      window.clearInterval(nowTimer);
    };
  }, []);

  useEffect(() => {
    if (isLikelyBot() || !listening) {
      return;
    }

    const key = listeningIdentity(listening);
    if (lastRecordedKeyRef.current === key) {
      return;
    }

    lastRecordedKeyRef.current = key;

    let cancelled = false;

    void (async () => {
      const next = await recordRecent();
      if (!cancelled && next) {
        setRecents(next);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [listening]);

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
                <RecentListenRow
                  key={`${listeningIdentity(listen)}-${listen.listenedAt}`}
                  listen={listen}
                  now={now}
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
}
