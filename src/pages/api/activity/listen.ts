import type { APIRoute } from "astro";

import {
  ACTIVITY_FEED_NAME,
  activityJsonResponse,
  activityPlaceFromGeo,
  getActivityRequestGeo,
  openActivityPost,
} from "@/lib/activity-api";
import { cleanActivityTitle, isPublicActivityPath } from "@/lib/activity-feed";
import { getActivityRequestUserAgent } from "@/lib/activity-request";

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
  const opened = openActivityPost(request, {
    acceptPath: isPublicActivityPath,
    bucket: "activity-listen",
    limit: 20,
    rateLimitMessage: "Too many listening events",
  });
  if (opened instanceof Response) {
    return opened;
  }

  const { path, store } = opened;
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
  const event = await store.getByName(ACTIVITY_FEED_NAME).append(
    {
      action: "listened",
      artist: body.artist,
      artistUrl: stringOrNull(body.artistUrl),
      ...activityPlaceFromGeo(geo),
      path,
      title: cleanActivityTitle(body.track),
      trackUrl: stringOrNull(body.trackUrl),
    },
    crypto.randomUUID(),
    typeof body.visitorId === "string" ? body.visitorId : null,
    getActivityRequestUserAgent(request)
  );

  return activityJsonResponse({ accepted: Boolean(event) });
};
