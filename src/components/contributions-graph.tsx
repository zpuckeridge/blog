"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import useSWR from "swr";

import {
  getContributionColor,
  summarizeContributions,
} from "@/lib/contributions-graph";
import type { ContributionDay } from "@/lib/contributions-graph";
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

interface HoverState {
  day: ContributionDay;
  left: number;
  top: number;
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
  const containerElementRef = useRef<HTMLDivElement | null>(null);
  const [hover, setHover] = useState<HoverState | null>(null);

  useEffect(() => {
    const element = containerElementRef.current;
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
    return () => {
      observer.disconnect();
    };
  }, [hasInitialContributions, shouldFetch]);

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

  const summary = summarizeContributions(contributions);
  const {
    currentYear,
    maxContributionCount,
    todayIso,
    weeks,
    yearTotalContributions,
  } = summary;

  const handleDayHover = useCallback(
    (day: ContributionDay, event: React.MouseEvent<HTMLButtonElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      setHover({
        day,
        left: rect.left + rect.width / 2,
        top: rect.top - 6,
      });
    },
    []
  );

  const handleGridLeave = useCallback(() => setHover(null), []);

  if (fetchError) {
    return (
      <div
        className="flex w-full items-center border-0 bg-transparent p-0 text-left"
        ref={containerElementRef}
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
      ref={containerElementRef}
      style={{ opacity: isLoading ? 0.5 : 1 }}
    >
      {isLoading ? null : (
        <div className="space-y-2">
          <div
            className="flex justify-end gap-[4px] overflow-hidden"
            onMouseLeave={handleGridLeave}
          >
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
                          "contribution-day h-[9px] w-[9px]",
                          getContributionColor(
                            day.contributionCount,
                            maxContributionCount
                          ),
                          day.date === todayIso && "contribution-day-today"
                        )}
                        data-color={day.color}
                        data-count={day.contributionCount}
                        data-date={day.date}
                        key={day.date}
                        onMouseEnter={(event) => handleDayHover(day, event)}
                        type="button"
                      />
                    ) : (
                      <div
                        aria-hidden="true"
                        className="h-[9px] w-[9px]"
                        key={`empty-${weekStartDate}-${dayIndex}`}
                      />
                    )
                  )}
                </div>
              );
            })}
          </div>
          <div
            className="text-muted-foreground text-sm"
            suppressHydrationWarning
          >
            {`${yearTotalContributions} contribution${yearTotalContributions === 1 ? "" : "s"} in ${currentYear}`}
          </div>
          {hover
            ? createPortal(
                <div
                  className="pointer-events-none fixed z-50 w-max max-w-[16rem] -translate-x-1/2 -translate-y-full rounded-md border border-border bg-popover px-3 py-2 text-popover-foreground text-xs shadow-md"
                  role="tooltip"
                  style={{ left: hover.left, top: hover.top }}
                >
                  {`${hover.day.contributionCount} contribution${hover.day.contributionCount === 1 ? "" : "s"} on ${formatPublishedLongDate(hover.day.date)}`}
                </div>,
                document.body
              )
            : null}
        </div>
      )}
    </div>
  );
};

export default ContributionsGraph;
