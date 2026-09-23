import {
  calendarYearInBrisbane,
  formatPublishedLongDate,
  isoDateInBrisbane,
} from "@/lib/format-in-brisbane";

export interface HeatmapDay {
  date: string;
  /** Numeric value for colour intensity (e.g. minutes). */
  value: number;
  /** False when no samples existed for this metric on this day. */
  hasData: boolean;
}

const buildHeatmapWeeks = (days: HeatmapDay[]): (HeatmapDay | null)[][] => {
  const last365Days = days.slice(-365);
  const weekMap = new Map<string, (HeatmapDay | null)[]>();

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

  return [...weekMap.entries()]
    .toSorted(([a], [b]) => a.localeCompare(b))
    .map(([, weekDays]) => weekDays);
};

export const buildLast365HeatmapDays = (
  dayValues: Map<string, Pick<HeatmapDay, "value" | "hasData">>,
  todayIso = isoDateInBrisbane()
): HeatmapDay[] => {
  const days: HeatmapDay[] = [];
  const start = new Date(`${todayIso}T12:00:00+10:00`);

  for (let index = 364; index >= 0; index -= 1) {
    const at = new Date(start.getTime() - index * 24 * 60 * 60 * 1000);
    const date = isoDateInBrisbane(at);
    const entry = dayValues.get(date);
    days.push({
      date,
      hasData: entry?.hasData ?? false,
      value: entry?.value ?? 0,
    });
  }

  return days;
};

/** Fixed 0–24h scale (minutes), independent of year max. */
export const getHoursHeatmapColor = (
  minutes: number,
  hasData: boolean
): string => {
  if (!hasData) {
    return "bg-neutral-50 dark:bg-neutral-950 ring-1 ring-inset ring-neutral-200 dark:ring-neutral-800";
  }

  if (minutes <= 0) {
    return "bg-neutral-100 dark:bg-neutral-900";
  }

  const hours = minutes / 60;
  if (hours <= 3) {
    return "bg-emerald-100 dark:bg-emerald-950";
  }
  if (hours <= 6) {
    return "bg-emerald-200 dark:bg-emerald-900";
  }
  if (hours <= 9) {
    return "bg-emerald-300 dark:bg-emerald-800";
  }
  if (hours <= 12) {
    return "bg-emerald-400 dark:bg-emerald-700";
  }
  if (hours <= 15) {
    return "bg-emerald-500 dark:bg-emerald-600";
  }
  if (hours <= 18) {
    return "bg-emerald-600 dark:bg-emerald-500";
  }
  if (hours <= 21) {
    return "bg-emerald-700 dark:bg-emerald-400";
  }
  return "bg-emerald-800 dark:bg-emerald-300";
};

export const formatHeatmapMinutesLabel = (minutes: number): string => {
  const wholeMinutes = Math.round(minutes);
  if (wholeMinutes < 60) {
    return `${wholeMinutes} minute${wholeMinutes === 1 ? "" : "s"}`;
  }

  const hours = Math.floor(wholeMinutes / 60);
  const remainder = wholeMinutes % 60;
  if (remainder === 0) {
    return `${hours} hour${hours === 1 ? "" : "s"}`;
  }

  return `${hours} hour${hours === 1 ? "" : "s"} ${remainder} minute${remainder === 1 ? "" : "s"}`;
};

export interface HeatmapSummary {
  currentYear: number;
  formatDayLabel: (day: HeatmapDay) => string;
  todayIso: string;
  weeks: (HeatmapDay | null)[][];
  yearTotalMinutes: number;
}

export const summarizeHeatmap = (
  days: HeatmapDay[],
  metricLabel: string
): HeatmapSummary => {
  const last365Days = days.slice(-365);
  const currentYear = calendarYearInBrisbane();
  let yearTotalMinutes = 0;

  for (const day of last365Days) {
    if (day.hasData && calendarYearInBrisbane(day.date) === currentYear) {
      yearTotalMinutes += day.value;
    }
  }

  return {
    currentYear,
    formatDayLabel: (day: HeatmapDay) => {
      if (!day.hasData) {
        return `No ${metricLabel} data on ${formatPublishedLongDate(day.date)}`;
      }

      if (day.value <= 0) {
        return `0 ${metricLabel} on ${formatPublishedLongDate(day.date)}`;
      }

      return `${formatHeatmapMinutesLabel(day.value)} ${metricLabel} on ${formatPublishedLongDate(day.date)}`;
    },
    todayIso: isoDateInBrisbane(),
    weeks: buildHeatmapWeeks(days),
    yearTotalMinutes,
  };
};
