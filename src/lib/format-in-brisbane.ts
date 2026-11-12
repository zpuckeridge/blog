import { siteLocale } from "@/lib/site";

/** Canonical timezone for authored dates so SSR and browser produce identical formatted strings. */
export const BRISBANE_TIME_ZONE = "Australia/Brisbane";

export type DateInput = string | Date | number;

const coerceDate = (value: DateInput): Date =>
  value instanceof Date ? value : new Date(value);

const formatterMonthYear = new Intl.DateTimeFormat(siteLocale, {
  month: "long",
  timeZone: BRISBANE_TIME_ZONE,
  year: "numeric",
});

const formatterFullWeekday = new Intl.DateTimeFormat(siteLocale, {
  day: "2-digit",
  month: "long",
  timeZone: BRISBANE_TIME_ZONE,
  weekday: "long",
  year: "numeric",
});

const formatterArticleDateParts = new Intl.DateTimeFormat(siteLocale, {
  day: "numeric",
  month: "long",
  timeZone: BRISBANE_TIME_ZONE,
  weekday: "long",
  year: "numeric",
});

const dayOrdinal = (day: number): string => {
  const teen = day % 100;
  if (teen >= 11 && teen <= 13) {
    return `${day}th`;
  }

  switch (day % 10) {
    case 1: {
      return `${day}st`;
    }
    case 2: {
      return `${day}nd`;
    }
    case 3: {
      return `${day}rd`;
    }
    default: {
      return `${day}th`;
    }
  }
};

const formatterShortMonthDay = new Intl.DateTimeFormat(siteLocale, {
  day: "2-digit",
  month: "short",
  timeZone: BRISBANE_TIME_ZONE,
});

const formatterLongFull = new Intl.DateTimeFormat(siteLocale, {
  day: "numeric",
  month: "long",
  timeZone: BRISBANE_TIME_ZONE,
  year: "numeric",
});

const formatterDdMmYyParts = new Intl.DateTimeFormat(siteLocale, {
  day: "2-digit",
  month: "2-digit",
  timeZone: BRISBANE_TIME_ZONE,
  year: "numeric",
});

const yearNumericBrisbane = new Intl.DateTimeFormat(siteLocale, {
  timeZone: BRISBANE_TIME_ZONE,
  year: "numeric",
});

const formatParts = (
  formatter: Intl.DateTimeFormat,
  isoDate: DateInput
): Partial<Record<Intl.DateTimeFormatPartTypes, string>> => {
  const map: Partial<Record<Intl.DateTimeFormatPartTypes, string>> = {};
  for (const part of formatter.formatToParts(coerceDate(isoDate))) {
    if (part.type !== "literal") {
      map[part.type] = part.value;
    }
  }
  return map;
};

const tzDayMonthYear = (
  isoDate: DateInput
): { day: string; month: string; year: string } => {
  const map = formatParts(formatterDdMmYyParts, isoDate);
  return {
    day: map.day ?? "01",
    month: map.month ?? "01",
    year: map.year ?? "1970",
  };
};

const formatterIsoDateBrisbane = new Intl.DateTimeFormat("en-CA", {
  day: "2-digit",
  month: "2-digit",
  timeZone: BRISBANE_TIME_ZONE,
  year: "numeric",
});

/** YYYY-MM-DD for the Brisbane calendar day (matches GitHub contribution `date` strings). */
export const isoDateInBrisbane = function isoDateInBrisbane(
  at: DateInput = new Date()
): string {
  return formatterIsoDateBrisbane.format(coerceDate(at));
};

export const formatPublishedMonthYear = function formatPublishedMonthYear(
  isoDate: DateInput
): string {
  return formatterMonthYear.format(coerceDate(isoDate));
};

export const formatPublishedFullWeekday = function formatPublishedFullWeekday(
  isoDate: DateInput
): string {
  const map = formatParts(formatterFullWeekday, isoDate);
  const weekday = map.weekday ?? "";
  const day = map.day ?? "";
  const month = map.month ?? "";
  const year = map.year ?? "";

  if (!weekday || !day || !month || !year) {
    return formatterFullWeekday.format(coerceDate(isoDate));
  }

  return `${weekday}, ${day} ${month} ${year}`;
};

export const formatPublishedArticleDate = function formatPublishedArticleDate(
  isoDate: DateInput
): string {
  const map = formatParts(formatterArticleDateParts, isoDate);
  const day = Number(map.day);
  const weekday = map.weekday ?? "";
  const month = map.month ?? "";
  const year = map.year ?? "";

  if (!weekday || !Number.isFinite(day) || !month || !year) {
    return formatterArticleDateParts.format(coerceDate(isoDate));
  }

  return `${weekday} ${dayOrdinal(day)} ${month} ${year}`;
};

export const formatPublishedShortDayMonth =
  function formatPublishedShortDayMonth(isoDate: DateInput): string {
    const map = formatParts(formatterShortMonthDay, isoDate);
    const day = map.day ?? "";
    const month = map.month ?? "";
    return `${day} ${month}`.trim();
  };

export const formatPublishedLongDate = function formatPublishedLongDate(
  isoDate: DateInput
): string {
  const map = formatParts(formatterLongFull, isoDate);
  const day = map.day ?? "";
  const month = map.month ?? "";
  const year = map.year ?? "";
  return `${day} ${month} ${year}`.trim();
};

/** Brisbane calendar day/month/year as DD/MM/YYYY — stable across runtimes */
export const formatDdMmYy = function formatDdMmYy(isoDate: DateInput): string {
  const { day, month, year } = tzDayMonthYear(isoDate);
  return `${day}/${month}/${year}`;
};

export const formatDdMm = function formatDdMm(isoDate: DateInput): string {
  const { day, month } = tzDayMonthYear(isoDate);
  return `${day}/${month}`;
};

/**
 * Calendar year in Brisbane (for grouping timelines by year consistently with date
 * formatting helpers).
 */
export const calendarYearInBrisbane = function calendarYearInBrisbane(
  at: DateInput = new Date()
): number {
  return Math.trunc(Number(yearNumericBrisbane.format(coerceDate(at))));
};

const clockSecondFormatter = new Intl.DateTimeFormat(siteLocale, {
  second: "2-digit",
  timeZone: BRISBANE_TIME_ZONE,
});

export const brisbaneClockSecond = (at: DateInput = new Date()): number =>
  Number(formatParts(clockSecondFormatter, at).second ?? "0");

const clockTimeFormatter = new Intl.DateTimeFormat(siteLocale, {
  dayPeriod: "short",
  hour: "numeric",
  hour12: true,
  minute: "2-digit",
  timeZone: BRISBANE_TIME_ZONE,
});

export const formatBrisbaneClockParts = (
  at: DateInput = new Date()
): { dayPeriod: string; hour: string; minute: string } => {
  const map = formatParts(clockTimeFormatter, at);
  return {
    dayPeriod: map.dayPeriod ?? "",
    hour: map.hour ?? "",
    minute: map.minute ?? "",
  };
};

export const formatBrisbaneAbsolute = (
  at: DateInput,
  timeZone: string,
  withZoneName = false
): string =>
  new Intl.DateTimeFormat(siteLocale, {
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    month: "2-digit",
    timeZone,
    ...(withZoneName ? { timeZoneName: "short" as const } : {}),
    year: "numeric",
  }).format(coerceDate(at));
