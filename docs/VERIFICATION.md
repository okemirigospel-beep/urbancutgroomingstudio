# Verification record — 23 September 2026

## Passed

- Next.js 16.3.6 production build, including TypeScript and static generation, after the complete implementation and video-failure fix.
- Separate TypeScript check.
- Four appointment-rule tests: Abuja midnight boundary, tomorrow-or-later, Sunday closure, invalid/past dates and prototype opening-hour intervals.
- Local Chrome rendering at 1440px desktop, 768px tablet, 720px reflow, 390px mobile and 320px narrow mobile. No horizontal overflow at inspected widths. Visual screenshots inspected for desktop, mobile, service menu and full-page section rhythm.
- All internal anchor links resolve. Header, service categories, service details, FAQ and academy disclosures present.
- Adult plus child basket: 1 adult + 2 children = sample NGN 15,000. Quantity and removal controls work. Empty selection disables request preview.
- Sunday form submission rejected. Valid sample form produces explicitly unsent/unsaved summary with quantities, location, date and Abuja time.
- Home-grooming enquiry selects and locks home service mode. Removing the last item disables preview.
- Escape closes native dialog and restores focus to Review selection. Mobile menu Escape restores focus to Open menu.
- Muted inline looping video reports 540x960 native display dimensions. Reduced-motion starts paused with poster. Offscreen video pauses, resumes when visible, and deliberate user pause is retained.
- Aborted video request preserves the actual poster and displays an unavailable notice. The discovered stale pause-control state was corrected.
- Source has internal cuts, black bands and an editing mark. FFmpeg blackdetect found no full-frame black intervals >=0.03 seconds in the derivative. This does not establish a seamless loop; the end/start framing changes.
- Local script stop/start cycle tested; loopback listener verified at 127.0.0.1:3000. No public listener, tunnel or deployment created.
- Foundation GitHub checkpoint verified: 0ab6398f37554ae35ba970b0dc9314e910a2b3c0 on urbancut-continuation.

## Limits

Chrome automation only; Safari/iOS and other real devices have not been tested. 720px reflow is equivalent to the layout width of a 1440px viewport at 200% zoom, but is not proof of native browser zoom behavior. No formal screen-reader audit or complete WCAG certification is claimed.

All business prices and academy programme details remain provisional. Gallery/reviews/product photography and actual contact/map destinations are missing. Production booking storage, WhatsApp automation, payments and Supabase integration are intentionally inactive.

Final follow-up, 24 September: fixed the narrow-phone menu flex shrinking. Chrome at 320px confirms a 44x44 menu target and no horizontal overflow; fresh loaded-page console contains only React/HMR informational messages. Appointment tests passed again. Server restarted successfully after the session pause.
