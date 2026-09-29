"use client";
import Image from "next/image";
import { Tag, MessageCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  products,
  emptyPurchase,
  productMoney,
  productSubtotal,
  validatePurchase,
  purchaseMessage,
  type Product,
  type Purchase,
  type PurchaseErrors,
} from "@/lib/products";
import { whatsappUrl } from "@/lib/booking";

export default function Products() {
  const [selected, setSelected] = useState<Product | null>(null);
  const [data, setData] = useState<Purchase>(emptyPurchase);
  const [errors, setErrors] = useState<PurchaseErrors>({});
  const dialog = useRef<HTMLDialogElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const lastProduct = useRef<string | null>(null);
  useEffect(() => {
    if (!selected || !dialog.current) return;
    const node = dialog.current;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    node.showModal();
    heading.current?.focus({ preventScroll: true });
    return () => {
      node.close();
      document.body.style.overflow = oldOverflow;
      trigger.current?.focus({ preventScroll: true });
    };
  }, [selected]);
  const subtotal = selected
    ? productSubtotal(selected.id, data.quantity)
    : null;
  function update(key: keyof Purchase, value: string) {
    setData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({
      ...prev,
      [key]: undefined,
      ...(key === "fulfilment" ? { area: undefined, address: undefined } : {}),
    }));
  }
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected) return;
    const next = validatePurchase(selected.id, data);
    setErrors(next);
    if (Object.keys(next).length) {
      requestAnimationFrame(() =>
        document.getElementById(`purchase-${Object.keys(next)[0]}`)?.focus(),
      );
      return;
    }
    window.open(
      whatsappUrl(purchaseMessage(selected.id, data)),
      "_blank",
      "noopener,noreferrer",
    );
  }
  function field(
    key: "name" | "quantity" | "area" | "address" | "notes",
    label: string,
    multiline = false,
  ) {
    const props = {
      id: `purchase-${key}`,
      name: key,
      value: data[key],
      required: key !== "notes",
      onChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => update(key, event.target.value),
      "aria-invalid": !!errors[key],
      "aria-describedby": errors[key] ? `purchase-${key}-error` : undefined,
    };
    return (
      <div className="uc-field">
        <label htmlFor={props.id}>{label}</label>
        {multiline ? (
          <textarea
            {...props}
            rows={key === "notes" ? 3 : 2}
            autoComplete={key === "address" ? "street-address" : "off"}
          />
        ) : (
          <input
            {...props}
            type={key === "quantity" ? "number" : "text"}
            min={key === "quantity" ? 1 : undefined}
            step={key === "quantity" ? 1 : undefined}
            inputMode={key === "quantity" ? "numeric" : undefined}
            autoComplete={
              key === "name"
                ? "name"
                : key === "area"
                  ? "address-level2"
                  : "off"
            }
          />
        )}
        {errors[key] && (
          <p className="uc-error" id={`purchase-${key}-error`}>
            {errors[key]}
          </p>
        )}
      </div>
    );
  }
  return (
    <>
      <section
        id="products"
        className="uc-products shell section"
        aria-labelledby="products-heading"
      >
        <header className="uc-products-heading">
          <h2 id="products-heading">OUR PRODUCTS</h2>
          <p>Studio pickup or delivery within Abuja.</p>
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
              <button
                aria-label={`Purchase Product: ${product.name}`}
                onClick={(event) => {
                  trigger.current = event.currentTarget;
                  if (lastProduct.current !== product.id)
                    setData((prev) => ({ ...prev, quantity: "1" }));
                  lastProduct.current = product.id;
                  setErrors({});
                  setSelected(product);
                }}
              >
                PURCHASE PRODUCT
              </button>
            </article>
          ))}
        </div>
      </section>
      <dialog
        className="uc-dialog uc-purchase-dialog"
        ref={dialog}
        aria-labelledby="purchase-heading"
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const controls = Array.from(
            event.currentTarget.querySelectorAll<HTMLElement>(
              "button, input, textarea, select, a[href]",
            ),
          ).filter(
            (node) =>
              !node.hasAttribute("disabled") &&
              node.getClientRects().length > 0,
          );
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (
            event.shiftKey &&
            (document.activeElement === first ||
              document.activeElement === heading.current)
          ) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
        onCancel={(event) => {
          event.preventDefault();
          setSelected(null);
        }}
      >
        {selected && (
          <div className="uc-dialog-shell">
            <header className="uc-dialog-header">
              <div className="uc-dialog-nav">
                <button
                  className="uc-close"
                  aria-label="Close purchase details"
                  onClick={() => setSelected(null)}
                >
                  Close
                </button>
              </div>
              <h2 id="purchase-heading" tabIndex={-1} ref={heading}>
                Purchase details
              </h2>
            </header>
            <div className="uc-modal-scroll">
              <form
                className="uc-form uc-purchase-form"
                onSubmit={submit}
                noValidate
              >
                <div className="uc-purchase-product">
                  <Image
                    src={selected.image}
                    alt={selected.alt}
                    width={112}
                    height={112}
                    sizes="112px"
                  />
                  <div>
                    <h3>{selected.name}</h3>
                    <p>Unit price: {productMoney(selected.price)}</p>
                  </div>
                </div>
                <div className="uc-form-row">
                  {field("name", "Customer name (required)")}
                  {field("quantity", "Quantity (required)")}
                </div>
                <fieldset
                  className="uc-fulfilment"
                  aria-describedby={
                    errors.fulfilment ? "purchase-fulfilment-error" : undefined
                  }
                >
                  <legend>Fulfilment method (required)</legend>
                  <div className="uc-fulfilment-options">
                    {(
                      [
                        ["pickup", "Studio pickup"],
                        ["delivery", "Home delivery — Abuja only"],
                      ] as const
                    ).map(([value, label], index) => (
                      <label key={value}>
                        <input
                          id={
                            index === 0
                              ? "purchase-fulfilment"
                              : "purchase-delivery"
                          }
                          type="radio"
                          name="fulfilment"
                          value={value}
                          checked={data.fulfilment === value}
                          onChange={() => update("fulfilment", value)}
                          required
                          aria-invalid={!!errors.fulfilment}
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                  {errors.fulfilment && (
                    <p className="uc-error" id="purchase-fulfilment-error">
                      {errors.fulfilment}
                    </p>
                  )}
                </fieldset>
                {data.fulfilment === "delivery" && (
                  <div className="uc-delivery-fields">
                    {field("area", "Area / district in Abuja (required)")}
                    {field("address", "Full delivery address (required)", true)}
                    <p>Delivery fee confirmed on WhatsApp.</p>
                  </div>
                )}
                {field("notes", "Additional notes (optional)", true)}
                <dl className="uc-purchase-summary" aria-live="polite">
                  <div>
                    <dt>Product</dt>
                    <dd>{selected.name}</dd>
                  </div>
                  <div>
                    <dt>Unit price</dt>
                    <dd>{productMoney(selected.price)}</dd>
                  </div>
                  <div>
                    <dt>Quantity</dt>
                    <dd>
                      {subtotal === null
                        ? "Enter a valid quantity"
                        : Number(data.quantity)}
                    </dd>
                  </div>
                  <div className="uc-purchase-total">
                    <dt>Product subtotal</dt>
                    <dd>{subtotal === null ? "—" : productMoney(subtotal)}</dd>
                  </div>
                  <div>
                    <dt>Fulfilment</dt>
                    <dd>
                      {data.fulfilment === "pickup"
                        ? "Studio pickup"
                        : data.fulfilment === "delivery"
                          ? "Home delivery — Abuja"
                          : "Choose above"}
                    </dd>
                  </div>
                </dl>
                <div className="uc-handoff-note">
                  <MessageCircle
                    size={22}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                  <p>
                    You’ll be redirected to WhatsApp to continue your purchase.
                  </p>
                </div>
                <button type="submit" className="uc-primary">
                  CONTINUE TO PURCHASE
                </button>
              </form>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
