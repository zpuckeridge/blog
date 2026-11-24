import type { APIRoute } from "astro";

import { jsonNoStore } from "@/lib/json-response";
import {
  filterListenHistoryByMonth,
  LISTENING_HISTORY_DISPLAY_MAX,
  LISTENING_HISTORY_KV_KEY,
  parseListenHistoryMonth,
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

  const monthKey = parseListenHistoryMonth(url.searchParams.get("month"));
  if (url.searchParams.has("month") && monthKey === null) {
    return jsonNoStore({ error: "Invalid month" }, { status: 400 });
  }

  const stored = readListenHistory(await kv.get(LISTENING_HISTORY_KV_KEY));
  const history = monthKey
    ? filterListenHistoryByMonth(stored, monthKey)
    : stored;
  const slice = sliceListenHistory(
    history,
    offset,
    LISTENING_HISTORY_DISPLAY_MAX
  );

  return jsonNoStore({
    nextOffset: slice.nextOffset,
    plays: slice.plays,
    total: Math.min(slice.total, LISTENING_HISTORY_DISPLAY_MAX),
  });
};
