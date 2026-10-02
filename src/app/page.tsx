import Academy from "@/components/Academy";
import Reviews from "@/components/Reviews";
import OpeningHours from "@/components/OpeningHours";
import { advanceNotice } from "@/lib/appointments";
import VisitConnect from "@/components/VisitConnect";
import Image from "next/image";
import { Clock3, CalendarDays, MapPin } from "lucide-react";
import Header from "@/components/Header";
import HeroSlideshow from "@/components/HeroSlideshow";
import { hero } from "@/lib/hero";
import Lookbook from "@/components/Lookbook";
import Products from "@/components/Products";
import Services from "@/components/Services";
import { brand } from "@/lib/content";

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
        <Reviews />
        <Academy />
        <VisitConnect />
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
