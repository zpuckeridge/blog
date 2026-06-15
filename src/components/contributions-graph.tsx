"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useSWR from "swr";

import {
  getContributionColor,
  summarizeContributions,
  type ContributionDay,
} from "@/lib/contributions-graph";
import { formatPublishedLongDate } from "@/lib/format-in-brisbane";
import { cn } from "@/lib/utils";

interface GitHubContributionsProps {
  initialContributions?: ContributionDay[];
  username: string;
}

interface ContributionsPayload {
  contributions?: ContributionDay[];
  error?: string;
  resetTime?: number | string;
}

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const data = (await response.json()) as ContributionsPayload;

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

  const list = data.contributions ?? [];
  return list as ContributionDay[];
};

const ContributionsGraph = ({
  initialContributions,
  username,
}: GitHubContributionsProps) => {
  const hasInitialContributions = Boolean(initialContributions);
  const [shouldFetch, setShouldFetch] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const containerRef = useCallback(
    (element: HTMLDivElement | null) => {
      observerRef.current?.disconnect();
      observerRef.current = null;

      if (!element || shouldFetch || hasInitialContributions) {
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
      observerRef.current = observer;
    },
    [hasInitialContributions, shouldFetch]
  );
  const {
    data: contributions = initialContributions ?? [],
    error: fetchError,
    isLoading,
  } = useSWR<ContributionDay[]>(
    shouldFetch && !hasInitialContributions
      ? `/api/github/contributions/graph?username=${encodeURIComponent(username)}`
      : null,
    fetcher,
    {
      dedupingInterval: 1000 * 60 * 30,
      fallbackData: initialContributions,
      revalidateIfStale: false,
      revalidateOnFocus: false,
    }
  );
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
  const summary = summarizeContributions(contributions);
  const {
    maxContributionCount,
    todayIso,
    totalContributions,
    weekdayLabel,
    weeks,
  } = summary;

  useEffect(
    () => () => {
      observerRef.current?.disconnect();
    },
    []
  );

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

  // Show error state
  if (fetchError) {
    return (
      <div
        className="flex w-full items-center border-0 bg-transparent p-0 text-left"
        ref={containerRef}
      >
        <div className="text-muted-foreground text-sm">
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
      className="w-full border-0 bg-transparent p-0 text-left transition-opacity duration-200 ease-in-out"
      ref={containerRef}
      style={{ opacity: isLoading ? 0.5 : 1 }}
    >
      {!isLoading && (
        <div className="space-y-2">
          <div className="flex justify-end gap-[4px] overflow-hidden">
            {weeks.map((week, weekIndex) => {
              const weekStartDate =
                week.find((day) => day !== null)?.date ?? `week-${weekIndex}`;
              return (
                <div className="flex flex-col gap-[4px]" key={weekStartDate}>
                  {week.map((day, dayIndex) =>
                    day ? (
                      <button
                        aria-label={`${day.contributionCount} contribution${day.contributionCount === 1 ? "" : "s"} on ${formatPublishedLongDate(day.date)}`}
                        className={cn(
                          "h-[9px] w-[9px]",
                          getContributionColor(
                            day.contributionCount,
                            maxContributionCount
                          ),
                          day.date === todayIso &&
                            "ring-1 ring-inset ring-neutral-300 dark:ring-neutral-600"
                        )}
                        data-color={day.color}
                        data-count={day.contributionCount}
                        data-date={day.date}
                        key={day.date}
                        onMouseEnter={handleDayHover}
                        onMouseLeave={handleDayLeave}
                        type="button"
                      />
                    ) : (
                      <div
                        aria-hidden
                        className="h-[9px] w-[9px]"
                        key={`empty-${weekStartDate}-${dayIndex}`}
                      />
                    )
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex justify-between text-muted-foreground text-sm">
            {hoveredDay ? (
              <div>
                {`${hoveredDay.contributionCount} contribution${hoveredDay.contributionCount === 1 ? "" : "s"} on ${formatPublishedLongDate(hoveredDay.date)}`}
              </div>
            ) : (
              <div suppressHydrationWarning>
                {`${weekdayLabel} · ${totalContributions} contributions in the last 12 months`}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContributionsGraph;
