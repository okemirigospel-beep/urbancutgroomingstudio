# Hero Version 2 — 30 September 2026

Implemented the supplied HOMEPAGE TEXT PNG reference as accessible HTML/CSS, not an embedded image. One H1 reads GROOMING, ELEVATED. with a real word boundary. The approved paragraph is exact and has no forced line breaks. The existing Services action and slideshow are unchanged.

Fonts: existing self-hosted DM Sans 700 for GROOMING, Crimson Text 600 normal for ELEVATED, DM Sans 400 paragraph and 700 button. No new fonts or weights loaded. Crimson Text was deliberately chosen after comparing the browser render against the reference; the reference does not prove a particular font identity. Gold remains the established #896815. Serif size is 1.19 times the sans line for optical balance. Display styling is scoped to the hero and explicitly normal/upright.

Verification: production build including TypeScript passed; diff whitespace check passed. Browser inspected at 360, 390, 768, 1024 and 1440px: exact copy/punctuation, loaded fonts, upright serif, no horizontal overflow, intact two-line headline at normal text size, natural paragraph wrapping, substantial media column and stacked tablet/mobile composition. Keyboard activation of BOOK AN APPOINTMENT reaches #services. Browser error log empty. At 390px and 200% root text size, content reflows without horizontal overflow or clipping; headline words may wrap at this enlarged setting. Native browser-chrome zoom and physical-device testing were not performed.

No slideshow, navigation, products, booking, purchase or opening-hours code changed. No new logic tests were needed for this text/CSS-only behavior change. Local development only; no deployment.

Screenshots: [desktop](screenshots/hero-v2/hero-v2-1440.png), [tablet](screenshots/hero-v2/hero-v2-768.png), [mobile](screenshots/hero-v2/hero-v2-390.png), [360px](screenshots/hero-v2/hero-v2-360.png), [1024px](screenshots/hero-v2/hero-v2-1024.png), [enlarged text](screenshots/hero-v2/hero-v2-enlarged-text.png).
