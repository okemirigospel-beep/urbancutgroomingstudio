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
