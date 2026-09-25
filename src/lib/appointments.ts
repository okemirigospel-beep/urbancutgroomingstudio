export function abujaDate(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Lagos",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}
export function firstRequestDate(now = new Date()) {
  const tomorrow = new Date(`${abujaDate(now)}T12:00:00Z`);
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
  if (tomorrow.getUTCDay() === 0)
    tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
  return tomorrow.toISOString().slice(0, 10);
}
export function dateError(value: string, now = new Date()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return "Choose your preferred date.";
  const day = new Date(`${value}T12:00:00Z`);
  if (
    !Number.isFinite(day.getTime()) ||
    day.toISOString().slice(0, 10) !== value
  )
    return "Choose a valid date.";
  if (value < firstRequestDate(now))
    return "Please choose tomorrow or later in Abuja time.";
  if (day.getUTCDay() === 0)
    return "The studio is closed on Sundays. Please choose Monday–Saturday.";
  return "";
}
// Prototype display intervals only: not service durations or verified free slots.
export const timeOptions = Array.from(
  { length: 16 },
  (_, i) => `${10 + Math.floor(i / 2)}:${i % 2 ? "30" : "00"}`,
);
