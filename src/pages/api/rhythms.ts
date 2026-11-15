import type { APIRoute } from "astro";

import { jsonNoStore } from "@/lib/json-response";
import {
  enforceRateLimit,
  getRequestClientKey,
} from "@/lib/request-rate-limit";
import {
  applyRhythmWrite,
  readRhythmStore,
  RHYTHMS_KV_KEY,
} from "@/lib/rhythms";
import { workersEnv } from "@/lib/workers-env";

const getWebhookSecret = (): string | null =>
  workersEnv.LOCATION_WEBHOOK_SECRET ??
  process.env.LOCATION_WEBHOOK_SECRET ??
  null;

export const POST: APIRoute = async ({ request }) => {
  const secret = getWebhookSecret();
  const kv = workersEnv.LOCATION_KV;

  if (!secret || !kv) {
    return jsonNoStore(
      { error: "Rhythms webhook is not configured" },
      { status: 503 }
    );
  }

  const authorization = request.headers.get("Authorization");
  if (authorization !== `Bearer ${secret}`) {
    return jsonNoStore({ error: "Unauthorized" }, { status: 401 });
  }

  const rateLimit = enforceRateLimit({
    bucket: "rhythms",
    key: getRequestClientKey(request),
    limit: 180,
    windowMs: 1000 * 60,
  });
  if (rateLimit.limited) {
    return jsonNoStore(
      { error: "Too many rhythm updates. Please try again later." },
      {
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds),
        },
        status: 429,
      }
    );
  }

  try {
    const body: unknown = await request.json();
    const store = readRhythmStore(await kv.get(RHYTHMS_KV_KEY));
    const result = applyRhythmWrite(
      store,
      body,
      Date.now(),
      request.headers.get("Idempotency-Key")
    );
    if (!result.ok) {
      return jsonNoStore({ error: result.error }, { status: 400 });
    }

    await kv.put(RHYTHMS_KV_KEY, JSON.stringify(result.store));
    return jsonNoStore({
      dates: result.dates,
      replayed: result.replayed,
      success: true,
    });
  } catch (error) {
    console.error("Failed to update rhythms", error);
    return jsonNoStore({ error: "Failed to update rhythms" }, { status: 500 });
  }
};
