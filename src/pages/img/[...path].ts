import type { APIRoute } from "astro";

import {
  IMAGE_FITS,
  IMAGE_FORMATS,
  isDirectusAssetId,
} from "@/lib/directus-asset";
import { DIRECTUS_ORIGIN } from "@/lib/directus-config";
import { getDirectusToken } from "@/lib/directus-token";
import { getEdgeCache, waitUntilFromLocals } from "@/lib/html-cache";
import {
  IMAGE_CACHE_CONTROL,
  IMAGE_CDN_CACHE_CONTROL,
  IMAGE_EDGE_TTL_SECONDS,
} from "@/lib/image-response-cache";

export const prerender = false;

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

const upstreamAssetQuery = (
  searchParams: URLSearchParams
): { error: Response } | { query: string } => {
  const upstreamParams = new URLSearchParams();

  for (const [key, value] of searchParams) {
    const validate = PARAM_VALIDATORS[key];
    const valid = validate ? validate(value) : null;
    if (valid === null || upstreamParams.has(key)) {
      return { error: notFound(400, "Bad request") };
    }
    upstreamParams.set(key, valid);
  }

  upstreamParams.sort();
  return { query: upstreamParams.toString() };
};

type EdgeRequestInit = RequestInit & {
  cf?: {
    cacheEverything?: boolean;
    cacheTtlByStatus?: Record<string, number>;
  };
};

/**
 * Directus sends `private` / `no-store` on token-authenticated assets, which
 * would keep every transform off the tiered cache. The URL is the public
 * cache key; the token stays on this subrequest.
 */
const fetchUpstreamAsset = (assetUrl: string, token: string | undefined) => {
  const init: EdgeRequestInit = {
    cf: {
      cacheEverything: true,
      cacheTtlByStatus: {
        "200-299": IMAGE_EDGE_TTL_SECONDS,
        "400-599": 0,
      },
    },
    headers: token ? { authorization: `Bearer ${token}` } : undefined,
  };
  return fetch(assetUrl, init);
};

const rememberImage = (
  cache: Cache,
  cacheKey: Request,
  response: Response,
  locals: unknown
) => {
  const store = cache.put(cacheKey, response.clone());
  const waitUntil = waitUntilFromLocals(locals);
  if (waitUntil) {
    waitUntil(store);
    return;
  }
  return store;
};

export const GET: APIRoute = async ({ locals, params, request }) => {
  const segments = (params.path ?? "").split("/");
  const [assetId] = segments;
  if (!assetId || segments.length > 2 || !isDirectusAssetId(assetId)) {
    return notFound();
  }

  const requestUrl = new URL(request.url);
  const assetQuery = upstreamAssetQuery(requestUrl.searchParams);
  if ("error" in assetQuery) {
    return assetQuery.error;
  }

  const { query } = assetQuery;
  const assetIdLower = assetId.toLowerCase();
  const cacheKey = new Request(
    `${requestUrl.origin}/img/${assetIdLower}${query ? `?${query}` : ""}`
  );
  const cache = getEdgeCache();
  const cached = await cache?.match(cacheKey);
  if (cached) {
    return cached;
  }

  const token = getDirectusToken();
  const upstream = await fetchUpstreamAsset(
    `${DIRECTUS_ORIGIN}/assets/${assetIdLower}${query ? `?${query}` : ""}`,
    token
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
  headers.set("Cache-Control", IMAGE_CACHE_CONTROL);
  headers.set("Cloudflare-CDN-Cache-Control", IMAGE_CDN_CACHE_CONTROL);
  headers.set("x-content-type-options", "nosniff");
  headers.set("content-security-policy", "default-src 'none'; sandbox");

  const response = new Response(upstream.body, { headers, status: 200 });
  if (cache) {
    await rememberImage(cache, cacheKey, response, locals);
  }
  return response;
};
