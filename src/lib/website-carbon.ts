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

interface WebsiteCarbonDataApiResult {
  gco2e: number;
  cleanerThan: number;
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

const WEBSITE_CARBON_DATA_API_URL = "https://api.websitecarbon.com/data";
const GREEN_WEB_CHECK_API_URL =
  "https://api.thegreenwebfoundation.org/api/v3/greencheck";
const WEBSITE_CARBON_CACHE_TTL_MS = 1000 * 60 * 60 * 24;
const PAGE_FETCH_USER_AGENT = "ZaccharyBlogCarbonBot/1.0 (+https://zacchary.me)";

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

const isWebsiteCarbonDataApiResult = (
  value: unknown
): value is WebsiteCarbonDataApiResult => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const record = value as Record<string, unknown>;
  return (
    typeof record.gco2e === "number" &&
    typeof record.cleanerThan === "number"
  );
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

const formatGrams = (grams: number): string => {
  if (grams < 0.01) {
    return grams.toFixed(3);
  }

  if (grams < 1) {
    return grams.toFixed(2);
  }

  return grams.toFixed(1);
};

const mapDataApiResult = (
  result: WebsiteCarbonDataApiResult
): WebsiteCarbonApiResult => ({
  c: formatGrams(result.gco2e),
  p: Math.round(result.cleanerThan * 100),
});

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

const measurePageBytes = async (url: string): Promise<number> => {
  const response = await fetch(url, {
    headers: {
      Accept: "text/html,application/xhtml+xml",
      "User-Agent": PAGE_FETCH_USER_AGENT,
    },
    redirect: "follow",
  });

  if (!response.ok) {
    throw new Error(`Page fetch failed (${response.status})`);
  }

  const buffer = await response.arrayBuffer();
  return buffer.byteLength;
};

const checkGreenHosting = async (url: string): Promise<0 | 1> => {
  const hostname = new URL(url).hostname;

  try {
    const response = await fetch(
      `${GREEN_WEB_CHECK_API_URL}/${encodeURIComponent(hostname)}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      return 0;
    }

    const result = (await response.json()) as { green?: boolean };
    return result.green ? 1 : 0;
  } catch {
    return 0;
  }
};

const fetchWebsiteCarbonRating = async (
  url: string
): Promise<WebsiteCarbonApiResult> => {
  const [bytes, green] = await Promise.all([
    measurePageBytes(url),
    checkGreenHosting(url),
  ]);

  const response = await fetch(
    `${WEBSITE_CARBON_DATA_API_URL}?bytes=${bytes}&green=${green}`
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

  if (!isWebsiteCarbonDataApiResult(result)) {
    throw new Error("Website Carbon API returned an invalid payload");
  }

  return mapDataApiResult(result);
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

    if (import.meta.env.DEV) {
      console.warn("Website Carbon rating unavailable", error);
    }

    return {
      ...WEBSITE_CARBON_FALLBACK,
      source: "fallback",
      url: normalizedUrl,
    };
  }
};
