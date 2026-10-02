"use client";
import Image from "next/image";
import { ArrowRight, Timer, Tag, X, Info } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type FormEvent,
} from "react";
import {
  programmes,
  experiences,
  emptyAcademyDraft,
  validateAcademy,
  academyEnquiryUrl,
  type AcademyDraft,
  type Programme,
} from "@/lib/academy";
import { money } from "@/lib/catalogue";
import { Field, inputError } from "./BookingParts";

type View = { kind: "details" | "enquiry"; id: string } | null;
function ProgrammeMeta({ programme }: { programme: Programme }) {
  return (
    <div className="academy-meta">
      <span>
        <Timer size={17} aria-hidden="true" />
        {programme.duration}
      </span>
      <span>
        <Tag size={17} aria-hidden="true" />
        {money(programme.feeNaira)}
      </span>
    </div>
  );
}
export default function Academy() {
  const [view, setView] = useState<View>(null);
  const [drafts, setDrafts] = useState<Record<string, AcademyDraft>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const dialog = useRef<HTMLDialogElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const scroll = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const isOpen = !!view;
  const programme = programmes.find((p) => p.id === view?.id);
  const draft = view
    ? (drafts[view.id] ?? emptyAcademyDraft)
    : emptyAcademyDraft;
  useEffect(() => {
    const node = dialog.current;
    if (!isOpen || !node) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    node.showModal();
    return () => {
      node.close();
      document.body.style.overflow = overflow;
      trigger.current?.focus({ preventScroll: true });
    };
  }, [isOpen]);
  useEffect(() => {
    if (!view) return;
    const frame = requestAnimationFrame(() => {
      title.current?.focus({ preventScroll: true });
      if (scroll.current) scroll.current.scrollTop = 0;
    });
    return () => cancelAnimationFrame(frame);
  }, [view]);
  function open(id: string, event: MouseEvent<HTMLButtonElement>) {
    trigger.current = event.currentTarget;
    setErrors({});
    setView({ kind: "details", id });
  }
  function update(key: keyof AcademyDraft, value: string) {
    if (!view) return;
    setDrafts((previous) => ({
      ...previous,
      [view.id]: { ...(previous[view.id] ?? emptyAcademyDraft), [key]: value },
    }));
    setErrors((previous) => ({ ...previous, [key]: "" }));
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!programme) return;
    const next = validateAcademy(draft);
    setErrors(next);
    if (Object.keys(next).length) {
      requestAnimationFrame(() =>
        document.getElementById(`academy-${Object.keys(next)[0]}`)?.focus(),
      );
      return;
    }
    const url = academyEnquiryUrl(programme.id, draft);
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  }
  return (
    <>
      <section
        id="academy"
        className="academy-section shell section"
        aria-labelledby="academy-heading"
      >
        <div className="academy-heading-row">
          <h2 id="academy-heading" className="type-editorial uc-section-title">
            UrbanCut Academy
          </h2>
          <span className="academy-admissions">Admissions Open</span>
        </div>
        <p className="academy-description">
          Develop your craft. Build your business. Explore five standalone
          programmes in professional barbering, business and brand development.
        </p>
        <div className="academy-pathway">
          <h3>Career Pathway</h3>
          <ol>
            {programmes.map((p, i) => (
              <li key={p.id}>
                <button
                  type="button"
                  aria-haspopup="dialog"
                  onClick={(e) => open(p.id, e)}
                >
                  {p.name.replace("UrbanCut ", "")}
                </button>
                {i < programmes.length - 1 && (
                  <ArrowRight size={15} aria-hidden="true" />
                )}
              </li>
            ))}
          </ol>
          <p>
            Choose your programme. Previous UrbanCut training is not required.
          </p>
        </div>
        <div className="academy-grid">
          {programmes.map((p) => (
            <article key={p.id} className="academy-card">
              <Image
                src={p.imageSrc}
                alt={p.imageAlt}
                width={1080}
                height={810}
                sizes="(max-width: 649px) 90vw, (max-width: 1099px) 44vw, 350px"
              />
              <div className="academy-card-content">
                <p className="academy-level">Level {p.level}</p>
                <h3>{p.name}</h3>
                {p.subtitle && <p className="academy-subtitle">{p.subtitle}</p>}
                <ProgrammeMeta programme={p} />
                <p className="academy-card-description">{p.shortDescription}</p>
                <button
                  type="button"
                  className="academy-explore"
                  aria-label={`Explore Programme: ${p.name}`}
                  aria-haspopup="dialog"
                  onClick={(e) => open(p.id, e)}
                >
                  Explore Programme <ArrowRight size={17} aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
      <dialog
        ref={dialog}
        className="academy-dialog"
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const controls = Array.from(
            event.currentTarget.querySelectorAll<HTMLElement>(
              'button, input, select, textarea, a[href], [tabindex="0"]',
            ),
          ).filter(
            (node) =>
              !node.hasAttribute("disabled") &&
              node.getClientRects().length > 0,
          );
          const first = controls[0],
            last = controls[controls.length - 1];
          if (!first || !last) return;
          if (
            event.shiftKey &&
            (document.activeElement === first ||
              document.activeElement === title.current)
          ) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }}
        aria-labelledby="academy-dialog-title"
        onCancel={(e) => {
          e.preventDefault();
          setView(null);
        }}
      >
        {programme && view && (
          <div className="academy-dialog-shell">
            <header className="academy-dialog-header">
              <div>
                {view.kind === "enquiry" && (
                  <button
                    type="button"
                    className="uc-text-action"
                    onClick={() => {
                      setErrors({});
                      setView({ kind: "details", id: programme.id });
                    }}
                  >
                    Back to Programme
                  </button>
                )}
                <h2 ref={title} tabIndex={-1} id="academy-dialog-title">
                  {view.kind === "details"
                    ? programme.name
                    : "Enquire About UrbanCut Academy"}
                </h2>
                {view.kind === "details" && programme.subtitle && (
                  <p>{programme.subtitle}</p>
                )}
              </div>
              <button
                className="academy-close"
                type="button"
                aria-label="Close Academy panel"
                onClick={() => setView(null)}
              >
                <X aria-hidden="true" />
              </button>
            </header>
            <div ref={scroll} className="academy-dialog-body">
              {view.kind === "details" ? (
                <>
                  <ProgrammeMeta programme={programme} />
                  <p className="academy-programme-intro">
                    {programme.introduction}
                  </p>
                  <div className="academy-curriculum">
                    {programme.curriculumGroups.map((group) => (
                      <section key={group.title}>
                        <h3>{group.title}</h3>
                        <ul>
                          {group.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </section>
                    ))}
                  </div>
                  {programme.certificateTitle && (
                    <div className="academy-certificate">
                      <h3>Certificate</h3>
                      <p>{programme.certificateTitle}</p>
                    </div>
                  )}
                  <button
                    type="button"
                    className="uc-primary academy-enquire"
                    onClick={() =>
                      setView({ kind: "enquiry", id: programme.id })
                    }
                  >
                    Enquire About This Programme
                  </button>
                </>
              ) : (
                <form noValidate onSubmit={submit}>
                  <div className="academy-enquiry-summary">
                    <h3>{programme.name}</h3>
                    {programme.subtitle && <p>{programme.subtitle}</p>}
                    <ProgrammeMeta programme={programme} />
                  </div>
                  <Field
                    id="academy-name"
                    label="Full Name"
                    error={errors.name}
                  >
                    <input
                      id="academy-name"
                      autoComplete="name"
                      required
                      value={draft.name}
                      onChange={(e) => update("name", e.target.value)}
                      {...inputError("academy-name", errors.name)}
                    />
                  </Field>
                  <Field
                    id="academy-experience"
                    label="Barbering Experience"
                    error={errors.experience}
                  >
                    <select
                      id="academy-experience"
                      required
                      value={draft.experience}
                      onChange={(e) => update("experience", e.target.value)}
                      {...inputError("academy-experience", errors.experience)}
                    >
                      <option value="">Select your experience</option>
                      {experiences.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </Field>
                  <Field
                    id="academy-notes"
                    label="Questions or Additional Notes"
                  >
                    <textarea
                      id="academy-notes"
                      rows={4}
                      placeholder="Tell us what you would like to know."
                      value={draft.notes}
                      onChange={(e) => update("notes", e.target.value)}
                    />
                  </Field>
                  <div className="uc-handoff-note">
                    <Info size={18} aria-hidden="true" />
                    <p>
                      You’ll be redirected to WhatsApp to discuss enrolment.
                    </p>
                  </div>
                  <button className="uc-primary academy-enquire" type="submit">
                    Continue to WhatsApp
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
