"use client";

import { useEffect, useState } from "react";

import { ImageZoom } from "@/components/zoom-image";
import { isLikelyBot } from "@/lib/is-likely-bot";
import { watchLanyardPresence } from "@/lib/lanyard-presence-hub";
import {
  LANYARD_USER_ID,
  parseAppleMusicActivity,
  resolveArtworkZoomUrl,
  type NowListening,
} from "@/lib/lanyard-status";
import { resolveSafeHref } from "@/lib/safe-href";
import { cn } from "@/lib/utils";

const ROW_CLASS = "flex min-h-9 min-w-0 items-center gap-2.5";
const TEXT_CLASS = "min-w-0 flex-1 leading-none";
const LISTENING_LINKS_ROW_CLASS = "-mx-1 min-w-0 px-1";
const LISTENING_LINK_CLASS =
  "inline-block rounded-sm px-1 leading-[inherit] hover:bg-muted/80";
const LISTENING_TRACKS_CLASS =
  "flex min-w-0 items-baseline text-sm leading-tight";

const ArtworkPlaceholder = () => (
  <div
    aria-hidden="true"
    className="h-8 w-8 shrink-0 rounded-sm bg-muted/50"
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
  first = false,
  href,
  label,
}: {
  className?: string;
  first?: boolean;
  href: string | null;
  label: string;
}) => {
  const safeHref = href ? resolveSafeHref(href) : null;

  if (safeHref) {
    return (
      <a
        className={cn(LISTENING_LINK_CLASS, first && "-ml-1", className)}
        href={safeHref.href}
        rel={safeHref.isExternal ? "noopener noreferrer" : undefined}
        target={safeHref.isExternal ? "_blank" : undefined}
      >
        {label}
      </a>
    );
  }

  return (
    <span
      className={cn(
        "inline-block px-1 leading-[inherit]",
        first && "-ml-1",
        className
      )}
    >
      {label}
    </span>
  );
};

const ListeningPlayingState = ({ listening }: { listening: NowListening }) => {
  const artworkAlt = `${listening.track} by ${listening.artist}`;

  return (
    <div className={ROW_CLASS}>
      {listening.artworkUrl ? (
        <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-sm bg-muted">
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
        </div>
      ) : (
        <ArtworkPlaceholder />
      )}

      <div className={cn(TEXT_CLASS, LISTENING_LINKS_ROW_CLASS)}>
        <p className="truncate text-sm leading-tight text-muted-foreground">
          Listening to
        </p>
        <div
          className={LISTENING_TRACKS_CLASS}
          title={`${listening.track} · ${listening.artist}`}
        >
          <span className="min-w-0 truncate">
            <ListeningLink
              className="text-inherit"
              first
              href={listening.trackUrl}
              label={listening.track}
            />
          </span>
          <span
            aria-hidden="true"
            className="shrink-0 px-0.5 text-muted-foreground select-none"
          >
            ·
          </span>
          <span className="shrink-0">
            <ListeningLink
              className="text-muted-foreground"
              href={listening.artistUrl}
              label={listening.artist}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default function LanyardListeningView() {
  const [listening, setListening] = useState<NowListening | null>(null);

  useEffect(() => {
    if (isLikelyBot()) {
      return undefined;
    }

    return watchLanyardPresence(LANYARD_USER_ID, (presence) => {
      setListening(parseAppleMusicActivity(presence.activities));
    });
  }, []);

  if (!listening) {
    return <ListeningEmptyState />;
  }

  return <ListeningPlayingState listening={listening} />;
};
