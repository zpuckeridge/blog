import { catalogIdFromTrackUrl } from "@/lib/apple-music-catalog";
import type { CatalogSongMatch } from "@/lib/apple-music-catalog";
import type { ListenPlay } from "@/lib/listening-history";
import { listeningIdentity } from "@/lib/listening-recents";
import { LISTENING_STATS_EXCLUDED_GENRE } from "@/lib/listening-stats";

export const catalogIdForPlay = (play: ListenPlay): string | null =>
  play.catalogId?.trim() || catalogIdFromTrackUrl(play.trackUrl);

const listenPlayKey = (play: ListenPlay): string =>
  `${play.listenedAt}:${listeningIdentity(play)}`;

export const enrichListenPlayGenres = (
  play: ListenPlay,
  genres: readonly string[] | null,
  match?: Pick<CatalogSongMatch, "catalogId" | "trackUrl"> | null
): ListenPlay => {
  if (!genres?.length) {
    return play;
  }

  const catalogId =
    match?.catalogId?.trim() ||
    catalogIdForPlay(play) ||
    play.catalogId ||
    null;

  return {
    ...play,
    catalogId,
    genres: [...genres],
    trackUrl: play.trackUrl ?? match?.trackUrl ?? null,
  };
};

export const playNeedsGenreBackfill = (play: ListenPlay): boolean => {
  const genres = (play.genres ?? [])
    .map((genre) => genre.trim())
    .filter((genre) => genre.length > 0);

  if (genres.length === 0) {
    return true;
  }

  return genres.every((genre) => genre === LISTENING_STATS_EXCLUDED_GENRE);
};

/**
 * Keep genres already stored when this batch was built from an older history
 * snapshot. A later offset must not wipe an earlier batch's edits.
 */
export const mergePreservedListenGenres = (
  stored: readonly ListenPlay[],
  incoming: readonly ListenPlay[]
): ListenPlay[] => {
  const storedByKey = new Map(
    stored.map((play) => [listenPlayKey(play), play] as const)
  );
  const incomingByKey = new Map(
    incoming.map((play) => [listenPlayKey(play), play] as const)
  );

  const withStoredGenres = (play: ListenPlay): ListenPlay => {
    if (play.genres?.length) {
      return play;
    }

    const previous = storedByKey.get(listenPlayKey(play));
    if (!previous?.genres?.length) {
      return play;
    }

    return {
      ...play,
      catalogId: play.catalogId ?? previous.catalogId,
      genres: previous.genres,
      trackUrl: play.trackUrl ?? previous.trackUrl,
    };
  };

  if (stored.length > incoming.length) {
    return stored.map((play) => {
      const update = incomingByKey.get(listenPlayKey(play));
      if (!update?.genres?.length) {
        return play;
      }

      return {
        ...play,
        catalogId: update.catalogId ?? play.catalogId,
        genres: update.genres,
        trackUrl: update.trackUrl ?? play.trackUrl,
      };
    });
  }

  return incoming.map(withStoredGenres);
};
