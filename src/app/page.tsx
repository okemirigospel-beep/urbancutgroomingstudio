import OpeningHours from "@/components/OpeningHours";
import { advanceNotice } from "@/lib/appointments";
import { whatsappBase } from "@/lib/booking";
import Image from "next/image";
import { Clock3, CalendarDays, MapPin, Check, Plus } from "lucide-react";
import Header from "@/components/Header";
import HeroSlideshow from "@/components/HeroSlideshow";
import { hero } from "@/lib/hero";
import Lookbook from "@/components/Lookbook";
import Products from "@/components/Products";
import Services from "@/components/Services";
import { academy, faqs, money, brand } from "@/lib/content";

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div id="home" className="masthead-wrap">
        <div className="shell">
          <Header />
        </div>
      </div>
      <main id="main">
        <section className="grooming-hero shell" aria-labelledby="hero-title">
          <div className="grooming-copy">
            <h1 id="hero-title">
              <span className="hero-strength">{hero.headline[0]}</span>{" "}
              <span className="hero-elevated">{hero.headline[1]}</span>
            </h1>
            <p className="grooming-description">{hero.description}</p>
            <a className="booking-button hero-booking" href="#services">
              {hero.action.toUpperCase()}
            </a>
          </div>
          <HeroSlideshow />
        </section>
        <div className="studio-band">
          <div className="studio-band-inner shell">
            <div className="studio-info-group">
              <MapPin aria-hidden="true" />
              <div>
                <h2>Visit us</h2>
                <p>{brand.region}</p>
              </div>
            </div>
            <div className="studio-info-group">
              <Clock3 aria-hidden="true" />
              <div>
                <h2>Open every day</h2>
                <OpeningHours />
              </div>
            </div>
            <div className="studio-info-group">
              <CalendarDays aria-hidden="true" />
              <div>
                <h2>Plan your visit</h2>
                <p>{advanceNotice}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="shell">
          <Services />
        </div>
        <Products />
        <Lookbook />
        <section id="reviews" className="reviews-section shell section">
          <p className="eyebrow">04 / WORD FROM THE CHAIR</p>
          <h2>
            Good experiences.
            <br />
            <em className="headline-emphasis">In your own words.</em>
          </h2>
          <div className="reviews-empty">
            <span aria-hidden="true">“</span>
            <p>Customer reviews will be added here.</p>
            <small>Real words from real clients, published with care.</small>
          </div>
        </section>
        <section
          id="academy"
          className="academy-panel dark-panel shell section"
        >
          <div className="academy-intro">
            <p className="eyebrow">05 / URBANCUT ACADEMY</p>
            <h2 className="type-editorial">
              Learn the craft.
              <br />
              <em className="headline-emphasis">Find your edge.</em>
            </h2>
            <p>
              From first principles to more advanced practice. Explore a
              progressive path into professional grooming.
            </p>
            <a className="button gold" href="#contact">
              Enquire about training
            </a>
            <p className="academy-note">
              The academy is operating. Programme names, fees, durations and
              outlines below are provisional; confirm current options with the
              studio.
            </p>
          </div>
          <div className="academy-levels">
            {academy.map((a, i) => (
              <details key={a.title}>
                <summary>
                  <span className="level-number">0{i + 1}</span>
                  <span>
                    <strong>{a.title}</strong>
                    <small>{a.audience}</small>
                  </span>
                  <Plus size={19} />
                </summary>
                <div className="level-content">
                  <p>{a.outline}</p>
                  <div>
                    <span>
                      Sample fee <strong>{money(a.fee)}</strong>
                    </span>
                    <span>
                      Draft duration <strong>{a.duration}</strong>
                    </span>
                  </div>
                  <p className="muted-light">
                    Syllabus, prerequisites and intake dates require
                    confirmation.
                  </p>
                </div>
              </details>
            ))}
          </div>
        </section>
        <section id="faq" className="faq-section section shell">
          <div className="faq-intro">
            <p className="eyebrow">07 / BEFORE YOUR VISIT</p>
            <h2>
              A few things
              <br />
              <em className="headline-emphasis">worth knowing.</em>
            </h2>
            <p>
              Less guesswork.
              <br />
              More time for your next look.
            </p>
            <a className="text-link" href="#contact">
              Find the studio
            </a>
          </div>
          <div className="faq-list">
            {faqs.map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <Plus size={19} />
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>
        <section id="contact" className="contact-section shell section">
          <p className="eyebrow">08 / COME THROUGH</p>
          <h2>
            Your next look
            <br />
            <em className="headline-emphasis">starts in Abuja.</em>
          </h2>
          <div className="contact-grid">
            <div className="visit-card">
              <MapPin size={25} />
              <h3>
                One studio.
                <br />A personal welcome.
              </h3>
              <p>Abuja, Nigeria</p>
              <OpeningHours />
              <span className="pending-label">
                Exact address & directions to follow
              </span>
            </div>
            <div className="contact-links">
              <p>Let’s plan your visit.</p>
              <a
                className="contact-link"
                href={whatsappBase}
                target="_blank"
                rel="noopener noreferrer"
              >
                Message us on WhatsApp <span>Open chat</span>
              </a>
              {[
                "Send us an email",
                "Visit our Instagram",
                "Get directions",
              ].map((t) => (
                <div className="contact-link" key={t}>
                  <span>{t}</span>
                  <span>Details pending</span>
                </div>
              ))}
              <p className="field-help">
                Contact the studio on WhatsApp to confirm the address before
                visiting. Email, social links and directions are awaiting
                confirmed details. Opening WhatsApp does not send a message.
              </p>
            </div>
          </div>
        </section>
        <section className="closing dark-panel shell">
          <p className="eyebrow">A FRESH START, DOWN TO THE DETAIL.</p>
          <h2 className="type-editorial">
            Make time
            <br />
            <em className="headline-emphasis">for your next look.</em>
          </h2>
          <a href="#services" className="button gold">
            Explore services
          </a>
          <p>
            <Check size={15} /> Choose your services. Plan your preferred visit.
          </p>
        </section>
      </main>
      <footer className="site-footer shell">
        <div className="footer-top">
          <a
            className="footer-logo"
            href="#home"
            aria-label="Back to URBANCUT home"
          >
            <Image
              src="/media/urbancut-logo.svg"
              alt="URBANCUT Grooming Studio"
              width={130}
              height={130}
            />
          </a>
          <p>
            Good grooming.
            <br />
            Entirely you.
          </p>
          <nav aria-label="Footer navigation">
            <a href="#services">Services</a>
            <a href="#gallery">The Lookbook</a>
            <a href="#reviews">Reviews</a>
            <a href="#academy">Academy</a>
            <a href="#products">Products</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact & social</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} URBANCUT Grooming Studio</span>
          <span>Abuja, Nigeria</span>
          <span className="preview-label">Local preview · Sample content</span>
        </div>
      </footer>
    </>
  );
}
