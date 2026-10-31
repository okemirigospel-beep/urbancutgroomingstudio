# Final media and studio policy update — 31 October 2026

## Scope and source mapping

- Latest `final updates_.zip` sources preserved outside the repository. Website derivatives are in `public/media/oct31`.
- Home: `home service updated.mp4` → `home.mp4`, 360×640, 45.16 seconds, 3.87 MB. Lookbook: `lookbook updated vid.mp4` → `lookbook.mp4`, 478×850, 32.82 seconds, 4.91 MB. Original Lookbook container was 32.85 seconds because of its audio tail. The entire video stream is identical; no timeline cuts, crop, speed change, upscale or video re-encoding. Audio removed, fast-start metadata enabled, posters refreshed. Stream hashes and metadata: [video verification](video-verification-oct31.json).
- Lookbook retains its protected first 28 photographs. Appended in order: 1001242392, 1001242391, 1001242395, 1001242396, 1001242389, 1001242393 (all .jpg sources). Final count **34**.
- Both Sporting Waves dialogs: 1001242376, 1001242380, 1001242382; manual buttons, horizontal touch swipe, keyboard arrows and position indicator. 1001242378 is a mirrored monochrome alternate of 2382 and excluded. The supplied 2380 is itself monochrome and retained as explicitly requested.
- With-products kit: `Premium wave grooming essentials still life.png` → `wave-kit.webp`, full composition alongside gallery on desktop, stacked on phones; all four approved inclusions retained.
- Hair & Scalp Care adds 1001242368, 1001242363, 1001242361 once each, total eight slides. Replaced its extra `2 (2).jpg` placement with approved `1.jpg`. Beard card's extra WA0055 placement replaced with suitable supplied beard portrait 1001242355. Both replaced photos remain in protected Hero/Lookbook placements. Alternatives 2353/2354 unused.

## Image-use audit

[Machine-readable source/variant/placement ledger](image-usage-oct31.json): 56 source groups, 75 content placements, maximum **two** per photograph; 92 unique delivery variants. Includes source hashes where extracted source files are available, every delivery-file SHA-256, aliases and visual comparison of earlier source contact sheets. Wave photographs consume both permitted placements in the two dialogs. Responsive variants count once. Logos, retired/unmounted media and video footage are not photograph placements. Previously excluded photographs remain excluded. Regression test checks placement limits, recorded file hashes and active media coverage.

## Studio policies

Shared exact approved wording appears in the studio request form before Review Studio Request and in its review before WhatsApp. Relevant FAQs use the same constants. Explicit notice distinguishes an unpaid request from a studio-confirmed booking after full payment. No payment provider, paid state, account details or confirmation automation added. Home enquiry and Academy terms unchanged.

## Validation

- Production build and TypeScript passed. All 37 regression tests passed. Diff whitespace check passed.
- Browser layouts reviewed at 1440×1000, 768×1024, 390×844 and 320×800. No dialog horizontal overflow. Full product image visible, phone stacking and vertical scrolling verified; complete hairline composition retained with contain fitting.
- Both wave galleries: previous/next wrap, horizontal synthetic touch swipe, vertical gesture preserves slide, no automatic advance after waiting; photos load. Add both services: correct 25,000 + 50,000 = 75,000 naira. Back and close work.
- Studio required name/date/time errors verified. Next-day restriction remains; valid future request yields current name, two services, quantities, 75,000 total, date and time. Correct WhatsApp destination 2347063291013 inspected without opening/sending. Policy block present on form and review, absent from Home enquiry.
- All 92 audited image variants decoded in browser. Lookbook navigation verified 34→1→34. Protected opening and six additions asserted by regression tests.
- Both replacement videos played silently with correct decoded dimensions, contain fitting, loop and no website controls. End-to-start loop tested. Home paused offscreen, with open dialog and simulated hidden document; resumed after closing dialog. Dynamic reduced-motion switch paused both players and displayed posters. No browser errors or console output during these checks.
- Actual mobile hardware gestures and OS-specific autoplay restrictions were not tested; viewport/touch events were browser-emulated. Existing autoplay rejection handlers are unchanged. Existing control-free video accessibility limitation remains: visitors have no website pause control; reduced-motion/poster and offscreen/tab suspension do not establish complete motion-accessibility compliance.

## Delivery

Established branch `urbancut-continuation`, remote `checkpoint`. Before push, remote and published Netlify source both matched baseline 5df4fec0eadcd35668cf34436d2010b5748ee8fb. Owner previously enabled builds and authorized this push. Hosting configuration and indexing flags unchanged. Deployment correspondence and public noindex are verified separately after push and reported in the handover.

Screenshots: [desktop waves](screenshots/oct31-waves-desktop.png), [mobile kit](screenshots/oct31-kit-mobile.png), [tablet waves](screenshots/oct31-kit-tablet.png).
