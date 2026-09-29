export const products = [
  {
    id: "wildgro-beard-growth-oil",
    name: "WildGro Beard Growth Oil",
    price: 18500,
    image: "/media/products/wildgro-beard-growth-oil.webp",
    alt: "UrbanCut WildGro Beard Growth Oil in an amber dropper bottle",
  },
  {
    id: "beard-balm",
    name: "Beard Balm",
    price: 16500,
    image: "/media/products/beard-balm.webp",
    alt: "UrbanCut Beard Balm in a black tin with a cream label",
  },
  {
    id: "volumizing-shampoo",
    name: "Volumizing Shampoo with Protein",
    price: 20500,
    image: "/media/products/volumizing-shampoo.webp",
    alt: "UrbanCut Volumizing Shampoo with Protein in a black bottle",
  },
  {
    id: "leave-in-milk-conditioner",
    name: "Cloves-Infused Leave-In Milk Conditioner with Caffeine",
    price: 20500,
    image: "/media/products/leave-in-milk-conditioner.webp",
    alt: "UrbanCut Leave-In Milk Conditioner in a black pump bottle",
  },
  {
    id: "wildgro-hair-growth",
    name: "WildGro Hair Growth",
    price: 18500,
    image: "/media/products/wildgro-hair-growth.webp",
    alt: "UrbanCut WildGro Hair Growth in a square amber dropper bottle",
  },
  {
    id: "witch-hazel-aftershave-tonic",
    name: "Witch Hazel Aftershave Tonic",
    price: 18500,
    image: "/media/products/witch-hazel-aftershave-tonic.webp",
    alt: "UrbanCut Witch Hazel Aftershave Tonic in an amber bottle",
  },
] as const;
export type Product = (typeof products)[number];
export type Purchase = {
  name: string;
  quantity: string;
  fulfilment: "" | "pickup" | "delivery";
  area: string;
  address: string;
  notes: string;
};
export type PurchaseErrors = Partial<
  Record<keyof Purchase | "product", string>
>;
export const emptyPurchase: Purchase = {
  name: "",
  quantity: "1",
  fulfilment: "",
  area: "",
  address: "",
  notes: "",
};
export const productMoney = (value: number) =>
  `₦${value.toLocaleString("en-NG")}`;
export function productSubtotal(id: string, quantity: string): number | null {
  const product = products.find((p) => p.id === id);
  const q = Number(quantity);
  if (
    !product ||
    !/^\d+$/.test(quantity) ||
    !Number.isSafeInteger(q) ||
    q < 1 ||
    !Number.isSafeInteger(product.price * q)
  )
    return null;
  return product.price * q;
}
export function validatePurchase(id: string, data: Purchase): PurchaseErrors {
  const errors: PurchaseErrors = {};
  if (!products.some((p) => p.id === id)) errors.product = "Choose a product.";
  if (!data.name.trim()) errors.name = "Enter your name.";
  if (productSubtotal(id, data.quantity) === null)
    errors.quantity = "Enter a valid positive whole-number quantity.";
  if (data.fulfilment !== "pickup" && data.fulfilment !== "delivery")
    errors.fulfilment = "Choose studio pickup or home delivery.";
  if (data.fulfilment === "delivery") {
    if (!data.area.trim()) errors.area = "Enter your Abuja area or district.";
    if (!data.address.trim())
      errors.address = "Enter your full delivery address.";
  }
  return errors;
}
export function purchaseMessage(id: string, data: Purchase) {
  if (Object.keys(validatePurchase(id, data)).length)
    throw new Error("Enter valid purchase details first.");
  const product = products.find((p) => p.id === id)!;
  return [
    "Hello UrbanCut, I’d like to purchase a product.",
    "",
    `Name: ${data.name.trim()}`,
    `Product: ${product.name}`,
    `Unit price: ${productMoney(product.price)}`,
    `Quantity: ${Number(data.quantity)}`,
    `Product subtotal: ${productMoney(productSubtotal(id, data.quantity)!)}`,
    "",
    ...(data.fulfilment === "pickup"
      ? ["Fulfilment: Studio pickup"]
      : [
          "Fulfilment: Home delivery",
          `Area: ${data.area.trim()}, Abuja`,
          `Address: ${data.address.trim()}`,
          "Delivery fee: To be confirmed",
        ]),
    ...(data.notes.trim() ? [`Notes: ${data.notes.trim()}`] : []),
  ].join("\n");
}
