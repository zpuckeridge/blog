import { listenPlayedAt } from "@/lib/listening-history";
import type { ListenPlay } from "@/lib/listening-history";
import { listeningIdentity } from "@/lib/listening-recents";

/**
 * Skip Apple ingest when Lanyard already recorded the same song recently.
 * Apple times are the poll time, and the cron runs every 30 minutes.
 */
export const APPLE_LANYARD_DEDUPE_WINDOW_MS = 30 * 60 * 1000;

export const isDuplicateListenAcrossSources = (
  track: string,
  artist: string,
  listenedAt: number,
  existing: readonly ListenPlay[]
): boolean => {
  const key = listeningIdentity({ artist, track });

  return existing.some((play) => {
    if (listeningIdentity(play) !== key) {
      return false;
    }

    const playedAt = listenPlayedAt(play);
    return Math.abs(playedAt - listenedAt) <= APPLE_LANYARD_DEDUPE_WINDOW_MS;
  });
};
