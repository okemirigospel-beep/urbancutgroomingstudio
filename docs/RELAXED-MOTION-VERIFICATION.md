# Visual refinement and relaxed motion — verification

Approved implementation: Story closing paragraph matches normal body typography; shared five-item gold Lucide checklist in Home preview and panel; Beyond the Chair is a 55/45 text/photo composition, stacked below 900px, with a white second headline phrase. The supplied complete chair composition is preserved.

## Motion
Reusable StoryReveal uses Web Animations and IntersectionObserver. All reveals last 1200ms. Hero delays are 0/450/950ms; other groups use the approved 180–300ms stagger on desktop and independent upward entrance on mobile. Replays re-arm only after a group fully exits. Focus cancels motion for immediate control access. Reduced-motion preference changes cancel running animations. Content is visible in server HTML without JavaScript; no animation library added.

## Full Home Service video
The complete supplied source is encoded without seeking, trimming, concatenation or speed adjustment. Original source remains intact. Silent H.264 fast-start derivative is 720×1280, 9:16, approximately 46.77 seconds (source container 46.73; frame-timing rounding). All scenes, including preparation and ending, remain. Audio track omitted. New poster comes from the opening frame. The 11.3MB web copy is under GitHub limits; the 134.9MB source is not committed.
No website pause, seeking, elapsed-time, forwarding, full-screen or other native controls are exposed. Browser/OS controls cannot be universally suppressed. No visitor pause control is an accessibility limitation; reduced motion and lifecycle suspension do not establish complete motion-accessibility compliance.

## Checks
- Production build/typecheck and 35 existing regression tests pass.
- Browser widths 320, 390, 768, 1024, 1440: no horizontal overflow; complete chair loaded; expected single/two-column layouts.
- Computed Story paragraph family, size, weight, line height and colour are identical.
- Both Home inclusion lists contain exactly five checks and unchanged wording; Home enquiry form opens.
- Reveal instrumentation: one entry starts one animation, 10px scroll causes no restart, full exit/re-entry replays.
- Full video plays muted without controls, loops, suspends offscreen and for an open dialog. Simulated document visibility changes pause and resume it.
- Simulated NotAllowedError: one autoplay attempt, no repeated attempt after re-entry, still poster retained.
- Live reduced-motion emulation: zero reveal animations, Home video paused and poster visible.
- No browser errors observed. Actual iOS/Android OS controls and assistive-technology behaviour were not exhaustively tested.

Prices, catalogue, navigation, WhatsApp destination, section order, Visit & Connect and footer are unchanged. Existing Netlify Git deployment is authorized; no hosting or indexing settings changed. SITE_INDEXING_ENABLED remains false.

Source SHA-256: `178403d87b4a99faf090c2a3117af75a2358888860971a4fee5a2108dfef17fa`.
