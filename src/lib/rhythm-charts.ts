import { formatHeatmapMinutesLabel } from "@/lib/calendar-heatmap";
import {
  BRISBANE_TIME_ZONE,
  isoDateInBrisbane,
} from "@/lib/format-in-brisbane";
import {
  LISTENING_HISTORY_KV_KEY,
  readListenHistory,
} from "@/lib/listening-history";
import {
  addBrisbaneDays,
  readRhythmStore,
  RHYTHMS_KV_KEY,
} from "@/lib/rhythms";
import type { MealQuality, RhythmDay, RhythmStore } from "@/lib/rhythms";
import { siteLocale } from "@/lib/site";
import {
  parseStatusHistoryStore,
  STATUS_HISTORY_KV_KEY,
} from "@/lib/status-history";
import type { StatusHistoryStore } from "@/lib/status-history";

export const CHART_DAYS = 90;
export const BASELINE_SHIFT = 56;
const TREND_WINDOW = 14;
const TREND_MIN_POINTS = 7;
const WEEK_DAYS = 84;
const WEEK_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
const WEEK_NAMES = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;
const WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0] as const;

export interface RhythmPoint {
  bar: number | null;
  compare: number | null;
  date: string;
  healthy: number | null;
  label: string;
  trend: number | null;
  unhealthy: number | null;
}

export interface RhythmBarChart {
  barMax: number;
  compareMax: number;
  compareMin: number;
  delta: string | null;
  empty: boolean;
  headline: string | null;
  points: RhythmPoint[];
  scaleMin: number;
  sharedScale: boolean;
  stackPalette: "meals" | "people" | "supplements" | null;
  stacked: boolean;
  mark: "area" | "bars" | "line";
}

export interface RhythmStripCell {
  state: "empty" | "off" | "on";
  title: string;
}

export interface RhythmStripRow {
  cells: RhythmStripCell[];
  name: string;
}

export interface RhythmStripChart {
  delta: string | null;
  empty: boolean;
  headline: string | null;
  rows: RhythmStripRow[];
}

export interface SleepNight {
  date: string;
  end: number | null;
  label: string;
  start: number | null;
}

export interface SleepChart {
  delta: string | null;
  empty: boolean;
  headline: string | null;
  nights: SleepNight[];
}

export interface WeekdayBar {
  height: number;
  label: string;
  peak: boolean;
  text: string;
  title: string;
}

export interface WeekShapeChart {
  days: WeekdayBar[];
  empty: boolean;
  headline: string | null;
}

export interface ActivityCharts {
  afterTen: RhythmBarChart;
  vices: RhythmStripChart;
  attention: RhythmBarChart;
  coffee: RhythmBarChart;
  drinks: RhythmBarChart;
  meals: RhythmBarChart;
  mood: RhythmBarChart;
  movement: RhythmBarChart;
  people: RhythmStripChart;
  place: RhythmBarChart;
  reading: RhythmBarChart;
  sleep: SleepChart;
  supplements: RhythmStripChart;
  weekSteps: WeekShapeChart | null;
  weekWork: WeekShapeChart;
  weight: RhythmBarChart;
  workouts: RhythmBarChart;
}

interface ChartSource {
  listens: readonly { listenedAt: number }[];
  rhythms: RhythmStore;
  status: StatusHistoryStore;
  todayIso?: string;
}

const chartDayFormatter = new Intl.DateTimeFormat(siteLocale, {
  day: "numeric",
  month: "short",
  timeZone: BRISBANE_TIME_ZONE,
  weekday: "short",
});

const clockFormatter = new Intl.DateTimeFormat(siteLocale, {
  hour: "numeric",
  minute: "2-digit",
  timeZone: BRISBANE_TIME_ZONE,
});

const weekdayFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: BRISBANE_TIME_ZONE,
  weekday: "short",
});

const WEEKDAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const brisbaneDatesEnding = (
  endIso: string,
  length: number
): string[] => {
  const dates: string[] = [];
  for (let offset = length - 1; offset >= 0; offset -= 1) {
    dates.push(addBrisbaneDays(endIso, -offset));
  }
  return dates;
};

export const brisbaneWeekdayIndex = (isoDate: string): number => {
  const name = weekdayFormatter.format(new Date(`${isoDate}T12:00:00+10:00`));
  const index = WEEKDAY_NAMES.indexOf(name);
  return index === -1 ? 0 : index;
};

const formatChartDay = (isoDate: string): string =>
  chartDayFormatter.format(new Date(`${isoDate}T12:00:00+10:00`));

const formatClock = (isoTimestamp: string): string =>
  clockFormatter.format(new Date(isoTimestamp));

const formatSteps = (steps: number): string =>
  `${Math.round(steps).toLocaleString(siteLocale)} steps`;

const formatCups = (cups: number): string => {
  const rounded = Math.round(cups * 10) / 10;
  const text = rounded.toLocaleString(siteLocale, {
    maximumFractionDigits: 1,
    minimumFractionDigits: Number.isInteger(rounded) ? 0 : 1,
  });
  return `${text} ${Math.abs(rounded) === 1 ? "cup" : "cups"}`;
};

const formatWater = (millilitres: number): string => {
  const rounded = Math.round(millilitres);
  if (Math.abs(rounded) >= 1000) {
    const litres = rounded / 1000;
    const digits = Math.abs(litres) >= 10 ? 0 : 1;
    const text = litres.toLocaleString(siteLocale, {
      maximumFractionDigits: digits,
      minimumFractionDigits: digits,
    });
    return `${text} L`;
  }

  return `${rounded.toLocaleString(siteLocale)} ml`;
};

const formatPlays = (plays: number): string => {
  const rounded = Math.round(plays);
  const unit = rounded === 1 ? "play" : "plays";
  return `${rounded.toLocaleString(siteLocale)} ${unit} a day`;
};

const formatShare = (share: number): string => `${Math.round(share)}% healthy`;

const formatOneDecimal = (value: number): string => {
  const rounded = Math.round(value * 10) / 10;
  return rounded.toLocaleString(siteLocale, {
    maximumFractionDigits: 1,
    minimumFractionDigits: Number.isInteger(rounded) ? 0 : 1,
  });
};

const formatMood = (mood: number): string =>
  `${formatOneDecimal(mood)} out of 5`;

const formatWeight = (kilograms: number): string =>
  `${formatOneDecimal(kilograms)} kg`;

const formatDaysPerWeek = (rate: number): string => {
  const days = Math.round(rate * 7 * 10) / 10;
  const unit = days === 1 ? "day" : "days";
  return `${formatOneDecimal(days)} ${unit} a week`;
};

const signedCount = (delta: number, unit: string): string => {
  const rounded = Math.round(delta);
  if (rounded === 0) {
    return `Δ 0 ${unit}`;
  }

  const sign = rounded > 0 ? "+" : "−";
  return `Δ ${sign}${Math.abs(rounded).toLocaleString(siteLocale)} ${unit}`;
};

const signedDecimal = (delta: number, unit: string): string => {
  const rounded = Math.round(delta * 10) / 10;
  if (rounded === 0) {
    return `Δ 0 ${unit}`;
  }

  const sign = rounded > 0 ? "+" : "−";
  const text = Math.abs(rounded).toLocaleString(siteLocale, {
    maximumFractionDigits: 1,
    minimumFractionDigits: Number.isInteger(rounded) ? 0 : 1,
  });
  return `Δ ${sign}${text} ${unit}`;
};

const isCreatine = (name: string): boolean => name.toLowerCase() === "creatine";

const daysPerWeekDelta = (delta: number): string =>
  signedDecimal(delta * 7, "days");

const signedDuration = (deltaMinutes: number): string => {
  const rounded = Math.round(deltaMinutes);
  if (rounded === 0) {
    return "Δ 0 minutes";
  }

  const sign = rounded > 0 ? "+" : "−";
  return `Δ ${sign}${formatHeatmapMinutesLabel(Math.abs(rounded))}`;
};

const signedWater = (deltaMl: number): string => {
  const rounded = Math.round(deltaMl);
  if (rounded === 0) {
    return "Δ 0 ml";
  }

  const sign = rounded > 0 ? "+" : "−";
  return `Δ ${sign}${formatWater(Math.abs(rounded))}`;
};

const formatCompactMinutes = (minutes: number): string => {
  if (minutes < 60) {
    return `${Math.round(minutes)} m`;
  }

  const hours = minutes / 60;
  const digits = hours >= 10 ? 0 : 1;
  const text = hours.toLocaleString(siteLocale, {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  });
  return `${text} h`;
};

const trailingMean = (
  values: readonly (number | null)[],
  index: number
): number | null => {
  const start = Math.max(0, index - TREND_WINDOW + 1);
  let sum = 0;
  let count = 0;
  for (let cursor = start; cursor <= index; cursor += 1) {
    const value = values[cursor];
    if (value !== null && value !== undefined) {
      sum += value;
      count += 1;
    }
  }

  if (count < TREND_MIN_POINTS) {
    return null;
  }

  return sum / count;
};

const lastNumberIndex = (values: readonly (number | null)[]): number | null => {
  for (let index = values.length - 1; index >= 0; index -= 1) {
    if (values[index] !== null && values[index] !== undefined) {
      return index;
    }
  }

  return null;
};

const countNumbers = (values: readonly (number | null)[]): number => {
  let count = 0;
  for (const value of values) {
    if (value !== null) {
      count += 1;
    }
  }
  return count;
};

const peak = (values: readonly (number | null)[]): number => {
  let max = 0;
  for (const value of values) {
    if (value !== null && value > max) {
      max = value;
    }
  }

  return max === 0 ? 1 : max;
};

const tightBounds = (
  values: readonly (number | null)[]
): { max: number; min: number } => {
  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;
  for (const value of values) {
    if (value === null) {
      continue;
    }
    if (value < min) {
      min = value;
    }
    if (value > max) {
      max = value;
    }
  }

  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    return { max: 1, min: 0 };
  }
  if (min === max) {
    return { max: max + 1, min: min - 1 };
  }

  const pad = (max - min) * 0.2;
  return { max: max + pad, min: min - pad };
};

const loggedHeadline = (count: number): string | null => {
  if (count < 1) {
    return null;
  }

  return `${count} ${count === 1 ? "day" : "days"} logged`;
};

interface SeriesInput {
  barValues: readonly (number | null)[];
  compareValues: readonly (number | null)[];
  completedIndex: number;
  dates: readonly string[];
  drawBarAverage: boolean;
  formatBar: (value: number) => string;
  formatBarDelta: (delta: number) => string;
  formatCompare: (value: number) => string;
  formatCompareDelta: (delta: number) => string;
  healthy?: readonly (number | null)[];
  labelFor: (index: number) => string;
  quantizeBar: (value: number) => number;
  quantizeCompare: (value: number) => number;
  sharedScale: boolean;
  smoothCompare: boolean;
  stackPalette?: "people" | "supplements";
  stacked: boolean;
  tightScale?: boolean;
  unhealthy?: readonly (number | null)[];
  fixedScale?: { max: number; min: number };
  headline: "bars" | "compare" | "either";
  mark?: "area" | "bars" | "line";
}

const supplementStripRows = (
  lists: readonly (readonly string[] | undefined)[]
): { name: string; values: (boolean | null)[] }[] => {
  const counts = new Map<string, { count: number; label: string }>();
  for (const list of lists) {
    if (!list) {
      continue;
    }
    for (const name of list) {
      const key = name.toLowerCase();
      const existing = counts.get(key);
      if (existing) {
        existing.count += 1;
      } else {
        counts.set(key, { count: 1, label: name });
      }
    }
  }

  return [...counts.values()]
    .toSorted((left, right) => {
      if (isCreatine(left.label) !== isCreatine(right.label)) {
        return isCreatine(left.label) ? -1 : 1;
      }
      return right.count - left.count;
    })
    .slice(0, 6)
    .map((entry) => ({
      name: entry.label,
      values: lists.map((list) => {
        if (!list) {
          return null;
        }
        return list.some(
          (name) => name.toLowerCase() === entry.label.toLowerCase()
        );
      }),
    }));
};

const stripState = (value: boolean | null): "empty" | "off" | "on" => {
  if (value === null) {
    return "empty";
  }
  if (value) {
    return "on";
  }
  return "off";
};

const toStrip = (
  summary: RhythmBarChart,
  rows: { name: string; values: readonly (boolean | null)[] }[]
): RhythmStripChart => ({
  delta: summary.delta,
  empty: summary.empty,
  headline: summary.headline,
  rows: rows.map((row) => ({
    cells: row.values.map((value, index) => ({
      state: stripState(value),
      title: summary.points[index]?.label ?? row.name,
    })),
    name: row.name,
  })),
});

const meansThrough = (
  values: readonly (number | null)[],
  completedIndex: number
): (number | null)[] =>
  values.map((_, index) =>
    index > completedIndex ? null : trailingMean(values, index)
  );

const meanAndDelta = (
  values: readonly (number | null)[],
  completedIndex: number,
  quantize: (value: number) => number
): { delta: number | null; mean: number | null } => {
  const means = meansThrough(values, completedIndex);
  const latestIndex = lastNumberIndex(means);
  if (latestIndex === null) {
    return { delta: null, mean: null };
  }

  const latest = means[latestIndex];
  if (latest === null || latest === undefined) {
    return { delta: null, mean: null };
  }

  const earlier = means[latestIndex - BASELINE_SHIFT];
  const delta =
    earlier === null || earlier === undefined
      ? null
      : quantize(latest) - quantize(earlier);

  return { delta, mean: latest };
};

const buildSeriesChart = (input: SeriesInput): RhythmBarChart => {
  const useBars =
    input.headline === "bars" ||
    (input.headline === "either" && countNumbers(input.barValues) > 0);
  const source = useBars ? input.barValues : input.compareValues;
  const summary = meanAndDelta(
    source,
    input.completedIndex,
    useBars ? input.quantizeBar : input.quantizeCompare
  );
  const formatValue = useBars ? input.formatBar : input.formatCompare;
  const formatDelta = useBars ? input.formatBarDelta : input.formatCompareDelta;
  const trend = input.drawBarAverage
    ? meansThrough(input.barValues, input.completedIndex)
    : input.barValues.map(() => null);
  const compare = input.smoothCompare
    ? meansThrough(input.compareValues, input.completedIndex)
    : [...input.compareValues];
  const barMaxSource = input.sharedScale
    ? [...input.barValues, ...trend, ...compare]
    : [...input.barValues, ...trend];
  let barMax = peak(barMaxSource);
  let compareMax = input.sharedScale ? barMax : peak(compare);
  let scaleMin = 0;
  let compareMin = 0;
  if (input.fixedScale) {
    scaleMin = input.fixedScale.min;
    barMax = input.fixedScale.max;
    if (input.sharedScale) {
      compareMin = input.fixedScale.min;
      compareMax = input.fixedScale.max;
    }
  } else if (input.tightScale) {
    const bounds = tightBounds(barMaxSource);
    scaleMin = bounds.min;
    barMax = bounds.max;
    if (input.sharedScale) {
      compareMin = bounds.min;
      compareMax = bounds.max;
    }
  }
  const logged = countNumbers(source);

  return {
    barMax,
    compareMax,
    compareMin,
    delta: summary.delta === null ? null : formatDelta(summary.delta),
    empty:
      countNumbers(input.barValues) === 0 &&
      countNumbers(input.compareValues) === 0,
    headline:
      summary.mean === null
        ? loggedHeadline(logged)
        : formatValue(summary.mean),
    points: input.dates.map((date, index) => ({
      bar: input.barValues[index] ?? null,
      compare: compare[index] ?? null,
      date,
      healthy: input.healthy?.[index] ?? null,
      label: input.labelFor(index),
      trend: trend[index] ?? null,
      unhealthy: input.unhealthy?.[index] ?? null,
    })),
    scaleMin,
    sharedScale: input.sharedScale,
    stackPalette: input.stackPalette ?? null,
    stacked: input.stacked,
    mark: input.mark ?? "bars",
  };
};

const numberOrNull = (value: number | undefined): number | null =>
  typeof value === "number" ? value : null;

const mealTally = (
  day: RhythmDay | undefined
): { healthy: number; unhealthy: number } | null => {
  if (!day) {
    return null;
  }

  const qualities = [
    day.meals.breakfast,
    day.meals.lunch,
    day.meals.dinner,
    ...day.meals.snacks,
  ].filter((quality): quality is MealQuality => quality !== undefined);

  if (qualities.length === 0) {
    return null;
  }

  let healthy = 0;
  let unhealthy = 0;
  for (const quality of qualities) {
    if (quality === "healthy") {
      healthy += 1;
    } else {
      unhealthy += 1;
    }
  }

  return { healthy, unhealthy };
};

const sleepSpan = (
  day: RhythmDay | undefined
): { bedAt: string; minutes: number; wokeAt: string } | null => {
  if (!day?.bedAt || !day.wokeAt) {
    return null;
  }

  const bedMs = Date.parse(day.bedAt);
  const wokeMs = Date.parse(day.wokeAt);
  if (!Number.isFinite(bedMs) || !Number.isFinite(wokeMs) || wokeMs <= bedMs) {
    return null;
  }

  return {
    bedAt: day.bedAt,
    minutes: (wokeMs - bedMs) / 60_000,
    wokeAt: day.wokeAt,
  };
};

export const sleepAxisFractions = (
  bedAt: string,
  wokeAt: string
): { end: number; start: number } | null => {
  const bedMs = Date.parse(bedAt);
  const wokeMs = Date.parse(wokeAt);
  if (!Number.isFinite(bedMs) || !Number.isFinite(wokeMs) || wokeMs <= bedMs) {
    return null;
  }

  const wakeDate = isoDateInBrisbane(wokeMs);
  const axisStart = Date.parse(
    `${addBrisbaneDays(wakeDate, -1)}T18:00:00+10:00`
  );
  const axisEnd = Date.parse(`${wakeDate}T12:00:00+10:00`);
  const span = axisEnd - axisStart;
  if (span <= 0) {
    return null;
  }

  const start = Math.min(1, Math.max(0, (bedMs - axisStart) / span));
  const end = Math.min(1, Math.max(0, (wokeMs - axisStart) / span));
  if (end <= start) {
    return null;
  }

  return { end, start };
};

const buildWeek = (
  dates: readonly string[],
  valueFor: (isoDate: string) => number | null,
  formatValue: (value: number) => string,
  titleFor: (label: string, value: number) => string
): WeekShapeChart => {
  const byWeekday = Array.from({ length: 7 }, () => ({ count: 0, total: 0 }));
  for (const isoDate of dates) {
    const value = valueFor(isoDate);
    if (value === null) {
      continue;
    }

    const bucket = byWeekday[brisbaneWeekdayIndex(isoDate)];
    if (!bucket) {
      continue;
    }
    bucket.count += 1;
    bucket.total += value;
  }

  const averages = WEEK_ORDER.map((weekday) => {
    const bucket = byWeekday[weekday];
    if (!bucket || bucket.count === 0) {
      return 0;
    }
    return bucket.total / bucket.count;
  });
  let max = 0;
  for (const average of averages) {
    if (average > max) {
      max = average;
    }
  }

  let peakIndex = -1;
  for (const [index, average] of averages.entries()) {
    if (average === max && max > 0) {
      peakIndex = index;
      break;
    }
  }

  return {
    days: WEEK_LABELS.map((label, index) => {
      const average = averages[index] ?? 0;
      return {
        height: max === 0 ? 0 : (average / max) * 100,
        label,
        peak: index === peakIndex,
        text: average > 0 ? formatValue(average) : "–",
        title: average > 0 ? titleFor(label, average) : `${label}, no records`,
      };
    }),
    empty: max === 0,
    headline: peakIndex === -1 ? null : `Most on ${WEEK_NAMES[peakIndex]}`,
  };
};

const playsByDate = (
  listens: readonly { listenedAt: number }[],
  dates: readonly string[]
): (number | null)[] => {
  const counts = new Map<string, number>();
  let first: string | null = null;
  let last: string | null = null;
  for (const play of listens) {
    if (!Number.isFinite(play.listenedAt)) {
      continue;
    }

    const date = isoDateInBrisbane(play.listenedAt);
    counts.set(date, (counts.get(date) ?? 0) + 1);
    if (first === null || date < first) {
      first = date;
    }
    if (last === null || date > last) {
      last = date;
    }
  }

  return dates.map((date) => {
    if (first === null || last === null || date < first || date > last) {
      return null;
    }

    return counts.get(date) ?? 0;
  });
};

export const buildActivityCharts = (source: ChartSource): ActivityCharts => {
  const todayIso = source.todayIso ?? isoDateInBrisbane();
  const dates = brisbaneDatesEnding(todayIso, CHART_DAYS);
  const completedIndex = dates.length - 2;
  const weekDates = brisbaneDatesEnding(
    addBrisbaneDays(todayIso, -1),
    WEEK_DAYS
  );
  const day = (isoDate: string): RhythmDay | undefined =>
    source.rhythms.days[isoDate];

  const steps = dates.map((isoDate) => numberOrNull(day(isoDate)?.steps));
  const workouts = dates.map((isoDate) =>
    numberOrNull(day(isoDate)?.workoutMinutes)
  );
  const water = dates.map((isoDate) => numberOrNull(day(isoDate)?.waterMl));
  const coffees = dates.map((isoDate) => numberOrNull(day(isoDate)?.coffees));
  const mood = dates.map((isoDate) => numberOrNull(day(isoDate)?.mood));
  const weight = dates.map((isoDate) => {
    const kilograms = day(isoDate)?.weightKg;
    return typeof kilograms === "number" ? kilograms : null;
  });
  const alcohol = dates.map((isoDate) => {
    const drank = day(isoDate)?.alcohol;
    if (typeof drank !== "boolean") {
      return null;
    }
    return drank ? 1 : 0;
  });
  const smoked = dates.map((isoDate) => {
    const didSmoke = day(isoDate)?.smoked;
    if (typeof didSmoke !== "boolean") {
      return null;
    }
    return didSmoke ? 1 : 0;
  });
  const vices = alcohol.map((drank, index) => {
    const didSmoke = smoked[index];
    if (drank === null && (didSmoke === null || didSmoke === undefined)) {
      return null;
    }
    return (drank ?? 0) > 0 || (didSmoke ?? 0) > 0 ? 1 : 0;
  });
  const reading = dates.map((isoDate) =>
    numberOrNull(day(isoDate)?.readMinutes)
  );
  const inPerson = dates.map((isoDate) => day(isoDate)?.hungOutInPerson);
  const online = dates.map((isoDate) => day(isoDate)?.hungOutOnline);
  const withSomeone = inPerson.map((person, index) => {
    const remote = online[index];
    if (typeof person !== "boolean" && typeof remote !== "boolean") {
      return null;
    }
    return person || remote ? 1 : 0;
  });
  const sleep = dates.map((isoDate) => sleepSpan(day(isoDate)));
  const meals = dates.map((isoDate) => mealTally(day(isoDate)));
  const shares = meals.map((tally) =>
    tally === null
      ? null
      : (tally.healthy / (tally.healthy + tally.unhealthy)) * 100
  );
  const mealTotals = meals.map((tally) =>
    tally === null ? null : tally.healthy + tally.unhealthy
  );
  const work = dates.map((isoDate) => {
    const rollup = source.status.days[isoDate];
    if (!rollup || rollup.locationObservedMinutes <= 0) {
      return null;
    }
    return rollup.workMinutes;
  });
  const away = dates.map((isoDate) => {
    const rollup = source.status.days[isoDate];
    if (!rollup || rollup.locationObservedMinutes <= 0) {
      return null;
    }
    return Math.max(0, rollup.locationObservedMinutes - rollup.homeMinutes);
  });
  const late = dates.map((isoDate) => {
    const minutes = source.status.days[isoDate]?.discordLateMinutes;
    return typeof minutes === "number" ? minutes : null;
  });
  const inBed = sleep.map((span) => span?.minutes ?? null);
  const plays = playsByDate(source.listens, dates);

  const movement = buildSeriesChart({
    barValues: steps,
    compareValues: dates.map(() => null),
    completedIndex,
    dates,
    drawBarAverage: true,
    formatBar: formatSteps,
    formatBarDelta: (delta) => signedCount(delta, "steps"),
    formatCompare: formatSteps,
    formatCompareDelta: (delta) => signedCount(delta, "steps"),
    headline: "bars",
    labelFor: (index) => {
      const stepCount = steps[index];
      const date = formatChartDay(dates[index] ?? "");
      if (stepCount === null || stepCount === undefined) {
        return `${date}, no steps logged`;
      }
      return `${date}, ${formatSteps(stepCount)}`;
    },
    quantizeBar: Math.round,
    quantizeCompare: Math.round,
    sharedScale: true,
    smoothCompare: false,
    stacked: false,
  });

  const workoutsChart = buildSeriesChart({
    barValues: workouts,
    compareValues: dates.map(() => null),
    completedIndex,
    dates,
    drawBarAverage: true,
    formatBar: (value) => `${formatHeatmapMinutesLabel(value)} working out`,
    formatBarDelta: signedDuration,
    formatCompare: (value) => `${formatHeatmapMinutesLabel(value)} working out`,
    formatCompareDelta: signedDuration,
    headline: "bars",
    labelFor: (index) => {
      const minutes = workouts[index];
      const date = formatChartDay(dates[index] ?? "");
      if (minutes === null || minutes === undefined) {
        return `${date}, no workout logged`;
      }
      if (minutes === 0) {
        return `${date}, no workout`;
      }
      return `${date}, ${formatHeatmapMinutesLabel(minutes)} working out`;
    },
    quantizeBar: Math.round,
    quantizeCompare: Math.round,
    sharedScale: true,
    smoothCompare: false,
    stacked: false,
  });

  const drinks = buildSeriesChart({
    barValues: water,
    compareValues: dates.map(() => null),
    completedIndex,
    dates,
    drawBarAverage: true,
    formatBar: (value) => `${formatWater(value)} of water`,
    formatBarDelta: signedWater,
    formatCompare: (value) => `${formatWater(value)} of water`,
    formatCompareDelta: signedWater,
    headline: "bars",
    labelFor: (index) => {
      const waterMl = water[index];
      const date = formatChartDay(dates[index] ?? "");
      if (waterMl === null || waterMl === undefined) {
        return `${date}, no water logged`;
      }
      return `${date}, ${formatWater(waterMl)} of water`;
    },
    quantizeBar: Math.round,
    quantizeCompare: Math.round,
    sharedScale: true,
    smoothCompare: false,
    stacked: false,
  });

  const coffeeChart = buildSeriesChart({
    barValues: coffees,
    compareValues: dates.map(() => null),
    completedIndex,
    dates,
    drawBarAverage: true,
    formatBar: (value) => `${formatCups(value)} of coffee`,
    formatBarDelta: (delta) => signedDecimal(delta, "cups"),
    formatCompare: (value) => `${formatCups(value)} of coffee`,
    formatCompareDelta: (delta) => signedDecimal(delta, "cups"),
    headline: "bars",
    labelFor: (index) => {
      const cups = coffees[index];
      const date = formatChartDay(dates[index] ?? "");
      if (cups === null || cups === undefined) {
        return `${date}, no coffee logged`;
      }
      return `${date}, ${formatCups(cups)}`;
    },
    quantizeBar: (value) => Math.round(value * 10) / 10,
    quantizeCompare: (value) => Math.round(value * 10) / 10,
    sharedScale: true,
    smoothCompare: false,
    stacked: false,
  });

  const mealChart = buildSeriesChart({
    barValues: mealTotals,
    compareValues: shares,
    completedIndex,
    dates,
    drawBarAverage: false,
    formatBar: (value) => `${Math.round(value)} meals`,
    formatBarDelta: (delta) => signedCount(delta, "meals"),
    formatCompare: formatShare,
    formatCompareDelta: (delta) => signedCount(delta, "points"),
    headline: "compare",
    mark: "area",
    healthy: meals.map((tally) => tally?.healthy ?? null),
    labelFor: (index) => {
      const tally = meals[index];
      const date = formatChartDay(dates[index] ?? "");
      if (!tally) {
        return `${date}, no meals logged`;
      }
      return `${date}, ${tally.healthy} healthy, ${tally.unhealthy} unhealthy`;
    },
    quantizeBar: Math.round,
    quantizeCompare: Math.round,
    sharedScale: false,
    smoothCompare: true,
    stacked: true,
    unhealthy: meals.map((tally) => tally?.unhealthy ?? null),
  });
  mealChart.compareMax = 100;

  const place = buildSeriesChart({
    barValues: work,
    compareValues: away,
    completedIndex,
    dates,
    drawBarAverage: true,
    formatBar: (value) => `${formatHeatmapMinutesLabel(value)} at work`,
    formatBarDelta: signedDuration,
    formatCompare: (value) =>
      `${formatHeatmapMinutesLabel(value)} away from home`,
    formatCompareDelta: signedDuration,
    headline: "bars",
    labelFor: (index) => {
      const date = formatChartDay(dates[index] ?? "");
      const atWork = work[index];
      const out = away[index];
      if (
        atWork === null ||
        atWork === undefined ||
        out === null ||
        out === undefined
      ) {
        return `${date}, no location record`;
      }
      return `${date}, ${formatHeatmapMinutesLabel(atWork)} at work, ${formatHeatmapMinutesLabel(out)} away from home`;
    },
    quantizeBar: Math.round,
    quantizeCompare: Math.round,
    sharedScale: true,
    smoothCompare: false,
    stacked: false,
  });

  const attention = buildSeriesChart({
    barValues: plays,
    compareValues: dates.map(() => null),
    completedIndex,
    dates,
    drawBarAverage: true,
    formatBar: formatPlays,
    formatBarDelta: (delta) => signedCount(delta, "plays"),
    formatCompare: formatPlays,
    formatCompareDelta: (delta) => signedCount(delta, "plays"),
    headline: "bars",
    labelFor: (index) => {
      const count = plays[index];
      const date = formatChartDay(dates[index] ?? "");
      if (count === null || count === undefined) {
        return `${date}, no listening record`;
      }
      if (count === 0) {
        return `${date}, no plays`;
      }
      const unit = count === 1 ? "play" : "plays";
      return `${date}, ${count.toLocaleString(siteLocale)} ${unit}`;
    },
    quantizeBar: Math.round,
    quantizeCompare: Math.round,
    sharedScale: true,
    smoothCompare: false,
    stacked: false,
  });

  const afterTen = buildSeriesChart({
    barValues: late,
    compareValues: dates.map(() => null),
    completedIndex,
    dates,
    drawBarAverage: true,
    formatBar: (value) => `${formatHeatmapMinutesLabel(value)} after 10 pm`,
    formatBarDelta: signedDuration,
    formatCompare: (value) => `${formatHeatmapMinutesLabel(value)} after 10 pm`,
    formatCompareDelta: signedDuration,
    headline: "bars",
    labelFor: (index) => {
      const discord = late[index];
      const date = formatChartDay(dates[index] ?? "");
      if (discord === null || discord === undefined) {
        return `${date}, no late-night record`;
      }
      return `${date}, ${formatHeatmapMinutesLabel(discord)} on Discord`;
    },
    quantizeBar: Math.round,
    quantizeCompare: Math.round,
    sharedScale: false,
    smoothCompare: false,
    stacked: false,
  });
  if (countNumbers(late) === 0) {
    afterTen.empty = true;
    afterTen.headline = null;
    afterTen.delta = null;
  }

  const moodChart = buildSeriesChart({
    barValues: mood,
    compareValues: dates.map(() => null),
    completedIndex,
    dates,
    drawBarAverage: true,
    fixedScale: { max: 5, min: 1 },
    formatBar: formatMood,
    formatBarDelta: (delta) => signedDecimal(delta, "points"),
    formatCompare: formatMood,
    formatCompareDelta: (delta) => signedDecimal(delta, "points"),
    headline: "bars",
    mark: "line",
    labelFor: (index) => {
      const score = mood[index];
      const date = formatChartDay(dates[index] ?? "");
      if (score === null || score === undefined) {
        return `${date}, no mood logged`;
      }
      return `${date}, ${formatMood(score)}`;
    },
    quantizeBar: (value) => Math.round(value * 10) / 10,
    quantizeCompare: (value) => Math.round(value * 10) / 10,
    sharedScale: true,
    smoothCompare: false,
    stacked: false,
  });

  const weightChart = buildSeriesChart({
    barValues: weight,
    compareValues: dates.map(() => null),
    completedIndex,
    dates,
    drawBarAverage: true,
    formatBar: formatWeight,
    formatBarDelta: (delta) => signedDecimal(delta, "kg"),
    formatCompare: formatWeight,
    formatCompareDelta: (delta) => signedDecimal(delta, "kg"),
    headline: "bars",
    labelFor: (index) => {
      const kilograms = weight[index];
      const date = formatChartDay(dates[index] ?? "");
      if (kilograms === null || kilograms === undefined) {
        return `${date}, no weight logged`;
      }
      return `${date}, ${formatWeight(kilograms)}`;
    },
    quantizeBar: (value) => Math.round(value * 10) / 10,
    quantizeCompare: (value) => Math.round(value * 10) / 10,
    sharedScale: true,
    smoothCompare: false,
    stacked: false,
    tightScale: true,
    mark: "line",
  });

  const vicesChart = buildSeriesChart({
    barValues: vices,
    compareValues: dates.map(() => null),
    completedIndex,
    dates,
    drawBarAverage: true,
    fixedScale: { max: 1, min: 0 },
    formatBar: formatDaysPerWeek,
    formatBarDelta: daysPerWeekDelta,
    formatCompare: formatDaysPerWeek,
    formatCompareDelta: daysPerWeekDelta,
    headline: "bars",
    labelFor: (index) => {
      const drank = alcohol[index];
      const didSmoke = smoked[index];
      const date = formatChartDay(dates[index] ?? "");
      if (
        (drank === null || drank === undefined) &&
        (didSmoke === null || didSmoke === undefined)
      ) {
        return `${date}, no vices logged`;
      }
      const parts = [date];
      if (drank !== null && drank !== undefined) {
        parts.push(drank > 0 ? "drank" : "no alcohol");
      }
      if (didSmoke !== null && didSmoke !== undefined) {
        parts.push(didSmoke > 0 ? "smoked" : "no smoking");
      }
      return parts.join(", ");
    },
    quantizeBar: (value) => Math.round(value * 100) / 100,
    quantizeCompare: (value) => Math.round(value * 100) / 100,
    sharedScale: true,
    smoothCompare: false,
    stacked: false,
  });

  const readingChart = buildSeriesChart({
    barValues: reading,
    compareValues: dates.map(() => null),
    completedIndex,
    dates,
    drawBarAverage: true,
    formatBar: (value) => `${formatHeatmapMinutesLabel(value)} reading`,
    formatBarDelta: signedDuration,
    formatCompare: (value) => `${formatHeatmapMinutesLabel(value)} reading`,
    formatCompareDelta: signedDuration,
    headline: "bars",
    labelFor: (index) => {
      const minutes = reading[index];
      const date = formatChartDay(dates[index] ?? "");
      if (minutes === null || minutes === undefined) {
        return `${date}, no reading note`;
      }
      if (minutes === 0) {
        return `${date}, did not read`;
      }
      return `${date}, ${formatHeatmapMinutesLabel(minutes)} reading`;
    },
    quantizeBar: Math.round,
    quantizeCompare: Math.round,
    sharedScale: true,
    smoothCompare: false,
    stacked: false,
  });

  const peopleChart = buildSeriesChart({
    barValues: withSomeone.map((value, index) => {
      if (value === null) {
        return null;
      }
      return (inPerson[index] ? 1 : 0) + (online[index] ? 1 : 0);
    }),
    compareValues: withSomeone,
    completedIndex,
    dates,
    drawBarAverage: false,
    fixedScale: { max: 2, min: 0 },
    formatBar: formatDaysPerWeek,
    formatBarDelta: daysPerWeekDelta,
    formatCompare: formatDaysPerWeek,
    formatCompareDelta: daysPerWeekDelta,
    headline: "compare",
    healthy: inPerson.map((person) => (person ? 1 : null)),
    labelFor: (index) => {
      const person = inPerson[index];
      const remote = online[index];
      const date = formatChartDay(dates[index] ?? "");
      if (typeof person !== "boolean" && typeof remote !== "boolean") {
        return `${date}, no socialising logged`;
      }
      return [
        date,
        person ? "saw someone in person" : "no one in person",
        remote ? "talked online" : "no one online",
      ].join(", ");
    },
    quantizeBar: (value) => Math.round(value * 100) / 100,
    quantizeCompare: (value) => Math.round(value * 100) / 100,
    sharedScale: false,
    smoothCompare: true,
    stackPalette: "people",
    stacked: true,
    unhealthy: online.map((remote) => (remote ? 1 : null)),
  });

  const supplementLists = dates.map((isoDate) => day(isoDate)?.supplements);
  const anySupplement = supplementLists.map((list) => {
    if (!list) {
      return null;
    }
    return list.length > 0 ? 1 : 0;
  });
  const supplementsChart = buildSeriesChart({
    barValues: supplementLists.map((list) => (list ? list.length : null)),
    compareValues: anySupplement,
    completedIndex,
    dates,
    drawBarAverage: false,
    fixedScale: { max: 4, min: 0 },
    formatBar: formatDaysPerWeek,
    formatBarDelta: daysPerWeekDelta,
    formatCompare: formatDaysPerWeek,
    formatCompareDelta: daysPerWeekDelta,
    headline: "compare",
    healthy: supplementLists.map((list) =>
      list?.some((name) => isCreatine(name)) ? 1 : null
    ),
    labelFor: (index) => {
      const list = supplementLists[index];
      const date = formatChartDay(dates[index] ?? "");
      if (!list) {
        return `${date}, no supplement note`;
      }
      if (list.length === 0) {
        return `${date}, no supplements`;
      }
      return `${date}, ${list.join(", ")}`;
    },
    quantizeBar: (value) => Math.round(value * 100) / 100,
    quantizeCompare: (value) => Math.round(value * 100) / 100,
    sharedScale: false,
    smoothCompare: true,
    stackPalette: "supplements",
    stacked: true,
    unhealthy: supplementLists.map((list) => {
      if (!list) {
        return null;
      }
      const others = list.filter((name) => !isCreatine(name)).length;
      return others > 0 ? others : null;
    }),
  });

  const nights: SleepNight[] = dates.map((isoDate, index) => {
    const span = sleep[index];
    const fractions = span ? sleepAxisFractions(span.bedAt, span.wokeAt) : null;
    const label = span
      ? `${formatChartDay(isoDate)}, in bed ${formatClock(span.bedAt)} to ${formatClock(span.wokeAt)}`
      : `${formatChartDay(isoDate)}, no bed or wake time`;
    return {
      date: isoDate,
      end: fractions?.end ?? null,
      label,
      start: fractions?.start ?? null,
    };
  });
  const sleepSummary = meanAndDelta(inBed, completedIndex, Math.round);
  const sleepLogged = countNumbers(inBed);

  const weekValue = (pick: (isoDate: string) => number | null) =>
    buildWeek(
      weekDates,
      pick,
      formatCompactMinutes,
      (label, value) => `${label}, ${formatHeatmapMinutesLabel(value)}`
    );

  const weekWork = weekValue((isoDate) => {
    const rollup = source.status.days[isoDate];
    if (!rollup || rollup.locationObservedMinutes <= 0) {
      return null;
    }
    return rollup.workMinutes;
  });
  const weekSteps = buildWeek(
    weekDates,
    (isoDate) => numberOrNull(source.rhythms.days[isoDate]?.steps),
    (value) => Math.round(value).toLocaleString(siteLocale),
    (label, value) => `${label}, ${formatSteps(value)}`
  );

  return {
    afterTen,
    vices: toStrip(vicesChart, [
      {
        name: "Alcohol",
        values: alcohol.map((value) => (value === null ? null : value > 0)),
      },
      {
        name: "Smoking",
        values: smoked.map((value) =>
          value === null || value === undefined ? null : value > 0
        ),
      },
    ]),
    attention,
    coffee: coffeeChart,
    drinks,
    meals: mealChart,
    mood: moodChart,
    movement,
    people: toStrip(peopleChart, [
      {
        name: "In person",
        values: inPerson.map((value) =>
          typeof value === "boolean" ? value : null
        ),
      },
      {
        name: "Online",
        values: online.map((value) =>
          typeof value === "boolean" ? value : null
        ),
      },
    ]),
    place,
    reading: readingChart,
    supplements: toStrip(
      supplementsChart,
      supplementStripRows(supplementLists)
    ),
    weight: weightChart,
    workouts: workoutsChart,
    sleep: {
      delta:
        sleepSummary.delta === null ? null : signedDuration(sleepSummary.delta),
      empty: sleepLogged === 0,
      headline:
        sleepSummary.mean === null
          ? loggedHeadline(sleepLogged)
          : `${formatHeatmapMinutesLabel(sleepSummary.mean)} in bed`,
      nights,
    },
    weekSteps: weekSteps.empty ? null : weekSteps,
    weekWork,
  };
};

export const getServerActivityCharts =
  async (): Promise<ActivityCharts | null> => {
    const { workersEnv } = await import("./workers-env");
    const kv = workersEnv.LOCATION_KV;
    if (!kv) {
      return null;
    }

    if (import.meta.env.DEV) {
      const { ensureDevActivityChartSeed } =
        await import("./activity-chart-dev-seed");
      await ensureDevActivityChartSeed(kv);
    }

    const [rhythmRaw, statusRaw, listenRaw] = await Promise.all([
      kv.get(RHYTHMS_KV_KEY),
      kv.get(STATUS_HISTORY_KV_KEY),
      kv.get(LISTENING_HISTORY_KV_KEY),
    ]);

    return buildActivityCharts({
      listens: readListenHistory(listenRaw),
      rhythms: readRhythmStore(rhythmRaw),
      status: parseStatusHistoryStore(statusRaw),
    });
  };
