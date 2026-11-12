import type { APIRoute } from "astro";

import {
  ACTIVITY_FEED_NAME,
  activityJsonResponse,
  activityPlaceFromGeo,
  getActivityRequestGeo,
  openActivityPost,
} from "@/lib/activity-api";
import { cleanActivityTitle } from "@/lib/activity-feed";
import { getActivityRequestUserAgent } from "@/lib/activity-request";
import { VIDEO_PATH_PREFIX } from "@/lib/video-paths";

interface ActivityWatchBody {
  title?: unknown;
  visitorId?: unknown;
}

export const POST: APIRoute = async ({ request }) => {
  const opened = openActivityPost(request, {
    acceptPath: (path) => path.startsWith(VIDEO_PATH_PREFIX),
    bucket: "activity-watch",
    limit: 10,
    rateLimitMessage: "Too many activity watch events",
  });
  if (opened instanceof Response) {
    return opened;
  }

  const { path, store } = opened;
  let body: ActivityWatchBody = {};
  try {
    const parsed: unknown = await request.json();
    if (typeof parsed === "object" && parsed !== null) {
      body = parsed as ActivityWatchBody;
    }
  } catch {
    return activityJsonResponse(
      { error: "Invalid watch payload" },
      { status: 400 }
    );
  }

  const geo = getActivityRequestGeo(request);
  const event = await store.getByName(ACTIVITY_FEED_NAME).append(
    {
      action: "watched",
      ...activityPlaceFromGeo(geo),
      path,
      title:
        typeof body.title === "string" ? cleanActivityTitle(body.title) : path,
    },
    crypto.randomUUID(),
    typeof body.visitorId === "string" ? body.visitorId : null,
    getActivityRequestUserAgent(request)
  );

  return activityJsonResponse({ accepted: Boolean(event) });
};
