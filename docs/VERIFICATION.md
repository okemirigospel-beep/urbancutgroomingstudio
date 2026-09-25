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

## Header and hero rebuild — 25 September 2026

Verified locally on the owner's Windows computer, C:\UCUTS, http://127.0.0.1:3000/. No deployment or public preview created.

- Production build and TypeScript check passed; all four appointment-rule tests passed. The test runner emits its existing typeless-module warning, not a test failure.
- Browser renders checked at widths 320, 390, 768, 1024, 1366, 1440 and 1920. No horizontal overflow at measured widths. Laptop 1366 × 768 fits the rebuilt hero and information band. Final desktop/mobile screenshots are in screenshots/header-hero-desktop.png and screenshots/header-hero-mobile.png.
- 720px viewport reflow checked as the layout equivalent of a 1440px screen at 200% zoom: navigation collapses, CTA remains 52px high and there is no horizontal overflow. Native browser zoom itself was not independently measured.
- Six of six photos loaded and were visually reviewed. object-fit: contain preserves full source framing; supplied originals remain untouched. Desktop media is 48% of the 1200px hero width. Initial photo uses eager/high-priority loading; other photos use native lazy loading with responsive pre-encoded WebP sources and reserved frame dimensions.
- Both Book an Appointment links reach #services, landing below the scroll offset. Specified old hero labels and captions are absent. Zero rendered arrow icons and zero live video elements. Approved logo hash matches the new ZIP.
- Mobile menu exposes five valid section links, has a 44px toggle and closes on Escape with focus returned. Header DOM order follows the mobile visual order. Slideshow Previous/Next buttons support keyboard activation and left/right keys; a solid visible focus outline was confirmed. All slideshow controls are at least 44px high.
- Live timed checks (6.4 seconds each) passed: autoplay advances, hover pauses, keyboard focus pauses, fully offscreen pauses, manual pause persists after blur and pointer exit, Play resumes, reduced motion remains stable without hover/focus. Reduced motion removes fades and disables autoplay. Hidden-tab handling is implemented via visibilitychange; it was code-reviewed, not independently browser-tab tested.
- Existing adult-plus-child selection still opens the sample-only request dialog with both services. It remains in-memory with no external send.
- Browser page errors: none. Console contained only normal React development/HMR messages.
- Calculated WCAG contrast: dark-gold headline #896815 on white 5.18:1; dark button text #101110 on #B98F22 6.32:1; white on information-band #101110 18.92:1.

Reference comparison: the former small tilted film is replaced with a large, level photo region; brand/logo and rectangular appointment actions are stronger; the black information band replaces thin rules. No annotation marks, reference logos, reference video, invented captions or decorative arrow pointers are rendered.

Publication approvals remain outstanding for identifiable people, especially the child. No missing asset prevents local verification. Existing sample service/business-content approvals remain as documented in STATUS.md.
