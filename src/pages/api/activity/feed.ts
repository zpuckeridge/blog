import type { APIRoute } from "astro";

import { ACTIVITY_FEED_NAME } from "@/lib/activity-api";
import { workersEnv } from "@/lib/workers-env";

export const GET: APIRoute = async () => {
  const store = workersEnv.ACTIVITY_FEED_STORE;
  if (!store) {
    return Response.json(
      { count: 0, events: [] },
      {
        headers: {
          "Cache-Control": "no-store",
        },
        status: 503,
      }
    );
  }

  const events = await store.getByName(ACTIVITY_FEED_NAME).list();
  return Response.json(
    {
      count: events.length,
      events,
    },
    {
      headers: {
        "Cache-Control":
          "public, max-age=2, s-maxage=2, stale-while-revalidate=30",
      },
    }
  );
};
