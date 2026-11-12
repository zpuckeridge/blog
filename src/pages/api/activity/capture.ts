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

interface ActivityCaptureBody {
  title?: unknown;
  visitorId?: unknown;
}

export const POST: APIRoute = async ({ request }) => {
  const opened = openActivityPost(request, {
    acceptPath: isPublicActivityPath,
    bucket: "activity-capture",
    limit: 30,
    rateLimitMessage: "Too many activity captures",
  });
  if (opened instanceof Response) {
    return opened;
  }

  const { path, store } = opened;
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
  const event = await store.getByName(ACTIVITY_FEED_NAME).append(
    {
      ...activityPlaceFromGeo(geo),
      path,
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
