> Historical verification record. Scheduling and Services presentation have since changed; see [current refinement](SERVICES-REFINEMENT.md). Old Sunday-closure/half-hour results below do not describe the current application.

# Services implementation verification — 27 September 2026

Local preview: http://127.0.0.1:3000/#services, hosted on the owner's LENOVO Windows computer from C:\UCUTS. No deployment, tunnel, backend provisioning or WhatsApp agent was created. Restart locally with `powershell -ExecutionPolicy Bypass -File C:\UCUTS\scripts\local.ps1` if needed.

## Scope and changed files

- `src/lib/catalogue.ts`: approved six-category mapping, 16 standard services, separate Home Service and Black Card models, currency formatter.
- `src/lib/booking.ts`: availability-guarded selection, explicit quantities, duration-aware preference filtering, field validation, central WhatsApp destination and separate encoded message builders.
- `src/components/Services.tsx`: single native-dialog state machine, cards, category rows, details, offering previews, final reviews and safe manual handoff links.
- `src/components/BookingParts.tsx`: shared selection summary, labelled studio/Home Service forms and field errors.
- `src/lib/content.ts`, `src/app/page.tsx`: removed obsolete sample catalogue and updated directly related FAQ/contact statements.
- `src/app/globals.css`: scoped Services layouts and responsive dialogs. Existing header/hero CSS retained.
- `src/lib/appointments.ts`, `tests/appointments.test.ts`: clarified preference-interval naming; existing Abuja calendar logic preserved.
- `tests/booking.test.ts`: six additional regression tests.
- `public/media/services/*.webp`: six optimized derivatives from the supplied extensionless PNGs; original ZIP remains unchanged outside Git.
- `AGENTS.md`, `docs/STATUS.md`, `docs/DESIGN.md`, `docs/ASSETS.md`, `docs/VERIFICATION.md`, this report and the screenshot directory: current instructions, scope and evidence.

Header, HeroSlideshow, hero asset files, booking links and business-information band were not edited. No new dependency was added.

## Automated checks

- 10/10 Node tests pass: approved catalogue counts/prices/durations, availability guards, idempotent adds, adult-and-two-child estimate, explicit quantities/removal, invalid quantities, Abuja UTC day boundary, next-day rule, Sunday/invalid-date rejection, closing-time limits, field-specific errors and safe URL round trips.
- Known service durations are a lower bound for time filtering; no combined duration is displayed. A 45-minute service excludes 17:30. Unknown-duration services do not acquire a fabricated duration.
- Studio and Home Service message builders reject invalid requests; Unicode, ampersands, hashes, question marks and newlines round-trip through one encoded text parameter.
- Outside-Abuja messages contain “Price to be quoted” and no ₦100,000 charge. Home Service, nail care and Black Card cannot enter the studio basket.
- `npm run typecheck` and final `npm run build` pass. Build prerenders the local app successfully. `git diff --check` passes. Node emits an existing harmless module-type inference warning during tests; no test failure.

## Actual browser checks

Verified with the agent-browser skill against the running Next.js development server. Browser console contains development/HMR messages only; no application console errors or runtime exceptions.

| Viewport width | Category columns | Open dialog scroll width / client width | Result |
| --- | --- | --- | --- |
| 360 | 1 | 345 / 345 | Full-screen dialog, collapsible selection, no overflow |
| 768 | 2 | 719 / 719 | In-flow collapsed selection, readable rows |
| 1024 | 2 | 943 / 943 | Side summary and readable service controls |
| 1280 | 3 | 1083 / 1083 | Compact desktop rows and side summary |
| 1440 | 3 | 1083 / 1083 | Balanced six-card grid and dialog |

- All four standard category lists show only their own services. Wellness exposes three planned-price entries and zero add controls. Untimed service detail has no duration element. Signature Experience includes the five approved inclusions.
- Selection persists across details, categories, Close and reopening. List-to-detail Back restored the measured list scroll position (257px in the tested view).
- Signature Haircut + two Kids Haircuts = ₦25,000. Increasing children to three = ₦30,000; decreasing restores ₦25,000; removal leaves ₦15,000. Add is idempotent, with quantities controlled separately.
- Studio form contains name, date, time and optional notes; there is no location/address field. Empty form errors are field-linked, focus moves to the first invalid input, and an actual Sunday submission focuses the date with the closed-on-Sunday message. 17:30 is absent for the selected 45-minute haircut.
- Final review contains correct quantities, line totals, ₦25,000 estimate, date/time and notes. Back preserves entries. The generated wa.me URL was inspected, never opened or sent.
- Home Service opens its own details/form without a basket. Abuja is preselected. The Abuja message carries the listed package price; the outside-Abuja form requests destination city/state/country and venue, and its message uses quote-only pricing. Both variants were checked using clearly fictional QA data. Home date/time preferences are optional and subject to arrangement; international time is explicitly destination local time.
- Black Card has the registration fee explanation, ten proposed benefits and non-interactive Coming Soon status. Its only action is Close; no registration, enquiry, payment or waitlist exists.
- Native modal focus containment, keyboard Enter activation, Escape close, focus restoration, Back/Close visibility, body scroll containment and reopening were tested. A native-close/React-state synchronization edge case encountered during development was corrected and retested from a fresh page.
- Both existing desktop/hero appointment links still point to #services. Existing mobile navigation was preserved. Reduced-motion presentation was used for stable captures.

## Screenshots

Grid images are full-section overviews using taller capture viewports at the stated width; dialog captures use ordinary desktop/tablet/mobile viewport heights.

| Surface | Desktop / tablet | Mobile |
| --- | --- | --- |
| Six-card grid | [Desktop](screenshots/services-2026-09-27/grid-desktop.png), [tablet](screenshots/services-2026-09-27/grid-tablet.png) | [Mobile grid](screenshots/services-2026-09-27/grid-mobile.png) |
| Standard list | [1440px](screenshots/services-2026-09-27/list-1440.png), [1024px](screenshots/services-2026-09-27/list-1024.png), [768px](screenshots/services-2026-09-27/list-768.png), [1280px](screenshots/services-2026-09-27/list-1280.png) | [360px](screenshots/services-2026-09-27/list-360.png) |
| Service detail | [Signature Experience](screenshots/services-2026-09-27/detail-desktop.png) | [Untimed service](screenshots/services-2026-09-27/detail-mobile.png) |
| Studio final review | [Desktop](screenshots/services-2026-09-27/studio-review-desktop.png) | [Mobile](screenshots/services-2026-09-27/studio-review-mobile.png) |
| Home Service details | [Desktop](screenshots/services-2026-09-27/home-details-desktop.png) | [Mobile](screenshots/services-2026-09-27/home-details-mobile.png) |
| Home Service enquiry | [Outside-Abuja form](screenshots/services-2026-09-27/home-enquiry-desktop.png) | [Abuja form](screenshots/services-2026-09-27/home-enquiry-mobile.png) |
| Black Card | [Desktop preview](screenshots/services-2026-09-27/black-card-desktop.png) | [Mobile preview](screenshots/services-2026-09-27/black-card-mobile.png), [benefits](screenshots/services-2026-09-27/black-card-mobile-benefits.png) |

## Boundaries and remaining owner inputs

The implementation is ready for local review. The customer must press Send in WhatsApp; opening the chat neither saves nor submits anything with URBANCUT. Basket and form values remain in browser memory only until reload. There is no production availability lookup, persistence, payment or automated agent.

All six category assets are available. The original ZIP remains at the supplied Pictures path and needs separate original-asset backup; tracked WebP derivatives make the app recoverable from Git. Exact studio address/map and unrelated email/social details, gallery/reviews, academy/product terms and business policies still await owner confirmation. The unspecified service durations remain deliberately absent.
