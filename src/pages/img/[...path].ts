import type { APIRoute } from "astro";

import {
  DIRECTUS_ORIGIN,
  IMAGE_FITS,
  IMAGE_FORMATS,
  isDirectusAssetId,
} from "@/lib/directus-asset";
import { workersEnv } from "@/lib/workers-env";

export const prerender = false;

const CACHE_CONTROL =
  "public, max-age=604800, s-maxage=2592000, stale-while-revalidate=86400";
const PASSTHROUGH_HEADERS = [
  "content-type",
  "content-length",
  "etag",
  "last-modified",
] as const;
const MAX_DIMENSION = 4000;

const intInRange = (value: string, min: number, max: number) => {
  if (!/^\d{1,5}$/u.test(value)) {
    return null;
  }
  const number = Number(value);
  return number >= min && number <= max ? String(number) : null;
};

/** Only these transform params reach Directus; anything else is rejected. */
const PARAM_VALIDATORS: Record<string, (value: string) => string | null> = {
  fit: (value) =>
    (IMAGE_FITS as readonly string[]).includes(value) ? value : null,
  format: (value) =>
    (IMAGE_FORMATS as readonly string[]).includes(value) ? value : null,
  height: (value) => intInRange(value, 1, MAX_DIMENSION),
  quality: (value) => intInRange(value, 1, 100),
  width: (value) => intInRange(value, 1, MAX_DIMENSION),
};

const notFound = (status = 404, message = "Not found") =>
  new Response(message, {
    headers: { "cache-control": "no-store", "content-type": "text/plain" },
    status,
  });

const getEdgeCache = (): Cache | null =>
  typeof caches !== "undefined" && "default" in caches
    ? (caches as unknown as { default: Cache }).default
    : null;

const getToken = (): string | undefined =>
  workersEnv.DIRECTUS_TOKEN ??
  (typeof process === "undefined" ? undefined : process.env.DIRECTUS_TOKEN);

export const GET: APIRoute = async ({ params, request }) => {
  // /img/<uuid> or /img/<uuid>/<any-filename> (filename is cosmetic).
  const segments = (params.path ?? "").split("/");
  const [assetId] = segments;
  if (!assetId || segments.length > 2 || !isDirectusAssetId(assetId)) {
    return notFound();
  }

  const requestUrl = new URL(request.url);
  const upstreamParams = new URLSearchParams();
  for (const [key, value] of requestUrl.searchParams) {
    const validate = PARAM_VALIDATORS[key];
    const valid = validate ? validate(value) : null;
    if (valid === null || upstreamParams.has(key)) {
      return notFound(400, "Bad request");
    }
    upstreamParams.set(key, valid);
  }
  upstreamParams.sort();

  const query = upstreamParams.toString();
  const assetIdLower = assetId.toLowerCase();
  const cacheKey = new Request(
    `${requestUrl.origin}/img/${assetIdLower}${query ? `?${query}` : ""}`
  );
  const cache = getEdgeCache();
  const cached = await cache?.match(cacheKey);
  if (cached) {
    return cached;
  }

  const token = getToken();
  const upstream = await fetch(
    `${DIRECTUS_ORIGIN}/assets/${assetIdLower}${query ? `?${query}` : ""}`,
    {
      headers: token ? { authorization: `Bearer ${token}` } : {},
    }
  );

  if (!upstream.ok || !upstream.body) {
    return notFound(upstream.status === 400 ? 400 : 404);
  }

  const contentType = upstream.headers.get("content-type") ?? "";
  if (!/^(?:image|video)\//u.test(contentType)) {
    return notFound();
  }

  const headers = new Headers();
  for (const name of PASSTHROUGH_HEADERS) {
    const value = upstream.headers.get(name);
    if (value) {
      headers.set(name, value);
    }
  }
  headers.set("cache-control", CACHE_CONTROL);
  headers.set("x-content-type-options", "nosniff");
  headers.set("content-security-policy", "default-src 'none'; sandbox");

  const response = new Response(upstream.body, { headers, status: 200 });
  if (cache) {
    await cache.put(cacheKey, response.clone());
  }
  return response;
};
