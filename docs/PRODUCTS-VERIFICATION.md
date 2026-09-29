# Products implementation — 29 September 2026

The black Products catalogue replaces the removed About block immediately after Services. The obsolete lower-page Products section is removed. Desktop/mobile navigation replaces About with Products; the footer reuses its existing Products link. The product FAQ is updated. No other homepage sections or service rules were redesigned.

## Catalogue and supplied assets

| Extensionless source in PRODUCTS IMAGES_.zip | Product | Unit price | Web derivative |
| --- | --- | --- | --- |
| WILDGRO BEARD GROWTH OIL | WildGro Beard Growth Oil | ₦18,500 | wildgro-beard-growth-oil.webp |
| BEARD BALM | Beard Balm | ₦16,500 | beard-balm.webp |
| VOLUMIZING SHAMPOO | Volumizing Shampoo with Protein | ₦20,500 | volumizing-shampoo.webp |
| LEAVE IN MILK CONDITIONER | Cloves-Infused Leave-In Milk Conditioner with Caffeine | ₦20,500 | leave-in-milk-conditioner.webp |
| WILDGRO HAIR GROWTH | WildGro Hair Growth | ₦18,500 | wildgro-hair-growth.webp |
| AFTERSHAVE TONIC | Witch Hazel Aftershave Tonic | ₦18,500 | witch-hazel-aftershave-tonic.webp |

All six are verified PNGs, 1254×1254, visually inspected against packaging. Square 960px WebP derivatives preserve the complete composition and are delivered through responsive Next Image. Total derivative size: 461,140 bytes. Source archive remains intact on the owner's computer; original PNG copies are in the local cache, not included in Git. Keep the source ZIP in separate asset storage.

## Purchase flow

Central catalogue, quantity/subtotal calculation, validation and message generation live in `src/lib/products.ts`. `Products.tsx` owns independent in-memory form state and a native modal dialog. First use defaults quantity to one and leaves fulfilment unselected. Reopening the same product retains edits; switching products resets quantity to one and updates its identity/price together. No customer data is persisted or logged.

Pickup omits all address/fee lines even if delivery fields previously contained values. Abuja delivery requires district and full address, and quotes its fee separately on WhatsApp. Notes are included only when non-empty. Both paths prepare an encoded request to 2349163444436 with the exact approved labels and notice. No payment, stock limit, appointment rule or confirmation screen was added.

## Verification

- Typecheck, production build, diff whitespace check: passed. No lint script is configured.
- All 19 logic tests passed: 14 existing service/schedule tests and 5 product tests covering catalogue/prices, positive whole-number quantities, conditional required fields, exact pickup text, current delivery/product/quantity values, encoding and hidden-address exclusion.
- Browser checked widths 360, 390, 600, 768, 999, 1000, 1024 and 1440, plus 599 immediately before the first breakpoint. One/two/three-column transitions correct; no page horizontal overflow. All names remain untruncated, images square and uncropped.
- Exactly one Products section, located after Services; no About anchor remains. Mobile Products navigation closes its menu and reaches #products.
- Every purchase button opened the correct product, unit price and message. Quantity two produced the expected subtotals for all six products. Zero, negative, fractional and empty quantities blocked the handoff and focused the quantity field.
- Empty customer name/fulfilment blocked the handoff and focused name. Delivery without district/address blocked and focused district. Pickup requires no address.
- Browser pickup quantity two produced ₦37,000. Delivery quantity three produced ₦55,500, current notes and address. Ampersands, accents, punctuation and line breaks survived URL encoding. Switching back to pickup removed address and delivery-fee lines.
- Handoff was intercepted locally: generated destination and text verified, no real order sent and no external WhatsApp app launch exercised. Form remained populated after the intercepted attempt.
- Focus enters the purchase heading; Tab/Shift+Tab wrap within the dialog; Escape closes and returns focus to the originating product button. Background scroll is locked and restored. A 360×600 short viewport retained internal scrolling and a reachable final action. Physical mobile keyboard behavior was not tested.
- Service category selection still opens its separate studio appointment form with the existing date field. Browser error log was empty.
- React review: derived totals from current state, stable product keys/IDs, no new dependencies, effect cleanup restores focus/scroll, no data storage or unnecessary effects.

## Screenshots

- [Desktop catalogue](screenshots/products/products-section-1440.png)
- [Tablet catalogue](screenshots/products/products-section-768.png)
- [Mobile catalogue](screenshots/products/products-section-390.png)
- [Studio pickup form](screenshots/products/products-pickup-desktop.png)
- [Home delivery form, tablet](screenshots/products/products-delivery-tablet.png)
- [Home delivery form, mobile](screenshots/products/products-delivery-mobile.png)
- [Mobile summary and final action](screenshots/products/products-pickup-mobile-action.png)

Screenshots use synthetic QA names and addresses. Local preview runs on the owner's Windows computer at http://127.0.0.1:3000/#products. No public preview, backend or deployment was created.
