import type { APIRoute } from "astro";

import {
  enforceRateLimit,
  getRequestClientKey,
} from "@/lib/request-rate-limit";

interface ContributionDay {
  color: string;
  contributionCount: number;
  date: string;
}

interface GitHubGraphqlResponse {
  data?: {
    user?: {
      contributionsCollection: {
        contributionCalendar: {
          weeks: {
            contributionDays: ContributionDay[];
          }[];
        };
      };
    };
  };
  errors?: { message?: string }[];
}

interface CachedContributionResponse {
  contributions: ContributionDay[];
  expiresAt: number;
}

const GITHUB_USERNAME_REGEX = /^[A-Za-z\d](?:[A-Za-z\d-]{0,37}[A-Za-z\d])?$/;
const GITHUB_CACHE_TTL_MS = 1000 * 60 * 30;
const GITHUB_RESPONSE_HEADERS = {
  "Cache-Control":
    "public, max-age=300, s-maxage=1800, stale-while-revalidate=86400",
};
const contributionCache =
  (
    globalThis as typeof globalThis & {
      __blogGitHubContributionCache?: Map<string, CachedContributionResponse>;
    }
  ).__blogGitHubContributionCache ??
  new Map<string, CachedContributionResponse>();

(
  globalThis as typeof globalThis & {
    __blogGitHubContributionCache?: Map<string, CachedContributionResponse>;
  }
).__blogGitHubContributionCache = contributionCache;

const jsonWithHeaders = (
  body: unknown,
  init?: ResponseInit,
  headers?: Record<string, string>
): Response =>
  Response.json(body, {
    ...init,
    headers: {
      ...init?.headers,
      ...headers,
    },
  });

const validateUsername = (username?: string): Response | null => {
  if (!username) {
    return jsonWithHeaders(
      { error: "Username is required" },
      { status: 400 },
      { "Cache-Control": "no-store" }
    );
  }

  if (!GITHUB_USERNAME_REGEX.test(username)) {
    return jsonWithHeaders(
      { error: "Username format is invalid" },
      { status: 400 },
      { "Cache-Control": "no-store" }
    );
  }

  return null;
};

const getRateLimitResponse = (
  request: Request,
  clientAddress: string | undefined
): Response | null => {
  const rateLimit = enforceRateLimit({
    bucket: "github-contributions",
    key: getRequestClientKey(request, clientAddress),
    limit: 30,
    windowMs: 1000 * 60 * 10,
  });

  if (!rateLimit.limited) {
    return null;
  }

  return jsonWithHeaders(
    { error: "Too many contribution requests. Please try again later." },
    {
      headers: {
        "Retry-After": String(rateLimit.retryAfterSeconds),
      },
      status: 429,
    },
    { "Cache-Control": "no-store" }
  );
};

const getCachedContributionResponse = (username: string): Response | null => {
  const cached = contributionCache.get(username.toLowerCase());
  if (!cached || cached.expiresAt <= Date.now()) {
    return null;
  }

  return jsonWithHeaders(
    { contributions: cached.contributions },
    { status: 200 },
    GITHUB_RESPONSE_HEADERS
  );
};

const handleResponseError = (
  response: Response,
  username: string
): Response | null => {
  if (response.status === 401) {
    return jsonWithHeaders(
      { error: "GitHub token is invalid or expired" },
      { status: 401 },
      { "Cache-Control": "no-store" }
    );
  }

  if (response.status === 403) {
    const rateLimitRemaining = response.headers.get("x-ratelimit-remaining");
    const rateLimitReset = response.headers.get("x-ratelimit-reset");

    if (rateLimitRemaining === "0") {
      const resetTime = rateLimitReset
        ? new Date(Number.parseInt(rateLimitReset, 10) * 1000)
        : null;
      return jsonWithHeaders(
        {
          error: "GitHub API rate limit exceeded",
          resetTime: resetTime?.toISOString(),
        },
        { status: 429 },
        { "Cache-Control": "no-store" }
      );
    }

    return jsonWithHeaders(
      { error: "GitHub API access forbidden - check token permissions" },
      { status: 403 },
      { "Cache-Control": "no-store" }
    );
  }

  if (response.status === 404) {
    return jsonWithHeaders(
      { error: `GitHub user '${username}' not found` },
      { status: 404 },
      GITHUB_RESPONSE_HEADERS
    );
  }

  return null;
};

const fetchGitHubContributions = async (
  token: string,
  username: string
): Promise<Response> => {
  const response = await fetch("https://api.github.com/graphql", {
    body: JSON.stringify({
      query: `
					query($username: String!) {
						user(login: $username) {
							contributionsCollection {
								contributionCalendar {
									totalContributions
									weeks {
										contributionDays {
											date
											contributionCount
											color
										}
									}
								}
							}
						}
					}
				`,
      variables: { username },
    }),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "zacchary-me-blog",
    },
    method: "POST",
  });

  if (!response.ok) {
    const errorResponse = handleResponseError(response, username);
    if (errorResponse) {
      return errorResponse;
    }

    const errorText = await response.text();
    throw new Error(`GitHub API error: ${response.status} - ${errorText}`);
  }

  const data = (await response.json()) as GitHubGraphqlResponse;
  if (data.errors) {
    const errorMessage = data.errors[0]?.message || "Unknown GraphQL error";
    if (errorMessage.includes("Could not resolve to a User")) {
      return jsonWithHeaders(
        { error: `GitHub user '${username}' not found` },
        { status: 404 },
        GITHUB_RESPONSE_HEADERS
      );
    }

    throw new Error(`GitHub GraphQL error: ${errorMessage}`);
  }

  if (!data.data?.user) {
    return jsonWithHeaders(
      { error: `GitHub user '${username}' not found` },
      { status: 404 },
      GITHUB_RESPONSE_HEADERS
    );
  }

  const { weeks } = data.data.user.contributionsCollection.contributionCalendar;
  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

  const contributions: ContributionDay[] = [];
  for (const week of weeks) {
    for (const day of week.contributionDays) {
      if (new Date(day.date) >= twelveMonthsAgo) {
        contributions.push({
          color: day.color,
          contributionCount: day.contributionCount,
          date: day.date,
        });
      }
    }
  }

  contributionCache.set(username.toLowerCase(), {
    contributions,
    expiresAt: Date.now() + GITHUB_CACHE_TTL_MS,
  });

  return jsonWithHeaders(
    { contributions },
    { status: 200 },
    GITHUB_RESPONSE_HEADERS
  );
};

export const GET: APIRoute = async ({ request, clientAddress }) => {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username")?.trim();

  const usernameValidationError = validateUsername(username);
  if (usernameValidationError) {
    return usernameValidationError;
  }

  const rateLimitResponse = getRateLimitResponse(request, clientAddress);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  const cachedResponse = getCachedContributionResponse(username);
  if (cachedResponse) {
    return cachedResponse;
  }

  const token = import.meta.env.GITHUB_TOKEN ?? process.env.GITHUB_TOKEN;
  if (!token) {
    return jsonWithHeaders(
      { error: "GitHub token not configured" },
      { status: 500 },
      { "Cache-Control": "no-store" }
    );
  }

  try {
    return await fetchGitHubContributions(token, username);
  } catch (error) {
    console.error("Failed to fetch GitHub contributions", error);
    return jsonWithHeaders(
      { error: "Failed to fetch GitHub contributions" },
      { status: 500 },
      { "Cache-Control": "no-store" }
    );
  }
};
