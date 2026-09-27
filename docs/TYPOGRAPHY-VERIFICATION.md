# Typography verification — 27 September 2026

Local Windows checkout: `C:\UCUTS`, `urbancut-continuation`. Baseline `f18c3c68b46bef5ef6ee9c28315fcb390cd55c93`. Checkpoint remote: `https://github.com/okemirigospel-beep/urbancutgroomingstudio.git`. The preview is on the owner's computer at `http://127.0.0.1:3000/`, not a hosted preview. No deployment.

## Evidence

[Before/after comparison gallery](screenshots/typography/index.html) includes desktop 1440px, tablet 768px and phone 360px, each with full-page captures, header/hero, compact service list, service detail, invalid booking form and completed review. Focused after captures cover Services, About, Academy, FAQ and footer. The baseline hero crops are exact crops from the original full-page screenshots. Photo timing, focus outlines, basket state and scroll position can differ; no image content was generated. Initial full-page captures may not load below-fold lazy images; focused footer captures show the intact logo.

Reviewed actual rendered screenshots, including desktop/tablet/mobile hero comparison, service cards/list, mobile validation/review, tablet detail and Academy, desktop About, mobile About/Academy/FAQ/footer and 320px expanded menu. DM Sans is denser and less tightly tracked than the original Arial headings; Crimson normal is restricted to four selected section headings and the quote mark, with the hero phrase in real italic. No new clipping or horizontal overflow was found in the inspected states.

## Responsive and interaction checks

- Page widths 320, 360, 430, 768, 1024, 1179, 1180, 1280 and 1440px: document width equals viewport width; no right-edge overflow among visible header/main/footer descendants. The three hero lines remain intentional. Tablet portrait and landscape widths checked.
- Mobile open menu at 320/360px and tablet at 768px: logo/toggle remain aligned; keyboard Enter opens, Escape closes; Book an Appointment closes the menu and reaches `#services`. Header and hero booking anchors remain `#services`.
- Keyboard-opened Haircuts category, opened Signature Haircut detail, added it, continued to the studio form. Empty submit exposes three inline errors. Dummy name/date/time reached review with one item, ₦15,000 and 45-minute duration in the service detail. Review link targets the approved WhatsApp number and encoded message; no message was sent. Dialog Escape closes and selection persists. Review has no horizontal overflow.
- FAQ opened by keyboard; its answer uses DM Sans. Existing Coming Soon/availability guards were not changed and remain covered by the catalogue/booking tests.
- Reduced motion was enabled for stable screenshot capture. The slideshow source, header component, booking logic, catalogue, logo and media files are unchanged. No new persistent slideshow controls.
- Browser native zoom shortcuts did not change the automation browser's zoom. **Native zoom is not claimed as tested.** Tested 640×450 CSS-pixel reflow, equivalent to the available layout viewport of a 1280×900 window at 200%, without horizontal overflow. A manual native-zoom check remains the only requested browser check not directly reproduced.

## Fonts, loading and coverage

Browser computed families: body, navigation, actions, category titles, dialog title, inputs, FAQ and review use `naira, dmSans, "dmSans Fallback", Arial, sans-serif`. The first face is Unicode-restricted to ₦; all ordinary text uses DM Sans. Hero accent uses `crimsonText`, 600 italic, 67.7376px at 1440px; sans hero lines use 700 at 60.48px. Our Services uses Crimson Text 600 normal at 64px. FontFaceSet reports both Crimson styles and the DM Sans variable face loaded, and the naira face loaded when prices are rendered. Next.js dev tools expose their own unused Geist faces; these are not website typography.

Both brand source cmaps contain numerals, Latin text, ampersand, curly punctuation and en/em dashes but lack U+20A6. The 1,288-byte local Noto Sans subset remedies this gap, with a browser-confirmed `unicode-range: U+20A6`. No system font is required for the brand typography or naira sign. Temporary failure/loading fallbacks remain available.

Blocked WOFF2 requests in a separate test browser, confirmed brand font status `error`, captured fallback-mobile.png, then unblocked/reloaded. At 360px, before/after font availability: header height 99.75px, hero title height 112.40625px, hero CTA top 365.328125px/height 50px and photo top 443.328125px all stayed equal. CTA width changed from 220.45px fallback to 210.11px loaded, without clipping. Font failure may cause some lower-page copy to wrap differently; it remains readable. The blocked-font test's expected network failures are distinct from the main verification session, which reported no browser errors.

## Project checks

- `npm run build`: passed, Next.js 16.3.6 static generation.
- `npm run typecheck`: passed.
- `npm test`: 10/10 passed, including dates, availability, basket guards, Unicode totals and studio/home message encoding.
- Existing Node MODULE_TYPELESS_PACKAGE_JSON warning persists during tests; no test failure.
- `git diff --check`: passed (Git reports expected local CRLF normalization notices).
- Focused React review: only module-level local font declarations and presentation classes changed; no new hooks, state, effects, request waterfalls, client dependencies or interaction handlers. All copy and prices preserved in the source diff.

## Files

`src/app/layout.tsx`, `src/app/globals.css`, `src/app/page.tsx`, `src/components/Services.tsx`; four WOFF2 assets, three licenses and provenance README in `src/app/fonts`; design/status/assets documentation; this report and screenshot comparison gallery.

No known visual defect remains in the inspected views. Native browser zoom is the verification limitation described above. Existing provisional business content and launch requirements remain outside this typography task.
