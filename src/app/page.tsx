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
import BeyondTheChair from "@/components/BeyondTheChair";
import Story from "@/components/Story";
import StoryReveal from "@/components/StoryReveal";
import WhyUrbanCut from "@/components/WhyUrbanCut";
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
        <section className="grooming-hero" aria-labelledby="hero-title">
          <HeroSlideshow />
          <div className="hero-content shell">
            <StoryReveal className="grooming-copy" sequence>
              <h1 id="hero-title">
                <span className="hero-strength" data-reveal-step>
                  {hero.headline[0]}
                </span>{" "}
                <span className="hero-elevated" data-reveal-step>
                  {hero.headline[1]}
                </span>
              </h1>
              <p className="hero-mantra" data-reveal-step>
                Inspire | Style | Confidence
              </p>
              <p className="grooming-description">{hero.description}</p>
              <div className="hero-actions">
                <a className="booking-button hero-booking" href="#services">
                  {hero.action.toUpperCase()}
                </a>
                <a
                  className="booking-button hero-home-service"
                  href="#home-service"
                >
                  REQUEST HOME SERVICE
                </a>
              </div>
            </StoryReveal>
          </div>
        </section>
        <Story />
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
        <Services />
        <Lookbook />
        <Academy />
        <WhyUrbanCut />
        <BeyondTheChair />
        <Products />
        <Reviews />
        <VisitConnect />
      </main>
      <Footer />
    </>
  );
}
