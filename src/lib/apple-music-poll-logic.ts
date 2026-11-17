import type { AppleMusicApiSong } from "@/lib/apple-music-track";
import { appleTrackIdentity } from "@/lib/apple-music-track";

export const APPLE_MUSIC_POLL_WINDOW_MS = 30 * 60 * 1000;

export interface AppleMusicPollDiffEntry {
  identity: string;
  track: AppleMusicApiSong;
}

const findPreviousPollAnchorIndex = (
  previousIds: readonly string[],
  nextIds: readonly string[]
): number | null => {
  const [head, second, third] = previousIds;

  for (let index = 0; index < nextIds.length; index += 1) {
    if (nextIds[index] !== head) {
      continue;
    }

    if (second !== undefined && nextIds[index + 1] !== second) {
      continue;
    }

    if (
      third !== undefined &&
      second !== undefined &&
      nextIds[index + 2] !== third
    ) {
      continue;
    }

    return index;
  }

  return null;
};

const diffAppleMusicPollWithSetFallback = (
  previousIds: readonly string[],
  nextTracks: readonly AppleMusicApiSong[]
): AppleMusicPollDiffEntry[] => {
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

/**
 * Tracks that appear ahead of where the previous poll's leading sequence now
 * sits (including replays of ids from deeper in the previous list). When that
 * anchor cannot be found, falls back to id-set diffing to avoid flooding. An
 * empty previous poll only updates the baseline (no writes).
 */
export const diffAppleMusicPoll = (
  previousIds: readonly string[],
  nextTracks: readonly AppleMusicApiSong[]
): AppleMusicPollDiffEntry[] => {
  if (previousIds.length === 0) {
    return [];
  }

  const nextIds = trackIdsFromPoll(nextTracks);
  const anchorIndex = findPreviousPollAnchorIndex(previousIds, nextIds);

  if (anchorIndex === null) {
    return diffAppleMusicPollWithSetFallback(previousIds, nextTracks);
  }

  if (anchorIndex === 0) {
    return [];
  }

  const additions: AppleMusicPollDiffEntry[] = [];

  for (let index = 0; index < anchorIndex; index += 1) {
    const track = nextTracks[index];
    const identity = nextIds[index];
    if (!track || !identity) {
      continue;
    }

    additions.push({ identity, track });
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
