/** Canonical timezone for authored dates so SSR and browser produce identical formatted strings. */
const BRISBANE_TIMEZONE = "Australia/Brisbane";

export type DateInput = string | Date | number;

const coerceDate = (value: DateInput): Date =>
  value instanceof Date ? value : new Date(value);

const formatterMonthYear = new Intl.DateTimeFormat("en-US", {
  month: "long",
  timeZone: BRISBANE_TIMEZONE,
  year: "numeric",
});

const formatterFullWeekday = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  month: "long",
  timeZone: BRISBANE_TIMEZONE,
  weekday: "long",
  year: "numeric",
});

const formatterNumericDMY = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  month: "2-digit",
  timeZone: BRISBANE_TIMEZONE,
  year: "numeric",
});

const formatterShortMonthDay = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  month: "short",
  timeZone: BRISBANE_TIMEZONE,
});

const formatterLongFull = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  timeZone: BRISBANE_TIMEZONE,
  year: "numeric",
});

const formatterDdMmYyParts = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  month: "2-digit",
  timeZone: BRISBANE_TIMEZONE,
  year: "numeric",
});

const yearNumericBrisbane = new Intl.DateTimeFormat("en-US", {
  timeZone: BRISBANE_TIMEZONE,
  year: "numeric",
});

const tzDayMonthYear = (
  isoDate: DateInput
): { day: string; month: string; year: string } => {
  const date = coerceDate(isoDate);
  const parts = formatterDdMmYyParts.formatToParts(date);
  const map: Partial<Record<Intl.DateTimeFormatPartTypes, string>> = {};
  for (const p of parts) {
    if (p.type !== "literal") {
      map[p.type] = p.value;
    }
  }
  return {
    day: map.day ?? "01",
    month: map.month ?? "01",
    year: map.year ?? "1970",
  };
};

/** e.g. "January 2024" */
export const formatPublishedMonthYear = function formatPublishedMonthYear(
  isoDate: DateInput
): string {
  return formatterMonthYear.format(coerceDate(isoDate));
};

/** e.g. "Monday, October 06, 2025" style from en-US weekday + parts */
export const formatPublishedFullWeekday = function formatPublishedFullWeekday(
  isoDate: DateInput
): string {
  return formatterFullWeekday.format(coerceDate(isoDate));
};

/** e.g. "05 Jan" */
export const formatPublishedShortDayMonth =
  function formatPublishedShortDayMonth(isoDate: DateInput): string {
    return formatterShortMonthDay.format(coerceDate(isoDate));
  };

/** e.g. 4/05/2025 in en-US locales (digits + slashes); used where site previously relied on numeric short style */
export const formatPublishedNumericDMY = function formatPublishedNumericDMY(
  isoDate: DateInput
): string {
  return formatterNumericDMY.format(coerceDate(isoDate));
};

/** e.g. "6 January 2025" */
export const formatPublishedLongDate = function formatPublishedLongDate(
  isoDate: DateInput
): string {
  return formatterLongFull.format(coerceDate(isoDate));
};

/** Brisbane calendar day/month/year digits with dashes — stable across runtimes */
export const formatDdMmYy = function formatDdMmYy(isoDate: DateInput): string {
  const { day, month, year } = tzDayMonthYear(isoDate);
  return `${day}-${month}-${year}`;
};

export const formatDdMm = function formatDdMm(isoDate: DateInput): string {
  const { day, month } = tzDayMonthYear(isoDate);
  return `${day}-${month}`;
};

/**
 * Calendar year in Brisbane (for grouping timelines by year consistently with date
 * formatting helpers).
 */
export const calendarYearInBrisbane = function calendarYearInBrisbane(
  at: DateInput
): number {
  return Number.parseInt(yearNumericBrisbane.format(coerceDate(at)), 10);
};
