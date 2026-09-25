import assert from "node:assert/strict";
import test from "node:test";
import {
  abujaDate,
  dateError,
  firstRequestDate,
  timeOptions,
} from "../src/lib/appointments.ts";

test("Abuja day is used at the UTC day boundary", () => {
  const now = new Date("2026-09-22T23:30:00Z");
  assert.equal(abujaDate(now), "2026-09-23");
  assert.equal(firstRequestDate(now), "2026-09-24");
  assert.ok(dateError("2026-09-23", now));
  assert.equal(dateError("2026-09-24", now), "");
});
test("Saturday skips closed Sunday and Sunday rejects explicitly", () => {
  const saturday = new Date("2026-09-26T09:00:00Z");
  assert.equal(firstRequestDate(saturday), "2026-09-28");
  assert.ok(dateError("2026-09-27", saturday));
  assert.match(dateError("2026-10-04", saturday), /Sunday/);
});
test("invalid dates and past dates cannot become requests", () => {
  const now = new Date("2026-09-22T12:00:00Z");
  for (const date of ["", "2026-02-30", "2026-13-01", "2026-09-21", "tomorrow"])
    assert.ok(dateError(date, now));
});
test("prototype time options stay within opening hours", () => {
  assert.equal(timeOptions[0], "10:00");
  assert.equal(timeOptions.at(-1), "17:30");
  assert.equal(timeOptions.length, 16);
});
