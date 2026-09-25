"use client";
import { useRef, useState } from "react";
import { Check, Minus, Plus, ShoppingBag, X } from "lucide-react";
import { categories, money, services, type Category } from "@/lib/content";
import { dateError, firstRequestDate, timeOptions } from "@/lib/appointments";

export default function Services() {
  const [category, setCategory] = useState<Category>("Barbering");
  const [basket, setBasket] = useState<Record<string, number>>({});
  const [error, setError] = useState("");
  const [summary, setSummary] = useState("");
  const [mode, setMode] = useState("studio");
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const selected = services.filter((s) => basket[s.id] > 0);
  const count = selected.reduce((sum, s) => sum + basket[s.id], 0);
  const total = selected.reduce((sum, s) => sum + basket[s.id] * s.price, 0);
  const homeSelected = (basket["home-grooming"] || 0) > 0;
  function adjust(id: string, delta: number) {
    setBasket((prev) => ({
      ...prev,
      [id]: Math.min(20, Math.max(0, (prev[id] || 0) + delta)),
    }));
    setSummary("");
  }
  function close() {
    dialog.current?.close();
    trigger.current?.focus();
  }
  function preview(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const date = String(data.get("date") || "");
    const time = String(data.get("time") || "");
    const issue =
      dateError(date) ||
      (!timeOptions.includes(time)
        ? "Choose a preferred time within the listed hours."
        : "") ||
      (!count ? "Add at least one service." : "") ||
      (!String(data.get("name")).trim() || !String(data.get("location")).trim()
        ? "Enter a name and Abuja area for this sample."
        : "");
    if (issue) {
      setError(issue);
      return;
    }
    setError("");
    setSummary(
      `SAMPLE REQUEST — NOT SENT OR SAVED\n\nHello URBANCUT, my name is ${String(data.get("name")).trim()}.\nI would like to request:\n${selected.map((s) => `${basket[s.id]} × ${s.name} — sample ${money(s.price * basket[s.id])}`).join("\n")}\nSample estimate: ${money(total)} (not a payable total)\nService mode: ${mode === "home" ? "Home visit enquiry" : "Studio visit"}\nAbuja area: ${String(data.get("location")).trim()}\nPreferred date: ${date}\nPreferred time: ${time} (Abuja time)\nNotes: ${String(data.get("notes") || "").trim() || "None"}\n\nPlease confirm availability, final prices and service arrangements.`,
    );
  }
  return (
    <section id="services" className="section services-section">
      <div className="section-top">
        <div>
          <p className="eyebrow">01 / FIND YOUR FINISH</p>
          <h2>
            Your style.
            <br />
            <em>Your kind of care.</em>
          </h2>
        </div>
        <p className="section-intro">
          A fresh cut, a new pattern, a little maintenance. Start with what
          feels like you.
        </p>
      </div>
      <div className="service-toolbar">
        <div
          className="category-list"
          role="group"
          aria-label="Service categories"
        >
          {categories.map((c) => (
            <button
              key={c}
              aria-pressed={category === c}
              className={category === c ? "category active" : "category"}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <span className="sample-label">All prices are samples</span>
      </div>
      <div className="service-list">
        {services
          .filter((s) => s.category === category)
          .map((s, i) => (
            <article className="service-row" key={s.id}>
              <span className="service-number" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="service-copy">
                <h3>{s.name}</h3>
                <p>{s.description}</p>
                <details className="service-detail">
                  <summary>Service details</summary>
                  <p>{s.detail} Duration: to be confirmed.</p>
                </details>
              </div>
              <div className="service-price">
                <span>Sample price</span>
                <strong>{money(s.price)}</strong>
              </div>
              <button
                className={
                  basket[s.id] ? "add-service selected" : "add-service"
                }
                onClick={() => adjust(s.id, 1)}
                aria-label={`Add ${s.name}`}
                disabled={(basket[s.id] || 0) >= 20}
              >
                {basket[s.id] ? <Check size={19} /> : <Plus size={19} />}
                <span>{basket[s.id] ? `Added (${basket[s.id]})` : "Add"}</span>
              </button>
            </article>
          ))}
      </div>
      <div className="service-bottom">
        <p>
          <span className="status-dot" /> Coming later: manicure, pedicure,
          massage & spa.
          <br />
          <span className="muted">Facials: availability to be confirmed.</span>
        </p>
        <div className="selection-area">
          <span aria-live="polite">
            {count
              ? `${count} service${count === 1 ? "" : "s"} selected · Sample ${money(total)}`
              : "Planning for you and someone else? Add both."}
          </span>
          <button
            ref={trigger}
            className="button"
            disabled={!count}
            onClick={() => {
              setSummary("");
              setError("");
              setMode(homeSelected ? "home" : "studio");
              dialog.current?.showModal();
            }}
          >
            <ShoppingBag size={17} /> Review selection{" "}
            {count > 0 && <span className="count">{count}</span>}
          </button>
        </div>
      </div>
      <p className="prototype-note">
        Local preview: selections are temporary. Nothing is saved, sent or
        booked.
      </p>
      <dialog
        ref={dialog}
        className="request-dialog"
        aria-labelledby="request-title"
        onCancel={() => trigger.current?.focus()}
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
      >
        <div className="dialog-inner">
          <button
            className="icon-button dialog-close"
            onClick={close}
            aria-label="Close request preview"
          >
            <X />
          </button>
          <p className="eyebrow">YOUR NEXT VISIT / LOCAL PREVIEW</p>
          <h2 id="request-title">
            Make it <em>your own.</em>
          </h2>
          <p>
            Prepare a sample request. Your preferred time needs studio
            confirmation. Use sample details; nothing leaves this page.
          </p>
          <div className="basket-list">
            {selected.map((s) => (
              <div className="basket-row" key={s.id}>
                <div>
                  <strong>{s.name}</strong>
                  <small>Sample {money(s.price * basket[s.id])}</small>
                </div>
                <div className="quantity">
                  <button
                    aria-label={`Decrease ${s.name} quantity`}
                    onClick={() => adjust(s.id, -1)}
                  >
                    <Minus size={16} />
                  </button>
                  <span aria-label={`${s.name} quantity`}>{basket[s.id]}</span>
                  <button
                    aria-label={`Increase ${s.name} quantity`}
                    disabled={basket[s.id] >= 20}
                    onClick={() => adjust(s.id, 1)}
                  >
                    <Plus size={16} />
                  </button>
                  <button
                    aria-label={`Remove ${s.name}`}
                    onClick={() => {
                      setBasket((prev) => ({ ...prev, [s.id]: 0 }));
                      setSummary("");
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <p className="estimate">
            Sample estimate <strong>{money(total)}</strong>
          </p>
          <form onSubmit={preview} onChange={() => setSummary("")}>
            <div className="form-grid">
              <label>
                Your name (sample)
                <input
                  name="name"
                  placeholder="e.g. Alex"
                  required
                  maxLength={80}
                  autoComplete="off"
                />
              </label>
              <label>
                Service location
                <select
                  name="mode"
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  disabled={homeSelected}
                >
                  <option value="studio">At the studio</option>
                  <option value="home">Home visit in Abuja</option>
                </select>
              </label>
              <label className="full">
                Abuja area (sample)
                <input
                  name="location"
                  placeholder="Area only — no full address needed for this preview"
                  required
                  maxLength={120}
                  autoComplete="off"
                />
              </label>
              <label>
                Preferred date
                <input
                  name="date"
                  type="date"
                  min={firstRequestDate()}
                  required
                />
              </label>
              <label>
                Preferred time
                <select name="time" required defaultValue="">
                  <option value="" disabled>
                    Choose a time
                  </option>
                  {timeOptions.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </label>
              <label className="full">
                Anything we should know? (optional)
                <textarea
                  name="notes"
                  rows={3}
                  maxLength={600}
                  placeholder="Use sample instructions for this preview."
                />
              </label>
            </div>
            <p className="field-help">
              Abuja time · Monday–Saturday, 10 a.m.–6 p.m. Book at least the day
              before. Listed half-hour intervals are prototype choices, not live
              availability. Latest start times and service durations are
              unconfirmed.
            </p>
            {homeSelected && (
              <p className="field-help">
                A home grooming enquiry is selected, so the location is set to a
                home visit. Scope and travel fees need confirmation.
              </p>
            )}
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <button type="submit" className="button gold" disabled={!count}>
              Preview sample request
            </button>
          </form>
          {summary && (
            <section className="request-summary" aria-live="polite">
              <h3>Sample request — not sent</h3>
              <pre>{summary}</pre>
              <p>WhatsApp and booking storage are not connected.</p>
            </section>
          )}
        </div>
      </dialog>
    </section>
  );
}
