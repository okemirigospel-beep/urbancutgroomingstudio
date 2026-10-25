import StoryReveal from "./StoryReveal";
const points = [
  ["Precision", "Attention to the cut, finish and details."],
  ["Personal Attention", "Grooming shaped around your preferences."],
  ["Professional Care", "Considered preparation, hygiene and service."],
  [
    "Convenience",
    "Visit the studio or enquire about grooming at your location.",
  ],
];
export default function WhyUrbanCut() {
  return (
    <section
      className="why-section shell section"
      aria-labelledby="why-heading"
    >
      <StoryReveal>
        <h2 id="why-heading" className="type-editorial uc-section-title">
          Why UrbanCut
        </h2>
      </StoryReveal>
      <div className="why-points">
        {points.map(([title, body], index) => (
          <StoryReveal key={title} delay={180 * (index + 1)}>
            <h3>{title}</h3>
            <p>{body}</p>
          </StoryReveal>
        ))}
      </div>
    </section>
  );
}
