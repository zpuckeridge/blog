import type { APIRoute } from "astro";

import {
  getWebsiteCarbonRating,
  normalizeWebsiteCarbonUrl,
  WEBSITE_CARBON_RESPONSE_HEADERS,
  WEBSITE_CARBON_SITE_URL,
} from "@/lib/website-carbon";
import {
  enforceRateLimit,
  getRequestClientKey,
} from "@/lib/request-rate-limit";

export const GET: APIRoute = async ({ request, clientAddress }) => {
  const rateLimit = enforceRateLimit({
    bucket: "website-carbon",
    key: getRequestClientKey(request, clientAddress),
    limit: 60,
    windowMs: 1000 * 60 * 10,
  });

  if (rateLimit.limited) {
    return Response.json(
      { error: "Too many carbon rating requests. Please try again later." },
      {
        headers: {
          "Cache-Control": "no-store",
          "Retry-After": String(rateLimit.retryAfterSeconds),
        },
        status: 429,
      }
    );
  }

  const { searchParams } = new URL(request.url);
  const requestedUrl = searchParams.get("url") ?? WEBSITE_CARBON_SITE_URL;

  if (!normalizeWebsiteCarbonUrl(requestedUrl)) {
    return Response.json(
      { error: "URL format is invalid" },
      {
        headers: { "Cache-Control": "no-store" },
        status: 400,
      }
    );
  }

  const rating = await getWebsiteCarbonRating(requestedUrl);

  return Response.json(rating, {
    headers: WEBSITE_CARBON_RESPONSE_HEADERS,
    status: 200,
  });
};
