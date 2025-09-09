"use client";

import { useEffect, useRef, useState } from "react";

type ContributionDay = {
	date: string;
	contributionCount: number;
	color: string;
};

type GitHubContributionsProps = {
	username: string;
};

export default function ContributionsGraph({ username }: GitHubContributionsProps) {
	const [contributions, setContributions] = useState<ContributionDay[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const fetchContributions = async () => {
			try {
				setLoading(true);
				setError(null);

				// Fetch GitHub contributions data from our API route
				const response = await fetch(
					`/api/github/contributions/graph?username=${encodeURIComponent(username)}`
				);

				const data = await response.json();

				if (!response.ok) {
					// Handle specific error cases
					if (response.status === 401) {
						throw new Error("GitHub authentication failed - token may be expired");
					}
					if (response.status === 403) {
						throw new Error("GitHub access forbidden - check API permissions");
					}
					if (response.status === 404) {
						throw new Error(`GitHub user '${username}' not found`);
					}
					if (response.status === 429) {
						const resetTime = data.resetTime ? new Date(data.resetTime).toLocaleString() : "soon";
						throw new Error(`GitHub API rate limit exceeded. Resets at ${resetTime}`);
					}

					throw new Error(data.error || `HTTP ${response.status}: Failed to fetch contributions`);
				}

				if (data.error) {
					throw new Error(data.error);
				}

				setContributions(data.contributions);
			} catch (err) {
				const errorMessage = err instanceof Error ? err.message : "Failed to load contributions";
				setError(errorMessage);
			} finally {
				setLoading(false);
			}
		};

		fetchContributions();
	}, [username]);

	// Get the last 365 days of contributions
	const last365Days = contributions.slice(-365);

	// Group by weeks (7 days each)
	const weeks: ContributionDay[][] = [];
	for (let i = 0; i < last365Days.length; i += 7) {
		weeks.push(last365Days.slice(i, i + 7));
	}

	const getContributionColor = (count: number) => {
		if (count === 0) {
			return "bg-neutral-100 dark:bg-neutral-900";
		}
		if (count <= 3) {
			return "bg-green-200 dark:bg-green-950";
		}
		if (count <= 6) {
			return "bg-green-300 dark:bg-green-900";
		}
		if (count <= 9) {
			return "bg-green-400 dark:bg-green-800";
		}
		return "bg-green-500 dark:bg-green-700";
	};

	// Show error state
	if (error) {
		return (
			<div className="flex h-[120px] w-full items-center border-0 bg-transparent p-0 text-left">
				<div className="text-muted-foreground text-xs">
					<p>GitHub contributions unavailable</p>
					<p className="text-red-500 dark:text-red-400">{error}</p>
				</div>
			</div>
		);
	}

	return (
		<div
			className="h-[120px] w-full border-0 bg-transparent p-0 text-left transition-opacity duration-300 ease-in-out"
			style={{ opacity: loading ? 0.5 : 1 }}
		>
			{!loading && (
				<div className="space-y-2" ref={containerRef}>
					<div className="flex justify-end gap-[4px] overflow-hidden">
						{weeks.map((week, weekIndex) => {
							const weekStartDate = week[0]?.date || `week-${weekIndex}`;
							return (
								<div className="flex flex-col gap-[4px]" key={weekStartDate}>
									{week.map((day) => (
										<button
											className={`h-[9px] w-[9px] rounded-[2px] ${getContributionColor(day.contributionCount)}`}
											key={day.date}
											onMouseEnter={() => setHoveredDay(day)}
											onMouseLeave={() => setHoveredDay(null)}
											type="button"
										/>
									))}
								</div>
							);
						})}
					</div>
					<div className="flex justify-between text-muted-foreground text-xs">
						{hoveredDay ? (
							<div>
								{`${hoveredDay.contributionCount} contribution${hoveredDay.contributionCount === 1 ? "" : "s"} on ${new Date(
									hoveredDay.date
								).toLocaleDateString("en-US", {
									month: "short",
									day: "numeric",
									year: "numeric",
								})}`}
							</div>
						) : (
							<div>
								{`${contributions.reduce((sum, day) => sum + day.contributionCount, 0)} contributions in the last 12 months`}
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
