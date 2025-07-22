import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const username = searchParams.get("username");

	if (!username) {
		return NextResponse.json({ error: "Username is required" }, { status: 400 });
	}

	try {
		const response = await fetch("https://api.github.com/graphql", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
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
			throw new Error(`GitHub API error: ${response.status}`);
		}

		const data = await response.json();

		if (data.errors) {
			throw new Error(`GitHub API error: ${data.errors[0]?.message || "Unknown error"}`);
		}

		const weeks = data.data.user.contributionsCollection.contributionCalendar.weeks;
		const allContributions: Array<{
			date: string;
			contributionCount: number;
			color: string;
		}> = [];

		// Calculate date 6 months ago
		const sixMonthsAgo = new Date();
		sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 12);

		weeks.forEach(
			(week: {
				contributionDays: Array<{ date: string; contributionCount: number; color: string }>;
			}) => {
				week.contributionDays.forEach(
					(day: { date: string; contributionCount: number; color: string }) => {
						const dayDate = new Date(day.date);
						// Only include contributions from the last 6 months
						if (dayDate >= sixMonthsAgo) {
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
		return NextResponse.json({ error: "Failed to fetch contributions" }, { status: 500 });
	}
}
