export interface ContributionDay {
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

export class GitHubContributionsError extends Error {
  resetTime?: string;
  status: number;

  constructor(message: string, status: number, resetTime?: string) {
    super(message);
    this.name = "GitHubContributionsError";
    this.status = status;
    this.resetTime = resetTime;
  }
}

export const GITHUB_USERNAME_REGEX =
  /^[A-Za-z\d](?:[A-Za-z\d-]{0,37}[A-Za-z\d])?$/u;
export const GITHUB_RESPONSE_HEADERS = {
  "Cache-Control":
    "public, max-age=300, s-maxage=1800, stale-while-revalidate=86400",
};

const GITHUB_CACHE_TTL_MS = 1000 * 60 * 30;
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

export const getGitHubToken = (): string | undefined =>
  import.meta.env.GITHUB_TOKEN ?? process.env.GITHUB_TOKEN;

export const getCachedGitHubContributions = (
  username: string
): ContributionDay[] | null => {
  const cached = contributionCache.get(username.toLowerCase());
  if (!cached || cached.expiresAt <= Date.now()) {
    return null;
  }

  return cached.contributions;
};

export const fetchGitHubContributions = async (
  token: string,
  username: string
): Promise<ContributionDay[]> => {
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

  if (response.status === 401) {
    throw new GitHubContributionsError(
      "GitHub token is invalid or expired",
      401
    );
  }

  if (response.status === 403) {
    const rateLimitRemaining = response.headers.get("x-ratelimit-remaining");
    const rateLimitReset = response.headers.get("x-ratelimit-reset");

    if (rateLimitRemaining === "0") {
      const resetTime = rateLimitReset
        ? new Date(Number.parseInt(rateLimitReset, 10) * 1000).toISOString()
        : undefined;
      throw new GitHubContributionsError(
        "GitHub API rate limit exceeded",
        429,
        resetTime
      );
    }

    throw new GitHubContributionsError(
      "GitHub API access forbidden - check token permissions",
      403
    );
  }

  if (response.status === 404) {
    throw new GitHubContributionsError(
      `GitHub user '${username}' not found`,
      404
    );
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GitHub API error: ${response.status} - ${errorText}`);
  }

  const data = (await response.json()) as GitHubGraphqlResponse;
  if (data.errors) {
    const errorMessage = data.errors[0]?.message || "Unknown GraphQL error";
    if (errorMessage.includes("Could not resolve to a User")) {
      throw new GitHubContributionsError(
        `GitHub user '${username}' not found`,
        404
      );
    }

    throw new Error(`GitHub GraphQL error: ${errorMessage}`);
  }

  if (!data.data?.user) {
    throw new GitHubContributionsError(
      `GitHub user '${username}' not found`,
      404
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

  return contributions;
};
