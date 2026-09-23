import type { APIRoute } from "astro";

import {
  cleanActivityPath,
  cleanActivityTitle,
  isPublicActivityPath,
} from "@/lib/activity-feed";
import { getSameOriginActivityReferer } from "@/lib/activity-request";
import {
  enforceRateLimit,
  getRequestClientKey,
} from "@/lib/request-rate-limit";
import { workersEnv } from "@/lib/workers-env";

interface CloudflareRequestGeo {
  city?: string;
  country?: string;
  latitude?: string | number;
  longitude?: string | number;
  region?: string;
}

interface ActivityListenBody {
  artist?: unknown;
  artistUrl?: unknown;
  track?: unknown;
  trackUrl?: unknown;
  visitorId?: unknown;
}

const json = (body: unknown, init?: ResponseInit): Response =>
  Response.json(body, {
    ...init,
    headers: {
      "Cache-Control": "no-store",
      ...init?.headers,
    },
  });

const stringOrNull = (value: unknown): string | null =>
  typeof value === "string" ? value : null;

export const POST: APIRoute = async ({ request }) => {
  const store = workersEnv.ACTIVITY_FEED_STORE;
  if (!store) {
    return json({ error: "Activity feed is not configured" }, { status: 503 });
  }

  const referer = getSameOriginActivityReferer(request);
  if (!referer) {
    return json({ accepted: false });
  }

  const path = cleanActivityPath(referer.pathname);
  if (!path || !isPublicActivityPath(path)) {
    return json({ accepted: false });
  }

  const rateLimit = enforceRateLimit({
    bucket: "activity-listen",
    key: getRequestClientKey(request),
    limit: 20,
    windowMs: 60_000,
  });
  if (rateLimit.limited) {
    return json(
      { error: "Too many listening events" },
      {
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
        status: 429,
      }
    );
  }

  let body: ActivityListenBody = {};
  try {
    const parsed: unknown = await request.json();
    if (typeof parsed === "object" && parsed !== null) {
      body = parsed as ActivityListenBody;
    }
  } catch {
    return json({ error: "Invalid listening payload" }, { status: 400 });
  }

  if (typeof body.track !== "string" || typeof body.artist !== "string") {
    return json({ error: "Track and artist are required" }, { status: 400 });
  }

  const requestWithCf = request as Request & { cf?: CloudflareRequestGeo };
  const geo = requestWithCf.cf ?? {};
  const event = await store.getByName("public").append(
    {
      action: "listened",
      artist: body.artist,
      artistUrl: stringOrNull(body.artistUrl),
      city: geo.city,
      country: geo.country,
      countryCode: geo.country,
      latitude:
        typeof geo.latitude === "string" ? Number(geo.latitude) : geo.latitude,
      longitude:
        typeof geo.longitude === "string"
          ? Number(geo.longitude)
          : geo.longitude,
      path,
      region: geo.region,
      title: cleanActivityTitle(body.track),
      trackUrl: stringOrNull(body.trackUrl),
    },
    crypto.randomUUID(),
    typeof body.visitorId === "string" ? body.visitorId : null
  );

  return json({ accepted: Boolean(event) });
};
