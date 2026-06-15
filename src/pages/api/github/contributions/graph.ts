import type { APIRoute } from "astro";

import {
  fetchGitHubContributions,
  getCachedGitHubContributions,
  getGitHubToken,
  GITHUB_RESPONSE_HEADERS,
  GitHubContributionsError,
  GITHUB_USERNAME_REGEX,
} from "@/lib/github-contributions";
import {
  enforceRateLimit,
  getRequestClientKey,
} from "@/lib/request-rate-limit";

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
  const contributions = getCachedGitHubContributions(username);
  if (!contributions) {
    return null;
  }

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

  const login = username as string;

  const rateLimitResponse = getRateLimitResponse(request, clientAddress);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  const cachedResponse = getCachedContributionResponse(login);
  if (cachedResponse) {
    return cachedResponse;
  }

  const token = getGitHubToken();
  if (!token) {
    return jsonWithHeaders(
      { error: "GitHub token not configured" },
      { status: 500 },
      { "Cache-Control": "no-store" }
    );
  }

  try {
    const contributions = await fetchGitHubContributions(token, login);
    return jsonWithHeaders(
      { contributions },
      { status: 200 },
      GITHUB_RESPONSE_HEADERS
    );
  } catch (error) {
    if (error instanceof GitHubContributionsError) {
      return jsonWithHeaders(
        { error: error.message, resetTime: error.resetTime },
        { status: error.status },
        error.status === 404
          ? GITHUB_RESPONSE_HEADERS
          : { "Cache-Control": "no-store" }
      );
    }

    console.error("Failed to fetch GitHub contributions", error);
    return jsonWithHeaders(
      { error: "Failed to fetch GitHub contributions" },
      { status: 500 },
      { "Cache-Control": "no-store" }
    );
  }
};
