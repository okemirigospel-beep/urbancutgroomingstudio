import { reviews, type ClientReview } from "@/lib/reviews";

function Review({ review }: { review: ClientReview }) {
  return (
    <figure className="client-review">
      <span className="review-quote-mark" aria-hidden="true">
        “
      </span>
      <blockquote>
        <p>{review.text}</p>
      </blockquote>
      <figcaption>{review.label}</figcaption>
    </figure>
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
        <h2 id="reviews-heading" className="type-editorial uc-section-title">
          What Our Clients Say
        </h2>
        <div className="reviews-composition">
          {reviews.map((review) => (
            <Review key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
