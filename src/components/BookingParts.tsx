"use client";
import { useState, type ReactNode } from "react";
import { money } from "@/lib/catalogue";
import {
  selection,
  preferredTimes,
  type Basket,
  type Errors,
  type StudioRequest,
  type HomeRequest,
} from "@/lib/booking";
import {
  firstRequestDate,
  hourlyTimes,
  timeLabel,
  changeRequestDate,
  advanceNotice,
} from "@/lib/appointments";
import { ShoppingCart } from "lucide-react";
import OpeningHours from "./OpeningHours";

export function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="uc-field">
      <label htmlFor={id}>{label}</label>
      {children}
      {error && (
        <p id={`${id}-error`} className="uc-error">
          {error}
        </p>
      )}
    </div>
  );
}
export function inputError(id: string, error?: string) {
  return {
    "aria-invalid": !!error,
    "aria-describedby": error ? `${id}-error` : undefined,
  };
}

export function SelectionSummary({
  basket,
  adjust,
  onContinue,
  canContinue = true,
  error,
}: {
  basket: Basket;
  adjust: (id: string, qty: number) => void;
  onContinue: () => void;
  canContinue?: boolean;
  error?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const lines = selection(basket);
  const count = lines.reduce((sum, l) => sum + l.quantity, 0);
  const total = lines.reduce((sum, l) => sum + l.total, 0);
  return (
    <aside
      className={`uc-selection ${expanded ? "is-expanded" : ""}`}
      aria-label="Studio selection"
      id="uc-basket"
      tabIndex={-1}
    >
      <button
        className="uc-summary-toggle"
        aria-expanded={expanded}
        aria-controls="uc-summary-content"
        onClick={() => setExpanded(!expanded)}
      >
        <span>
          Your selection · {count}
          <strong>{money(total)}</strong>
        </span>
        <span>{expanded ? "Hide" : "Review"}</span>
      </button>
      <div id="uc-summary-content" className="uc-summary-content">
        <h3>Your studio selection</h3>
        {!lines.length && (
          <p className="uc-muted">
            Add a service to start your appointment request.
          </p>
        )}
        {lines.map(({ service, quantity, total: lineTotal }) => (
          <div className="uc-selection-line" key={service.id}>
            <h4>{service.name}</h4>
            <p>
              {money(service.price)} each <strong>{money(lineTotal)}</strong>
            </p>
            <div className="uc-quantity">
              <button
                aria-label={`Decrease ${service.name} quantity`}
                onClick={() => adjust(service.id, quantity - 1)}
              >
                −
              </button>
              <output aria-label={`${service.name} quantity`}>
                {quantity}
              </output>
              <button
                aria-label={`Increase ${service.name} quantity`}
                onClick={() => adjust(service.id, quantity + 1)}
              >
                +
              </button>
              <button
                className="uc-remove"
                onClick={() => adjust(service.id, 0)}
                aria-label={`Remove ${service.name}`}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <p className="uc-total">
          Listed estimate <strong>{money(total)}</strong>
        </p>
        <p className="uc-fine">
          Studio visit in Abuja. Availability and final amount are confirmed by
          the studio.
        </p>
        {error && (
          <p className="uc-error" role="alert">
            {error}
          </p>
        )}
        {canContinue && (
          <button
            className="uc-primary"
            disabled={!lines.length}
            onClick={onContinue}
          >
            <ShoppingCart size={19} aria-hidden="true" /> CONTINUE TO BOOKING
          </button>
        )}
      </div>
      {canContinue && !expanded && (
        <button
          className="uc-primary uc-mobile-continue"
          disabled={!lines.length}
          onClick={onContinue}
        >
          <ShoppingCart size={19} aria-hidden="true" /> CONTINUE TO BOOKING
        </button>
      )}
    </aside>
  );
}

export function StudioForm({
  data,
  update,
  basket,
  errors,
  submit,
}: {
  data: StudioRequest;
  update: (data: StudioRequest) => void;
  basket: Basket;
  errors: Errors;
  submit: (event: React.FormEvent<HTMLFormElement>) => void;
}) {
  const times = preferredTimes(basket, data.date);
  const set = (key: keyof StudioRequest, value: string) =>
    update({ ...data, [key]: value });
  return (
    <form className="uc-form" noValidate onSubmit={submit}>
      <p>
        Plan your visit to our Abuja studio. Choose a preference; these times
        are not live availability.
      </p>
      <Field label="Your name (required)" id="studio-name" error={errors.name}>
        <input
          id="studio-name"
          autoComplete="name"
          required
          value={data.name}
          onChange={(e) => set("name", e.target.value)}
          {...inputError("studio-name", errors.name)}
        />
      </Field>
      <RequestSchedule
        prefix="studio"
        data={data}
        errors={errors}
        times={times}
        updateDate={(date) =>
          update(changeRequestDate(data, date, preferredTimes(basket, date)))
        }
        updateTime={(time) => set("time", time)}
      />
      <p className="uc-fine">
        Where a selected service has no listed duration, the studio will confirm
        the final arrangement.
      </p>
      {data.date && !times.length && (
        <p className="uc-error">
          No eligible starts for this date and selection. Choose another day,
          adjust quantities or contact the studio to arrange separate visits.
        </p>
      )}
      <Field label="Additional notes (optional)" id="studio-notes">
        <textarea
          id="studio-notes"
          rows={3}
          value={data.notes}
          onChange={(e) => set("notes", e.target.value)}
        />
      </Field>
      {errors.basket && (
        <p className="uc-error" role="alert">
          {errors.basket}
        </p>
      )}
      <button className="uc-primary" type="submit">
        Review Studio Request
      </button>
      <p className="uc-fine">
        Your details stay in this page during your visit. Nothing is submitted
        by this form.
      </p>
    </form>
  );
}

export function HomeForm({
  data,
  update,
  errors,
  submit,
}: {
  data: HomeRequest;
  update: (data: HomeRequest) => void;
  errors: Errors;
  submit: (event: React.FormEvent<HTMLFormElement>) => void;
}) {
  const set = (key: keyof HomeRequest, value: string) =>
    update({ ...data, [key]: value });
  return (
    <form className="uc-form" noValidate onSubmit={submit}>
      <p>
        One-person premium grooming package. Treatments and travel arrangements
        are confirmed during enquiry.
      </p>
      <Field label="Your name (required)" id="home-name" error={errors.name}>
        <input
          id="home-name"
          required
          autoComplete="name"
          value={data.name}
          onChange={(e) => set("name", e.target.value)}
          {...inputError("home-name", errors.name)}
        />
      </Field>
      <Field label="Service region" id="home-region" error={errors.region}>
        <select
          id="home-region"
          value={data.region}
          onChange={(e) => set("region", e.target.value)}
          {...inputError("home-region", errors.region)}
        >
          <option>Abuja</option>
          <option>Outside Abuja</option>
        </select>
      </Field>
      <p className="uc-callout">
        {data.region === "Abuja"
          ? "₦100,000 listed package price, subject to confirmed arrangements."
          : "Price to be quoted. Requests elsewhere in Nigeria or abroad are considered by arrangement."}
      </p>
      {data.region === "Outside Abuja" && (
        <Field
          label="Destination city, state and country (required)"
          id="home-destination"
          error={errors.destination}
        >
          <input
            id="home-destination"
            required
            value={data.destination}
            onChange={(e) => set("destination", e.target.value)}
            {...inputError("home-destination", errors.destination)}
          />
        </Field>
      )}
      <Field
        label={
          data.region === "Abuja"
            ? "Detailed service address in Abuja (required)"
            : "Destination address or venue details (required)"
        }
        id="home-address"
        error={errors.address}
      >
        <textarea
          id="home-address"
          required
          rows={3}
          value={data.address}
          onChange={(e) => set("address", e.target.value)}
          {...inputError("home-address", errors.address)}
        />
      </Field>
      <RequestSchedule
        prefix="home"
        data={data}
        errors={errors}
        times={hourlyTimes(data.date)}
        updateDate={(date) =>
          update(changeRequestDate(data, date, hourlyTimes(date)))
        }
        updateTime={(time) => set("time", time)}
      />
      <p className="uc-fine">
        All preferred times use Abuja time, including outside-Abuja enquiries.
        Travel, treatment duration and final arrangements require confirmation.
      </p>
      <Field label="Requirements or notes (optional)" id="home-notes">
        <textarea
          id="home-notes"
          rows={3}
          value={data.notes}
          onChange={(e) => set("notes", e.target.value)}
        />
      </Field>
      <button type="submit" className="uc-primary">
        Review Home Service Enquiry
      </button>
    </form>
  );
}

function RequestSchedule({
  prefix,
  data,
  errors,
  times,
  updateDate,
  updateTime,
}: {
  prefix: string;
  data: StudioRequest;
  errors: Errors;
  times: string[];
  updateDate: (date: string) => void;
  updateTime: (time: string) => void;
}) {
  const [timeNotice, setTimeNotice] = useState("");
  return (
    <>
      <div className="uc-form-row">
        <Field
          label="Preferred date (required)"
          id={`${prefix}-date`}
          error={errors.date}
        >
          <input
            id={`${prefix}-date`}
            type="date"
            required
            min={firstRequestDate()}
            value={data.date}
            onChange={(e) => {
              if (data.time)
                setTimeNotice(
                  "Date changed. Check your preferred start; if cleared, please choose another time.",
                );
              updateDate(e.target.value);
            }}
            {...inputError(`${prefix}-date`, errors.date)}
          />
        </Field>
        <Field
          label="Preferred start time (required)"
          id={`${prefix}-time`}
          error={errors.time}
        >
          <select
            id={`${prefix}-time`}
            required
            disabled={!data.date}
            value={data.time}
            onChange={(e) => {
              updateTime(e.target.value);
              setTimeNotice("");
            }}
            {...inputError(`${prefix}-time`, errors.time)}
          >
            <option value="">
              {data.date ? "Choose a time" : "Choose a date first"}
            </option>
            {times.map((t) => (
              <option key={t} value={t}>
                {timeLabel(t)} · Abuja time
              </option>
            ))}
          </select>
        </Field>
      </div>
      <p className="uc-fine" role="status">
        {timeNotice}
      </p>
      <div className="uc-schedule-help">
        <OpeningHours />
        <p>
          {advanceNotice} These are preferred starts, subject to confirmation,
          not live availability.
        </p>
      </div>
    </>
  );
}
