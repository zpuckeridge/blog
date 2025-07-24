import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const username = searchParams.get("username");

	if (!username) {
		return NextResponse.json({ error: "Username is required" }, { status: 400 });
	}

	// Check if GitHub token is configured
	if (!process.env.GITHUB_TOKEN) {
		console.error("GitHub token not configured");
		return NextResponse.json({ error: "GitHub token not configured" }, { status: 500 });
	}

	try {
		const response = await fetch("https://api.github.com/graphql", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
				"User-Agent": "zacchary-me-blog",
			},
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
		});

		if (!response.ok) {
			const errorText = await response.text();
			console.error(`GitHub API error: ${response.status} - ${errorText}`);

			// Handle specific error cases
			if (response.status === 401) {
				return NextResponse.json({ error: "GitHub token is invalid or expired" }, { status: 401 });
			}

			if (response.status === 403) {
				// Check if it's rate limiting
				const rateLimitRemaining = response.headers.get("x-ratelimit-remaining");
				const rateLimitReset = response.headers.get("x-ratelimit-reset");

				if (rateLimitRemaining === "0") {
					const resetTime = rateLimitReset ? new Date(parseInt(rateLimitReset) * 1000) : null;
					return NextResponse.json(
						{
							error: "GitHub API rate limit exceeded",
							resetTime: resetTime?.toISOString(),
						},
						{ status: 429 }
					);
				}

				return NextResponse.json(
					{ error: "GitHub API access forbidden - check token permissions" },
					{ status: 403 }
				);
			}

			if (response.status === 404) {
				return NextResponse.json({ error: `GitHub user '${username}' not found` }, { status: 404 });
			}

			throw new Error(`GitHub API error: ${response.status} - ${errorText}`);
		}

		const data = await response.json();

		if (data.errors) {
			const errorMessage = data.errors[0]?.message || "Unknown GraphQL error";
			console.error("GitHub GraphQL errors:", data.errors);

			// Handle specific GraphQL errors
			if (errorMessage.includes("Could not resolve to a User")) {
				return NextResponse.json({ error: `GitHub user '${username}' not found` }, { status: 404 });
			}

			throw new Error(`GitHub GraphQL error: ${errorMessage}`);
		}

		// Check if user exists
		if (!data.data?.user) {
			return NextResponse.json({ error: `GitHub user '${username}' not found` }, { status: 404 });
		}

		const weeks = data.data.user.contributionsCollection.contributionCalendar.weeks;
		const allContributions: Array<{
			date: string;
			contributionCount: number;
			color: string;
		}> = [];

		// Calculate date 12 months ago (changed from 6 to 12 months)
		const twelveMonthsAgo = new Date();
		twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

		weeks.forEach(
			(week: {
				contributionDays: Array<{ date: string; contributionCount: number; color: string }>;
			}) => {
				week.contributionDays.forEach(
					(day: { date: string; contributionCount: number; color: string }) => {
						const dayDate = new Date(day.date);
						// Only include contributions from the last 12 months
						if (dayDate >= twelveMonthsAgo) {
							allContributions.push({
								date: day.date,
								contributionCount: day.contributionCount,
								color: day.color,
							});
						}
					}
				);
			}
		);

		return NextResponse.json({ contributions: allContributions });
	} catch (error) {
		console.error("GitHub contributions fetch error:", error);

		// Return a more specific error message
		if (error instanceof Error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}

		return NextResponse.json({ error: "Failed to fetch GitHub contributions" }, { status: 500 });
	}
}
