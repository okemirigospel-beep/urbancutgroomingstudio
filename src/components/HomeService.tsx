import type { MouseEventHandler } from "react";
import { homeOffering, money } from "@/lib/catalogue";

export default function HomeService({
  onRequest,
}: {
  onRequest: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <section
      id="home-service"
      className="home-service-section shell section"
      aria-labelledby="home-service-heading"
    >
      <div className="home-service-copy">
        <h2
          id="home-service-heading"
          className="type-editorial uc-section-title"
        >
          UrbanCut at Your Location
        </h2>
        <p className="home-service-lead">Premium grooming, brought to you.</p>
        <p>
          A one-person premium grooming experience at your home, hotel or
          office, with package details and arrangements confirmed by our team.
        </p>
        <p className="home-service-coverage">
          Available in Abuja. Locations outside Abuja are considered by enquiry.
        </p>
      </div>
      <div className="home-service-action">
        <p className="home-service-price">{money(homeOffering.price)}</p>
        <p>{homeOffering.package}</p>
        <button
          className="uc-primary"
          aria-haspopup="dialog"
          onClick={onRequest}
        >
          REQUEST HOME SERVICE
        </button>
        <p className="home-service-scheduling">
          Home-service appointments are scheduled in advance and subject to
          location and availability.
        </p>
      </div>
    </section>
  );
}
