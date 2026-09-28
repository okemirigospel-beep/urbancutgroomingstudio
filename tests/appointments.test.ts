import assert from "node:assert/strict";
import test from "node:test";
import {
  abujaDate,
  dateError,
  firstRequestDate,
  hourlyTimes,
  changeRequestDate,
} from "../src/lib/appointments.ts";

test("Abuja day is used at the UTC day boundary", () => {
  const now = new Date("2026-09-22T23:30:00Z");
  assert.equal(abujaDate(now), "2026-09-23");
  assert.equal(firstRequestDate(now), "2026-09-24");
  assert.ok(dateError("2026-09-23", now));
  assert.equal(dateError("2026-09-24", now), "");
});
test("Sunday is open and an eligible advance-request day", () => {
  const saturday = new Date("2026-09-26T09:00:00Z");
  assert.equal(firstRequestDate(saturday), "2026-09-27");
  assert.equal(dateError("2026-09-27", saturday), "");
  assert.equal(dateError("2026-10-04", saturday), "");
});
test("invalid dates and past dates cannot become requests", () => {
  const now = new Date("2026-09-22T12:00:00Z");
  for (const date of ["", "2026-02-30", "2026-13-01", "2026-09-21", "tomorrow"])
    assert.ok(dateError(date, now));
});
test("hourly starts follow the date and exclude closing time", () => {
  const weekdays = [
    "2026-09-28",
    "2026-09-29",
    "2026-09-30",
    "2026-10-01",
    "2026-10-02",
    "2026-10-03",
  ];
  for (const date of weekdays) {
    const options = hourlyTimes(date);
    assert.equal(options[0], "09:00");
    assert.equal(options.at(-1), "20:00");
    assert.equal(options.length, 12);
    assert.ok(options.every((t) => t.endsWith(":00")));
  }
  assert.deepEqual(hourlyTimes("2026-10-04"), [
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ]);
  for (const date of ["", "bad", "2026-02-30"])
    assert.deepEqual(hourlyTimes(date), []);
});
test("changing a date clears an ineligible start and preserves a valid one", () => {
  const data = { name: "QA", date: "2026-10-03", time: "09:00" };
  const sunday = "2026-10-04";
  assert.equal(changeRequestDate(data, sunday, hourlyTimes(sunday)).time, "");
  assert.equal(
    changeRequestDate({ ...data, time: "14:00" }, sunday, hourlyTimes(sunday))
      .time,
    "14:00",
  );
  assert.equal(changeRequestDate(data, "", []).time, "");
});
