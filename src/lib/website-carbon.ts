export interface WebsiteCarbonRating {
  c: string;
  p: number;
  source: "live" | "cache" | "fallback";
  testedAt?: number;
  url: string;
}

interface WebsiteCarbonApiResult {
  c: string;
  p: number;
}

interface CachedWebsiteCarbonRating {
  expiresAt: number;
  result: WebsiteCarbonApiResult;
  testedAt: number;
}

export const WEBSITE_CARBON_SITE_URL = "https://zacchary.me";

export const WEBSITE_CARBON_FALLBACK: WebsiteCarbonApiResult = {
  c: "0.02",
  p: 0,
};

export const WEBSITE_CARBON_RESPONSE_HEADERS = {
  "Cache-Control":
    "public, max-age=300, s-maxage=86400, stale-while-revalidate=604800",
};

const WEBSITE_CARBON_API_URL = "https://api.websitecarbon.com/b";
const WEBSITE_CARBON_CACHE_TTL_MS = 1000 * 60 * 60 * 24;

const ratingCache =
  (
    globalThis as typeof globalThis & {
      __blogWebsiteCarbonCache?: Map<string, CachedWebsiteCarbonRating>;
    }
  ).__blogWebsiteCarbonCache ?? new Map<string, CachedWebsiteCarbonRating>();

(
  globalThis as typeof globalThis & {
    __blogWebsiteCarbonCache?: Map<string, CachedWebsiteCarbonRating>;
  }
).__blogWebsiteCarbonCache = ratingCache;

const isWebsiteCarbonApiResult = (
  value: unknown
): value is WebsiteCarbonApiResult => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const record = value as Record<string, unknown>;
  return typeof record.c === "string" && typeof record.p === "number";
};

export const normalizeWebsiteCarbonUrl = (url: string): string | null => {
  try {
    const parsed = new URL(url);

    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return null;
    }

    parsed.hash = "";
    return parsed.toString();
  } catch {
    return null;
  }
};

const getCachedRating = (
  url: string
): CachedWebsiteCarbonRating | null => {
  const cached = ratingCache.get(url);
  if (!cached) {
    return null;
  }

  return cached;
};

const setCachedRating = (
  url: string,
  result: WebsiteCarbonApiResult
): void => {
  const testedAt = Date.now();
  ratingCache.set(url, {
    expiresAt: testedAt + WEBSITE_CARBON_CACHE_TTL_MS,
    result,
    testedAt,
  });
};

const fetchWebsiteCarbonRating = async (
  url: string
): Promise<WebsiteCarbonApiResult> => {
  const response = await fetch(
    `${WEBSITE_CARBON_API_URL}?url=${encodeURIComponent(url)}`
  );

  if (!response.ok) {
    throw new Error(`Website Carbon API unavailable (${response.status})`);
  }

  const result: unknown = await response.json();

  if (
    typeof result === "object" &&
    result !== null &&
    "error" in result &&
    typeof (result as { error?: unknown }).error === "string"
  ) {
    throw new Error((result as { error: string }).error);
  }

  if (!isWebsiteCarbonApiResult(result)) {
    throw new Error("Website Carbon API returned an invalid payload");
  }

  return result;
};

export const getWebsiteCarbonRating = async (
  url: string
): Promise<WebsiteCarbonRating> => {
  const normalizedUrl = normalizeWebsiteCarbonUrl(url);
  if (!normalizedUrl) {
    return {
      ...WEBSITE_CARBON_FALLBACK,
      source: "fallback",
      url: WEBSITE_CARBON_SITE_URL,
    };
  }

  const cached = getCachedRating(normalizedUrl);
  if (cached && cached.expiresAt > Date.now()) {
    return {
      ...cached.result,
      source: "cache",
      testedAt: cached.testedAt,
      url: normalizedUrl,
    };
  }

  try {
    const result = await fetchWebsiteCarbonRating(normalizedUrl);
    setCachedRating(normalizedUrl, result);

    return {
      ...result,
      source: "live",
      testedAt: Date.now(),
      url: normalizedUrl,
    };
  } catch (error) {
    if (cached) {
      return {
        ...cached.result,
        source: "cache",
        testedAt: cached.testedAt,
        url: normalizedUrl,
      };
    }

    console.warn("Website Carbon rating unavailable", error);

    return {
      ...WEBSITE_CARBON_FALLBACK,
      source: "fallback",
      url: normalizedUrl,
    };
  }
};
