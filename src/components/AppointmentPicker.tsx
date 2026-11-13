"use client";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { firstRequestDate, timeLabel, abujaDate } from "@/lib/appointments";
import {
  dayDate,
  longDate,
  monthDays,
  shiftDay,
  shiftMonth,
} from "@/lib/calendar";
export default function AppointmentPicker({
  prefix,
  date,
  time,
  times,
  dateError,
  timeError,
  onDate,
  onTime,
}: {
  prefix: string;
  date: string;
  time: string;
  times: string[];
  dateError?: string;
  timeError?: string;
  onDate: (date: string) => void;
  onTime: (time: string) => void;
}) {
  const minimum = firstRequestDate();
  const initial = date >= minimum ? date : minimum;
  const [month, setMonth] = useState(initial.slice(0, 7));
  const [focused, setFocused] = useState(initial);
  const [notice, setNotice] = useState("");
  const grid = useRef<HTMLDivElement>(null);
  const days = monthDays(month);
  const visibleFocus =
    focused >= minimum && focused.startsWith(month)
      ? focused
      : days.find((d) => d.startsWith(month) && d >= minimum);
  const moveFocus = (value: string) => {
    const next = value < minimum ? minimum : value;
    setFocused(next);
    setMonth(next.slice(0, 7));
    requestAnimationFrame(() =>
      grid.current
        ?.querySelector<HTMLButtonElement>(`[data-date="${next}"]`)
        ?.focus(),
    );
  };
  const choose = (value: string) => {
    setFocused(value);
    setMonth(value.slice(0, 7));
    if (time) setNotice("Date changed. Check your preferred start time.");
    onDate(value);
  };
  const monthTitle = new Intl.DateTimeFormat("en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(dayDate(month + "-01"));
  return (
    <div className="appointment-picker">
      <div className="appointment-controls">
        <section
          className="appointment-calendar"
          aria-label="Preferred date"
          id={`${prefix}-date`}
          tabIndex={-1}
          aria-invalid={!!dateError}
          aria-describedby={dateError ? `${prefix}-date-error` : undefined}
        >
          <div className="calendar-heading">
            <button
              type="button"
              aria-label="Previous month"
              disabled={month <= minimum.slice(0, 7)}
              onClick={() => {
                const next = shiftMonth(month + "-01", -1);
                setMonth(next.slice(0, 7));
              }}
            >
              <ChevronLeft aria-hidden="true" />
            </button>
            <h3 aria-live="polite">{monthTitle}</h3>
            <button
              type="button"
              aria-label="Next month"
              onClick={() => setMonth(shiftMonth(month + "-01", 1).slice(0, 7))}
            >
              <ChevronRight aria-hidden="true" />
            </button>
          </div>
          <div className="calendar-weekdays" aria-hidden="true">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
          <div
            className="calendar-days"
            ref={grid}
            role="group"
            aria-label={`${monthTitle} dates`}
          >
            {days.map((value) => (
              <button
                type="button"
                key={value}
                data-date={value}
                disabled={value < minimum}
                tabIndex={value === visibleFocus ? 0 : -1}
                className={`${value.startsWith(month) ? "" : "outside-month"} ${value === date ? "is-selected" : ""}`}
                aria-label={longDate(value)}
                aria-pressed={value === date}
                aria-current={value === abujaDate() ? "date" : undefined}
                onFocus={() => setFocused(value)}
                onClick={() => choose(value)}
                onKeyDown={(e) => {
                  let next: string | undefined;
                  const weekday = (dayDate(value).getUTCDay() + 6) % 7;
                  switch (e.key) {
                    case "ArrowLeft":
                      next = shiftDay(value, -1);
                      break;
                    case "ArrowRight":
                      next = shiftDay(value, 1);
                      break;
                    case "ArrowUp":
                      next = shiftDay(value, -7);
                      break;
                    case "ArrowDown":
                      next = shiftDay(value, 7);
                      break;
                    case "Home":
                      next = shiftDay(value, -weekday);
                      break;
                    case "End":
                      next = shiftDay(value, 6 - weekday);
                      break;
                    case "PageUp":
                      next = shiftMonth(value, e.shiftKey ? -12 : -1);
                      break;
                    case "PageDown":
                      next = shiftMonth(value, e.shiftKey ? 12 : 1);
                      break;
                  }
                  if (next) {
                    e.preventDefault();
                    moveFocus(next);
                  }
                }}
              >
                {Number(value.slice(-2))}
              </button>
            ))}
          </div>
          {dateError && (
            <p className="picker-error" id={`${prefix}-date-error`}>
              {dateError}
            </p>
          )}
        </section>
        <section
          className="appointment-times"
          id={`${prefix}-time`}
          tabIndex={-1}
          aria-label="Preferred start time"
          aria-invalid={!!timeError}
          aria-describedby={timeError ? `${prefix}-time-error` : undefined}
        >
          <h3>Preferred time</h3>
          <div className="time-options">
            {date ? (
              times.map((t) => (
                <button
                  type="button"
                  key={t}
                  className={t === time ? "is-selected" : ""}
                  aria-pressed={t === time}
                  onClick={() => {
                    onTime(t);
                    setNotice("");
                  }}
                >
                  {timeLabel(t)}
                </button>
              ))
            ) : (
              <p>Choose a date first.</p>
            )}
          </div>
          {date && !times.length && (
            <p>No eligible starts for this selection.</p>
          )}
          {timeError && (
            <p className="picker-error" id={`${prefix}-time-error`}>
              {timeError}
            </p>
          )}
        </section>
      </div>
      <p className="appointment-choice" role="status">
        {date
          ? `Preferred appointment: ${longDate(date)}${time && times.includes(time) ? `, ${timeLabel(time)}` : " — choose a time"}`
          : "Choose your preferred date and time."}
      </p>
      <span className="sr-only" role="status">
        {notice}
      </span>
    </div>
  );
}
