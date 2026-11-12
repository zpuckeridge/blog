import type { APIRoute } from "astro";

import { jsonNoStore } from "@/lib/json-response";
import {
  LISTENING_HISTORY_KV_KEY,
  parseListenHistoryOffset,
  readListenHistory,
  sliceListenHistory,
} from "@/lib/listening-history";
import { workersEnv } from "@/lib/workers-env";

export const GET: APIRoute = async ({ url }) => {
  const kv = workersEnv.LOCATION_KV;
  if (!kv) {
    return jsonNoStore(
      { error: "Listening history is not configured" },
      { status: 503 }
    );
  }

  const offset = parseListenHistoryOffset(url.searchParams.get("offset"));
  if (offset === null) {
    return jsonNoStore({ error: "Invalid offset" }, { status: 400 });
  }

  const history = readListenHistory(await kv.get(LISTENING_HISTORY_KV_KEY));
  const slice = sliceListenHistory(history, offset);

  return jsonNoStore({
    nextOffset: slice.nextOffset,
    plays: slice.plays,
    total: slice.total,
  });
};
