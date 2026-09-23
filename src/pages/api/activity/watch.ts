import type { APIRoute } from "astro";

import { cleanActivityTitle } from "@/lib/activity-feed";
import {
  getActivityRequestUserAgent,
  getSameOriginActivityReferer,
} from "@/lib/activity-request";
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

interface ActivityWatchBody {
  title?: unknown;
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

export const POST: APIRoute = async ({ request }) => {
  const store = workersEnv.ACTIVITY_FEED_STORE;
  if (!store) {
    return json({ error: "Activity feed is not configured" }, { status: 503 });
  }

  const referer = getSameOriginActivityReferer(request);
  if (!referer) {
    return json({ accepted: false });
  }

  if (!referer.pathname.startsWith("/video/")) {
    return json({ accepted: false });
  }

  const rateLimit = enforceRateLimit({
    bucket: "activity-watch",
    key: getRequestClientKey(request),
    limit: 10,
    windowMs: 60_000,
  });
  if (rateLimit.limited) {
    return json(
      { error: "Too many activity watch events" },
      {
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
        status: 429,
      }
    );
  }

  let body: ActivityWatchBody = {};
  try {
    const parsed: unknown = await request.json();
    if (typeof parsed === "object" && parsed !== null) {
      body = parsed as ActivityWatchBody;
    }
  } catch {
    return json({ error: "Invalid watch payload" }, { status: 400 });
  }

  const requestWithCf = request as Request & { cf?: CloudflareRequestGeo };
  const geo = requestWithCf.cf ?? {};
  const event = await store.getByName("public").append(
    {
      action: "watched",
      city: geo.city,
      country: geo.country,
      countryCode: geo.country,
      latitude:
        typeof geo.latitude === "string" ? Number(geo.latitude) : geo.latitude,
      longitude:
        typeof geo.longitude === "string"
          ? Number(geo.longitude)
          : geo.longitude,
      path: referer.pathname,
      region: geo.region,
      title:
        typeof body.title === "string"
          ? cleanActivityTitle(body.title)
          : referer.pathname,
    },
    crypto.randomUUID(),
    typeof body.visitorId === "string" ? body.visitorId : null,
    getActivityRequestUserAgent(request)
  );

  return json({ accepted: Boolean(event) });
};
