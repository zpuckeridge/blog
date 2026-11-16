import type { AppleMusicApiSong } from "@/lib/apple-music-track";
import { appleTrackIdentity } from "@/lib/apple-music-track";

export const APPLE_MUSIC_POLL_WINDOW_MS = 30 * 60 * 1000;

export interface AppleMusicPollDiffEntry {
  identity: string;
  track: AppleMusicApiSong;
}

/**
 * Tracks that appear ahead of the previous poll head, or that were not in the
 * previous poll. An empty previous poll only updates the baseline (no writes).
 */
export const diffAppleMusicPoll = (
  previousIds: readonly string[],
  nextTracks: readonly AppleMusicApiSong[]
): AppleMusicPollDiffEntry[] => {
  if (previousIds.length === 0) {
    return [];
  }

  const [previousHead] = previousIds;
  const previousSet = new Set(previousIds);
  const additions: AppleMusicPollDiffEntry[] = [];

  for (const track of nextTracks) {
    const identity = appleTrackIdentity(track);
    if (!identity) {
      continue;
    }

    if (identity === previousHead) {
      break;
    }

    if (!previousSet.has(identity)) {
      additions.push({ identity, track });
    }
  }

  return additions;
};

export const trackIdsFromPoll = (
  tracks: readonly AppleMusicApiSong[]
): string[] => {
  const ids: string[] = [];

  for (const track of tracks) {
    const identity = appleTrackIdentity(track);
    if (identity) {
      ids.push(identity);
    }
  }

  return ids;
};

/**
 * Newest plays receive times nearest `scheduledTime`; older new plays spread
 * back across the poll window.
 */
export const spreadAppleMusicListenTimes = (
  count: number,
  scheduledTime: number,
  windowMs = APPLE_MUSIC_POLL_WINDOW_MS
): number[] => {
  if (count <= 0) {
    return [];
  }

  if (count === 1) {
    return [scheduledTime];
  }

  return Array.from({ length: count }, (_item, index) =>
    Math.round(scheduledTime - (index * windowMs) / (count - 1))
  );
};
