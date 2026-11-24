import type { APIRoute } from "astro";

import { createAppleMusicDeveloperToken } from "@/lib/apple-music-developer-token";
import type { AppleMusicSigningEnv } from "@/lib/apple-music-developer-token";
import {
  backfillListeningBatch,
  finalizeListeningBackfill,
} from "@/lib/backfill-listening";
import { jsonNoStore } from "@/lib/json-response";
import { mergePreservedListenGenres } from "@/lib/listening-enrich";
import {
  LISTENING_HISTORY_KV_KEY,
  readListenHistory,
} from "@/lib/listening-history";
import { LISTENING_STATS_KV_KEY } from "@/lib/listening-stats";
import {
  enforceRateLimit,
  getRequestClientKey,
} from "@/lib/request-rate-limit";
import { resolveRhythmsWebhookSecret } from "@/lib/rhythms-webhook-secret";
import { workersEnv } from "@/lib/workers-env";

const LISTENING_BACKFILL_LOCK_KEY = "listening:backfill:lock";
const LISTENING_BACKFILL_LOCK_MS = 120_000;

const lockRetryAfterSeconds = (
  raw: string | null,
  now: number
): number | null => {
  const lockUntil = Number(raw);
  if (!Number.isFinite(lockUntil) || lockUntil <= now) {
    return null;
  }

  return Math.max(1, Math.ceil((lockUntil - now) / 1000));
};

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

  const rateLimit = enforceRateLimit({
    bucket: "listening-backfill",
    key: getRequestClientKey(request),
    limit: 180,
    windowMs: 60_000,
  });
  if (rateLimit.limited) {
    return jsonNoStore(
      {
        error: "Too many listening backfill requests. Please try again later.",
      },
      {
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds),
        },
        status: 429,
      }
    );
  }

  const retryAfterSeconds = lockRetryAfterSeconds(
    await kv.get(LISTENING_BACKFILL_LOCK_KEY),
    Date.now()
  );
  if (retryAfterSeconds !== null) {
    return jsonNoStore(
      { error: "Listening backfill is already running" },
      {
        headers: {
          "Retry-After": String(retryAfterSeconds),
        },
        status: 429,
      }
    );
  }

  await kv.put(
    LISTENING_BACKFILL_LOCK_KEY,
    String(Date.now() + LISTENING_BACKFILL_LOCK_MS)
  );

  try {
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
    const latest = readListenHistory(await kv.get(LISTENING_HISTORY_KV_KEY));
    const mergedPlays = mergePreservedListenGenres(latest, batch.plays);

    if (batch.nextOffset === null || batch.enriched > 0) {
      const final = finalizeListeningBackfill(mergedPlays);
      await Promise.all([
        kv.put(LISTENING_HISTORY_KV_KEY, JSON.stringify(final.plays)),
        kv.put(LISTENING_STATS_KV_KEY, JSON.stringify(final.stats)),
      ]);
    }

    return jsonNoStore({
      done: batch.nextOffset === null,
      enriched: batch.enriched,
      nextOffset: batch.nextOffset,
      processedThrough: batch.nextOffset ?? plays.length,
      total: plays.length,
    });
  } finally {
    await kv.put(LISTENING_BACKFILL_LOCK_KEY, "0");
  }
};
