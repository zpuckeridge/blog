import type { NowListening, ObservedListen } from "@/lib/lanyard-status";
import { isNonEmptyString, listeningIdentity } from "@/lib/listening-recents";

/**
 * One JSON array, newest first.
 * A play is about half a kilobyte, so 1,000 plays stay around 0.5–1 MB.
 * That fits in a single KV value (limit 25 MiB). Each poll reads the array
 * once. A write happens only when a new play is appended or a missing
 * start time is filled in.
 */
export const LISTENING_HISTORY_KV_KEY = "listening:history";
export const LISTENING_HISTORY_MAX = 1000;
/** Rows sent with the first paint, and with each scroll request after that. */
export const LISTENING_HISTORY_CHUNK_SIZE = 20;

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

export interface ListenHistorySlice {
  nextOffset: number | null;
  offset: number;
  plays: ListenPlay[];
  total: number;
}

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

/**
 * Apple Music recomputes Discord `timestamps.start` while one song is playing.
 * Stored history shows that this clock moves by 1 or 2 milliseconds, and once
 * by about a second. Five seconds still covers that drift. A replay starts
 * after the song has finished, so its start sits further away than this window.
 */
export const LISTENING_SESSION_WINDOW_MS = 5000;

const sessionStart = (song: {
  listenedAt?: number;
  startedAt?: number | null;
}): number | null => {
  if (hasStart(song.startedAt)) {
    return song.startedAt;
  }

  if (
    typeof song.listenedAt === "number" &&
    Number.isFinite(song.listenedAt) &&
    song.listenedAt > 0
  ) {
    return song.listenedAt;
  }

  return null;
};

type SessionSong = Pick<NowListening, "artist" | "track"> & {
  listenedAt?: number;
  startedAt?: number | null;
};

/** True when both observations are one continuous play of the same song. */
export const sameListeningSession = (
  left: SessionSong,
  right: SessionSong
): boolean => {
  if (listeningIdentity(left) !== listeningIdentity(right)) {
    return false;
  }

  const leftStart = sessionStart(left);
  const rightStart = sessionStart(right);
  if (leftStart === null || rightStart === null) {
    return leftStart === null && rightStart === null;
  }

  return Math.abs(leftStart - rightStart) <= LISTENING_SESSION_WINDOW_MS;
};

interface OpenSession {
  identity: string;
  max: number;
  min: number;
}

/** True when `play` belongs to a session already kept. The kept row stays. */
const absorbedBySession = (
  sessions: OpenSession[],
  play: ListenPlay
): boolean => {
  const start = sessionStart(play);
  if (start === null) {
    return false;
  }

  const identity = listeningIdentity(play);
  const match = sessions.find(
    (session) =>
      session.identity === identity &&
      start >= session.min - LISTENING_SESSION_WINDOW_MS &&
      start <= session.max + LISTENING_SESSION_WINDOW_MS
  );

  if (!match) {
    sessions.push({ identity, max: start, min: start });
    return false;
  }

  match.min = Math.min(match.min, start);
  match.max = Math.max(match.max, start);
  return true;
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
 * should stay put for the whole play, but each presence update recomputes
 * it, so it drifts by a few milliseconds. A start inside
 * `LISTENING_SESSION_WINDOW_MS` of a stored start is the same play. A later
 * poll does not add a second row, and the first start time stays in place.
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
  const sameAsLatest =
    latest !== undefined &&
    listeningIdentity(latest) === listeningIdentity(song);

  if (
    hasStart(song.startedAt) &&
    existing.some(
      (play) => hasStart(play.startedAt) && sameListeningSession(play, song)
    )
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

      if (hasStart(play.startedAt)) {
        const key = `${listeningIdentity(play)}::${play.startedAt}`;
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

/**
 * Drop repeated rows of one play session.
 * The stored KV value is left unchanged. Callers that render history use this
 * so a drifted start time does not show the same song twice.
 */
export const collapseListenSessions = (
  plays: readonly ListenPlay[]
): ListenPlay[] => {
  const sessions: OpenSession[] = [];
  const collapsed: ListenPlay[] = [];

  for (const play of plays) {
    if (absorbedBySession(sessions, play)) {
      continue;
    }

    collapsed.push(play);
    if (collapsed.length >= LISTENING_HISTORY_MAX) {
      break;
    }
  }

  return collapsed;
};

/** Parsed history with one row per play session. Does not write KV. */
export const readListenHistory = (raw: string | null): ListenPlay[] =>
  collapseListenSessions(parseListenHistory(raw));

/**
 * Exact row identity, including the raw start millisecond.
 * Session dedupe uses `sameListeningSession`, because that millisecond drifts.
 */
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

/** Prepend plays from a fresh first page that are not already in the list. */
export const mergeLatestPlays = (
  current: readonly ListenPlay[],
  incoming: readonly ListenPlay[]
): readonly ListenPlay[] => {
  const fresh = incoming.filter(
    (play) => !current.some((existing) => sameListeningSession(existing, play))
  );

  if (fresh.length === 0) {
    return current;
  }

  return [...fresh, ...current];
};

/** Null when the query is not a whole number inside the stored history. */
export const parseListenHistoryOffset = (
  value: string | null
): number | null => {
  if (value === null || value === "") {
    return 0;
  }

  if (!/^\d+$/u.test(value)) {
    return null;
  }

  const offset = Number(value);
  if (!Number.isSafeInteger(offset) || offset > LISTENING_HISTORY_MAX) {
    return null;
  }

  return offset;
};

export const sliceListenHistory = (
  plays: readonly ListenPlay[],
  offset: number,
  limit = LISTENING_HISTORY_CHUNK_SIZE
): ListenHistorySlice => {
  const total = plays.length;
  const start = Math.min(Math.max(Math.trunc(offset), 0), total);
  const size = Math.max(Math.trunc(limit), 0);
  const slice = plays.slice(start, start + size);
  const next = start + slice.length;

  return {
    nextOffset: next < total ? next : null,
    offset: start,
    plays: [...slice],
    total,
  };
};
