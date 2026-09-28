"use client";
import Image from "next/image";
import { Tag, Timer, ShoppingCart, MessageCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  categories,
  services,
  money,
  homeOffering,
  membership,
  type CategoryId,
  type Service,
  type Category,
} from "@/lib/catalogue";
import {
  addService,
  quantityService,
  selection,
  validateStudio,
  validateHome,
  studioMessage,
  homeMessage,
  whatsappUrl,
  type Basket,
  type StudioRequest,
  type HomeRequest,
  type Errors,
} from "@/lib/booking";
import { SelectionSummary, StudioForm, HomeForm } from "./BookingParts";

type View =
  | { kind: "list"; category: CategoryId }
  | { kind: "detail"; id: string }
  | {
      kind:
        | "studio"
        | "studio-review"
        | "home"
        | "home-form"
        | "home-review"
        | "membership";
    };
const emptyRequest: StudioRequest = { name: "", date: "", time: "", notes: "" };

function AddAction({
  service,
  basket,
  add,
}: {
  service: Service;
  basket: Basket;
  add: (id: string) => void;
}) {
  return service.status === "coming-soon" ? (
    <span className="uc-status">Coming Soon</span>
  ) : (
    <button
      className={`uc-add ${basket[service.id] ? "is-added" : ""}`}
      aria-label={`${basket[service.id] ? "Added" : "Add to Booking"}: ${service.name}`}
      aria-pressed={!!basket[service.id]}
      onClick={() => add(service.id)}
    >
      {basket[service.id] ? "Added" : "Add to Booking"}
    </button>
  );
}
function Price({ service }: { service: Service }) {
  return (
    <p className="uc-service-meta">
      {service.status === "coming-soon" && <span>Planned price </span>}
      <span className="uc-meta-item">
        <Tag aria-hidden="true" />
        <strong>{money(service.price)}</strong>
      </span>
      {service.duration && (
        <span className="uc-meta-item">
          <Timer aria-hidden="true" />
          {service.duration} minutes
        </span>
      )}
    </p>
  );
}
export default function Services() {
  const [view, setView] = useState<View | null>(null);
  const [basket, setBasket] = useState<Basket>({});
  const [studio, setStudio] = useState<StudioRequest>(emptyRequest);
  const [home, setHome] = useState<HomeRequest>({
    ...emptyRequest,
    region: "Abuja",
    address: "",
    destination: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [announcement, setAnnouncement] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const scroll = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const listScroll = useRef<Record<string, number>>({});
  const lastCategory = useRef<CategoryId>("haircuts");
  const isOpen = !!view;
  const currentService =
    view?.kind === "detail"
      ? services.find((s) => s.id === view.id)
      : undefined;
  const categoryId =
    view?.kind === "list" ? view.category : currentService?.category;
  const currentCategory = categories.find((c) => c.id === categoryId);
  const isStudio =
    view?.kind === "studio" ||
    (view?.kind === "list" && currentCategory?.kind === "studio") ||
    (view?.kind === "detail" && currentService?.status === "bookable");
  const lines = selection(basket);
  const count = lines.reduce((s, l) => s + l.quantity, 0);

  useEffect(() => {
    const node = dialog.current;
    if (!isOpen || !node) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    node.showModal();
    return () => {
      node.close();
      document.body.style.overflow = oldOverflow;
      trigger.current?.focus({ preventScroll: true });
    };
  }, [isOpen]);
  useEffect(() => {
    if (!view) return;
    const frame = requestAnimationFrame(() => {
      heading.current?.focus({ preventScroll: true });
      if (scroll.current)
        scroll.current.scrollTop =
          view.kind === "list" ? (listScroll.current[view.category] ?? 0) : 0;
    });
    return () => cancelAnimationFrame(frame);
  }, [view]);
  function go(next: View) {
    if (view?.kind === "list") {
      listScroll.current[view.category] = scroll.current?.scrollTop ?? 0;
      lastCategory.current = view.category;
    }
    setErrors({});
    setView(next);
  }
  function open(
    category: Category,
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    trigger.current = event.currentTarget;
    if (category.kind === "studio" || category.id === "wellness") {
      lastCategory.current = category.id as CategoryId;
      go({ kind: "list", category: category.id as CategoryId });
    } else go({ kind: category.id === "home" ? "home" : "membership" });
  }
  function add(id: string) {
    setBasket((prev) => addService(prev, id));
    setAnnouncement(
      `${services.find((s) => s.id === id)?.name} added. Adjust quantities in your selection.`,
    );
  }
  function adjust(id: string, quantity: number) {
    setBasket((prev) => quantityService(prev, id, quantity));
  }
  function focusErrors(next: Errors, prefix: string) {
    setErrors(next);
    requestAnimationFrame(() => {
      const key = Object.keys(next)[0];
      document
        .getElementById(key === "basket" ? "uc-basket" : `${prefix}-${key}`)
        ?.focus();
    });
  }
  function submitStudio(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validateStudio(studio, basket);
    if (Object.keys(next).length) {
      focusErrors(next, "studio");
      return;
    }
    go({ kind: "studio-review" });
  }
  function submitHome(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validateHome(home);
    if (Object.keys(next).length) {
      focusErrors(next, "home");
      return;
    }
    go({ kind: "home-review" });
  }
  function back() {
    if (view?.kind === "detail" && currentService)
      go({ kind: "list", category: currentService.category });
    else if (view?.kind === "studio")
      go({ kind: "list", category: lastCategory.current });
    else if (view?.kind === "studio-review") go({ kind: "studio" });
    else if (view?.kind === "home-form") go({ kind: "home" });
    else if (view?.kind === "home-review") go({ kind: "home-form" });
  }
  const title =
    currentService?.name ??
    currentCategory?.name ??
    (view?.kind === "studio"
      ? "Studio appointment request"
      : view?.kind === "studio-review"
        ? "Review your studio request"
        : view?.kind === "home-form"
          ? "Home Service enquiry"
          : view?.kind === "home-review"
            ? "Review your Home Service enquiry"
            : view?.kind === "membership"
              ? "UrbanCut Black Card"
              : "Premium Grooming at Your Location");
  // Derive the review and handoff together from current entries, never a saved snapshot.
  const requestNow = new Date();
  const message =
    view?.kind === "studio-review" &&
    !Object.keys(validateStudio(studio, basket, requestNow)).length
      ? studioMessage(studio, basket, requestNow)
      : view?.kind === "home-review" &&
          !Object.keys(validateHome(home, requestNow)).length
        ? homeMessage(home, requestNow)
        : "";
  const hasBack =
    view &&
    ["detail", "studio", "studio-review", "home-form", "home-review"].includes(
      view.kind,
    );
  return (
    <section
      id="services"
      className="section uc-services"
      aria-labelledby="services-heading"
    >
      <div className="uc-section-heading">
        <div>
          <h2 id="services-heading" className="type-editorial">
            Our Services
          </h2>
        </div>
        <div className="uc-section-intro">
          <p className="uc-intro-lead">
            Precision in every detail. Confidence in every finish.
          </p>
          <p>
            Explore cuts, grooming and care shaped around the way you want to
            look and feel.
          </p>
        </div>
      </div>
      <div className="uc-category-grid">
        {categories.map((category) => (
          <button
            key={category.id}
            className="uc-category-card"
            onClick={(event) => open(category, event)}
            aria-haspopup="dialog"
            aria-label={`${category.name} — ${category.kind === "studio" ? "View All Services" : category.kind === "coming-soon" ? "Coming Soon — View Preview" : "View Details"}`}
          >
            <div className="uc-card-image">
              <Image
                src={`/media/services/${category.image}.webp`}
                alt=""
                width={800}
                height={1000}
                sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 33vw"
              />
              {category.kind === "coming-soon" && (
                <span className="uc-status uc-card-status">COMING SOON</span>
              )}
            </div>
            <div className="uc-card-copy">
              <h3>{category.name}</h3>
              <p>{category.caption}</p>
              <span className="uc-card-action">
                {category.kind === "studio"
                  ? "View All Services"
                  : category.kind === "coming-soon"
                    ? "View Preview"
                    : "View Details"}
              </span>
            </div>
          </button>
        ))}
      </div>
      <div className="uc-section-foot">
        {count > 0 && (
          <button
            className="uc-primary"
            onClick={(event) => {
              trigger.current = event.currentTarget;
              go({ kind: "studio" });
            }}
          >
            <ShoppingCart size={19} aria-hidden="true" /> CONTINUE TO BOOKING
          </button>
        )}
      </div>
      <dialog
        ref={dialog}
        className="uc-dialog"
        aria-labelledby="uc-dialog-title"
        onClose={(event) => {
          if (!event.currentTarget.open) setView(null);
        }}
        onCancel={(event) => {
          event.preventDefault();
          setView(null);
        }}
      >
        {view && (
          <div className="uc-dialog-shell">
            <p className="sr-only" role="status">
              {announcement}
            </p>
            <header className="uc-dialog-header">
              <div className="uc-dialog-nav">
                {hasBack && (
                  <button onClick={back}>
                    {view.kind === "detail"
                      ? `Back to ${currentCategory?.name}`
                      : "Back"}
                  </button>
                )}
                <button
                  className="uc-close"
                  onClick={() => setView(null)}
                  aria-label="Close services dialog"
                >
                  Close
                </button>
              </div>
              <div className="uc-panel-identity">
                <div className="uc-panel-title">
                  {(view.kind === "membership" ||
                    currentCategory?.kind === "coming-soon") && (
                    <p className="uc-kicker">Coming Soon / Preview</p>
                  )}
                  <h2 id="uc-dialog-title" ref={heading} tabIndex={-1}>
                    {title}
                  </h2>
                </div>
              </div>
            </header>
            <div className="uc-modal-scroll" ref={scroll}>
              <div
                className={`uc-dialog-layout ${isStudio ? "with-selection" : ""}`}
              >
                <div className="uc-dialog-main">
                  {view.kind === "list" && (
                    <>
                      <p className="uc-list-intro">
                        {view.category === "wellness"
                          ? "Nail & Foot Care. These services are Coming Soon; explore the planned menu below."
                          : "Explore the details, then add services for your visit to the Abuja studio."}
                      </p>
                      <div className="uc-service-list">
                        {services
                          .filter((s) => s.category === view.category)
                          .map((service) => (
                            <article
                              className="uc-service-row"
                              key={service.id}
                            >
                              <div>
                                <h3>{service.name}</h3>
                                <Price service={service} />
                              </div>
                              <div className="uc-row-actions">
                                <button
                                  className="uc-text-action"
                                  aria-label={`View Service: ${service.name}`}
                                  onClick={() =>
                                    go({ kind: "detail", id: service.id })
                                  }
                                >
                                  View Service
                                </button>
                                <AddAction
                                  service={service}
                                  basket={basket}
                                  add={add}
                                />
                              </div>
                            </article>
                          ))}
                      </div>
                    </>
                  )}
                  {view.kind === "detail" && currentService && (
                    <article className="uc-service-detail">
                      <Price service={currentService} />
                      <p className="uc-detail-description">
                        {currentService.description}
                      </p>
                      {currentService.inclusions && (
                        <div className="uc-inclusions">
                          <h3>What’s included</h3>
                          <ul>
                            {currentService.inclusions.map((i) => (
                              <li key={i}>{i}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <AddAction
                        service={currentService}
                        basket={basket}
                        add={add}
                      />
                    </article>
                  )}
                  {view.kind === "studio" && (
                    <StudioForm
                      data={studio}
                      update={setStudio}
                      basket={basket}
                      errors={errors}
                      submit={submitStudio}
                    />
                  )}
                  {(view.kind === "studio-review" ||
                    view.kind === "home-review") && (
                    <div className="uc-review">
                      <pre>{message}</pre>
                      <div className="uc-handoff-note">
                        <MessageCircle
                          size={22}
                          strokeWidth={1.8}
                          aria-hidden="true"
                        />
                        <p>
                          You’ll be redirected to WhatsApp to send your booking
                          request.
                        </p>
                      </div>
                      <a
                        className="uc-primary"
                        href={whatsappUrl(message)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(event) => {
                          const next =
                            view.kind === "studio-review"
                              ? validateStudio(studio, basket)
                              : validateHome(home);
                          if (Object.keys(next).length) {
                            event.preventDefault();
                            setView({
                              kind:
                                view.kind === "studio-review"
                                  ? "studio"
                                  : "home-form",
                            });
                            focusErrors(
                              next,
                              view.kind === "studio-review" ? "studio" : "home",
                            );
                          }
                        }}
                      >
                        CONTINUE TO BOOKING
                      </a>
                    </div>
                  )}
                  {view.kind === "home" && (
                    <div className="uc-offering">
                      <Image
                        src="/media/services/home.webp"
                        width={800}
                        height={1000}
                        alt="Illustrative portable grooming kit"
                        sizes="(max-width: 600px) 100vw, 40vw"
                      />
                      <div>
                        <p className="uc-offering-price">
                          {money(homeOffering.price)} in Abuja
                        </p>
                        <h3>{homeOffering.package}</h3>
                        <p>{homeOffering.description}</p>
                        <p className="uc-callout">{homeOffering.outside}</p>
                        <button
                          className="uc-primary"
                          onClick={() => go({ kind: "home-form" })}
                        >
                          Enquire About Home Service
                        </button>
                      </div>
                    </div>
                  )}
                  {view.kind === "home-form" && (
                    <HomeForm
                      data={home}
                      update={setHome}
                      errors={errors}
                      submit={submitHome}
                    />
                  )}
                  {view.kind === "membership" && (
                    <div className="uc-offering uc-membership">
                      <Image
                        src="/media/services/membership.webp"
                        width={800}
                        height={1000}
                        alt="Illustrative Black Card membership concept, not currently available"
                        sizes="(max-width: 600px) 100vw, 40vw"
                      />
                      <div>
                        <p className="uc-kicker">Monthly Grooming Membership</p>
                        <span className="uc-status">Coming Soon</span>
                        <h3 className="uc-membership-heading">
                          {membership.headline}
                        </h3>
                        <p>{membership.introduction}</p>
                        <div className="uc-callout">
                          <strong>
                            Registration fee:{" "}
                            {money(membership.registrationFee)}
                          </strong>
                          <p>
                            Registration is not open. This is not a monthly
                            subscription fee or an amount payable on this
                            website now.
                          </p>
                        </div>
                        <h4>Proposed benefits</h4>
                        <ul>
                          {membership.benefits.map((b) => (
                            <li key={b}>{b}</li>
                          ))}
                        </ul>
                        <p className="uc-fine">
                          Proposed benefits are not confirmed entitlements. This
                          preview does not make unavailable treatments bookable.
                        </p>
                        <span className="uc-status">Coming Soon</span>
                      </div>
                    </div>
                  )}
                </div>
                {isStudio && (
                  <SelectionSummary
                    basket={basket}
                    adjust={adjust}
                    onContinue={() => go({ kind: "studio" })}
                    canContinue={view.kind !== "studio"}
                    error={errors.basket}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
