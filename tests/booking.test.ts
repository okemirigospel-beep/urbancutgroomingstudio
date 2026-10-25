import assert from "node:assert/strict";
import test from "node:test";
import {
  categories,
  services,
  homeOffering,
  membership,
} from "../src/lib/catalogue.ts";
import {
  addService,
  quantityService,
  selection,
  preferredTimes,
  validateStudio,
  validateHome,
  studioMessage,
  homeMessage,
  whatsappUrl,
  type StudioRequest,
  type HomeRequest,
} from "../src/lib/booking.ts";
const now = new Date("2026-09-28T12:00:00Z");
const studio: StudioRequest = {
  name: "QA Test & Example",
  date: "2026-09-29",
  time: "10:00",
  notes: "Test only: A&B #?\nSecond line",
};
test("October catalogue preserves availability and approved prices/durations", () => {
  assert.equal(categories.length, 5);
  assert.ok(!categories.some((c) => c.id === "home"));
  assert.equal(services.length, 19);
  assert.equal(services.filter((s) => s.status === "bookable").length, 14);
  assert.ok(!services.some((s) => s.id === "express-cut"));
  assert.deepEqual(
    services.filter((s) => s.duration).map((s) => [s.id, s.duration]),
    [
      ["signature-cut", 45],
      ["signature-experience", 60],
    ],
  );
  for (const [id, price] of Object.entries({
    "signature-cut": 10000,
    "signature-experience": 25000,
    "sporting-waves": 25000,
    "sporting-waves-products": 50000,
    "black-dye": 3500,
    texturizer: 4000,
  }))
    assert.equal(services.find((s) => s.id === id)?.price, price);
  for (const id of ["massage", "facial"]) {
    const s = services.find((s) => s.id === id)!;
    assert.equal(s.price, undefined);
    assert.equal(s.status, "coming-soon");
    assert.deepEqual(addService({}, id), {});
  }
  for (const id of ["sporting-waves", "sporting-waves-products"])
    assert.equal(services.find((s) => s.id === id)?.duration, undefined);
  assert.equal(homeOffering.price, 100000);
  assert.equal(membership.registrationFee, 50000);
});
test("basket is idempotent and enforces availability even for tampered IDs", () => {
  let basket = addService({}, "signature-cut");
  basket = addService(basket, "signature-cut");
  assert.equal(basket["signature-cut"], 1);
  for (const id of [
    "manicure",
    "pedicure",
    "manicure-pedicure",
    "home",
    "membership",
    "made-up",
  ]) {
    assert.deepEqual(addService(basket, id), basket);
    assert.deepEqual(quantityService(basket, id, 1), basket);
  }
  basket = quantityService(addService(basket, "kids-cut"), "kids-cut", 2);
  assert.equal(
    selection(basket).reduce((sum, l) => sum + l.total, 0),
    20000,
  );
  assert.equal(
    selection({ ...basket, manicure: 1, home: 1, "premium-shave": -2 }).length,
    2,
  );
  assert.equal(selection(quantityService(basket, "kids-cut", 0)).length, 1);
});
test("known duration filters closing-time overruns without invented unknown durations", () => {
  assert.ok(
    preferredTimes({ "signature-cut": 1 }, studio.date).includes("20:00"),
  );
  assert.ok(
    preferredTimes({ "signature-experience": 1 }, studio.date).includes(
      "20:00",
    ),
  );
  assert.ok(preferredTimes({ "kids-cut": 1 }, studio.date).includes("20:00"));
  assert.ok(
    !preferredTimes({ "signature-cut": 2 }, studio.date).includes("20:00"),
  );
  assert.ok(
    preferredTimes({ "signature-cut": 2 }, studio.date).includes("19:00"),
  );
  assert.equal(preferredTimes({ "signature-cut": 17 }, studio.date).length, 0);
  assert.equal(preferredTimes({ "signature-cut": 11 }, "2026-10-04").length, 0);
  assert.ok(
    validateStudio({ ...studio, time: "20:00" }, { "signature-cut": 2 }, now)
      .time,
  );
});
test("studio validation rejects same-day, invalid dates, half hours, Sunday mornings and closing", () => {
  assert.deepEqual(
    Object.keys(
      validateStudio({ ...studio, name: "", date: "", time: "" }, {}, now),
    ),
    ["name", "basket", "date", "time"],
  );
  for (const date of ["2026-09-28", "2026-02-30"])
    assert.ok(validateStudio({ ...studio, date }, { "kids-cut": 1 }, now).date);
  for (const time of ["08:00", "09:30", "20:30", "21:00"])
    assert.ok(validateStudio({ ...studio, time }, { "kids-cut": 1 }, now).time);
  assert.ok(
    validateStudio(
      { ...studio, date: "2026-10-04", time: "12:00" },
      { "kids-cut": 1 },
      now,
    ).time,
  );
  assert.deepEqual(
    validateStudio(
      { ...studio, date: "2026-10-04", time: "13:00" },
      { "kids-cut": 1 },
      now,
    ),
    {},
  );
  assert.throws(() => studioMessage(studio, {}, now));
  assert.throws(() =>
    studioMessage({ ...studio, time: "21:00" }, { "kids-cut": 1 }, now),
  );
});
test("studio handoff preserves quantity, total, Unicode and reserved URL characters without an address", () => {
  const text = studioMessage(
    studio,
    { "signature-cut": 1, "kids-cut": 2 },
    now,
  );
  assert.match(text, /Kids Haircut × 2 — ₦10,000/);
  assert.match(text, /Listed total: ₦20,000/);
  assert.doesNotMatch(text, /Address|Region|Location/);
  const url = new URL(whatsappUrl(text));
  assert.equal(url.origin + url.pathname, "https://wa.me/2347063291013");
  assert.equal(url.searchParams.get("text"), text);
  assert.equal([...url.searchParams].length, 1);
  assert.doesNotMatch(
    studioMessage({ ...studio, notes: "   " }, { "kids-cut": 1 }, now),
    /Notes:/,
  );
});
test("Home Service validates separately and outside-Abuja requests never carry the Abuja charge", () => {
  const home: HomeRequest = {
    ...studio,
    region: "Abuja",
    address: "QA fictional venue — test only",
    destination: "",
  };
  assert.equal(Object.keys(validateHome(home, now)).length, 0);
  assert.match(homeMessage(home, now), /₦100,000/);
  const outside = {
    ...home,
    region: "Outside Abuja" as const,
    destination: "QA City, QA State, Test Country",
  };
  const text = homeMessage(outside, now);
  assert.match(text, /Price to be quoted/);
  assert.doesNotMatch(text, /100,000/);
  assert.match(text, /HOME SERVICE ENQUIRY/);
  assert.equal(new URL(whatsappUrl(text)).searchParams.get("text"), text);
  assert.ok(validateHome({ ...outside, destination: "" }, now).destination);
  assert.ok(validateHome({ ...home, address: "" }, now).address);
  assert.throws(() => homeMessage({ ...home, name: "" }, now));
});

test("home enquiries share the advance-day and hourly schedule including outside Abuja", () => {
  const home: HomeRequest = {
    ...studio,
    region: "Outside Abuja",
    destination: "Test city",
    address: "QA only",
  };
  for (const time of ["08:00", "10:30", "21:00"])
    assert.ok(validateHome({ ...home, time }, now).time);
  for (const date of ["", "2026-09-28", "2026-02-30"])
    assert.ok(validateHome({ ...home, date }, now).date);
  assert.ok(
    validateHome({ ...home, date: "2026-10-04", time: "09:00" }, now).time,
  );
  assert.deepEqual(
    validateHome({ ...home, date: "2026-10-04", time: "13:00" }, now),
    {},
  );
  assert.match(
    homeMessage({ ...home, date: "2026-10-04", time: "20:00" }, now),
    /20:00 \(Abuja time\)/,
  );
  assert.doesNotMatch(homeMessage(home, now), /at least one day ahead/);
  assert.throws(() => homeMessage({ ...home, time: "21:00" }, now));
  assert.throws(() => homeMessage({ ...home, date: "2026-09-28" }, now));
});
test("Coming Soon categories remain non-bookable even if their IDs are injected", () => {
  for (const id of ["wellness", "membership"])
    assert.equal(categories.find((c) => c.id === id)?.kind, "coming-soon");
  assert.throws(() =>
    studioMessage(studio, { manicure: 1, pedicure: 1, membership: 1 }, now),
  );
  assert.doesNotMatch(
    studioMessage(studio, { "kids-cut": 1, manicure: 1 }, now),
    /Manicure/,
  );
});

test("studio message matches the concise template and recalculates edited selections", () => {
  const draft = { ...studio, name: "  Ada  ", notes: "" };
  const message = studioMessage(
    draft,
    { "signature-cut": 1, "kids-cut": 2 },
    now,
  );
  assert.equal(
    message,
    [
      "Hello UrbanCut, I’d like to request a studio appointment.",
      "",
      "Name: Ada",
      "",
      "Services:",
      "• UrbanCut Signature Haircut × 1 — ₦10,000",
      "• Kids Haircut × 2 — ₦10,000",
      "",
      "Listed total: ₦20,000",
      "",
      "Preferred date: 2026-09-29",
      "Preferred time: 10:00 (Abuja time)",
    ].join("\n"),
  );
  const changed = studioMessage(
    { ...draft, name: "Bola", notes: "Please keep the length." },
    { "kids-cut": 3 },
    now,
  );
  assert.match(changed, /Name: Bola/);
  assert.match(changed, /Kids Haircut × 3 — ₦15,000\n\nListed total: ₦15,000/);
  assert.match(changed, /Notes: Please keep the length\./);
  assert.doesNotMatch(
    changed,
    /Signature Haircut|Amount due|one day ahead|confirmed|Notes: None/,
  );
  assert.equal(new URL(whatsappUrl(changed)).searchParams.get("text"), changed);
});
