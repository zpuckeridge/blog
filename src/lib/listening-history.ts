import type { NowListening, ObservedListen } from "@/lib/lanyard-status";
import { listeningIdentity } from "@/lib/listening-recents";

/**
 * One JSON array, newest first.
 * A play is about half a kilobyte, so 1,000 plays stay around 0.5–1 MB.
 * That fits in a single KV value (limit 25 MiB). Each poll reads the array
 * once. A write happens only when a new play is appended or a missing
 * start time is filled in.
 */
export const LISTENING_HISTORY_KV_KEY = "listening:history";
export const LISTENING_HISTORY_MAX = 1000;
export const LISTENING_HISTORY_PAGE_SIZE = 50;

export interface ListenPlay extends NowListening {
  /** First time this play was observed, in milliseconds. */
  listenedAt: number;
  /** Discord `timestamps.start` in milliseconds, when Apple Music sent one. */
  startedAt: number | null;
}

export interface AppendListenResult {
  /** True when a new play was added, not when an existing row was stamped. */
  appended: boolean;
  /** True when the stored array should be written back. */
  changed: boolean;
  plays: readonly ListenPlay[];
}

export interface ListenHistoryPage {
  page: number;
  pageCount: number;
  plays: ListenPlay[];
  total: number;
}

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

/** Stored times are already milliseconds. Discord seconds are converted on ingest. */
const milliseconds = (value: unknown): number | null => {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
    return null;
  }

  return Math.trunc(value);
};

const parseListenPlay = (value: unknown): ListenPlay | null => {
  if (typeof value !== "object" || value === null) {
    return null;
  }

  const record = value as Record<string, unknown>;
  if (!isNonEmptyString(record.track) || !isNonEmptyString(record.artist)) {
    return null;
  }

  const startedAt = milliseconds(record.startedAt);
  const listenedAt = milliseconds(record.listenedAt) ?? startedAt;
  if (listenedAt === null) {
    return null;
  }

  return {
    album: isNonEmptyString(record.album) ? record.album.trim() : null,
    artist: record.artist.trim(),
    artistUrl: isNonEmptyString(record.artistUrl)
      ? record.artistUrl.trim()
      : null,
    artworkUrl: isNonEmptyString(record.artworkUrl)
      ? record.artworkUrl.trim()
      : null,
    listenedAt,
    startedAt,
    track: record.track.trim(),
    trackUrl: isNonEmptyString(record.trackUrl) ? record.trackUrl.trim() : null,
  };
};

const hasStart = (startedAt: number | null | undefined): startedAt is number =>
  typeof startedAt === "number";

const startKey = (
  song: Pick<ListenPlay, "artist" | "startedAt" | "track">
): string | null => {
  if (!hasStart(song.startedAt)) {
    return null;
  }

  return `${listeningIdentity(song)}::${song.startedAt}`;
};

const unchanged = (plays: readonly ListenPlay[]): AppendListenResult => ({
  appended: false,
  changed: false,
  plays,
});

/**
 * Tell one continuous play from a later replay.
 *
 * Apple Music's Discord presence includes `timestamps.start`. That clock
 * stays put for the whole play and moves when the same song starts again.
 * A matching start anywhere in the history is the same play, so a later
 * poll does not add a second row.
 *
 * When the start time is missing, only the newest row is compared. Another
 * poll of that same song is the same play. A replay is kept once a different
 * song has been stored in between. Back-to-back replays with no start time
 * can collapse into one row, because nothing else distinguishes them.
 */
export const appendListenPlay = (
  existing: readonly ListenPlay[],
  song: ObservedListen,
  observedAt = Date.now()
): AppendListenResult => {
  const [latest] = existing;
  const incomingKey = startKey(song);
  const sameAsLatest =
    latest !== undefined &&
    listeningIdentity(latest) === listeningIdentity(song);

  if (
    incomingKey !== null &&
    existing.some((play) => startKey(play) === incomingKey)
  ) {
    return unchanged(existing);
  }

  if (sameAsLatest && latest !== undefined && !hasStart(latest.startedAt)) {
    if (!hasStart(song.startedAt)) {
      return unchanged(existing);
    }

    const stamped: ListenPlay = { ...latest, startedAt: song.startedAt };
    return {
      appended: false,
      changed: true,
      plays: [stamped, ...existing.slice(1)],
    };
  }

  if (sameAsLatest && !hasStart(song.startedAt)) {
    return unchanged(existing);
  }

  const next: ListenPlay = {
    album: song.album,
    artist: song.artist,
    artistUrl: song.artistUrl,
    artworkUrl: song.artworkUrl,
    listenedAt: observedAt,
    startedAt: song.startedAt,
    track: song.track,
    trackUrl: song.trackUrl,
  };

  return {
    appended: true,
    changed: true,
    plays: [next, ...existing].slice(0, LISTENING_HISTORY_MAX),
  };
};

export const parseListenHistory = (raw: string | null): ListenPlay[] => {
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }

    const seenStarts = new Set<string>();
    const plays: ListenPlay[] = [];

    for (const item of parsed) {
      const play = parseListenPlay(item);
      if (!play) {
        continue;
      }

      const key = startKey(play);
      if (key !== null) {
        if (seenStarts.has(key)) {
          continue;
        }
        seenStarts.add(key);
      }

      plays.push(play);
      if (plays.length >= LISTENING_HISTORY_MAX) {
        break;
      }
    }

    return plays;
  } catch {
    return [];
  }
};

/** Key used to avoid recording one continuous play on every presence update. */
export const listeningPlayKey = (
  song: Pick<NowListening, "artist" | "track"> & { startedAt?: number | null }
): string => {
  const identity = listeningIdentity(song);
  if (!hasStart(song.startedAt)) {
    return identity;
  }

  return `${identity}::${song.startedAt}`;
};

export const listenPlayedAt = (
  play: Pick<ListenPlay, "listenedAt" | "startedAt">
): number => play.startedAt ?? play.listenedAt;

export const listenHistoryPageCount = (total: number): number =>
  Math.max(1, Math.ceil(total / LISTENING_HISTORY_PAGE_SIZE));

export const listenHistoryPageHref = (page: number): string =>
  page <= 1 ? "/music" : `/music?page=${page}`;

/** Null when the query is not a positive integer. Null raw page means page 1. */
export const parseListenHistoryPage = (value: string | null): number | null => {
  if (value === null || value === "") {
    return 1;
  }

  if (!/^[1-9]\d*$/u.test(value)) {
    return null;
  }

  const page = Number(value);
  if (!Number.isSafeInteger(page)) {
    return null;
  }

  return page;
};

export const resolveListenHistoryPage = (
  rawPage: string | null,
  total: number
): { page: number; redirectTo: string | null } => {
  const requested = parseListenHistoryPage(rawPage);
  if (requested === null) {
    return { page: 1, redirectTo: "/music" };
  }

  const page = Math.min(requested, listenHistoryPageCount(total));
  if (rawPage === null || rawPage === "") {
    return { page: 1, redirectTo: null };
  }

  if (page === 1 || page !== requested) {
    return { page, redirectTo: listenHistoryPageHref(page) };
  }

  return { page, redirectTo: null };
};

export const sliceListenHistoryPage = (
  plays: readonly ListenPlay[],
  page: number
): ListenHistoryPage => {
  const total = plays.length;
  const pageCount = listenHistoryPageCount(total);
  const safePage = Math.min(Math.max(Math.trunc(page), 1), pageCount);
  const start = (safePage - 1) * LISTENING_HISTORY_PAGE_SIZE;

  return {
    page: safePage,
    pageCount,
    plays: plays.slice(start, start + LISTENING_HISTORY_PAGE_SIZE),
    total,
  };
};
