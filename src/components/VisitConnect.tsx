"use client";

import { useRef, useState } from "react";
import {
  ChevronDown,
  Instagram,
  Mail,
  MessageCircle,
  MapPin,
} from "lucide-react";
import { faqs, type FAQ } from "@/lib/content";
import { studio } from "@/lib/studio";

export default function VisitConnect() {
  const [showAllQuestions, setShowAllQuestions] = useState(false);
  const [openQuestionId, setOpenQuestionId] = useState<string | null>(null);
  const moreButton = useRef<HTMLButtonElement>(null);

  function toggleMore() {
    if (
      showAllQuestions &&
      !faqs.slice(0, 6).some((q) => q.id === openQuestionId)
    )
      setOpenQuestionId(null);
    setShowAllQuestions(!showAllQuestions);
    if (showAllQuestions)
      requestAnimationFrame(() => {
        const button = moreButton.current;
        if (!button) return;
        button.focus({ preventScroll: true });
        const bounds = button.getBoundingClientRect();
        if (bounds.top < 0 || bounds.bottom > window.innerHeight)
          button.scrollIntoView({ block: "nearest", behavior: "instant" });
      });
  }

  function question(q: FAQ) {
    const open = openQuestionId === q.id;
    return (
      <div className="connect-question" key={q.id}>
        <h4>
          <button
            id={`question-${q.id}`}
            aria-expanded={open}
            aria-controls={`answer-${q.id}`}
            onClick={() => setOpenQuestionId(open ? null : q.id)}
          >
            <span>{q.question}</span>
            <ChevronDown size={20} aria-hidden="true" />
          </button>
        </h4>
        <div
          id={`answer-${q.id}`}
          aria-labelledby={`question-${q.id}`}
          hidden={!open}
        >
          <p>{q.answer}</p>
        </div>
      </div>
    );
  }

  return (
    <section
      id="contact"
      className="visit-connect shell section"
      aria-labelledby="connect-heading"
    >
      <h2 id="connect-heading" className="type-editorial uc-section-title">
        Visit &amp; Connect
      </h2>
      <div className="connect-grid">
        <div
          id="studio"
          className="connect-studio"
          aria-labelledby="studio-heading"
        >
          <h3 id="studio-heading">Find Our Studio</h3>
          <p className="connect-name">{studio.name}</p>
          <address>{studio.address}</address>
          <dl className="connect-hours">
            {studio.hours.map((row) => (
              <div key={row.days}>
                <dt>{row.days}</dt>
                <dd>{row.hours}</dd>
              </div>
            ))}
          </dl>
          <a
            id="directions"
            className="connect-directions"
            href={studio.directions}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get directions to UrbanCut Grooming Studio on Google Maps"
          >
            <MapPin size={18} aria-hidden="true" />
            Get Directions
          </a>
          <div className="connect-links">
            <a href={studio.whatsapp} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={20} aria-hidden="true" />
              Message on WhatsApp
            </a>
            <a
              href={studio.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram size={20} aria-hidden="true" />
              Instagram
            </a>
            <a href={studio.tiktok} target="_blank" rel="noopener noreferrer">
              <span className="tiktok-mark" aria-hidden="true" />
              TikTok
            </a>
            <a href={`mailto:${studio.email}`}>
              <Mail size={20} aria-hidden="true" />
              Email Us
            </a>
          </div>
        </div>
        <div id="faq" className="connect-faq" aria-labelledby="faq-heading">
          <h3 id="faq-heading">Frequently Asked Questions</h3>
          {faqs.slice(0, 6).map(question)}
          <div id="additional-questions" hidden={!showAllQuestions}>
            {faqs.slice(6).map(question)}
          </div>
          <button
            ref={moreButton}
            className="connect-more"
            aria-expanded={showAllQuestions}
            aria-controls="additional-questions"
            onClick={toggleMore}
          >
            {showAllQuestions ? "Show Fewer Questions" : "View More Questions"}
            <ChevronDown size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
