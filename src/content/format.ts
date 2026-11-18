import type { YearMonth } from "./types";

const monthFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** "2026-02" → "Feb 2026". */
export const formatYearMonth = (value: YearMonth): string => {
  const [year, month] = value.split("-").map(Number);
  if (year === undefined || month === undefined) return value;
  return monthFormat.format(new Date(Date.UTC(year, month - 1, 1)));
};
