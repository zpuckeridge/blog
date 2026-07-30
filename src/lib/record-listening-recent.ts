import { fetchLanyardPresence } from "@/lib/lanyard-client";
import { LANYARD_USER_ID, parseAppleMusicActivity } from "@/lib/lanyard-status";
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
  recents: RecentListen[];
  recorded: boolean;
}> => {
  const existing = parseRecentListens(await kv.get(LISTENING_RECENTS_KV_KEY));
  const presence = await fetchLanyardPresence(LANYARD_USER_ID);
  const listening = parseAppleMusicActivity(presence?.activities);

  if (!listening) {
    return { recents: existing, recorded: false };
  }

  const recents = upsertRecentListen(existing, listening);
  await kv.put(LISTENING_RECENTS_KV_KEY, JSON.stringify(recents));

  return { recents, recorded: true };
};
