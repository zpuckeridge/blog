import { fetchLanyardPresence } from "@/lib/lanyard-client";
import { LANYARD_USER_ID, parseAppleMusicActivity } from "@/lib/lanyard-status";
import {
  LISTENING_HISTORY_KV_KEY,
  appendListenPlay,
  parseListenHistory,
} from "@/lib/listening-history";
import { persistListeningUpdates } from "@/lib/listening-kv-writes";
import {
  LISTENING_RECENTS_KV_KEY,
  parseRecentListens,
  upsertRecentListen,
} from "@/lib/listening-recents";
import type { RecentListen } from "@/lib/listening-recents";

interface ListeningKv {
  get: (key: string) => Promise<string | null>;
  put: (key: string, value: string) => Promise<void>;
}

export const recordListeningRecent = async (
  kv: ListeningKv
): Promise<{
  historyRecorded: boolean;
  recents: RecentListen[];
  recorded: boolean;
}> => {
  const [recentsRaw, historyRaw] = await Promise.all([
    kv.get(LISTENING_RECENTS_KV_KEY),
    kv.get(LISTENING_HISTORY_KV_KEY),
  ]);
  const existing = parseRecentListens(recentsRaw);
  const presence = await fetchLanyardPresence(LANYARD_USER_ID);
  const listening = parseAppleMusicActivity(presence?.activities);

  if (!listening) {
    return { historyRecorded: false, recents: existing, recorded: false };
  }

  const observedAt = Date.now();
  const recents = upsertRecentListen(existing, listening, observedAt);
  const history = appendListenPlay(
    parseListenHistory(historyRaw),
    listening,
    observedAt
  );
  await Promise.all([
    kv.put(LISTENING_RECENTS_KV_KEY, JSON.stringify(recents)),
    persistListeningUpdates(kv, {
      history,
      statsPlays:
        history.appended && history.plays[0] ? [history.plays[0]] : [],
    }),
  ]);

  return {
    historyRecorded: history.appended,
    recents,
    recorded: true,
  };
};
