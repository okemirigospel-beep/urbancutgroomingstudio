export const studioSchedule = {
  timeZone: "Africa/Lagos",
  weekdayOpen: 9,
  sundayOpen: 13,
  close: 21,
  advanceDays: 1,
} as const;
export const advanceNotice = "Request an appointment at least one day ahead.";
export function timeLabel(value: string) {
  const hour = Number(value.split(":")[0]);
  return `${hour % 12 || 12} ${hour >= 12 ? "PM" : "AM"}`;
}
const range = (start: number) =>
  `${timeLabel(`${start}:00`)}–${timeLabel(`${studioSchedule.close}:00`)}`;
export const openingHours = [
  { days: "MON–SAT", hours: range(studioSchedule.weekdayOpen) },
  { days: "SUNDAY", hours: range(studioSchedule.sundayOpen) },
];
export const openingHoursSummary =
  openingHours.map((s) => `${s.days} · ${s.hours}`).join(". ") +
  ". Abuja time.";
export function abujaDate(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: studioSchedule.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}
export function firstRequestDate(now = new Date()) {
  const tomorrow = new Date(`${abujaDate(now)}T12:00:00Z`);
  tomorrow.setUTCDate(tomorrow.getUTCDate() + studioSchedule.advanceDays);
  return tomorrow.toISOString().slice(0, 10);
}
function calendarDay(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const day = new Date(`${value}T12:00:00Z`);
  return Number.isFinite(day.getTime()) &&
    day.toISOString().slice(0, 10) === value
    ? day
    : null;
}
export function dateError(value: string, now = new Date()) {
  if (!value) return "Choose your preferred date.";
  if (!calendarDay(value)) return "Choose a valid date.";
  if (value < firstRequestDate(now))
    return "Please choose tomorrow or later in Abuja time.";
  return "";
}
// Preferred starts, not live availability. Known duration is a lower bound only.
export function hourlyTimes(date: string, knownMinutes = 0) {
  const day = calendarDay(date);
  if (!day || !Number.isFinite(knownMinutes) || knownMinutes < 0) return [];
  const start =
    day.getUTCDay() === 0
      ? studioSchedule.sundayOpen
      : studioSchedule.weekdayOpen;
  return Array.from(
    { length: studioSchedule.close - start },
    (_, i) => start + i,
  )
    .filter((h) => h * 60 + knownMinutes <= studioSchedule.close * 60)
    .map((h) => `${String(h).padStart(2, "0")}:00`);
}
export function changeRequestDate<T extends { date: string; time: string }>(
  data: T,
  date: string,
  eligibleTimes: string[],
): T {
  return {
    ...data,
    date,
    time: eligibleTimes.includes(data.time) ? data.time : "",
  };
}
