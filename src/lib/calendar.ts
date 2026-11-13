export const dayDate = (value: string) => new Date(`${value}T12:00:00Z`);
export const isoDay = (date: Date) => date.toISOString().slice(0, 10);
export function shiftDay(value: string, days: number) {
  const date = dayDate(value);
  date.setUTCDate(date.getUTCDate() + days);
  return isoDay(date);
}
export function shiftMonth(value: string, months: number) {
  const date = dayDate(value);
  const day = date.getUTCDate();
  date.setUTCDate(1);
  date.setUTCMonth(date.getUTCMonth() + months);
  const last = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0),
  ).getUTCDate();
  date.setUTCDate(Math.min(day, last));
  return isoDay(date);
}
export function monthDays(month: string) {
  const first = `${month.slice(0, 7)}-01`;
  const offset = (dayDate(first).getUTCDay() + 6) % 7;
  return Array.from({ length: 42 }, (_, i) => shiftDay(first, i - offset));
}
export const longDate = (value: string) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(dayDate(value));
