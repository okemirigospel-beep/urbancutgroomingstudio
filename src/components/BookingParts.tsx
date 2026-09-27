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
import { firstRequestDate } from "@/lib/appointments";

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
            Continue to Booking
          </button>
        )}
      </div>
      {canContinue && !expanded && (
        <button
          className="uc-primary uc-mobile-continue"
          disabled={!lines.length}
          onClick={onContinue}
        >
          Continue to Booking
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
  const times = preferredTimes(basket);
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
      <div className="uc-form-row">
        <Field
          label="Preferred date (required)"
          id="studio-date"
          error={errors.date}
        >
          <input
            type="date"
            id="studio-date"
            required
            min={firstRequestDate()}
            value={data.date}
            onChange={(e) => set("date", e.target.value)}
            {...inputError("studio-date", errors.date)}
          />
        </Field>
        <Field
          label="Preferred start time (required)"
          id="studio-time"
          error={errors.time}
        >
          <select
            id="studio-time"
            required
            value={data.time}
            onChange={(e) => set("time", e.target.value)}
            {...inputError("studio-time", errors.time)}
          >
            <option value="">Choose a time</option>
            {times.map((t) => (
              <option key={t} value={t}>
                {t} · Abuja time
              </option>
            ))}
          </select>
        </Field>
      </div>
      <p className="uc-fine">
        Monday–Saturday, 10 a.m.–6 p.m. Request at least the day before. Where a
        selected service has no listed duration, the studio will confirm a
        suitable start time.
      </p>
      {!times.length && (
        <p className="uc-error">
          The selected timed services exceed one day’s opening hours. Adjust
          quantities or contact the studio to arrange separate visits.
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
      <div className="uc-form-row">
        <Field
          label="Preferred date (optional)"
          id="home-date"
          error={errors.date}
        >
          <input
            id="home-date"
            type="date"
            min={firstRequestDate()}
            value={data.date}
            onChange={(e) => set("date", e.target.value)}
            {...inputError("home-date", errors.date)}
          />
        </Field>
        <Field
          label={`Preferred time (${data.region === "Abuja" ? "Abuja" : "destination local"} time, optional)`}
          id="home-time"
          error={errors.time}
        >
          <input
            id="home-time"
            type="time"
            value={data.time}
            onChange={(e) => set("time", e.target.value)}
            {...inputError("home-time", errors.time)}
          />
        </Field>
      </div>
      <p className="uc-fine">
        Date and time are preferences, subject to confirmation.
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
