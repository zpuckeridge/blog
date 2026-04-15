"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useSWR from "swr";

interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

interface GitHubContributionsProps {
  username: string;
}

/** Intensity vs max in the last year (GitHub-style): more tiers and darker greens for heavier days. */
const getContributionColor = (count: number, maxCount: number): string => {
  if (count === 0) {
    return "bg-neutral-100 dark:bg-neutral-900";
  }
  const max = Math.max(maxCount, 1);
  const t = count / max;
  if (t <= 0.14) {
    return "bg-green-100 dark:bg-green-950";
  }
  if (t <= 0.29) {
    return "bg-green-200 dark:bg-green-900";
  }
  if (t <= 0.43) {
    return "bg-green-300 dark:bg-green-800";
  }
  if (t <= 0.57) {
    return "bg-green-400 dark:bg-green-700";
  }
  if (t <= 0.71) {
    return "bg-green-500 dark:bg-green-600";
  }
  if (t <= 0.86) {
    return "bg-green-600 dark:bg-green-500";
  }
  if (t <= 0.95) {
    return "bg-green-700 dark:bg-green-400";
  }
  return "bg-green-800 dark:bg-green-300";
};

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("GitHub authentication failed - token may be expired");
    }
    if (response.status === 403) {
      throw new Error("GitHub access forbidden - check API permissions");
    }
    if (response.status === 404) {
      throw new Error(`GitHub user not found`);
    }
    if (response.status === 429) {
      const resetTime = data.resetTime
        ? new Date(data.resetTime).toLocaleString()
        : "soon";
      throw new Error(`GitHub API rate limit exceeded. Resets at ${resetTime}`);
    }
    throw new Error(
      data.error || `HTTP ${response.status}: Failed to fetch contributions`
    );
  }

  if (data.error) {
    throw new Error(data.error);
  }

  return data.contributions as ContributionDay[];
};

const ContributionsGraph = ({ username }: GitHubContributionsProps) => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    data: contributions = [],
    error: fetchError,
    isLoading,
  } = useSWR<ContributionDay[]>(
    shouldFetch
      ? `/api/github/contributions/graph?username=${encodeURIComponent(username)}`
      : null,
    fetcher,
    {
      dedupingInterval: 1000 * 60 * 30,
      revalidateIfStale: false,
      revalidateOnFocus: false,
    }
  );
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || shouldFetch) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }
        setShouldFetch(true);
        observer.disconnect();
      },
      {
        rootMargin: "160px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [shouldFetch]);

  const last365Days = contributions.slice(-365);
  const maxContributionCount = Math.max(
    0,
    ...last365Days.map((d) => d.contributionCount)
  );

  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < last365Days.length; i += 7) {
    weeks.push(last365Days.slice(i, i + 7));
  }

  const handleDayHover = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const target = e.currentTarget;
      const { date } = target.dataset;
      const { count } = target.dataset;
      const { color } = target.dataset;
      if (date && typeof count === "string" && color) {
        setHoveredDay({
          color,
          contributionCount: Number.parseInt(count, 10),
          date,
        });
      }
    },
    []
  );

  const handleDayLeave = useCallback(() => setHoveredDay(null), []);

  let totalContributions = 0;
  for (const day of contributions) {
    totalContributions += day.contributionCount;
  }
  // Show error state
  if (fetchError) {
    return (
      <div
        className="flex h-[120px] w-full items-center border-0 bg-transparent p-0 text-left"
        ref={containerRef}
      >
        <div className="text-muted-foreground text-xs">
          <p>GitHub contributions unavailable</p>
          <p className="text-red-500 dark:text-red-400">
            {fetchError instanceof Error
              ? fetchError.message
              : "Failed to load contributions"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="h-[120px] w-full border-0 bg-transparent p-0 text-left transition-opacity duration-300 ease-in-out"
      ref={containerRef}
      style={{ opacity: isLoading ? 0.5 : 1 }}
    >
      {!isLoading && (
        <div className="space-y-2" ref={containerRef}>
          <div className="flex justify-end gap-[4px] overflow-hidden">
            {weeks.map((week, weekIndex) => {
              const weekStartDate = week[0]?.date || `week-${weekIndex}`;
              return (
                <div className="flex flex-col gap-[4px]" key={weekStartDate}>
                  {week.map((day) => (
                    <button
                      className={`h-[9px] w-[9px] rounded-[2px] ${getContributionColor(day.contributionCount, maxContributionCount)}`}
                      data-color={day.color}
                      data-count={day.contributionCount}
                      data-date={day.date}
                      key={day.date}
                      onMouseEnter={handleDayHover}
                      onMouseLeave={handleDayLeave}
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
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}`}
              </div>
            ) : (
              <div>
                {`${totalContributions} contributions in the last 12 months`}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContributionsGraph;
