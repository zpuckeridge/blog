import type { APIRoute } from "astro";

import { fetchLanyardPresence } from "@/lib/lanyard-client";
import { LANYARD_USER_ID, parseAppleMusicActivity } from "@/lib/lanyard-status";
import {
  LISTENING_RECENTS_KV_KEY,
  parseRecentListens,
  upsertRecentListen,
} from "@/lib/listening-recents";
import type { RecentListen } from "@/lib/listening-recents";
import {
  enforceRateLimit,
  getRequestClientKey,
} from "@/lib/request-rate-limit";
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
    return jsonWithHeaders(
      { error: "Listening recents are not configured" },
      { status: 503 }
    );
  }

  return jsonWithHeaders({ recents: await readRecents() });
};

export const POST: APIRoute = async ({ request }) => {
  const kv = workersEnv.LOCATION_KV;
  if (!kv) {
    return jsonWithHeaders(
      { error: "Listening recents are not configured" },
      { status: 503 }
    );
  }

  const rateLimit = enforceRateLimit({
    bucket: "listening-recents",
    key: getRequestClientKey(request),
    limit: 30,
    windowMs: 1000 * 60,
  });

  if (rateLimit.limited) {
    return jsonWithHeaders(
      { error: "Too many listening updates. Please try again later." },
      {
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds),
        },
        status: 429,
      }
    );
  }

  try {
    const presence = await fetchLanyardPresence(LANYARD_USER_ID);
    const listening = parseAppleMusicActivity(presence?.activities);

    if (!listening) {
      return jsonWithHeaders({
        recents: await readRecents(),
        recorded: false,
      });
    }

    const existing = await readRecents();
    const recents = upsertRecentListen(existing, listening);
    await kv.put(LISTENING_RECENTS_KV_KEY, JSON.stringify(recents));

    return jsonWithHeaders({ recents, recorded: true });
  } catch (error) {
    console.error("Failed to record listening recent", error);
    return jsonWithHeaders(
      { error: "Failed to record listening recent" },
      { status: 500 }
    );
  }
};
