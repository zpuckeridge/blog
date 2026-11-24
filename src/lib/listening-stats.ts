import { BRISBANE_TIME_ZONE } from "@/lib/format-in-brisbane";
import type { ListenPlay } from "@/lib/listening-history";
import { listenPlayedAt } from "@/lib/listening-history";
import { listenMonthKey } from "@/lib/listening-month";
import { listeningIdentity } from "@/lib/listening-recents";
import { siteLocale } from "@/lib/site";

export const LISTENING_STATS_KV_KEY = "listening:stats";
export const LISTENING_STATS_UNKNOWN_GENRE = "Unknown";
/** Apple Music includes this generic label on most catalogue songs. */
export const LISTENING_STATS_EXCLUDED_GENRE = "Music";

export interface ListeningStatsRankedItem {
  album: string | null;
  artist: string;
  artistUrl: string | null;
  artworkUrl: string | null;
  catalogId: string | null;
  count: number;
  genres: string[];
  track: string;
  trackUrl: string | null;
}

export interface ListeningStatsMonth {
  albums: Record<string, ListeningStatsRankedItem>;
  artists: Record<string, ListeningStatsRankedItem>;
  genres: Record<string, number>;
  plays: number;
  tracks: Record<string, ListeningStatsRankedItem>;
}

export interface ListeningStatsStore {
  months: Record<string, ListeningStatsMonth>;
  version: 1;
}

const emptyMonth = (): ListeningStatsMonth => ({
  albums: {},
  artists: {},
  genres: {},
  plays: 0,
  tracks: {},
});

export const emptyListeningStats = (): ListeningStatsStore => ({
  months: {},
  version: 1,
});

const isCountedGenreLabel = (genre: string): boolean =>
  genre.length > 0 && genre !== LISTENING_STATS_EXCLUDED_GENRE;

const genreLabels = (play: ListenPlay): string[] => {
  const genres = play.genres
    ?.map((genre) => genre.trim())
    .filter(isCountedGenreLabel);
  if (genres && genres.length > 0) {
    return genres;
  }

  return [LISTENING_STATS_UNKNOWN_GENRE];
};

const rankedItemFromPlay = (play: ListenPlay): ListeningStatsRankedItem => ({
  album: play.album,
  artist: play.artist,
  artistUrl: play.artistUrl,
  artworkUrl: play.artworkUrl,
  catalogId: play.catalogId ?? null,
  count: 0,
  genres: genreLabels(play),
  track: play.track,
  trackUrl: play.trackUrl,
});

const albumKey = (play: ListenPlay): string | null => {
  const album = play.album?.trim();
  if (!album) {
    return null;
  }

  return `${album.toLowerCase()}::${play.artist.toLowerCase()}`;
};

const bumpRanked = (
  table: Record<string, ListeningStatsRankedItem>,
  key: string,
  play: ListenPlay
): void => {
  const existing = table[key];
  if (existing) {
    existing.count += 1;
    if (!existing.artworkUrl && play.artworkUrl) {
      existing.artworkUrl = play.artworkUrl;
    }
    if (!existing.trackUrl && play.trackUrl) {
      existing.trackUrl = play.trackUrl;
    }
    if (!existing.artistUrl && play.artistUrl) {
      existing.artistUrl = play.artistUrl;
    }
    if (!existing.catalogId && play.catalogId) {
      existing.catalogId = play.catalogId;
    }
    return;
  }

  table[key] = { ...rankedItemFromPlay(play), count: 1 };
};

export const applyListenPlayToStats = (
  store: ListeningStatsStore,
  play: ListenPlay
): ListeningStatsStore => {
  const monthKey = listenMonthKey(listenPlayedAt(play));
  const month = store.months[monthKey] ?? emptyMonth();

  month.plays += 1;
  for (const genre of genreLabels(play)) {
    month.genres[genre] = (month.genres[genre] ?? 0) + 1;
  }

  bumpRanked(month.tracks, listeningIdentity(play), play);
  bumpRanked(month.artists, play.artist.toLowerCase(), play);

  const album = albumKey(play);
  if (album) {
    bumpRanked(month.albums, album, play);
  }

  return {
    ...store,
    months: {
      ...store.months,
      [monthKey]: month,
    },
  };
};

export const rebuildListeningStats = (
  plays: readonly ListenPlay[]
): ListeningStatsStore => {
  let store = emptyListeningStats();
  for (const play of plays) {
    store = applyListenPlayToStats(store, play);
  }

  return store;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

export const parseListeningStats = (
  raw: string | null
): ListeningStatsStore => {
  if (!raw) {
    return emptyListeningStats();
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!isRecord(parsed) || parsed.version !== 1 || !isRecord(parsed.months)) {
      return emptyListeningStats();
    }

    const months: Record<string, ListeningStatsMonth> = {};
    for (const [key, value] of Object.entries(parsed.months)) {
      if (!isRecord(value)) {
        continue;
      }

      months[key] = {
        albums: (value.albums as ListeningStatsMonth["albums"]) ?? {},
        artists: (value.artists as ListeningStatsMonth["artists"]) ?? {},
        genres: (value.genres as ListeningStatsMonth["genres"]) ?? {},
        plays: typeof value.plays === "number" ? value.plays : 0,
        tracks: (value.tracks as ListeningStatsMonth["tracks"]) ?? {},
      };
    }

    return { months, version: 1 };
  } catch {
    return emptyListeningStats();
  }
};

export const sortedMonthKeys = (store: ListeningStatsStore): string[] =>
  Object.keys(store.months).toSorted((left, right) =>
    right.localeCompare(left)
  );

export const resolveListeningStatsMonth = (
  stats: ListeningStatsStore,
  requestedMonth: string | null | undefined,
  now = Date.now()
): { initialMonth: string; months: string[] } => {
  const months = sortedMonthKeys(stats);
  const defaultMonth = listenMonthKey(now);
  const initialMonth =
    requestedMonth && stats.months[requestedMonth]
      ? requestedMonth
      : (months[0] ?? defaultMonth);

  return { initialMonth, months };
};

const byCount = (
  table: Record<string, ListeningStatsRankedItem>,
  limit: number
): ListeningStatsRankedItem[] =>
  Object.values(table)
    .toSorted((left, right) => right.count - left.count)
    .slice(0, limit);

export const genresForMonth = (
  month: ListeningStatsMonth
): { count: number; genre: string }[] =>
  Object.entries(month.genres)
    .filter(([genre]) => isCountedGenreLabel(genre))
    .toSorted(([, left], [, right]) => right - left)
    .map(([genre, count]) => ({ count, genre }));

export const LISTENING_STATS_TOP_LIMIT = 5;

export const monthStatsView = (
  month: ListeningStatsMonth,
  limit = LISTENING_STATS_TOP_LIMIT
): {
  albums: ListeningStatsRankedItem[];
  artists: ListeningStatsRankedItem[];
  genres: { count: number; genre: string }[];
  plays: number;
  tracks: ListeningStatsRankedItem[];
} => ({
  albums: byCount(month.albums, limit),
  artists: byCount(month.artists, limit),
  genres: genresForMonth(month),
  plays: month.plays,
  tracks: byCount(month.tracks, limit),
});

const listenMonthLabelFormatter = new Intl.DateTimeFormat(siteLocale, {
  month: "long",
  timeZone: BRISBANE_TIME_ZONE,
  year: "numeric",
});

export const formatListenMonthLabel = (monthKey: string): string => {
  const match = /^(?<year>\d{4})-(?<month>\d{2})$/u.exec(monthKey);
  if (!match?.groups?.year || !match.groups.month) {
    return monthKey;
  }

  const { month, year } = match.groups;
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, 15));
  return listenMonthLabelFormatter.format(date);
};
