import type { APIRoute } from "astro";

import { jsonNoStore } from "@/lib/json-response";
import {
  deriveStatus,
  LOCATION_KV_KEY,
  readLocationPublicStatus,
  ZONES,
} from "@/lib/location-status";
import type {
  LocationEvent,
  LocationStatusRecord,
} from "@/lib/location-status";
import {
  enforceRateLimit,
  getRequestClientKey,
} from "@/lib/request-rate-limit";
import { workersEnv } from "@/lib/workers-env";

const getWebhookSecret = (): string | null =>
  // Prefer the Worker secret binding. Avoid import.meta.env — Vite inlines it
  // into the production bundle at build time.
  workersEnv.LOCATION_WEBHOOK_SECRET ??
  process.env.LOCATION_WEBHOOK_SECRET ??
  null;

export const GET: APIRoute = async () => {
  if (!workersEnv.LOCATION_KV) {
    return jsonNoStore(
      { error: "Location status is not configured" },
      { status: 503 }
    );
  }

  try {
    const status = await readLocationPublicStatus();
    if (!status) {
      return jsonNoStore({ status: null }, { status: 200 });
    }

    return jsonNoStore(status);
  } catch (error) {
    console.error("Failed to read location status", error);
    return jsonNoStore(
      { error: "Invalid stored location status" },
      { status: 500 }
    );
  }
};

export const POST: APIRoute = async ({ request }) => {
  const secret = getWebhookSecret();
  const kv = workersEnv.LOCATION_KV;

  if (!secret || !kv) {
    return jsonNoStore(
      { error: "Location webhook is not configured" },
      { status: 503 }
    );
  }

  const authorization = request.headers.get("Authorization");
  if (authorization !== `Bearer ${secret}`) {
    return jsonNoStore({ error: "Unauthorized" }, { status: 401 });
  }

  const rateLimit = enforceRateLimit({
    bucket: "location",
    key: getRequestClientKey(request),
    limit: 30,
    windowMs: 1000 * 60,
  });
  if (rateLimit.limited) {
    return jsonNoStore(
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
      return jsonNoStore({ error: "Unknown or missing zone" }, { status: 400 });
    }

    if (event !== "enter" && event !== "leave") {
      return jsonNoStore({ error: "Invalid event" }, { status: 400 });
    }

    const now = new Date();
    const { status, category } = deriveStatus(
      zone,
      event as LocationEvent,
      now
    );

    const record: LocationStatusRecord = {
      category,
      event: event as LocationEvent,
      status,
      updatedAt: now.getTime(),
      zone,
    };

    await kv.put(LOCATION_KV_KEY, JSON.stringify(record));

    return jsonNoStore({ status: record.status, success: true });
  } catch (error) {
    console.error("Failed to update location status", error);
    return jsonNoStore(
      { error: "Failed to update location status" },
      { status: 500 }
    );
  }
};
