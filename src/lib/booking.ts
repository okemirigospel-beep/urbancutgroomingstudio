import { services, money, homeOffering } from "./catalogue.ts";
import { dateError, timeOptions, firstRequestDate } from "./appointments.ts";
export const whatsappNumber = "2349163444436";
export const whatsappBase = `https://wa.me/${whatsappNumber}`;
export const whatsappUrl = (message: string) =>
  `${whatsappBase}?text=${encodeURIComponent(message)}`;
export type Basket = Record<string, number>;
export type StudioRequest = {
  name: string;
  date: string;
  time: string;
  notes: string;
};
export type HomeRequest = StudioRequest & {
  region: "Abuja" | "Outside Abuja";
  address: string;
  destination: string;
};
export type Errors = Record<string, string>;
export function selection(basket: Basket) {
  return services
    .filter(
      (s) =>
        s.status === "bookable" &&
        Number.isSafeInteger(basket[s.id]) &&
        basket[s.id] > 0,
    )
    .map((service) => ({
      service,
      quantity: basket[service.id],
      total: service.price * basket[service.id],
    }));
}
export function addService(basket: Basket, id: string): Basket {
  if (!services.some((s) => s.id === id && s.status === "bookable"))
    return basket;
  return { ...basket, [id]: basket[id] > 0 ? basket[id] : 1 };
}
export function quantityService(
  basket: Basket,
  id: string,
  quantity: number,
): Basket {
  if (
    !services.some((s) => s.id === id && s.status === "bookable") ||
    !Number.isSafeInteger(quantity) ||
    quantity < 0
  )
    return basket;
  return { ...basket, [id]: quantity };
}
export function preferredTimes(basket: Basket) {
  // Known work is a lower bound, not a promised combined appointment duration.
  const knownMinutes = selection(basket).reduce(
    (sum, line) => sum + (line.service.duration ?? 0) * line.quantity,
    0,
  );
  return timeOptions.filter((t) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m + knownMinutes <= 18 * 60;
  });
}
export function validateStudio(
  data: StudioRequest,
  basket: Basket,
  now = new Date(),
): Errors {
  const errors: Errors = {};
  if (!data.name.trim()) errors.name = "Enter your name.";
  if (!selection(basket).length)
    errors.basket = "Add at least one available studio service.";
  const dateIssue = dateError(data.date, now);
  if (dateIssue) errors.date = dateIssue;
  if (!preferredTimes(basket).includes(data.time))
    errors.time =
      "Choose a preferred start time that allows the selected timed services to finish by 6 p.m.";
  return errors;
}
export function validateHome(data: HomeRequest, now = new Date()): Errors {
  const errors: Errors = {};
  if (!data.name.trim()) errors.name = "Enter your name.";
  if (!["Abuja", "Outside Abuja"].includes(data.region))
    errors.region = "Choose your service region.";
  if (!data.address.trim())
    errors.address =
      data.region === "Abuja"
        ? "Enter the detailed service address in Abuja."
        : "Enter the destination address or venue details.";
  if (data.region === "Outside Abuja" && !data.destination.trim())
    errors.destination = "Enter the destination city, state and country.";
  // Home visits are by arrangement: no invented studio-hours rule for international visits.
  if (data.date) {
    const day = new Date(`${data.date}T12:00:00Z`);
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(data.date) ||
      !Number.isFinite(day.getTime()) ||
      day.toISOString().slice(0, 10) !== data.date
    )
      errors.date = "Choose a valid preferred date.";
    else if (data.date < firstRequestDate(now))
      errors.date = "Choose an advance date for your enquiry.";
  }
  if (data.time && !/^([01]\d|2[0-3]):[0-5]\d$/.test(data.time))
    errors.time = "Choose a valid preferred time.";
  return errors;
}
export function studioMessage(
  data: StudioRequest,
  basket: Basket,
  now = new Date(),
) {
  if (Object.keys(validateStudio(data, basket, now)).length)
    throw new Error("Review a valid studio request before continuing.");
  const lines = selection(basket);
  return [
    `URBANCUT — STUDIO APPOINTMENT REQUEST`,
    `Name: ${data.name.trim()}`,
    "Services:",
    ...lines.map(
      (l) => `- ${l.quantity} × ${l.service.name} — ${money(l.total)}`,
    ),
    `Listed estimate: ${money(lines.reduce((sum, l) => sum + l.total, 0))}`,
    `Preferred date: ${data.date}`,
    `Preferred time: ${data.time} (Abuja time)`,
    `Notes: ${data.notes.trim() || "None"}`,
    "Please confirm availability, final amount and appointment details.",
  ].join("\n");
}
export function homeMessage(data: HomeRequest, now = new Date()) {
  if (Object.keys(validateHome(data, now)).length)
    throw new Error("Review a valid home service enquiry before continuing.");
  return [
    "URBANCUT — HOME SERVICE ENQUIRY",
    `Name: ${data.name.trim()}`,
    `Package: ${homeOffering.package}`,
    `Region: ${data.region}`,
    ...(data.region === "Outside Abuja"
      ? [`Destination: ${data.destination.trim()}`, "Price to be quoted"]
      : [
          `Listed package price: ${money(homeOffering.price)}, subject to confirmed arrangements`,
        ]),
    `Address / venue: ${data.address.trim()}`,
    `Preferred date: ${data.date || "To be arranged"}`,
    `Preferred time: ${data.time || "To be arranged"}${data.region === "Abuja" ? " (Abuja time)" : " (destination local time; please confirm)"}`,
    `Notes: ${data.notes.trim() || "None"}`,
    "Please confirm treatments, visit arrangements, availability and final quote.",
  ].join("\n");
}
