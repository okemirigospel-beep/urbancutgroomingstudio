import test from "node:test";
import assert from "node:assert/strict";
import {
  products,
  emptyPurchase,
  productSubtotal,
  validatePurchase,
  purchaseMessage,
  type Purchase,
} from "../src/lib/products.ts";
import { whatsappUrl } from "../src/lib/booking.ts";
const id = products[0].id;
const pickup: Purchase = {
  ...emptyPurchase,
  name: " Ada O’Neil & José ",
  quantity: "2",
  fulfilment: "pickup",
};
test("six authoritative product prices and distinct asset mappings", () => {
  assert.deepEqual(
    products.map((p) => p.price),
    [18500, 16500, 20500, 20500, 18500, 18500],
  );
  assert.equal(new Set(products.map((p) => p.id)).size, 6);
  assert.equal(new Set(products.map((p) => p.image)).size, 6);
});
test("quantity accepts positive integers, rejects invalid and unrepresentable totals", () => {
  for (const q of [
    "0",
    "-1",
    "1.5",
    "",
    "abc",
    "Infinity",
    "1e3",
    "9007199254740991",
  ]) {
    assert.equal(productSubtotal(id, q), null);
    assert.ok(validatePurchase(id, { ...pickup, quantity: q }).quantity);
  }
  assert.equal(productSubtotal(id, "2"), 37000);
  assert.equal(productSubtotal(id, "10000"), 185000000);
  assert.equal(productSubtotal("unknown", "1"), null);
});
test("name and deliberate fulfilment are required; address only for delivery", () => {
  assert.ok(validatePurchase(id, emptyPurchase).name);
  assert.ok(validatePurchase(id, emptyPurchase).fulfilment);
  assert.deepEqual(validatePurchase(id, pickup), {});
  const d = { ...pickup, fulfilment: "delivery" as const };
  assert.ok(validatePurchase(id, d).area);
  assert.ok(validatePurchase(id, d).address);
  assert.deepEqual(
    validatePurchase(id, {
      ...d,
      area: "Wuse II",
      address: "12 Example Street",
    }),
    {},
  );
  assert.throws(() => purchaseMessage(id, d));
});
test("pickup exact message omits hidden address, delivery fee, empty notes and appointment rules", () => {
  const message = purchaseMessage(id, {
    ...pickup,
    area: "Hidden area",
    address: "Hidden address",
    notes: "  ",
  });
  assert.equal(
    message,
    "Hello UrbanCut, I’d like to purchase a product.\n\nName: Ada O’Neil & José\nProduct: WildGro Beard Growth Oil\nUnit price: ₦18,500\nQuantity: 2\nProduct subtotal: ₦37,000\n\nFulfilment: Studio pickup",
  );
});
test("delivery and edited product/quantity use current values and survive URL encoding", () => {
  const data: Purchase = {
    ...pickup,
    quantity: "3",
    fulfilment: "delivery",
    area: "Wuse II",
    address: "12 O’Neil St. & Flat #2 / É",
    notes: " Ring once & ask for José. ",
  };
  const text = purchaseMessage(products[1].id, data);
  assert.ok(
    text.includes(
      "Product: Beard Balm\nUnit price: ₦16,500\nQuantity: 3\nProduct subtotal: ₦49,500",
    ),
  );
  assert.ok(
    text.endsWith(
      "Fulfilment: Home delivery\nArea: Wuse II, Abuja\nAddress: 12 O’Neil St. & Flat #2 / É\nDelivery fee: To be confirmed\nNotes: Ring once & ask for José.",
    ),
  );
  const url = new URL(whatsappUrl(text));
  assert.equal(url.pathname, "/2349163444436");
  assert.equal(url.searchParams.get("text"), text);
  assert.ok(
    !purchaseMessage(id, { ...data, fulfilment: "pickup" }).includes(
      "Address:",
    ),
  );
});
