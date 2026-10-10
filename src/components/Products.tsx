import Image from "next/image";

export default function Products() {
  return (
    <section
      id="products"
      className="uc-products collection-announcement shell section"
      aria-labelledby="products-heading"
    >
      <div className="collection-text">
        <h2 id="products-heading" className="type-editorial uc-section-title">
          The UrbanCut Grooming Collection
        </h2>
        <p className="launch-status">COMING SOON</p>
        <p className="collection-copy">
          Your grooming routine continues beyond the chair. We’re preparing
          hair, beard and everyday grooming essentials to bring UrbanCut’s care
          and attention into your daily routine.
        </p>
        <p className="collection-closing">
          A new chapter in everyday grooming is coming.
        </p>
      </div>
      <div className="collection-media">
        <Image
          src="/media/urbancut-collection-teaser.webp"
          width={1092}
          height={941}
          sizes="(max-width: 599px) calc(100vw - 88px), (max-width: 1099px) 85vw, 560px"
          alt="Gold fabric concealing the upcoming UrbanCut grooming collection"
        />
      </div>
    </section>
  );
}
