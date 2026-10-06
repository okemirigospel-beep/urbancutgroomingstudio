import Image from "next/image";
import { founder } from "@/lib/presentation";
import { studio } from "@/lib/studio";

export default function Story() {
  return (
    <section
      id="about"
      className="story-section shell section"
      aria-labelledby="story-heading"
    >
      <div className="story-copy">
        <h2 id="story-heading" className="type-editorial uc-section-title">
          The UrbanCut Story
        </h2>
        <p>
          UrbanCut was built on a simple belief: grooming is about more than
          appearance. It shapes confidence, self-expression and the way we
          present ourselves. Through personal grooming and professional
          training, we serve clients and help aspiring professionals develop
          their craft.
        </p>
        <p className="story-closing">
          Built for the glory of God, the service of humanity, the dignity of
          work, and the legacy of generations.
        </p>
      </div>
      <div className="founder-profile">
        <div className="founder-portrait">
          {founder.portrait ? (
            <Image
              {...founder.portrait}
              sizes="(max-width: 767px) 200px, 280px"
            />
          ) : (
            <span aria-hidden="true">{founder.initials}</span>
          )}
        </div>
        <h3>{founder.name}</h3>
        <p>{founder.title}</p>
        <p>{studio.legalName}</p>
      </div>
    </section>
  );
}
