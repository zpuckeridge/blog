import { LISTENING_HISTORY_KV_KEY } from "@/lib/listening-history";
import type { AppendListenResult, ListenPlay } from "@/lib/listening-history";
import {
  LISTENING_STATS_KV_KEY,
  applyListenPlayToStats,
  parseListeningStats,
} from "@/lib/listening-stats";
import type { ListeningStatsStore } from "@/lib/listening-stats";

interface ListeningKv {
  get: (key: string) => Promise<string | null>;
  put: (key: string, value: string) => Promise<void>;
}

export const persistListeningUpdates = async (
  kv: ListeningKv,
  options: {
    history: AppendListenResult;
    statsPlays?: readonly ListenPlay[];
    statsStore?: ListeningStatsStore;
  }
): Promise<ListeningStatsStore> => {
  const writes: Promise<void>[] = [];
  let stats =
    options.statsStore ??
    parseListeningStats(await kv.get(LISTENING_STATS_KV_KEY));

  if (options.history.changed) {
    writes.push(
      kv.put(LISTENING_HISTORY_KV_KEY, JSON.stringify(options.history.plays))
    );
  }

  const statsPlays = options.statsPlays ?? [];
  if (statsPlays.length > 0) {
    for (const play of statsPlays) {
      stats = applyListenPlayToStats(stats, play);
    }
    writes.push(kv.put(LISTENING_STATS_KV_KEY, JSON.stringify(stats)));
  }

  await Promise.all(writes);
  return stats;
};
