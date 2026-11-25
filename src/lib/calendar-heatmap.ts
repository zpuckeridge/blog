import {
  calendarYearInBrisbane,
  formatPublishedLongDate,
  isoDateInBrisbane,
} from "@/lib/format-in-brisbane";

export const ACTIVITY_DISPLAY_DAYS = 30;
const DELTA_MIN_OBSERVED_DAYS = 7;

export interface HeatmapDay {
  date: string;
  value: number;
  hasData: boolean;
}

const buildHeatmapWeeks = (
  days: HeatmapDay[],
  displayDays = days.length
): (HeatmapDay | null)[][] => {
  const last365Days = days.slice(-displayDays);
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

export const buildRecentHeatmapDays = (
  dayValues: Map<string, Pick<HeatmapDay, "value" | "hasData">>,
  dayCount: number,
  todayIso = isoDateInBrisbane()
): HeatmapDay[] => {
  const days: HeatmapDay[] = [];
  const start = new Date(`${todayIso}T12:00:00+10:00`);

  for (let index = dayCount - 1; index >= 0; index -= 1) {
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

export const formatHeatmapDelta = (deltaMinutes: number): string => {
  const rounded = Math.round(deltaMinutes);
  if (rounded === 0) {
    return "Δ 0 minutes";
  }

  const sign = rounded > 0 ? "+" : "−";
  return `Δ ${sign}${formatHeatmapMinutesLabel(Math.abs(rounded))}`;
};

const observedTotal = (
  days: readonly HeatmapDay[]
): { observed: number; total: number } => {
  let observed = 0;
  let total = 0;
  for (const day of days) {
    if (day.hasData) {
      observed += 1;
      total += day.value;
    }
  }
  return { observed, total };
};

/** Change in the visible total against the 30 days immediately before it. */
export const heatmapTotalDeltaMinutes = (
  days: readonly HeatmapDay[],
  displayDays = ACTIVITY_DISPLAY_DAYS
): number | null => {
  if (days.length < displayDays * 2) {
    return null;
  }

  const current = observedTotal(days.slice(-displayDays));
  const previous = observedTotal(days.slice(-displayDays * 2, -displayDays));
  if (
    current.observed < DELTA_MIN_OBSERVED_DAYS ||
    previous.observed < DELTA_MIN_OBSERVED_DAYS
  ) {
    return null;
  }

  return current.total - previous.total;
};

interface HeatmapSummary {
  averageMinutes: number;
  currentYear: number;
  days: HeatmapDay[];
  deltaMinutes: number | null;
  formatDayLabel: (day: HeatmapDay) => string;
  loggedDays: number;
  todayIso: string;
  weeks: (HeatmapDay | null)[][];
  yearTotalMinutes: number;
}

export const summarizeHeatmap = (
  days: HeatmapDay[],
  metricLabel: string,
  displayDays = ACTIVITY_DISPLAY_DAYS
): HeatmapSummary => {
  const visibleDays = days.slice(-displayDays);
  const currentYear = calendarYearInBrisbane();
  let yearTotalMinutes = 0;
  let loggedDays = 0;

  for (const day of visibleDays) {
    if (day.hasData) {
      yearTotalMinutes += day.value;
      if (day.value > 0) {
        loggedDays += 1;
      }
    }
  }

  const averageMinutes =
    loggedDays > 0 ? Math.round(yearTotalMinutes / loggedDays) : 0;

  return {
    averageMinutes,
    currentYear,
    days: visibleDays,
    deltaMinutes: heatmapTotalDeltaMinutes(days, displayDays),
    formatDayLabel: (day: HeatmapDay) => {
      if (!day.hasData) {
        return `No ${metricLabel} data on ${formatPublishedLongDate(day.date)}`;
      }

      if (day.value <= 0) {
        return `0 ${metricLabel} on ${formatPublishedLongDate(day.date)}`;
      }

      return `${formatHeatmapMinutesLabel(day.value)} ${metricLabel} on ${formatPublishedLongDate(day.date)}`;
    },
    loggedDays,
    todayIso: isoDateInBrisbane(),
    weeks: buildHeatmapWeeks(days, displayDays),
    yearTotalMinutes,
  };
};
