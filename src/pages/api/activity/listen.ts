import type { APIRoute } from "astro";

import {
  activityJsonResponse,
  activityPathFromReferer,
  getActivityRequestGeo,
} from "@/lib/activity-api";
import { cleanActivityTitle, isPublicActivityPath } from "@/lib/activity-feed";
import {
  getActivityRequestUserAgent,
  getSameOriginActivityReferer,
} from "@/lib/activity-request";
import { isLikelyBotUserAgent } from "@/lib/is-likely-bot";
import {
  enforceRateLimit,
  getRequestClientKey,
} from "@/lib/request-rate-limit";
import { workersEnv } from "@/lib/workers-env";

interface ActivityListenBody {
  artist?: unknown;
  artistUrl?: unknown;
  track?: unknown;
  trackUrl?: unknown;
  visitorId?: unknown;
}

const stringOrNull = (value: unknown): string | null =>
  typeof value === "string" ? value : null;

export const POST: APIRoute = async ({ request }) => {
  const store = workersEnv.ACTIVITY_FEED_STORE;
  if (!store) {
    return activityJsonResponse(
      { error: "Activity feed is not configured" },
      { status: 503 }
    );
  }

  if (isLikelyBotUserAgent(request.headers.get("User-Agent"))) {
    return activityJsonResponse({ accepted: false });
  }

  const referer = getSameOriginActivityReferer(request);
  if (!referer) {
    return activityJsonResponse({ accepted: false });
  }

  const path = activityPathFromReferer(referer);
  if (!path || !isPublicActivityPath(path)) {
    return activityJsonResponse({ accepted: false });
  }

  const rateLimit = enforceRateLimit({
    bucket: "activity-listen",
    key: getRequestClientKey(request),
    limit: 20,
    windowMs: 60_000,
  });
  if (rateLimit.limited) {
    return activityJsonResponse(
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
    return activityJsonResponse(
      { error: "Invalid listening payload" },
      { status: 400 }
    );
  }

  if (typeof body.track !== "string" || typeof body.artist !== "string") {
    return activityJsonResponse(
      { error: "Track and artist are required" },
      { status: 400 }
    );
  }

  const geo = getActivityRequestGeo(request);
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
    typeof body.visitorId === "string" ? body.visitorId : null,
    getActivityRequestUserAgent(request)
  );

  return activityJsonResponse({ accepted: Boolean(event) });
};
