import StoryReveal from "./StoryReveal";
import { reviews, type ClientReview } from "@/lib/reviews";

function Review({ review, index }: { review: ClientReview; index: number }) {
  return (
    <StoryReveal
      as="figure"
      className="client-review"
      delay={200 * (index + 1)}
    >
      <span className="review-quote-mark" aria-hidden="true">
        “
      </span>
      <blockquote>
        <p>{review.text}</p>
      </blockquote>
      <figcaption>{review.label}</figcaption>
    </StoryReveal>
  );
}

export default function Reviews() {
  return (
    <section
      id="reviews"
      className="reviews-section shell section"
      aria-labelledby="reviews-heading"
    >
      <div className="reviews-panel">
        <StoryReveal>
          <h2 id="reviews-heading" className="type-editorial uc-section-title">
            What Our Clients Say
          </h2>
        </StoryReveal>
        <div className="reviews-composition">
          {reviews.map((review, index) => (
            <Review key={review.id} review={review} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
