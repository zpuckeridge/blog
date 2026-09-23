import type { APIRoute } from "astro";

import { cleanActivityTitle, isPublicActivityPath } from "@/lib/activity-feed";
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

interface ActivityCaptureBody {
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

const getRequestGeo = (request: Request): CloudflareRequestGeo => {
  const requestWithCf = request as Request & { cf?: CloudflareRequestGeo };
  return requestWithCf.cf ?? {};
};

const isLikelyBot = (request: Request): boolean => {
  const userAgent = request.headers.get("User-Agent")?.toLowerCase() ?? "";
  return /bot|crawl|spider|slurp|lighthouse|headless|preview|uptime/iu.test(
    userAgent
  );
};

export const POST: APIRoute = async ({ request }) => {
  const store = workersEnv.ACTIVITY_FEED_STORE;
  if (!store) {
    return json({ error: "Activity feed is not configured" }, { status: 503 });
  }

  if (isLikelyBot(request)) {
    return json({ accepted: false });
  }

  const referer = getSameOriginActivityReferer(request);
  if (!referer || !isPublicActivityPath(referer.pathname)) {
    return json({ accepted: false });
  }

  const rateLimit = enforceRateLimit({
    bucket: "activity-capture",
    key: getRequestClientKey(request),
    limit: 30,
    windowMs: 60_000,
  });
  if (rateLimit.limited) {
    return json(
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
    return json({ error: "Invalid capture payload" }, { status: 400 });
  }

  const geo = getRequestGeo(request);
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
      path: referer.pathname,
      region: geo.region,
      title:
        typeof body.title === "string"
          ? cleanActivityTitle(body.title)
          : referer.pathname,
      visitorId: typeof body.visitorId === "string" ? body.visitorId : null,
    },
    crypto.randomUUID(),
    typeof body.visitorId === "string" ? body.visitorId : null
  );

  return json({ accepted: Boolean(event) });
};
