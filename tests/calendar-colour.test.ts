import test from "node:test";
import assert from "node:assert/strict";
import { monthDays, shiftMonth, shiftDay } from "../src/lib/calendar.ts";
import { studioMessage, validateStudio } from "../src/lib/booking.ts";
import { hourlyTimes, changeRequestDate } from "../src/lib/appointments.ts";
test("calendar spans Monday-first six weeks and handles leap/month/year boundaries", () => {
  const days = monthDays("2026-11");
  assert.equal(days.length, 42);
  assert.equal(days[0], "2026-10-26");
  assert.equal(days[41], "2026-12-06");
  assert.equal(shiftMonth("2024-01-31", 1), "2024-02-29");
  assert.equal(shiftMonth("2026-01-31", 1), "2026-02-28");
  assert.equal(shiftDay("2026-12-31", 1), "2027-01-01");
});
test("calendar still uses hourly starts, Sunday opening, closing-duration checks and time revalidation", () => {
  assert.equal(hourlyTimes("2026-11-15")[0], "13:00");
  assert.equal(hourlyTimes("2026-11-14")[0], "09:00");
  assert.ok(!hourlyTimes("2026-11-14", 120).includes("20:00"));
  assert.equal(
    changeRequestDate(
      { date: "2026-11-14", time: "09:00" },
      "2026-11-15",
      hourlyTimes("2026-11-15"),
    ).time,
    "",
  );
});
test("Other Colours requires a preference and includes standard/custom colour in the prepared request without price changes", () => {
  const now = new Date("2026-11-13T12:00:00Z");
  const data = { name: "Test", date: "2026-11-14", time: "10:00", notes: "" };
  const basket = { "other-colours": 2 };
  assert.ok(validateStudio(data, basket, now).basket);
  assert.throws(() => studioMessage(data, basket, now));
  for (const colour of ["Green", " Burgundy "]) {
    const message = studioMessage(
      { ...data, preferredColour: colour },
      basket,
      now,
    );
    assert.ok(
      message.includes(
        `Other Colours — preferred colour: ${colour.trim()} × 2 — ₦50,000`,
      ),
    );
    assert.ok(message.includes("Listed total: ₦50,000"));
  }
  assert.ok(
    validateStudio({ ...data, preferredColour: "   " }, basket, now).basket,
  );
  assert.ok(
    !studioMessage(
      { ...data, preferredColour: "Green" },
      { "signature-cut": 1 },
      now,
    ).includes("preferred colour"),
  );
});
