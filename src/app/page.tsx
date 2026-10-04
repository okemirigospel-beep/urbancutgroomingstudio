import { indexingConfig } from "@/lib/indexing";
import { homepageMetadata, businessSchema, jsonLd } from "@/lib/seo";
import Academy from "@/components/Academy";
import Reviews from "@/components/Reviews";
import OpeningHours from "@/components/OpeningHours";
import { advanceNotice } from "@/lib/appointments";
import VisitConnect from "@/components/VisitConnect";
import Footer from "@/components/Footer";
import { Clock3, CalendarDays, MapPin } from "lucide-react";
import Header from "@/components/Header";
import HeroSlideshow from "@/components/HeroSlideshow";
import { hero } from "@/lib/hero";
import Lookbook from "@/components/Lookbook";
import Products from "@/components/Products";
import Services from "@/components/Services";
import { brand } from "@/lib/content";

export const metadata = homepageMetadata(indexingConfig());

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(businessSchema(indexingConfig())),
        }}
      />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div id="home" />
      <div className="masthead-wrap">
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
        <Lookbook />
        <Reviews />
        <Academy />
        <Products />
        <VisitConnect />
      </main>
      <Footer />
    </>
  );
}
