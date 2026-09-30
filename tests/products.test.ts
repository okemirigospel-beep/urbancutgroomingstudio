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
test("all products reject valid stale pickup and delivery requests", () => {
  for (const product of products) {
    assert.equal(product.status, "coming-soon");
    for (const fulfilment of ["pickup", "delivery"] as const) {
      const request = {
        ...pickup,
        fulfilment,
        area: "Wuse II",
        address: "12 QA Street",
      };
      assert.ok(validatePurchase(product.id, request).product);
      assert.throws(
        () => purchaseMessage(product.id, request),
        /valid purchase details/,
      );
    }
  }
  assert.ok(validatePurchase("unknown", pickup).product);
  assert.throws(() => purchaseMessage("unknown", pickup));
});
