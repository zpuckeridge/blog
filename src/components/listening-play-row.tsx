import type { SyntheticEvent } from "react";

import { ImageZoom } from "@/components/zoom-image";
import { getActivityVisitorId } from "@/lib/activity-visitor";
import { resolveArtworkZoomUrl } from "@/lib/lanyard-status";
import type { NowListening } from "@/lib/lanyard-status";
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

const stopRowToggle = (event: SyntheticEvent) => {
  event.stopPropagation();
};

export const ArtworkPlaceholder = ({ className }: { className?: string }) => (
  <div
    aria-hidden="true"
    className={cn("h-8 w-8 shrink-0 rounded-sm bg-muted/50", className)}
  />
);

export const ListeningLink = ({
  className,
  href,
  label,
  onClick,
  truncate = false,
}: {
  className?: string;
  href: string | null;
  label: string;
  onClick?: () => void;
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
        onClick={(event) => {
          stopRowToggle(event);
          onClick?.();
        }}
        rel={safeHref.isExternal ? "noopener noreferrer" : undefined}
        target={safeHref.isExternal ? "_blank" : undefined}
      >
        {label}
      </a>
    );
  }

  return <span className={linkClassName}>{label}</span>;
};

export const ListeningArtwork = ({
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
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-sm bg-muted",
        sizeClass
      )}
      data-listening-interactive=""
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
    </div>
  );
};

export interface ListeningPlayRowData extends Pick<
  NowListening,
  "artist" | "artistUrl" | "artworkUrl" | "track" | "trackUrl"
> {
  playedAt: number;
}

export const ListeningPlayRow = ({
  listen,
  now,
  onTrackClick,
}: {
  listen: ListeningPlayRowData;
  now: number;
  onTrackClick?: () => void;
}) => (
  <li className={ROW_CLASS}>
    <ListeningArtwork listening={listen} />
    <div className={cn(TEXT_CLASS, LISTENING_LINKS_ROW_CLASS)}>
      <p className="truncate text-sm leading-tight text-muted-foreground tabular-nums">
        {formatLocationRelativeTime(listen.playedAt, now)}
      </p>
      <div
        className={LISTENING_TRACKS_CLASS}
        title={`${listen.track} • ${listen.artist}`}
      >
        <ListeningLink
          className="text-inherit"
          href={listen.trackUrl}
          label={listen.track}
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
          href={listen.artistUrl}
          label={listen.artist}
          truncate
        />
      </div>
    </div>
  </li>
);

export const recordListeningClick = (
  listen: Pick<NowListening, "artist" | "artistUrl" | "track" | "trackUrl">
) => {
  navigator.sendBeacon(
    "/api/activity/listen",
    new Blob(
      [
        JSON.stringify({
          artist: listen.artist,
          artistUrl: listen.artistUrl,
          track: listen.track,
          trackUrl: listen.trackUrl,
          visitorId: getActivityVisitorId(),
        }),
      ],
      { type: "application/json" }
    )
  );
};
