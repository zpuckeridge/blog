import { catalogIdFromTrackUrl } from "@/lib/apple-music-catalog";
import type { ListenPlay } from "@/lib/listening-history";

export const catalogIdForPlay = (play: ListenPlay): string | null =>
  play.catalogId?.trim() || catalogIdFromTrackUrl(play.trackUrl);

export const enrichListenPlayGenres = (
  play: ListenPlay,
  genres: readonly string[] | null
): ListenPlay => {
  if (!genres?.length) {
    return play;
  }

  return {
    ...play,
    catalogId: catalogIdForPlay(play) ?? play.catalogId ?? null,
    genres: [...genres],
  };
};

export const playNeedsGenreBackfill = (play: ListenPlay): boolean =>
  !play.genres?.length && catalogIdForPlay(play) !== null;
