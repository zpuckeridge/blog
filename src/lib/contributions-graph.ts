import {
  formatPublishedLongDate,
  formatWeekdayInBrisbane,
  isoDateInBrisbane,
} from "@/lib/format-in-brisbane";

export interface ContributionDay {
  color: string;
  contributionCount: number;
  date: string;
}

/** Intensity vs max in the last year (GitHub-style). */
export const getContributionColor = (
  count: number,
  maxCount: number
): string => {
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

const buildContributionWeeks = (
  contributions: ContributionDay[]
): (ContributionDay | null)[][] => {
  const last365Days = contributions.slice(-365);
  const weekMap = new Map<string, (ContributionDay | null)[]>();

  for (const day of last365Days) {
    const date = new Date(`${day.date}T00:00:00Z`);
    const dayOfWeek = date.getUTCDay();
    const sunday = new Date(date);
    sunday.setUTCDate(date.getUTCDate() - dayOfWeek);
    const weekKey = sunday.toISOString().slice(0, 10);

    if (!weekMap.has(weekKey)) {
      weekMap.set(
        weekKey,
        Array.from({ length: 7 }, () => null)
      );
    }

    const week = weekMap.get(weekKey);
    if (week) {
      week[dayOfWeek] = day;
    }
  }

  return Array.from(weekMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, days]) => days);
};

export const summarizeContributions = (contributions: ContributionDay[]) => {
  const last365Days = contributions.slice(-365);
  const maxContributionCount = Math.max(
    0,
    ...last365Days.map((d) => d.contributionCount)
  );
  let totalContributions = 0;
  for (const day of contributions) {
    totalContributions += day.contributionCount;
  }

  return {
    last365Days,
    maxContributionCount,
    todayIso: isoDateInBrisbane(),
    totalContributions,
    weekdayLabel: formatWeekdayInBrisbane(),
    weeks: buildContributionWeeks(contributions),
    formatDayLabel: (day: ContributionDay) =>
      `${day.contributionCount} contribution${day.contributionCount === 1 ? "" : "s"} on ${formatPublishedLongDate(day.date)}`,
  };
};
