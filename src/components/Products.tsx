"use client";
import Image from "next/image";
import { Tag } from "lucide-react";
import { useState } from "react";
import { products, productMoney, type Product } from "@/lib/products";

function ProductStatus({ product }: { product: Product }) {
  const [dismissed, setDismissed] = useState(false);
  const tip = `launch-${product.id}`;
  return (
    <span
      className="uc-product-status"
      tabIndex={0}
      role="note"
      aria-label={`${product.name}: Coming Soon`}
      aria-describedby={tip}
      data-dismissed={dismissed}
      onMouseEnter={() => setDismissed(false)}
      onFocus={() => setDismissed(false)}
      onKeyDown={(event) => {
        if (event.key === "Escape") setDismissed(true);
        if (event.key === "Enter" || event.key === " ") event.preventDefault();
      }}
    >
      {product.status === "coming-soon" ? "COMING SOON" : "UNAVAILABLE"}
      <span className="uc-product-tooltip" id={tip} role="tooltip">
        This product will be launched soon.
      </span>
    </span>
  );
}
export default function Products() {
  return (
    <section
      id="products"
      className="uc-products shell section"
      aria-labelledby="products-heading"
    >
      <header className="uc-products-heading">
        <h2 id="products-heading" className="type-editorial uc-section-title">
          Our Products
        </h2>
        <p>Our grooming collection is launching soon.</p>
      </header>
      <div className="uc-product-grid">
        {products.map((product) => (
          <article className="uc-product-card" key={product.id}>
            <Image
              src={product.image}
              alt={product.alt}
              width={960}
              height={960}
              sizes="(max-width: 599px) 90vw, (max-width: 999px) 43vw, 350px"
            />
            <h3>{product.name}</h3>
            <p className="uc-product-price">
              <Tag size={20} aria-hidden="true" />
              {productMoney(product.price)}
            </p>
            <ProductStatus product={product} />
          </article>
        ))}
      </div>
    </section>
  );
}
