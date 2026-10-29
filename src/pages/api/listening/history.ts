import type { APIRoute } from "astro";

import {
  LISTENING_HISTORY_KV_KEY,
  parseListenHistory,
  parseListenHistoryOffset,
  sliceListenHistory,
} from "@/lib/listening-history";
import { workersEnv } from "@/lib/workers-env";

const JSON_HEADERS = { "Cache-Control": "no-store" };

const jsonWithHeaders = (body: unknown, init?: ResponseInit): Response =>
  Response.json(body, {
    ...init,
    headers: {
      ...init?.headers,
      ...JSON_HEADERS,
    },
  });

export const GET: APIRoute = async ({ url }) => {
  const kv = workersEnv.LOCATION_KV;
  if (!kv) {
    return jsonWithHeaders(
      { error: "Listening history is not configured" },
      { status: 503 }
    );
  }

  const offset = parseListenHistoryOffset(url.searchParams.get("offset"));
  if (offset === null) {
    return jsonWithHeaders({ error: "Invalid offset" }, { status: 400 });
  }

  const history = parseListenHistory(await kv.get(LISTENING_HISTORY_KV_KEY));
  const slice = sliceListenHistory(history, offset);

  return jsonWithHeaders({
    nextOffset: slice.nextOffset,
    plays: slice.plays,
    total: slice.total,
  });
};
