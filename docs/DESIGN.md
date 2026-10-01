# Design decisions

Primary reference: supplied refero.design 5af49096-2a34-424c-8f91-4b5713a04e31.jpg (Spyglass). Direct Refero lookup returned NO_SUBSCRIPTION. The supplied screenshot provides the visual lock; there is no missing reference dependency.

| Decision | Evidence and adaptation |
| --- | --- |
| White split hero, compact navigation, bold sans-serif | Observed in screenshot. Adapt to a grooming message and portrait video, not floating social-media mockups. |
| Alternating white and near-black rounded sections | Observed reference rhythm; dark About, Academy and closing CTA balance service-reading surfaces. |
| Tight display tracking, generous whitespace, occasional italic phrase | Observed screenshot. Arial/Helvetica system stack is a pragmatic close alternative, not an identified reference font. |
| Gold accent on primary actions and small details | Latest user palette (roughly 50/40/10); #B98F22 sampled from SVG source. Use dark text on gold, not small gold text on white. |
| Original square logo on black | Actual supplied SVG has opaque black background. Preserve original file and proportions, do not invent compact monogram. |
| Portrait video at its native aspect ratio | User forbids stretching/cropping away barbering action. Single primary film surface; no fabricated studio imagery. |
| Menu rows and category filters | Supplied service specification; a readable service menu instead of repeated marketing cards. |
| Progressive expandable academy ladder | Five provisional programmes from framework; distinct from service selection. |
| Honest gallery/review/contact states | Missing approved media and contact destinations; no fictional reviews or dead outbound links. |

Tokens: white #fff, ink #101110, subtle surface #f2f2ef, gold #b98f22, muted text #62645f; 1200px content width, fluid 20–64px gutters, 16–24px large-panel radii, pill actions with at least 44px targets. Display typography fluid 42–84px; body 16–18px. Gold use remains restrained. Mobile layout is an adaptation, not observed reference behaviour.

Written brand: use latest user spelling URBANCUT. Older documents say Urban Cuts Grooming Studio; retain source documents and flag for final content approval. Supplied logo remains unchanged.

## Header and hero revision — 25 September 2026

Latest user brief supersedes the earlier portrait-film direction. Reference lock: annotated EDIT/EDIT 2 and green media-area screenshot determine scope; navigation references I/II inform a prominent intact logo and rectangular CTA; the slideshow concept informs a substantial right-hand image region. The Spyglass screenshot continues to govern the wider page. Reference MP4 was inspected as a sequence: restrained photographic changes, no animated captions. Adaptation: six-second holds and a short dissolve, with no zoom or crop.

Decisions: black masthead, white split hero, dark-gold emphasis (#896815 on white), black information band; intact 144px square SVG on desktop; 50/50 hero columns separated by a modest gutter. Full-photo contain framing against near-black preserves all six compositions. Text Previous/Next controls replace arrow icons. Header and hero appointment actions link to Services. Tablet stacks before content is cramped. Reduced motion disables autoplay and fades; focus, hover, offscreen and hidden-tab states suspend progression. No new dependencies or backend features.

Decorative arrow pointers are prohibited throughout the site by explicit user instruction. Existing lower sections retain their layout and behaviour, with arrow icons removed.

## Responsive re-edit — latest supplied brief

Reference lock: mobile/tablet screenshots demonstrate detached booking controls; brand-name screenshot establishes the identity to improve; slideshow screenshot identifies unwanted letterboxing/footer controls. Latest direction replaces prior contain framing and six-second timing. Use an intact SVG beside a two-line uppercase Arial/Helvetica wordmark (bold, tracked URBANCUT; smaller widely tracked GROOMING STUDIO). This keeps the emblem detailed and the companion type readable without introducing a conflicting ornamental face. Remove redundant hero brand line.

Header: one row, desktop white compact CTA at nav scale; below 1180px show brand and end-aligned toggle, with booking last in an in-flow expanded menu that pushes the hero down. Hero: black compact uppercase action. Slideshow: square desktop/tablet frame, 4:5 mobile frame; proportional cover and individual focal positions, 2.8-second cycle, one 450ms dissolve, small inset pause/play control. No footer bar, no arrows, no mixed animations. Retain existing black information band and lower sections.

## Focused wordmark and motion finish

Current-state screenshots identify an undersized secondary wordmark and portrait blending. Latest lock: retain composition and primary Arial wordmark, pair it with a readable Georgia bold secondary line, tighten gap/tracking, and remove visible slideshow controls. Use opaque synchronized 280ms right-to-left movement at the existing 2.8-second interval. The photo region is an accessible toggle; explicit activation controls pause, with reduced-motion/offscreen/hidden-tab safeguards. Hover/focus no longer silently overrides an explicit resume.

## Actual logo prominence — latest focused correction

Reference lock: user's current desktop/tablet/mobile screenshots show the actual emblem dominated by companion lettering; Barcelona reference informs visible logo presence only. Remove redundant companion lettering across all sizes and allocate responsive width to the actual supplied emblem. Original 1536-square SVG has no viewBox and an opaque black background, not transparent padding. Browser path bounds of non-black artwork: x 98.8504–1437.2096, y 393.3795–1056.0025 (1338.3593 × 662.6230). A header-only derivative sets viewBox 84 379 1368 692, retaining at least 14 source units around every coloured shape. All paths, fills and transforms are byte-identical; only root dimensions/viewBox differ. Original and footer use remain untouched.

Header derivative widths: desktop 300px, tablet 260px, mobile 240px, narrow phones at/below 360px 220px, each with automatic proportional height. This addresses both the blank internal canvas and restrictive CSS. No hero/slideshow/booking behaviour changes.


## Approved Services implementation — 27 September 2026

Reference lock: the existing URBANCUT black/white/gold system, the supplied Spyglass reference, the six supplied category artworks and the latest complete Services brief. Live Refero was previously unavailable (NO_SUBSCRIPTION); bundled craft guidance informed focus states, forms and responsive spacing. No new branding or stock substitutions.

- Prominent literal “Our Services” heading; 3/2/1 image-led cards at desktop/tablet/mobile, one button per card, solid content area and restrained gold status badges. Category artwork is illustrative rather than evidence of delivered treatments.
- One native dialog, persistent Back/Close/title, independently scrolling body; compact desktop rows and a side selection summary. At 850px and below the summary collapses into an in-flow count/estimate panel; at 600px and below the dialog occupies the screen. No stacked modals or decorative arrows.
- Studio selection, enquiry-only Home Service and non-interactive Black Card remain distinct. Every form has labelled controls, inline field errors, final review and truthful WhatsApp handoff copy. Black Card benefits are explicitly proposed.
- Approved data in src/lib/catalogue.ts replaces the prototype catalogue. booking.ts owns selection guards, time filtering, validation and the two encoded message builders. No new dependency or backend was introduced.


## Current typography system — 27 September 2026

This entry supersedes earlier Arial/Georgia and companion-wordmark typography directions above. Reference lock: the owner's explicit DM Sans + Crimson Text brief, [Figma Pairing 37](https://www.figma.com/resource-library/font-pairings/) and the established local URBANCUT layout. Refero's bundled typography craft guidance supports the functional/editorial distinction; it does not override the supplied font choice.

Figma calls Pairing 37 “Crimson Serif + DM Sans.” The selected, verifiable family here is **Crimson Text**, by Sebastian Kosch. No exact licensed “Crimson Serif” files were supplied. This is a documented naming substitution, not a claim that the article provides a font file with that name.

- **DM Sans**, Colophon Foundry: all body/interface text, navigation, buttons, cards, modal titles, service rows, prices/durations, forms/errors, basket/review, FAQ/contact/footer. Real 400/500/600/700 weights, optical sizing enabled. Headline tracking relaxed to -0.035em; the hero uses 700 with 1.1 line height and responsive sizing down to 32px at 320px.
- **Crimson Text SemiBold**, 600 normal: the entire Services, About, Academy and closing headings; the decorative review quote. Tracking -0.02em with 1.08 line height. Other section headings stay DM Sans. Every pre-existing em has an explicit role; headline-emphasis is upright and inherits its parent's face/weight instead of indiscriminate serif/italic switching.
- **Crimson Text SemiBold Italic**, actual 600 italic file: only the gold “Great feeling.” phrase, 1.12 times the hero size. No synthesized italic. Logo typography remains embedded, unchanged SVG artwork.
- A **1,288-byte Noto Sans subset** supplies only ₦, absent in both selected brand fonts. This is the only functional glyph exception, not a third decorative family. Other artwork lettering is also unchanged.

Central --font-interface / --font-editorial tokens map Next.js local font variables to roles; Tailwind sans/serif tokens share them. Three brand WOFF2 files plus the currency subset total 143,048 bytes. Fonts and OFL licenses live in src/app/fonts; exact names, provenance, conversion and hashes are in its README. No external font runtime requests, machine-only brand fonts, new application dependency or backend changes. Next/font/local supplies swap and adjusted temporary fallbacks.

See TYPOGRAPHY-VERIFICATION.md and screenshots/typography/index.html for browser evidence and limitations.


## Services discovery and booking refinement — 28 September 2026

Reference lock: latest owner brief, inspected current site, four supplied PNG icon concepts and original logo. Preserve the established DM Sans/Crimson Text and black/white/gold system. Use installed Lucide Clock3/Timer/Tag/ShoppingCart with consistent supporting MapPin/CalendarDays, never dollar imagery. Strong Services lead and supporting sentence replace technical copy. Matching Coming Soon badges and informational-only Wellness views prevent misleading booking paths. Original logo derivative anchors available panel headers; names remain primary. New three-group information band and shared OpeningHours display consume the central daily schedule. See SERVICES-REFINEMENT.md for source assets, rules, responsive evidence and verification limits.

Booking handoff: one compact cream/gold callout with Lucide MessageCircle immediately above CONTINUE TO BOOKING. Removed repetitive explanatory paragraphs; retained clear request summary and necessary field/scheduling labels. No confirmation claim.

Latest service-panel direction supersedes prior logo-in-panel guidance: no emblem inside service-flow headers. Full-width titles below the back/close row; no reserved logo gap. Existing callout styling/icon and CONTINUE TO BOOKING remain unchanged.


Products reference lock (29 September 2026): current About screenshot supplies the dark-container position; the supplied product photographs and new brief govern the design. Bold DM Sans OUR PRODUCTS heading, one supporting line, square uncropped imagery, white rectangular actions and restrained gold tag/focus accents. Three columns at 1000px+, two at 600–999px and one below 600px. Purchase panels reuse service typography/controls with separate state and validation. No logo in the panel header.

Hero Version 2 supersedes the former three-line/italic headline: substantial DM Sans bold first line, upright Crimson Text semibold gold second line, scoped container-responsive sizing, normal style and flat #896815. Reference: supplied HOMEPAGE TEXT PNG. Existing body font and compact black CTA retained.


Products now reads Our Products, sharing type-editorial and uc-section-title styles with Our Services (Crimson Text 600, normal, responsive 40–64px, line-height 1.08, tracking -0.02em). Light heading against black. Informational Coming Soon areas replace active buttons, with default cursor and an associated hover/focus tooltip. Hero collection expanded to 20 without redesigning the frame or animation.
The Lookbook: shared editorial heading; equal 3:4 frames, 24px gap, stacked below 700px. Manual photos; 400ms directional swipe and two 48px Lucide buttons below/right. Reduced motion uses a stable poster and immediate manual photo change.
Continuation: Services, Products and Lookbook heading size clamp(44px,5.5vw,78px). Lookbook intro 17px/1.65,60ch. Photos default to 3-second autoplay until any manual navigation, preserving400ms swipe. No resume control.
Reviews: shared Crimson Text600 heading clamp(44px,5.5vw,78px); DM Sans body. Static 55/45 composition with near-black feature and two unboxed supporting quotations. Stack below850px. No animation or interactive decoration.
