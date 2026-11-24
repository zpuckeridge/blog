import type { APIRoute } from "astro";

import { createAppleMusicDeveloperToken } from "@/lib/apple-music-developer-token";
import type { AppleMusicSigningEnv } from "@/lib/apple-music-developer-token";
import {
  backfillListeningBatch,
  finalizeListeningBackfill,
} from "@/lib/backfill-listening";
import { jsonNoStore } from "@/lib/json-response";
import {
  LISTENING_HISTORY_KV_KEY,
  readListenHistory,
} from "@/lib/listening-history";
import { LISTENING_STATS_KV_KEY } from "@/lib/listening-stats";
import { resolveRhythmsWebhookSecret } from "@/lib/rhythms-webhook-secret";
import { workersEnv } from "@/lib/workers-env";

const parseOffset = (value: string | null): number => {
  if (!value || !/^\d+$/u.test(value)) {
    return 0;
  }

  return Number(value);
};

export const POST: APIRoute = async ({ request, url }) => {
  const kv = workersEnv.LOCATION_KV;
  if (!kv) {
    return jsonNoStore(
      { error: "Listening storage is not configured" },
      { status: 503 }
    );
  }

  const secret = resolveRhythmsWebhookSecret(workersEnv);
  const auth = request.headers.get("Authorization");
  if (!secret || auth !== `Bearer ${secret}`) {
    return jsonNoStore({ error: "Unauthorized" }, { status: 401 });
  }

  const developerToken = await createAppleMusicDeveloperToken(
    workersEnv as AppleMusicSigningEnv
  );
  if (!developerToken) {
    return jsonNoStore(
      { error: "Apple Music developer token unavailable" },
      { status: 503 }
    );
  }

  const raw = await kv.get(LISTENING_HISTORY_KV_KEY);
  const plays = readListenHistory(raw);

  if (url.searchParams.get("rebuild") === "stats") {
    const final = finalizeListeningBackfill(plays);
    await kv.put(LISTENING_STATS_KV_KEY, JSON.stringify(final.stats));
    return jsonNoStore({
      done: true,
      enriched: 0,
      nextOffset: null,
      rebuilt: true,
      total: plays.length,
    });
  }

  const offset = parseOffset(url.searchParams.get("offset"));

  const batch = await backfillListeningBatch(plays, offset, developerToken);

  if (batch.nextOffset === null) {
    const final = finalizeListeningBackfill(batch.plays);
    await Promise.all([
      kv.put(LISTENING_HISTORY_KV_KEY, JSON.stringify(final.plays)),
      kv.put(LISTENING_STATS_KV_KEY, JSON.stringify(final.stats)),
    ]);
  } else if (batch.enriched > 0) {
    await kv.put(LISTENING_HISTORY_KV_KEY, JSON.stringify(batch.plays));
  }

  return jsonNoStore({
    done: batch.nextOffset === null,
    enriched: batch.enriched,
    nextOffset: batch.nextOffset,
    processedThrough: batch.nextOffset ?? plays.length,
    total: plays.length,
  });
};
