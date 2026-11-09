import { calendarYearInBrisbane } from "@/lib/format-in-brisbane";
import type { DateInput } from "@/lib/format-in-brisbane";

export const groupItemsByBrisbaneYear = function groupItemsByBrisbaneYear<T>(
  items: T[],
  getDate: (item: T) => DateInput
): Record<number, T[]> {
  const byYear: Record<number, T[]> = {};
  for (const item of items) {
    const year = calendarYearInBrisbane(getDate(item));
    if (!byYear[year]) {
      byYear[year] = [];
    }
    byYear[year].push(item);
  }
  return byYear;
};
