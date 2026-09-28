# Services and booking refinement — 28 September 2026

Local checkout: C:\UCUTS. Branch: urbancut-continuation. Baseline: 6f73b75. Preview: http://127.0.0.1:3000/#services on the owner's Windows computer. No deployment, backend, payment or automated messaging changes.

## Current business rules

This milestone supersedes older hours, Sunday-closed behavior and half-hour choices in historic project documents. The owner’s latest refinement brief is authoritative.

- Monday–Saturday: **9 AM–9 PM**; preferred hourly starts 9 AM through 8 PM.
- Sunday: **1 PM–9 PM**; preferred hourly starts 1 PM through 8 PM.
- All dates and times use **Africa/Lagos**, labelled Abuja time, including outside-Abuja enquiries. At least one calendar day ahead; this is not a rolling 24-hour rule. Saturday can request Sunday. Same-day and invalid dates are rejected.
- Shared schedule in src/lib/appointments.ts drives both forms, validation, opening-hours display, FAQ/contact and message policy. No options before a date is selected. Changing dates clears an ineligible time and announces the need to choose again; still-eligible times are retained.
- Known studio durations, including quantities, are a conservative lower bound: a 45-minute service can prefer 8 PM; two cannot. Existing 35/45-minute durations and prices remain intact. No unknown duration is invented. Home package duration/travel are unverified, so hourly choices are preferences requiring the agent to confirm that the visit can fit before closing.
- Home Service now requires preferred date/time as well as its existing address/name fields, using the same validation as studio. Abuja remains the ₦100,000 one-person enquiry package. Outside Abuja remains quote-only, with destination/address. No studio address field was added.
- Wellness and Black Card are Coming Soon. Wellness is now explicitly a coming-soon category; its list/details show information and planned prices only, with no booking basket/Continue action. Basket/message guards reject unavailable IDs. Black Card has no active booking action.

## Interface and assets

The owner-supplied ZIP has exactly four PNG references: clock icon, duration icon, price tag and shopping cart. Inspected each on white at a readable size. Adapted their meanings to the already installed Lucide Clock3, Timer, Tag and ShoppingCart icons; consistent 1.8 stroke for information/metadata, dark gold on white and light gold on black. MapPin and CalendarDays match the same family. Icons accompany visible text; no dollar icon, additional icon dependency or copied raster UI assets.

The newly supplied original SVG has SHA-256 615cac50bfde9528d9bb4fb68e7682a2dc59c567137881a68a591606473769d2, identical to public/media/urbancut-logo.svg. Panel headers reuse the existing tight-bounds header derivative with unchanged paths/proportions/colours. The logo appears once in available category/detail/request headers, never on rows. Responsive logo boxes are 150px desktop, 128px tablet and 100px phone. Primary titles, Back and Close remain visible. No asset is missing; the source ZIP remains unchanged in Pictures.

Services has the supplied two-sentence introduction and no implementation-artwork explanation. The recent reduced top spacing is preserved. Both forthcoming categories have matching uppercase badges; Wellness subtitle is just Nail & Foot Care. Underlined service actions gain dark-gold hover/focus with a visible focus ring. Price/duration metadata has aligned tag/timer icons with no dot separator. Cart-labelled CONTINUE TO BOOKING actions contain no amount; estimates remain separately visible. The black band has three coordinated Visit us / Open every day / Plan your visit groups, a two-line schedule, tablet rearrangement and stacked mobile separators.

The existing hero slideshow, header logo sizing, typography, service descriptions/prices and unrelated content are preserved. The logo is not recreated or recoloured. No decorative arrows.

## Verification performed

- Production build and TypeScript check passed. Thirteen Node tests pass: catalogue invariants, basket guards, Abuja date boundary, next-day/Sunday eligibility, all six weekday schedules, hourly choices, invalid-date and closing-time rejection, date-change reset/preservation, known-duration overruns, studio/home validation, unavailable items excluded from messages and correct quote-only outside-Abuja handoff.
- Actual browser at 1440, 1024, 768, 430, 360 and 320px: no document horizontal overflow. Viewed screenshots of the new band/intro at desktop/tablet/mobile, branded list at three widths, 320px detail with aligned icons and Back/Close, tablet studio form/review, Wellness information-only panel, mobile Home form/review and membership preview.
- Studio: selected Signature Haircut, changed Saturday 2026-10-03 at 9 AM to Sunday 2026-10-04. Time cleared; options were exactly 13:00–20:00. Selected 20:00, reviewed ₦15,000 and the correct date/time/advance policy. No WhatsApp message sent.
- Home: same Saturday 9 AM to Sunday change cleared the time and produced 13:00–20:00. Abuja review retained ₦100,000 and address; outside-Abuja review retained destination/address, said Price to be quoted and used Abuja time. No message sent.
- Wellness browser snapshot contained only Close and View Service controls, no Add/Continue/cart. Black Card had only Close. Unit tests also exercise forged unavailable IDs.
- Gold focus colour computed as rgb(128,97,18); action underline remains visible without hover. Continue actions had no naira amount. Main browser reported no runtime errors.
- Checked a 640×450 layout viewport (200% equivalent reflow of 1280×900) with accessible Close and no panel horizontal overflow. Native browser zoom itself was not exercised; this is a verification limitation, not a claim of native zoom testing.
- Existing Node MODULE_TYPELESS_PACKAGE_JSON test warning persists; checks pass. No unresolved source-asset limitation. Unknown home travel/service duration remains deliberately subject to confirmation.

## Screenshots

- [Before](screenshots/services-refinement/before.png)
- Information band and Services: [Desktop](screenshots/services-refinement/band-services-1440.png), [Tablet](screenshots/services-refinement/band-services-768.png), [Mobile](screenshots/services-refinement/band-services-360.png)
- Category list: [Desktop](screenshots/services-refinement/list-1440.png), [Tablet](screenshots/services-refinement/list-768.png), [320px](screenshots/services-refinement/list-320.png)
- [320px service detail](screenshots/services-refinement/detail-320.png)
- [Sunday studio form](screenshots/services-refinement/studio-sunday-768.png), [Studio review](screenshots/services-refinement/studio-review-768.png)
- [Wellness preview](screenshots/services-refinement/wellness-768.png), [Black Card](screenshots/services-refinement/black-card-320.png)
- [Home form](screenshots/services-refinement/home-form-360.png), [Outside-Abuja review](screenshots/services-refinement/home-outside-review-360.png)
- [Compact reflow](screenshots/services-refinement/reflow-panel-640.png)

Some earlier captures precede the final extension of the same logo header to Home Service and review; their scheduling content is identical. The final outside-Abuja capture includes that header. All form names/addresses are dummy QA input, not customer data.
