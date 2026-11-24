import { Menu } from "@base-ui/react/menu";
import { RxChevronDown } from "react-icons/rx";

import {
  ListeningArtwork,
  ListeningLink,
} from "@/components/listening-play-row";
import {
  expandableListMetaClassName,
  expandableListSectionHeaderMainClassName,
} from "@/lib/expandable-list";
import { resolveListeningAlbumUrl } from "@/lib/listening-album-url";
import { resolveListeningArtistUrl } from "@/lib/listening-artist-url";
import { formatListenMonthLabel, monthStatsView } from "@/lib/listening-stats";
import type {
  ListeningStatsRankedItem,
  ListeningStatsStore,
} from "@/lib/listening-stats";
import { cn } from "@/lib/utils";

const MusicStatsSectionHeader = ({
  meta,
  title,
}: {
  meta?: string;
  title: string;
}) => {
  const main = (
    <div className={expandableListSectionHeaderMainClassName}>
      <p className="shrink-0 text-muted-foreground text-sm">{title}</p>
      <hr className="min-w-0 flex-1 border-dotted border-border" />
    </div>
  );

  if (!meta) {
    return main;
  }

  return (
    <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_minmax(5ch,max-content)] items-center gap-x-4">
      {main}
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
};

const menuEase = "ease-[cubic-bezier(0.23,1,0.32,1)]";

const menuPopupClassName = cn(
  "z-50 max-h-60 min-w-(--anchor-width) origin-(--transform-origin) overflow-y-auto bg-muted text-foreground text-sm outline-hidden dark:bg-neutral-900 dark:text-muted-foreground",
  "transition-[scale,opacity] duration-150 data-[instant]:transition-none data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
  menuEase
);

const menuItemClassName =
  "flex items-baseline gap-2 px-3 py-1 outline-hidden select-none data-highlighted:bg-background data-highlighted:text-foreground";

const rankedTitleArtistLabel = ({
  artist,
  artistUrl,
  titleHref,
  titleLabel,
}: {
  artist: string;
  artistUrl: string | null | undefined;
  titleHref: string | null;
  titleLabel: string;
}) => (
  <span className="flex min-w-0 flex-col gap-0.5 leading-tight">
    <ListeningLink
      className="text-inherit"
      href={titleHref}
      label={titleLabel}
      truncate
    />
    <ListeningLink
      className="text-muted-foreground"
      href={resolveListeningArtistUrl(artist, artistUrl)}
      label={artist}
      truncate
    />
  </span>
);

const rankedLabel = (item: ListeningStatsRankedItem, title: string) => {
  if (title === "Top albums" && item.album) {
    return rankedTitleArtistLabel({
      artist: item.artist,
      artistUrl: item.artistUrl,
      titleHref: resolveListeningAlbumUrl(item.album, item.artist),
      titleLabel: item.album,
    });
  }

  if (title === "Top tracks") {
    return rankedTitleArtistLabel({
      artist: item.artist,
      artistUrl: item.artistUrl,
      titleHref: item.trackUrl,
      titleLabel: item.track,
    });
  }

  if (title === "Top artists") {
    return (
      <ListeningLink
        className="text-inherit"
        href={resolveListeningArtistUrl(item.artist, item.artistUrl)}
        label={item.artist}
        truncate
      />
    );
  }

  return null;
};

const RankedList = ({
  emptyLabel,
  items,
  title,
}: {
  emptyLabel: string;
  items: ListeningStatsRankedItem[];
  title: string;
}) => (
  <section className="space-y-2">
    <MusicStatsSectionHeader title={title} />
    {items.length === 0 ? (
      <p className="text-sm text-muted-foreground">{emptyLabel}</p>
    ) : (
      <ol className="m-0 flex list-none flex-col gap-1 p-0">
        {items.map((item) => (
          <li
            className="flex min-h-9 min-w-0 items-center justify-between gap-3 text-sm"
            key={`${title}-${item.track}-${item.artist}-${item.album ?? ""}-${item.count}`}
          >
            <div className="flex min-w-0 flex-1 items-center gap-2.5">
              <ListeningArtwork
                listening={{
                  artist: item.artist,
                  artworkUrl: item.artworkUrl,
                  track:
                    title === "Top albums"
                      ? (item.album ?? item.track)
                      : item.track,
                }}
              />
              <span
                className={cn(
                  "min-w-0",
                  title === "Top albums" ||
                    title === "Top artists" ||
                    title === "Top tracks"
                    ? "flex-1"
                    : "truncate"
                )}
              >
                {rankedLabel(item, title)}
              </span>
            </div>
            <span className="shrink-0 tabular-nums text-muted-foreground">
              {item.count.toLocaleString()}
            </span>
          </li>
        ))}
      </ol>
    )}
  </section>
);

const MusicStats = ({
  initialMonth,
  monthPagePath = "/music",
  months,
  stats,
}: {
  initialMonth: string;
  monthPagePath?: string;
  months: string[];
  stats: ListeningStatsStore;
}) => {
  const month = stats.months[initialMonth];
  const view = month ? monthStatsView(month) : null;

  const monthMenu =
    months.length > 1 ? (
      <Menu.Root>
        <Menu.Trigger
          aria-label="Choose month"
          className={cn(
            "inline-flex items-center justify-between gap-2 border border-input px-3 py-1 text-left text-muted-foreground shadow-xs outline-hidden select-none transition-transform duration-150 hover:bg-muted focus-visible:bg-muted active:scale-[0.97] data-[popup-open]:bg-muted data-[popup-open]:text-foreground",
            menuEase
          )}
        >
          <span>{formatListenMonthLabel(initialMonth)}</span>
          <RxChevronDown aria-hidden="true" className="size-3.5 shrink-0" />
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner align="start" sideOffset={6}>
            <Menu.Popup className={menuPopupClassName}>
              {months.map((monthKey) => {
                const isActive = monthKey === initialMonth;
                return (
                  <Menu.LinkItem
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      menuItemClassName,
                      isActive && "text-foreground"
                    )}
                    href={`${monthPagePath}?month=${monthKey}`}
                    key={monthKey}
                  >
                    {formatListenMonthLabel(monthKey)}
                  </Menu.LinkItem>
                );
              })}
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
    ) : null;

  return (
    <div className="flex flex-col gap-8">
      {view || monthMenu ? (
        <div className="flex flex-wrap items-center justify-between gap-y-2 text-sm">
          {view ? (
            <p className="m-0 text-muted-foreground tabular-nums">
              {view.plays.toLocaleString()} tracks played in{" "}
              {formatListenMonthLabel(initialMonth)}
            </p>
          ) : (
            <span className="sr-only">Listening stats</span>
          )}
          {monthMenu}
        </div>
      ) : null}

      {view ? (
        <>
          <section className="space-y-2">
            <MusicStatsSectionHeader
              meta={
                view.genres.length === 0
                  ? undefined
                  : `${view.genres.length.toLocaleString()} ${
                      view.genres.length === 1 ? "genre" : "genres"
                    }`
              }
              title="Genres"
            />
            {view.genres.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No genre data yet. Run a listening backfill after more Apple
                Music ingests.
              </p>
            ) : (
              <ul className="m-0 flex list-none flex-col gap-1 p-0 text-sm">
                {view.genres.map(({ count, genre }) => (
                  <li className="flex justify-between gap-3" key={genre}>
                    <span>{genre}</span>
                    <span className="tabular-nums text-muted-foreground">
                      {count.toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <RankedList
            emptyLabel="No tracks logged this month."
            items={view.tracks}
            title="Top tracks"
          />
          <RankedList
            emptyLabel="No artists logged this month."
            items={view.artists}
            title="Top artists"
          />
          <RankedList
            emptyLabel="No albums logged this month."
            items={view.albums}
            title="Top albums"
          />
        </>
      ) : (
        <p className="text-sm text-muted-foreground">
          No listening stats for this month yet.
        </p>
      )}
    </div>
  );
};

export default MusicStats;
