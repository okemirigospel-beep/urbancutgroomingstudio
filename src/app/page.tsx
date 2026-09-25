import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Clock3,
  MapPin,
  Scissors,
  Sparkles,
  Check,
  Plus,
} from "lucide-react";
import Header from "@/components/Header";
import HeroFilm from "@/components/HeroFilm";
import Services from "@/components/Services";
import { academy, faqs, money } from "@/lib/content";

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div id="home" className="shell">
        <Header />
      </div>
      <main id="main">
        <section className="hero section shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" /> GROOMING STUDIO / ABUJA
            </p>
            <h1 id="hero-title">
              Good grooming.
              <br />
              <em>Great feeling.</em>
              <br />
              Entirely you.
            </h1>
            <p className="hero-description">
              Barbering, braiding and loc care. Thoughtful attention to the
              details that make your look your own.
            </p>
            <div className="hero-actions">
              <a className="button gold" href="#services">
                Find your service <ArrowUpRight size={19} />
              </a>
              <a className="text-link" href="#about">
                Meet URBANCUT <ArrowRight size={17} />
              </a>
            </div>
            <div className="hero-note">
              <span className="line" />
              <span>A little care. A lasting impression.</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="film-offset" aria-hidden="true" />
            <HeroFilm />
            <div className="craft-label" aria-hidden="true">
              <Scissors size={22} />
              <span>
                YOUR LOOK.
                <br />
                OUR ATTENTION.
              </span>
            </div>
          </div>
        </section>
        <div className="visit-strip shell">
          <p>
            <MapPin size={17} /> Abuja, Nigeria
          </p>
          <p>
            <Clock3 size={17} /> Mon–Sat · 10 a.m.–6 p.m.
          </p>
          <a href="#faq">
            Plan at least a day ahead <ArrowDown size={16} />
          </a>
        </div>
        <div className="shell">
          <Services />
        </div>
        <section id="about" className="dark-panel about-panel shell section">
          <div className="about-heading">
            <p className="eyebrow">02 / THE URBANCUT WAY</p>
            <h2>
              A considered cut.
              <br />
              <em>A personal experience.</em>
            </h2>
            <p>
              Professional grooming and thoughtful personal service, together in
              Abuja. From barbering to braiding and loc care, we focus on
              careful work, a considered finish and an experience shaped around
              you.
            </p>
          </div>
          <div className="standards">
            {[
              [
                "01",
                "First, we listen.",
                "Your preferences give every service its direction.",
              ],
              [
                "02",
                "Care in the process.",
                "Hygiene and careful work are part of our commitment.",
              ],
              [
                "03",
                "Your time matters.",
                "Punctuality and attentive service guide the experience.",
              ],
              [
                "04",
                "Made personal.",
                "A finish that feels like you, not just another haircut.",
              ],
            ].map(([n, t, d]) => (
              <div key={n}>
                <span>{n}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
          <div className="about-bottom">
            <span>Our purpose</span>
            <p>
              To help every client leave looking sharp and feeling confident.
            </p>
            <Scissors size={26} />
          </div>
        </section>
        <section id="gallery" className="section shell">
          <div className="section-top">
            <div>
              <p className="eyebrow">03 / THE LOOKBOOK</p>
              <h2>
                The finish
                <br />
                <em>says it all.</em>
              </h2>
            </div>
            <div className="section-intro">
              <p>A space for cuts, braids and locs from the studio.</p>
              <p>
                Our approved work photographs are being prepared. The hero film
                is stock inspiration.
              </p>
            </div>
          </div>
          <div className="gallery-placeholders">
            {[
              ["01", "Cuts & grooming", "Sharp lines. Individual style."],
              ["02", "Braids", "Pattern. Shape. Personality."],
              ["03", "Loc care", "Every stage of your journey."],
            ].map(([n, t, d]) => (
              <div className="gallery-slot" key={n}>
                <div className="gallery-slot-top">
                  <span>{n}</span>
                  <span>PHOTOGRAPHS TO COME</span>
                </div>
                <div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section id="reviews" className="reviews-section shell section">
          <p className="eyebrow">04 / WORD FROM THE CHAIR</p>
          <h2>
            Good experiences.
            <br />
            <em>In your own words.</em>
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
            <h2>
              Learn the craft.
              <br />
              <em>Find your edge.</em>
            </h2>
            <p>
              From first principles to more advanced practice. Explore a
              progressive path into professional grooming.
            </p>
            <a className="button gold" href="#contact">
              Enquire about training <ArrowUpRight size={18} />
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
        <section id="products" className="section shell">
          <div className="section-top">
            <div>
              <p className="eyebrow">06 / BEYOND THE CHAIR</p>
              <h2>
                A little care,
                <br />
                <em>to take with you.</em>
              </h2>
            </div>
            <p className="section-intro">
              Our grooming range is coming soon. Here’s a first look at the
              planned line-up.
            </p>
          </div>
          <div className="product-list">
            {[
              ["Beard oil", 8000, "01"],
              ["Beard balm", 7000, "02"],
              ["Styling cream", 6000, "03"],
            ].map(([name, price, n]) => (
              <article key={name} className="product-item">
                <span className="product-index">{n}</span>
                <div>
                  <span className="tag">Coming soon</span>
                  <h3>{name}</h3>
                  <p>Sample price · {money(Number(price))}</p>
                </div>
                <Sparkles size={28} strokeWidth={1} aria-hidden="true" />
              </article>
            ))}
          </div>
          <p className="prototype-note">
            Product imagery and specifications are pending. No products are
            available to purchase.
          </p>
        </section>
        <section id="faq" className="faq-section section shell">
          <div className="faq-intro">
            <p className="eyebrow">07 / BEFORE YOUR VISIT</p>
            <h2>
              A few things
              <br />
              <em>worth knowing.</em>
            </h2>
            <p>
              Less guesswork.
              <br />
              More time for your next look.
            </p>
            <a className="text-link" href="#contact">
              Find the studio <ArrowRight size={17} />
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
            <em>starts in Abuja.</em>
          </h2>
          <div className="contact-grid">
            <div className="visit-card">
              <MapPin size={25} />
              <h3>
                One studio.
                <br />A personal welcome.
              </h3>
              <p>Abuja, Nigeria</p>
              <p>
                Monday–Saturday
                <br />
                10 a.m.–6 p.m. · Closed Sunday
              </p>
              <span className="pending-label">
                Exact address & directions to follow
              </span>
            </div>
            <div className="contact-links">
              <p>Let’s plan your visit.</p>
              {[
                "Message us on WhatsApp",
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
                Contact links are awaiting confirmed studio details. Please
                confirm the address before visiting. No contact messages can be
                sent from this preview.
              </p>
            </div>
          </div>
        </section>
        <section className="closing dark-panel shell">
          <p className="eyebrow">A FRESH START, DOWN TO THE DETAIL.</p>
          <h2>
            Make time
            <br />
            <em>for your next look.</em>
          </h2>
          <a href="#services" className="button gold">
            Explore services <ArrowUpRight size={19} />
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
            <a href="#about">About</a>
            <a href="#gallery">Gallery</a>
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
