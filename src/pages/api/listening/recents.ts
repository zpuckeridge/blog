import type { APIRoute } from "astro";

import { jsonNoStore } from "@/lib/json-response";
import {
  LISTENING_RECENTS_KV_KEY,
  parseRecentListens,
} from "@/lib/listening-recents";
import type { RecentListen } from "@/lib/listening-recents";
import { workersEnv } from "@/lib/workers-env";

const readRecents = async (): Promise<RecentListen[]> => {
  const kv = workersEnv.LOCATION_KV;
  if (!kv) {
    return [];
  }

  const raw = await kv.get(LISTENING_RECENTS_KV_KEY);
  return parseRecentListens(raw);
};

export const GET: APIRoute = async () => {
  if (!workersEnv.LOCATION_KV) {
    return jsonNoStore(
      { error: "Listening recents are not configured" },
      { status: 503 }
    );
  }

  return jsonNoStore({ recents: await readRecents() });
};
