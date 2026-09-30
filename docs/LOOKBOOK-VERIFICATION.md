# Lookbook verification — 30 September 2026

Replaces Gallery placeholders with The Lookbook: one independent looping video and 26 manually navigated photographs. Desktop, mobile and footer links retain #gallery. Existing Services/Products serif heading classes reused.

## Implementation
Fixed curated sequence and descriptive alt text in src/lib/lookbook.ts. All 26 supplied JPEGs represented once. Manual 400ms horizontal swipe; next enters from right, previous from left. Decode completes before transition; rapid input is locked during preparation/animation. No photo advancement interval. Two 48px Lucide controls with native keyboard activation, visible focus and nonvisual announcements.

Video derivative is upright 540x960 H.264, approximately 10.1 seconds, audio removed. Muted/inline/loop attributes retained. Full framing against a neutral background. Poster on reduced motion or rejected autoplay; playback pauses offscreen/hidden tab. No visible video controls or click handler.

Equal 3:4 frames in two columns from 700px; stacked below. Narrow WA0068 and landscape WA0048 use contain. Originals untouched.

## Checks
- TypeScript, production build and all 18 existing tests passed.
- Actual Chromium at 360, 390, 699, 700, 768, 1024 and 1440px: no horizontal overflow; selected photograph stable through resize.
- Frames: 360px viewport 320x427; 390:350x467; 768:340x453 each; 1024:468x624; 1440:588x784.
- Traversed 26 unique photos, wrapping both directions. Ten rapid activations safely produce one advance; one intact final frame. Verification waits for decode and animation completion.
- Stable photo after waiting, scrolling away/back and resizing. Enter/Space exercised; focus retained on Next photograph.
- Video reports 540x960, muted/inline/loop true, controls false. Photo navigation preserves advancing video time. Seek near end verified loop back while playing.
- Offscreen pause/resume verified. Hidden-tab behavior checked with simulated visibility events. Reduced-motion emulation verified poster, paused video and immediate manual photo changes.
- Simulated rejected play() verified clean loaded poster fallback and recovery. Browser errors empty.
- Diff preserves hero slideshow, Services/booking, Products availability and unrelated content.

## Evidence and limitations
Browser screenshots: docs/screenshots/lookbook/. Intermediate stacked layouts can extend below the captured viewport.
Physical iOS/Android autoplay and touch hardware were not tested. Mobile browser widths and native buttons were checked. As requested, the control-free video has no manual pause control; reduced-motion support is not a claim of full accessibility compliance. Existing video edits retained; this is not a newly edited seamless film.
Local preview: http://127.0.0.1:3000/#gallery. No deployment.
