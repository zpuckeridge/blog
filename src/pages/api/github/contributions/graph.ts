import type { APIRoute } from "astro";

const handleResponseError = (
  response: Response,
  _errorText: string,
  username: string
): Response | null => {
  if (response.status === 401) {
    return Response.json(
      { error: "GitHub token is invalid or expired" },
      { status: 401 }
    );
  }

  if (response.status === 403) {
    const rateLimitRemaining = response.headers.get("x-ratelimit-remaining");
    const rateLimitReset = response.headers.get("x-ratelimit-reset");

    if (rateLimitRemaining === "0") {
      const resetTime = rateLimitReset
        ? new Date(Number.parseInt(rateLimitReset, 10) * 1000)
        : null;
      return Response.json(
        {
          error: "GitHub API rate limit exceeded",
          resetTime: resetTime?.toISOString(),
        },
        { status: 429 }
      );
    }

    return Response.json(
      { error: "GitHub API access forbidden - check token permissions" },
      { status: 403 }
    );
  }

  if (response.status === 404) {
    return Response.json(
      { error: `GitHub user '${username}' not found` },
      { status: 404 }
    );
  }

  return null;
};

export const GET: APIRoute = async ({ request }) => {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return Response.json({ error: "Username is required" }, { status: 400 });
  }

  const token = import.meta.env.GITHUB_TOKEN ?? process.env.GITHUB_TOKEN;
  if (!token) {
    return Response.json(
      { error: "GitHub token not configured" },
      { status: 500 }
    );
  }

  try {
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
      const errorText = await response.text();
      const errorResponse = handleResponseError(response, errorText, username);
      if (errorResponse) {
        return errorResponse;
      }
      throw new Error(`GitHub API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    if (data.errors) {
      const errorMessage = data.errors[0]?.message || "Unknown GraphQL error";

      if (errorMessage.includes("Could not resolve to a User")) {
        return Response.json(
          { error: `GitHub user '${username}' not found` },
          { status: 404 }
        );
      }

      throw new Error(`GitHub GraphQL error: ${errorMessage}`);
    }

    if (!data.data?.user) {
      return Response.json(
        { error: `GitHub user '${username}' not found` },
        { status: 404 }
      );
    }

    const { weeks } =
      data.data.user.contributionsCollection.contributionCalendar;
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

    const allContributions: {
      color: string;
      contributionCount: number;
      date: string;
    }[] = [];

    for (const week of weeks) {
      for (const day of week.contributionDays) {
        const dayDate = new Date(day.date);
        if (dayDate >= twelveMonthsAgo) {
          allContributions.push({
            color: day.color,
            contributionCount: day.contributionCount,
            date: day.date,
          });
        }
      }
    }

    return Response.json({ contributions: allContributions });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json(
      { error: "Failed to fetch GitHub contributions" },
      { status: 500 }
    );
  }
};
