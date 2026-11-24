import { fetchCatalogSongGenres } from "@/lib/apple-music-catalog";
import {
  catalogIdForPlay,
  enrichListenPlayGenres,
  playNeedsGenreBackfill,
} from "@/lib/listening-enrich";
import type { ListenPlay } from "@/lib/listening-history";
import { rebuildListeningStats } from "@/lib/listening-stats";

export const BACKFILL_BATCH_SIZE = 20;

export interface ListeningBackfillResult {
  enriched: number;
  nextOffset: number | null;
  plays: ListenPlay[];
  statsRebuilt: boolean;
}

const enrichPlayAtIndex = async (
  plays: ListenPlay[],
  index: number,
  developerToken: string
): Promise<boolean> => {
  const play = plays[index];
  if (!play || !playNeedsGenreBackfill(play)) {
    return false;
  }

  const catalogId = catalogIdForPlay(play);
  if (!catalogId) {
    return false;
  }

  const genres = await fetchCatalogSongGenres(developerToken, catalogId);
  if (!genres?.length) {
    return false;
  }

  plays[index] = enrichListenPlayGenres(play, genres);
  return true;
};

const enrichPlayRange = async (
  plays: ListenPlay[],
  start: number,
  end: number,
  developerToken: string
): Promise<number> => {
  if (start >= end) {
    return 0;
  }

  const enrichedHere = (await enrichPlayAtIndex(plays, start, developerToken))
    ? 1
    : 0;
  const enrichedRest = await enrichPlayRange(
    plays,
    start + 1,
    end,
    developerToken
  );

  return enrichedHere + enrichedRest;
};

export const backfillListeningBatch = async (
  plays: readonly ListenPlay[],
  offset: number,
  developerToken: string
): Promise<ListeningBackfillResult> => {
  const next = [...plays];
  const start = Math.max(0, Math.trunc(offset));
  const limit = Math.min(start + BACKFILL_BATCH_SIZE, next.length);
  const enriched = await enrichPlayRange(next, start, limit, developerToken);

  const done = limit >= next.length;

  return {
    enriched,
    nextOffset: done ? null : limit,
    plays: next,
    statsRebuilt: done,
  };
};

export const finalizeListeningBackfill = (
  plays: readonly ListenPlay[]
): {
  plays: ListenPlay[];
  stats: ReturnType<typeof rebuildListeningStats>;
} => ({
  plays: [...plays],
  stats: rebuildListeningStats(plays),
});
