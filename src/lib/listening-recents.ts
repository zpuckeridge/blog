import type { NowListening } from "@/lib/lanyard-status";

export const LISTENING_RECENTS_KV_KEY = "listening:recents";
const LISTENING_RECENTS_MAX = 10;

export interface RecentListen extends NowListening {
  listenedAt: number;
}

export const listeningIdentity = (
  song: Pick<NowListening, "track" | "artist">
): string =>
  `${song.track.trim().toLowerCase()}::${song.artist.trim().toLowerCase()}`;

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const parseRecentListen = (value: unknown): RecentListen | null => {
  if (typeof value !== "object" || value === null) {
    return null;
  }

  const record = value as Record<string, unknown>;

  if (!isNonEmptyString(record.track) || !isNonEmptyString(record.artist)) {
    return null;
  }

  if (
    typeof record.listenedAt !== "number" ||
    !Number.isFinite(record.listenedAt)
  ) {
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
    listenedAt: record.listenedAt,
    track: record.track.trim(),
    trackUrl: isNonEmptyString(record.trackUrl) ? record.trackUrl.trim() : null,
  };
};

export const parseRecentListens = (raw: string | null): RecentListen[] => {
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }

    const seen = new Set<string>();
    const recents: RecentListen[] = [];

    for (const item of parsed) {
      const listen = parseRecentListen(item);
      if (!listen) {
        continue;
      }

      const key = listeningIdentity(listen);
      if (seen.has(key)) {
        continue;
      }

      seen.add(key);
      recents.push(listen);

      if (recents.length >= LISTENING_RECENTS_MAX) {
        break;
      }
    }

    return recents;
  } catch {
    return [];
  }
};

export const upsertRecentListen = (
  existing: RecentListen[],
  song: NowListening,
  listenedAt = Date.now()
): RecentListen[] => {
  const key = listeningIdentity(song);
  const next: RecentListen = {
    album: song.album,
    artist: song.artist,
    artistUrl: song.artistUrl,
    artworkUrl: song.artworkUrl,
    listenedAt,
    track: song.track,
    trackUrl: song.trackUrl,
  };

  return [
    next,
    ...existing.filter((item) => listeningIdentity(item) !== key),
  ].slice(0, LISTENING_RECENTS_MAX);
};
