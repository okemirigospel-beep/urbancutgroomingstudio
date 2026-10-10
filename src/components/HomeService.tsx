import HomeServiceVideo from "./HomeServiceVideo";
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
        <p className="home-service-lead">
          Premium grooming at your home, hotel or office.
        </p>
        <p className="home-service-price">{money(homeOffering.price)}</p>
        <p className="home-service-package">{homeOffering.package}</p>
        <button
          className="uc-primary"
          aria-haspopup="dialog"
          onClick={onRequest}
        >
          REQUEST HOME SERVICE
        </button>
        <p className="home-service-scheduling">
          Abuja and beyond, by enquiry. Advance booking required.
        </p>
      </div>
      <HomeServiceVideo />
    </section>
  );
}
