"use client";

import { useEffect, useRef, useState } from "react";

interface ContributionDay {
	date: string;
	contributionCount: number;
	color: string;
}

interface GitHubContributionsProps {
	username: string;
}

export default function GitHubContributions({ username }: GitHubContributionsProps) {
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
					`/api/github-contributions?username=${encodeURIComponent(username)}`
				);

				if (!response.ok) {
					throw new Error("Failed to fetch contributions");
				}

				const data = await response.json();

				if (data.error) {
					throw new Error(data.error);
				}

				setContributions(data.contributions);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to load contributions");
			} finally {
				setLoading(false);
			}
		};

		fetchContributions();
	}, [username]);

	if (loading) {
		return (
			<div className="flex items-center justify-center py-4">
				<div className="text-xs text-muted-foreground">Loading contributions...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex items-center justify-center py-4">
				<div className="text-xs text-muted-foreground">Unable to load contributions</div>
			</div>
		);
	}

	// Get the last 365 days of contributions
	const last365Days = contributions.slice(-365);

	// Group by weeks (7 days each)
	const weeks = [];
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

	return (
		<article
			className="w-full text-left border-0 p-0 bg-transparent"
			onMouseLeave={() => setHoveredDay(null)}
		>
			<div className="space-y-2" ref={containerRef}>
				<div className="flex gap-[4px] overflow-hidden flex justify-end">
					{weeks.map((week, weekIndex) => {
						const weekStartDate = week[0]?.date || `week-${weekIndex}`;
						return (
							<div key={weekStartDate} className="flex flex-col gap-[4px]">
								{week.map((day) => (
									<button
										key={day.date}
										type="button"
										className={`w-[9px] h-[9px] rounded-[2px] ${getContributionColor(day.contributionCount)}`}
										onMouseEnter={() => setHoveredDay(day)}
									/>
								))}
							</div>
						);
					})}
				</div>
				<div className="flex justify-between text-xs text-muted-foreground">
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
		</article>
	);
}
