import { BRISBANE_TIME_ZONE } from "@/lib/format-in-brisbane";

const listenMonthKeyFormatter = new Intl.DateTimeFormat("en-CA", {
  month: "2-digit",
  timeZone: BRISBANE_TIME_ZONE,
  year: "numeric",
});

/** `YYYY-MM` in Australia/Brisbane for grouping listen stats. */
export const listenMonthKey = (milliseconds: number): string => {
  const parts = listenMonthKeyFormatter.formatToParts(new Date(milliseconds));

  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  if (!year || !month) {
    return "unknown";
  }

  return `${year}-${month}`;
};

export const isListenMonthKey = (value: string): boolean =>
  /^\d{4}-\d{2}$/u.test(value);
