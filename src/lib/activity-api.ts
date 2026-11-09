import { cleanActivityPath } from "@/lib/activity-feed";

export interface CloudflareRequestGeo {
  city?: string;
  country?: string;
  latitude?: string | number;
  longitude?: string | number;
  region?: string;
}

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
