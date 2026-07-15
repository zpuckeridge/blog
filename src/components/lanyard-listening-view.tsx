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
const TEXT_CLASS = "min-w-0 leading-none";
const LISTENING_LINKS_ROW_CLASS = "-mx-1 min-w-0 overflow-visible px-1";
const LISTENING_LINE_CLASS = "-ml-1 pl-1";
const LISTENING_LINK_CLASS = cn(
  "relative z-0 inline-block rounded-sm px-0 leading-[inherit]",
  "hover:bg-muted/80",
  "before:pointer-events-none after:pointer-events-none",
  "before:absolute after:absolute before:inset-y-0 after:inset-y-0",
  "before:right-full before:w-1 after:left-full after:w-1",
  "before:-z-10 after:-z-10",
  "before:rounded-l-sm after:rounded-r-sm",
  "before:content-[''] after:content-['']",
  "before:bg-transparent after:bg-transparent",
  "hover:before:bg-muted/80 hover:after:bg-muted/80"
);
const LISTENING_TRACKS_CLASS = cn(
  LISTENING_LINE_CLASS,
  "-mr-1 pr-1",
  "min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-sm leading-tight"
);

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
  href,
  label,
}: {
  className?: string;
  href: string | null;
  label: string;
}) => {
  const safeHref = href ? resolveSafeHref(href) : null;

  if (safeHref) {
    return (
      <a
        className={cn(LISTENING_LINK_CLASS, className)}
        href={safeHref.href}
        rel={safeHref.isExternal ? "noopener noreferrer" : undefined}
        target={safeHref.isExternal ? "_blank" : undefined}
      >
        {label}
      </a>
    );
  }

  return (
    <span className={cn("inline px-0 leading-[inherit]", className)}>
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
        <p
          className={cn(
            LISTENING_LINE_CLASS,
            "truncate text-sm leading-tight text-muted-foreground"
          )}
        >
          Listening to
        </p>
        <div
          className={LISTENING_TRACKS_CLASS}
          title={`${listening.track} · ${listening.artist}`}
        >
          <ListeningLink
            className="text-inherit"
            href={listening.trackUrl}
            label={listening.track}
          />
          <span aria-hidden="true" className="text-muted-foreground">
            {" · "}
          </span>
          <ListeningLink
            className="text-muted-foreground"
            href={listening.artistUrl}
            label={listening.artist}
          />
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
