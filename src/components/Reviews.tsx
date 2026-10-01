import { Star } from "lucide-react";
import { reviews, type ClientReview } from "@/lib/reviews";

function Review({ review }: { review: ClientReview }) {
  return (
    <figure
      className={
        review.featured ? "client-review featured-review" : "client-review"
      }
    >
      {review.featured && (
        <span className="review-quote-mark" aria-hidden="true">
          “
        </span>
      )}
      {review.rating !== undefined && (
        <div
          className="review-rating"
          role="img"
          aria-label={`${review.rating} out of 5 stars`}
        >
          {Array.from({ length: review.rating }, (_, i) => (
            <Star
              key={i}
              size={17}
              fill="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          ))}
        </div>
      )}
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
      <h2 id="reviews-heading" className="type-editorial uc-section-title">
        What Our Clients Say
      </h2>
      <div className="reviews-composition">
        {reviews
          .filter((review) => review.featured)
          .map((review) => (
            <Review key={review.id} review={review} />
          ))}
        <div className="supporting-reviews">
          {reviews
            .filter((review) => !review.featured)
            .map((review) => (
              <Review key={review.id} review={review} />
            ))}
        </div>
      </div>
    </section>
  );
}
