import { whatsappUrl } from "@/lib/booking";
const message =
  "Hello UrbanCut, I’m interested in the upcoming Beyond the Chair business-support pathway. Please share more information about the planned offering and its availability.";
export default function BeyondTheChair() {
  return (
    <div className="beyond-chair" aria-labelledby="beyond-heading">
      <div>
        <h3 id="beyond-heading">Beyond the Chair</h3>
        <h4>Build More Than a Career. Build a Business.</h4>
        <p>
          UrbanCut is developing a business-support pathway for aspiring
          grooming entrepreneurs, bringing together professional training,
          studio planning and operational guidance.
        </p>
      </div>
      <div>
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
      </div>
    </div>
  );
}
