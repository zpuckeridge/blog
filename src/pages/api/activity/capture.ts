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

interface ActivityCaptureBody {
  title?: unknown;
  visitorId?: unknown;
}

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
    bucket: "activity-capture",
    key: getRequestClientKey(request),
    limit: 30,
    windowMs: 60_000,
  });
  if (rateLimit.limited) {
    return activityJsonResponse(
      { error: "Too many activity captures" },
      {
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
        status: 429,
      }
    );
  }

  let body: ActivityCaptureBody = {};
  try {
    const parsed: unknown = await request.json();
    if (typeof parsed === "object" && parsed !== null) {
      body = parsed as ActivityCaptureBody;
    }
  } catch {
    return activityJsonResponse(
      { error: "Invalid capture payload" },
      { status: 400 }
    );
  }

  const geo = getActivityRequestGeo(request);
  const event = await store.getByName("public").append(
    {
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
      title:
        typeof body.title === "string" ? cleanActivityTitle(body.title) : path,
      visitorId: typeof body.visitorId === "string" ? body.visitorId : null,
    },
    crypto.randomUUID(),
    typeof body.visitorId === "string" ? body.visitorId : null,
    getActivityRequestUserAgent(request)
  );

  return activityJsonResponse({ accepted: Boolean(event) });
};
