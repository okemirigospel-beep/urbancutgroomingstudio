import Image from "next/image";
import StoryReveal from "./StoryReveal";
import { whatsappUrl } from "@/lib/booking";
const message =
  "Hello UrbanCut, I’m interested in the upcoming Beyond the Chair business-support pathway. Please share more information about the planned offering and its availability.";
export default function BeyondTheChair() {
  return (
    <section
      id="beyond-the-chair"
      className="beyond-chair beyond-section shell section"
      aria-labelledby="beyond-heading"
    >
      <div className="beyond-copy">
        <StoryReveal>
          <h2 id="beyond-heading">Beyond the Chair</h2>
          <h3>
            Build More Than a Career.
            <span className="beyond-white">Build a Business.</span>
          </h3>
          <p>
            UrbanCut is developing a business-support pathway for aspiring
            grooming entrepreneurs, bringing together professional training,
            studio planning and operational guidance.
          </p>
        </StoryReveal>
        <StoryReveal delay={200}>
          <p className="launch-status">COMING SOON</p>
          <ul>
            {[
              "Studio Concept & Setup",
              "Staffing & Recruitment",
              "Professional Training",
              "Operations & Systems",
              "Brand Development",
              "Launch Support",
            ].map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
          <a
            className="uc-primary"
            href={whatsappUrl(message)}
            target="_blank"
            rel="noopener noreferrer"
          >
            ENQUIRE ABOUT FUTURE BUSINESS SUPPORT
          </a>
        </StoryReveal>
      </div>
      <StoryReveal className="beyond-image" direction="inward" delay={300}>
        <Image
          src="/media/refinement/barber-chair.webp"
          width={1200}
          height={900}
          sizes="(max-width: 899px) 90vw, 500px"
          alt="Premium black barber chair and grooming station"
        />
      </StoryReveal>
    </section>
  );
}
