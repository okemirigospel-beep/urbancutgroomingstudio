# Lookbook continuation — 30 September 2026
Supersedes the manual-only default in LOOKBOOK-VERIFICATION.md.

- Fresh visits advance automatically after 4000ms of visible idle time; the existing 400ms ease-in-out directional transition remains. All 26 assets, order and framing retained.
- Either arrow synchronously latches manual mode and cancels autoplay for this mounted page visit. One pending manual direction is queued during an active transition. A decoding autoplay request checks eligibility again before displaying a new image.
- Offscreen/hidden-tab suspension restarts a fresh interval only in automatic mode. Reduced motion latches manual mode and disables swipe; removing the preference does not restart automatic mode.
- Video component and hero remain unchanged.
- Three heading IDs share clamp(44px, 5.5vw, 78px), previously clamp(40px, 4.5vw, 64px). Desktop cap +21.875%; mobile +10%. Crimson Text 600, colours, tracking and alignment preserved.
- Approved paragraph appears exactly once in body styling, 17px/1.65, 60ch max width; heading gap16px, media gap32px.

Verification: TypeScript, production build and 18 existing tests passed. Browser checks confirmed fresh automatic advancement, Previous and Next switching to manual, selection unchanged beyond two former intervals, scroll and simulated tab-visibility persistence, keyboard Enter with retained focus, reduced-motion startup, bidirectional wrapping, and manual takeover during an actual autoplay animation without blank/duplicate frames. Video remained playing independently.
Normal responsive renders at 360/390/768/1440: no horizontal overflow; shared computed sizes44px mobile/tablet and78px at1440, original font/weight/colours. Supporting copy visually inspected on desktop/mobile. Added overflow-wrap safeguard for enlarged heading text. CSS body-zoom stress (which does not adjust media-query breakpoints like real browser zoom) showed no overflow inside these headings, but existing unrelated page layout can overflow under that artificial stress. Physical browser zoom and mobile hardware not tested.
Screenshots in docs/screenshots/lookbook-continuation/.
Local only; no deployment.
