# Service gallery refinement — 1 November 2026

## Completed and preserved

- The latest Home (45.16s) and Lookbook (32.82s video stream) files were already installed. No further video editing. Both rechecked playing silently, inline, looping and contained on the mobile preview.
- Lookbook remains **34**, with its existing protected sequence and six October additions unchanged. Count is derived from its array. Further allocation changes await confirmed person groups.
- Shared manual `ServiceGallery` now serves both Sporting Waves options and Other Colours. Buttons, horizontal swipe, keyboard arrows, stable frame and position counter retained. Vertical touch gestures do not advance slides; no autoplay.
- Waves in both dialogs: **1001242376.jpg, 1001242380.jpg, IMG-20261031-WA0087.jpg**. The new attachment and 1001242378.jpg have the same composition with minor recompression (same dimensions, mean pixel difference approximately 1/255); only the new attachment is rendered as their canonical copy. Its embedded blurred top/bottom strips are removed without cutting the hairstyle. 2376's thin embedded strips are also removed. Originals untouched.
- Correction to historical October notes: 1001242382.jpg is a different photographic composition; it is not established as the same photograph as 2378. It is retired from both dialogs in favour of the requested new photograph, without asserting a person's identity from faces. Neither old 2378 nor 2382 creates an additional displayed slide.
- The with-products dialog now has one ivory/gold **Take-home essentials** panel, full product photograph and exactly Wave cream, Durag, Wave brush, Wave texturizer. Names use two columns when the panel's own width permits, one otherwise. No duplicate old list. Prices remain 25,000 / 50,000 naira.
- Hair & Scalp Care front card is exactly four: **1001242368.jpg** (orange colour), **1001242361.jpg** (blonde colour), **9.jpg** (burgundy colour), **1.jpg** (braids).
- Transferred into **Other Colours**, in order: **7.jpg, 8 (2).jpg, 1001242363.jpg**. All three are absent from the category preview; its other removed braid (3.jpg) retains only its existing Lookbook placement. Other Colours stays 25,000 naira with unchanged description and Add to Booking.
- The exact two policy FAQs remain first and initially visible. Removed the redundant later missed-appointment/rescheduling question. Other questions retain their relative order. Studio form/review policy blocks and Home/Academy boundaries unchanged.

## Owner review remains pending

The owner confirmed no cross-photo filename groupings are available yet and requested unaffected work continue. **Two-appearances-per-person compliance is not verified.** No facial recognition or identity inference was used. Reused photograph copies are grouped; this does not prove that different photos show different people.

- [Numbered contact sheets and filename/placement index](review-nov1/index.html): 56 active source-photo groups on five sheets. Each image is shown once with complete source filename where known, otherwise its full delivery filename. Known aliases and repeated placements are in the index.
- [Person-review record](person-usage-nov1.json): numbers match the sheets; all unknown cross-photograph groupings explicitly pending. Consider background people and practitioners as well as clients. Reply with number groups, e.g. “03, 12 and 27 show the same person”. Owner groupings will govern subsequent allocations.
- [Current source-photo audit](image-usage-nov1.json): 56 groups, at most two placements per source photograph, 87 unique delivery variants. This supersedes the October source ledger for current placements, but is not a person-level compliance claim.
- Earlier removal-reference screenshots were inspected; excluded photographs remain absent. No Lookbook photographs were added or restored during this update.

## Verification

- Production build / TypeScript passed after correcting the shared count parameter type. All 37 tests pass, including current asset SHA-256 checks, exact four-card count, absence of transferred photos from the card, protected Lookbook order and booking regressions.
- Browser checked at 1440×1000, 768×1024, 390×844 and 320×800. No dialog horizontal overflow; product image complete; appropriate gallery/panel stacking. Gallery wrap, manual hold, simulated horizontal/vertical touch, back, close and booking actions verified.
- All 87 audited delivery images decoded successfully. New canonical wave image resolves at 720×520. Both replacement videos still advance with expected dimensions, muted, looping and without website controls. Existing lifecycle code unchanged.
- Both wave options plus Other Colours produce **100,000 naira**, and studio policies remain accessible before review. No WhatsApp messages or appointments sent. Required-field/time validation remains covered by unchanged regression tests.
- Priority FAQ wording verified in the initial list. No browser errors observed. Physical-device gestures and OS-specific autoplay restrictions not tested; browser viewport/touch emulation used.
- Existing missing website pause controls remain a motion-accessibility limitation, unchanged by this scope.

## Delivery

Branch `urbancut-continuation`, remote `checkpoint`. Hosting and indexing settings unchanged; authorized Git-connected Netlify publication verified after push in the final handover. Person review is the sole intentionally outstanding acceptance check.

Screenshots: [desktop essentials](screenshots/nov1-kit-desktop.png), [mobile essentials](screenshots/nov1-kit-mobile.png), [Other Colours desktop](screenshots/nov1-colours-desktop.png), [Other Colours mobile](screenshots/nov1-colours-mobile.png).
