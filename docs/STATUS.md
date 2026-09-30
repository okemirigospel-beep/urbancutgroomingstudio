# Current Services and schedule milestone — 28 September 2026

Services/booking refinements are implemented. Open every day: Mon–Sat 9 AM–9 PM; Sunday 1 PM–9 PM, Africa/Lagos. Shared hourly preferred starts end at 8 PM, filtered by known studio durations. Both forms enforce next-day requests; Home enquiries require date/time in Abuja time and detailed address. Wellness and Black Card are non-bookable previews. See SERVICES-REFINEMENT.md for exact rules, verification and screenshots. This supersedes all older hours/Sunday-closure notes below.

# Current typography milestone — 27 September 2026

Site-wide DM Sans + selective Crimson Text is implemented locally. Self-hosted real italic, explicit semantic font roles and a naira-only fallback preserve readable service/booking information. Build, typecheck and all 10 tests pass. Browser evidence and remaining native-zoom verification limitation are documented in docs/TYPOGRAPHY-VERIFICATION.md. No deployment or backend changes. Existing service scope and pending business inputs below remain applicable.

# Project status

New implementation, not recovered code. The original GitHub initial commit, README and supplied assets remain preserved. Next.js App Router, TypeScript and Tailwind run locally on the owner's Windows computer at http://127.0.0.1:3000. Nothing has been deployed.

## Current implementation — 27 September 2026

Services now uses the approved six-category artwork and 16-service catalogue (13 bookable, three Coming Soon, three verified durations). The single accessible dialog supports category lists, details, persistent-in-visit selection/quantities, studio form and final review. Standard services are studio visits; no customer address is requested. Abuja advance-date/Sunday rules and known-duration closing-time limits are enforced.

The authorised manual WhatsApp handoff targets 2349163444436. The visitor must press Send in WhatsApp; this website does not save, send or confirm a request. Form data and selection live only in React memory for the current page visit, are retained when dialogs close, and are lost on reload. No database, WhatsApp agent, payments or production availability system exists.

Home Service is a separate enquiry: ₦100,000 for a one-person premium package in Abuja; outside-Abuja requests are quoted separately. Treatments and arrangements are confirmed during enquiry. Black Card remains a non-actionable Coming Soon preview with a ₦50,000 registration fee, not a supplied monthly fee. Nail-care planned prices are not payable or selectable.

The completed header, hero, six-photo slideshow, information band and Services booking links are unchanged. FAQ and contact copy now reflect the approved catalogue and WhatsApp destination. Academy and product information remains provisional.

Pending owner inputs before any future launch: exact studio address/map, email and social destinations, authentic gallery/reviews, final product details and academy terms, deposit/cancellation/late/walk-in policies, hosting authorisation and any future backend scope. There are no missing category images and no credential requirement for manual click-to-chat.

## Historical milestones (superseded where the current status above differs)

Header/hero revision (25 September 2026): prominent intact logo in a black masthead; visible URBANCUT Grooming Studio brand line; gold headline emphasis; two rectangular Book an Appointment links to #services; six-photo slideshow with Previous/Next and pause/play controls; reduced-motion, hover/focus/offscreen/tab-visibility safeguards; black information band. Decorative arrows removed sitewide and prohibited in AGENTS.md. Production integrations remain deferred. Existing lower-section behaviour is preserved.

Latest responsive re-edit: combined SVG and uppercase two-line header wordmark; single-row tablet/mobile header with booking inside an in-flow menu; compact white desktop booking and black uppercase hero booking; edge-to-edge photo crops, 2.8-second dissolve and inset pause/play. Earlier footer controls and duplicate hero brand text removed. All requested responsive and interaction checks passed; see the latest VERIFICATION.md entry.

Latest focused finish: larger Georgia secondary wordmark directly beneath URBANCUT; no visible slideshow controls; image activation toggles pause; opaque 280ms directional slide replaces crossfade at the same 2.8-second interval. Verified responsive layouts, keyboard/click interaction, loop and reduced motion.

Latest header correction: actual SVG is the principal brand element, using a tight-bounds derivative at responsive widths. Companion wordmark removed. Before/after screenshots, visible-artwork measurements and navigation checks recorded in VERIFICATION.md. Hero and slideshow unchanged.

Mobile header refined to a fluid 160–190px visible emblem with approximately 99–114px header height across 320–430px phones. Larger tablet/desktop logo sizes preserved.

Booking copy cleanup (28 September 2026): concise current-state studio request, Listed total, optional notes only when supplied, one WhatsApp handoff callout and CONTINUE TO BOOKING. Date/time restrictions and existing agent destination preserved. See BOOKING-COPY-VERIFICATION.md for checks and screenshots.

Service-panel correction (28 September 2026): removed branding from the shared category, detail and booking header; titles now occupy the full available width. WhatsApp callout wording updated to 'redirected'. Browser review at 360/768/1440 verified no header logo or overflow; category/detail navigation checked. Main navigation logo preserved. Build and TypeScript passed. Screenshots: docs/screenshots/panel-header/.


Products implementation (29 September 2026): the About block and obsolete white product previews are replaced by one black six-product catalogue immediately after Services. Navigation/FAQ now point to this catalogue. Independent purchase form supports quantity, studio pickup and Abuja-only delivery through the existing manual WhatsApp destination. No appointment validation, payments or storage added. See PRODUCTS-VERIFICATION.md.

Hero Version 2 (30 September 2026): approved GROOMING, / ELEVATED. copy and paragraph implemented with DM Sans 700 and upright Crimson Text 600. Existing slideshow and Services action preserved. Responsive, enlarged-text, keyboard and build verification recorded in HERO-V2-VERIFICATION.md.


30 September 2026 update: Products is now Coming Soon, superseding the earlier available-purchase implementation. All six images/names/prices remain, but the purchase UI is removed and central validation/message generation rejects unavailable products. Products shares the Services editorial heading treatment. Slideshow now contains original six plus 14 ordered photographs; animation/timing unchanged. See COMING-SOON-SLIDESHOW-VERIFICATION.md.
30 September 2026: The Lookbook replaces Gallery placeholders with 26 manual photographs and an independent muted looping video. Verified responsive behavior, build, types and 18 tests. See LOOKBOOK-VERIFICATION.md.
Lookbook continuation: default 3-second visible autoplay switches permanently to manual on arrow interaction for the page visit; reduced motion manual. Three headings enlarged and approved supporting copy added. See LOOKBOOK-CONTINUATION.md; supersedes prior manual-only default.
