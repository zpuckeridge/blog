import type { APIRoute } from "astro";

import {
  deriveStatus,
  LOCATION_KV_KEY,
  toPublicResponse,
  ZONES,
  type LocationEvent,
  type LocationStatusRecord,
} from "@/lib/location-status";
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

const getWebhookSecret = (): string | null =>
  // Prefer the Worker secret binding. Avoid import.meta.env — Vite inlines it
  // into the production bundle at build time.
  workersEnv.LOCATION_WEBHOOK_SECRET ??
  process.env.LOCATION_WEBHOOK_SECRET ??
  null;

export const GET: APIRoute = async () => {
  const kv = workersEnv.LOCATION_KV;
  if (!kv) {
    return jsonWithHeaders(
      { error: "Location status is not configured" },
      { status: 503 }
    );
  }

  const raw = await kv.get(LOCATION_KV_KEY);
  if (!raw) {
    return jsonWithHeaders({ status: null }, { status: 200 });
  }

  try {
    const record = JSON.parse(raw) as LocationStatusRecord;
    return jsonWithHeaders(toPublicResponse(record));
  } catch (error) {
    console.error("Failed to read location status", error);
    return jsonWithHeaders(
      { error: "Invalid stored location status" },
      { status: 500 }
    );
  }
};

export const POST: APIRoute = async ({ request }) => {
  const secret = getWebhookSecret();
  const kv = workersEnv.LOCATION_KV;

  if (!secret || !kv) {
    return jsonWithHeaders(
      { error: "Location webhook is not configured" },
      { status: 503 }
    );
  }

  const authorization = request.headers.get("Authorization");
  if (authorization !== `Bearer ${secret}`) {
    return jsonWithHeaders({ error: "Unauthorized" }, { status: 401 });
  }

  const rateLimit = enforceRateLimit({
    bucket: "location",
    key: getRequestClientKey(request),
    limit: 30,
    windowMs: 1000 * 60,
  });
  if (rateLimit.limited) {
    return jsonWithHeaders(
      { error: "Too many location updates. Please try again later." },
      {
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds),
        },
        status: 429,
      }
    );
  }

  try {
    const body = (await request.json()) as unknown;
    const zone =
      typeof body === "object" &&
      body !== null &&
      "zone" in body &&
      typeof body.zone === "string"
        ? body.zone.trim()
        : "";
    const event =
      typeof body === "object" &&
      body !== null &&
      "event" in body &&
      typeof body.event === "string"
        ? body.event.trim()
        : "";

    if (!zone || !(zone in ZONES)) {
      return jsonWithHeaders(
        { error: "Unknown or missing zone" },
        { status: 400 }
      );
    }

    if (event !== "enter" && event !== "leave") {
      return jsonWithHeaders({ error: "Invalid event" }, { status: 400 });
    }

    const now = new Date();
    const { status, category } = deriveStatus(
      zone,
      event as LocationEvent,
      now
    );

    const record: LocationStatusRecord = {
      status,
      zone,
      event: event as LocationEvent,
      category,
      updatedAt: now.getTime(),
    };

    await kv.put(LOCATION_KV_KEY, JSON.stringify(record));

    return jsonWithHeaders({ success: true, status: record.status });
  } catch (error) {
    console.error("Failed to update location status", error);
    return jsonWithHeaders(
      { error: "Failed to update location status" },
      { status: 500 }
    );
  }
};
