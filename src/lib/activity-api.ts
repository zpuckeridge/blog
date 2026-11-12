import { cleanActivityPath } from "@/lib/activity-feed";
import type { ActivityFeedStoreNamespace } from "@/lib/activity-feed-store";
import { getSameOriginActivityReferer } from "@/lib/activity-request";
import { isLikelyBotUserAgent } from "@/lib/is-likely-bot";
import {
  enforceRateLimit,
  getRequestClientKey,
} from "@/lib/request-rate-limit";
import { workersEnv } from "@/lib/workers-env";

export interface CloudflareRequestGeo {
  city?: string;
  country?: string;
  latitude?: string | number;
  longitude?: string | number;
  region?: string;
}

export const ACTIVITY_FEED_NAME = "public";

export const activityPlaceFromGeo = (geo: CloudflareRequestGeo) => ({
  city: geo.city,
  country: geo.country,
  countryCode: geo.country,
  latitude:
    typeof geo.latitude === "string" ? Number(geo.latitude) : geo.latitude,
  longitude:
    typeof geo.longitude === "string" ? Number(geo.longitude) : geo.longitude,
  region: geo.region,
});

export const activityJsonResponse = (
  body: unknown,
  init?: ResponseInit
): Response =>
  Response.json(body, {
    ...init,
    headers: {
      "Cache-Control": "no-store",
      ...init?.headers,
    },
  });

export const getActivityRequestGeo = (
  request: Request
): CloudflareRequestGeo => {
  const requestWithCf = request as Request & { cf?: CloudflareRequestGeo };
  return requestWithCf.cf ?? {};
};

export const activityPathFromReferer = (referer: URL): string | null =>
  cleanActivityPath(referer.pathname);

const ACTIVITY_WINDOW_MS = 60_000;

export const openActivityPost = (
  request: Request,
  options: {
    acceptPath: (path: string) => boolean;
    bucket: string;
    limit: number;
    rateLimitMessage: string;
  }
): { path: string; store: ActivityFeedStoreNamespace } | Response => {
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
  if (!path || !options.acceptPath(path)) {
    return activityJsonResponse({ accepted: false });
  }

  const rateLimit = enforceRateLimit({
    bucket: options.bucket,
    key: getRequestClientKey(request),
    limit: options.limit,
    windowMs: ACTIVITY_WINDOW_MS,
  });
  if (rateLimit.limited) {
    return activityJsonResponse(
      { error: options.rateLimitMessage },
      {
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
        status: 429,
      }
    );
  }

  return { path, store };
};
