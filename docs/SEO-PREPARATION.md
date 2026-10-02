# Pre-launch SEO preparation — 2026-10-02

## Status and boundaries
Core domain-independent SEO is implemented and locally verified. No domain has been selected, no deployment authorised, and no Google submissions/accounts, DNS, analytics, payments or databases were changed. Existing Vercel Git deployment disablement remains intact. Service/slideshow components and all approved copy/layout remain unchanged.

## Route and content inventory
Next.js 16.3.6 App Router; static prerendered homepage with hydrated client interactions. Public content route: `/` only. Homepage sections `#services`, `#products`, `#gallery`, `#reviews`, `#academy`, `#contact`, `#studio`, `#faq` are anchors, not pages. Service checkout, home enquiry and Academy detail/enquiry states are dialogs, not routes. No application API or private routes exist. `/_not-found` is the framework error handler. Added metadata resources `/robots.txt`, `/sitemap.xml`, `/icon.png`; these are not sitemap pages. Static media and framework assets are not sitemap entries. No new landing pages added.

## Baseline (commit 4c17688)
- Title: URBANCUT — Grooming Studio, Abuja. Description: Barbering, braiding and loc care in Abuja. Explore services and plan your visit.
- HTML robots: noindex,nofollow; no X-Robots-Tag. No configurable launch state, canonical, robots file, sitemap, business JSON-LD or sharing metadata. Favicon request returned missing resource in baseline lab trace.
- One H1; no duplicate IDs, empty hrefs or missing internal anchors. Initial HTML includes address, hours, product states/prices, review quotations, five Academy overviews/fees/durations and all 19 FAQs/answers. First six questions remain visible and others semantically hidden until expanded.
- Individual service names/prices/details and long Academy curricula are primarily interaction-dependent. No duplicate hidden SEO text was added.
- Existing positive practices: genuine local DM Sans and Crimson Text fonts (including semibold italic), font swap/fallbacks, responsive WebP sources, intrinsic image sizes, high-priority initial hero image, lazy below-fold Next Images. Lookbook video is silent compressed MP4, preload none, activated near viewport; original sources remain intact. Map is still omitted due the unsuitable earlier screenshot.

## Implementation and files
- `src/lib/indexing.ts`: single validated SITE_URL and SITE_INDEXING_ENABLED policy, canonical public route inventory, robots/sitemap/header builders. Invalid URLs/flags fail clearly. Rejects credentials, HTTP, paths, ports, queries/fragments, local/IP origins and common preview hosts. Config is build-time; rebuild after changing values.
- `.env.example`: blank SITE_URL, explicit false indexing default. No real domain or fixture origin configured.
- `next.config.ts`: preview X-Robots-Tag: noindex, follow across responses. Live builder removes it.
- `src/lib/seo.ts`, `src/app/layout.tsx`, `src/app/page.tsx`: title/description, homepage-only canonical and social metadata, escaped JSON-LD. No metadata URL fallback to request host or localhost. Canonical is not inherited by nonexistent routes.
- `src/app/robots.ts`: crawl allowed so noindex can be read; sitemap advertised only with indexing enabled and valid origin. This is not access control.
- `src/app/sitemap.ts`: empty in preview; exactly origin + `/` when launch enabled. No fragments, modal states, fabricated lastmod, priority or change frequency.
- `src/lib/studio.ts`: structured address fields used to derive the unchanged visible address and JSON-LD. Hours still use existing studioSchedule.
- `src/app/icon.png` (192x192) and `public/media/urbancut-share.png` (1200x630): sharp PNG compositions of the approved SVG on black. Original and tight-bounds SVG assets unchanged. Both images visually inspected. No new branding generated.
- `tests/seo.test.ts`: five tests for all configuration states, URL rejection, metadata/schema consistency and safe JSON-LD escaping.

## Metadata inventory
Title: UrbanCut Grooming Studio | Barber Shop in Gwarinpa, Abuja
Description: Explore haircuts, beard grooming and barbering training at UrbanCut Grooming Studio in Gwarinpa, Abuja. View services and request an appointment.
Open Graph: website, en_NG, confirmed business name, same title/description. Twitter summary card before domain; large-image card once configured. Absolute sharing image and homepage URL omitted until origin supplied. Favicon is a local framework-served PNG. No meta keywords, invented verification tokens or unsupported superlatives.

JSON-LD: HairSalon; confirmed name, PostalAddress including NG, email, Instagram, WhatsApp ContactPoint (not a telephone), Monday–Saturday09:00–21:00 and Sunday13:00–21:00 using existing schedule. Local business hours are Africa/Lagos. Without domain, omit business URL, @id, logo/image URLs. With origin, derive `/#business`, `/`, approved SVG logo and sharing PNG URLs. No ratings, review schema, offers, credentials, geo coordinates, unverified priceRange or voice capability. FAQ rich-result and Product Offer markup were not added.

## Indexing matrix
| Settings | HTML/header | Canonical/social/business site URLs | Sitemap |
| --- | --- | --- | --- |
| SITE_URL blank; flag absent/false | noindex, follow | omitted | empty; not advertised |
| valid HTTPS origin; flag false | noindex, follow | configured origin | empty; not advertised |
| valid HTTPS origin; flag true | index, follow; no preview X-Robots header | configured origin | homepage only; advertised |
| flag true; origin missing/invalid | clear configuration failure | no fallback | no build |

A domain alone never enables indexing. Do not set the launch flag on preview builds. Do not use NODE_ENV or inferred hosting URL to enable it. Choose one preferred apex or www origin, no trailing slash in config; homepage URLs consistently end in `/`. No guessed host redirects added.

## Verification
- Default production build and TypeScript pass; all26 existing+new tests pass. No lint script exists. Configuration builders tested with an isolated reserved fixture origin; that value exists only in tests, not environment configuration or rendered preview metadata. Configured/live cases are builder tests, not deployed-host checks.
- Actual Next build with process-only SITE_INDEXING_ENABLED=true and no origin fails before build with “Enabling indexing requires a valid final SITE_URL.” Settings restored afterwards.
- Default HTTP: `/`, robots, sitemap, icon and sharing PNG200; missing page404. HTML and header noindex agree. Sitemap has zero URL entries; robots allows `/` without sitemap line. Browser canonical absent; no invented business URL. JSON-LD parses correctly and is present in initial HTML.
- Raw HTML audit excludes script payloads: one H1, all19 FAQs, address, reviews and Academy summaries present; no duplicate IDs, missing anchors or empty links. All original FAQs preserved. No repeated hidden search-engine copy introduced.
- Browser checks at390,768,1440px: no horizontal overflow; approved visuals inspected. Mobile menu routes to Services; Signature Haircut selection calculates ₦15,000; no unwanted dialog from footer CTA; Academy Foundation details open; FAQ expands to19 and policy answer opens. Products remain Coming Soon; no broken loaded images or failed resource responses; browser errors empty. Existing tests cover totals, date/time restrictions, Home logic and handoff message generation. No messages sent. Media components unchanged; a complete new autoplay timing audit was not performed.

## Local performance observations (not field data)
Unthrottled local Chromium production preview, brief single samples; timings include local/cache differences and are not comparable performance promises. Baseline LCP1232ms, CLS0. After sample LCP604ms (image), CLS0.000098; observed long tasks378ms and111ms; maximum sampled interaction duration168ms (not a statistically valid INP). Approximately2.13MB transferred across43 resource requests during the observed initial window. Font transfers approximately143KB for the three main files. Baseline trace showed all20 hero photos downloading early; native lazy loading does not reliably defer overlapping in-viewport slides. No improvement is claimed from metadata changes.
Largest live video: Lookbook MP4 2,665,985bytes, poster about34KB. Largest Academy image171,386bytes; beard balm149,854bytes; largest hero photo140,758bytes. Responsive source sizes and existing Next optimization are preserved. No unnecessary map payload. Unused legacy video files remain preserved, not downloaded by the current hero.

Current official CWV guidance uses LCP<=2.5s, INP<=200ms, CLS<=0.1 at the75th percentile of real visits. Local observations do not establish a field pass. Recheck on deployed HTTPS with realistic mobile conditions and later real-user data.

## Remaining rendering work / approval issue
Automatic approval review rejected the proposed combined Services SSR-panel restructuring and strategic HeroSlideshow mounting, citing possible booking regressions and scope risk. The rejected command did not run. Both components are byte-for-byte unchanged from baseline. Their current limitations remain: service detail discovery requires interaction, long Academy curricula require dialogs, and hero slides may download early. No hidden keyword block was substituted. A reviewed follow-up rendering change needs approval; it would preserve the visible UI and include targeted booking/slideshow regression checks.

Optional visible-copy proposal, not implemented: change the existing information-band location from “Abuja, Nigeria” to “Gwarinpa, Abuja” for an earlier precise location cue. New landing pages, content rewrites and media architecture changes require separate review.

## When the final domain is supplied
1. Choose apex versus www and set the approved absolute HTTPS SITE_URL; keep SITE_INDEXING_ENABLED=false initially.
2. Rebuild and inspect canonical, sharing image, sitemap builder and business IDs. No placeholder origin should appear.
3. At authorised deployment, configure HTTPS and preferred-host redirects at the hosting layer (no path-dropping redirects), then explicitly enable indexing for the live build only.
4. Rebuild and verify live HTML/header robots, canonical, sharing assets and one-page sitemap. Domain changes alone must not switch the flag.

## Post-deployment only (not performed)
Check public HTTPS/certificate, preferred-host redirects, live response headers/hosting overrides, crawler access, robots/sitemap and canonical/social URLs. Validate live structured data. Obtain Search Console ownership, submit sitemap and inspect URLs only when authorised. Update the Google Business Profile website link only with permission. Review field performance when data exists. Submission/indexing requests guarantee neither indexing nor rankings.

Future analytics candidates (not installed): Services CTA, completed WhatsApp handoff, Academy enquiry handoff and directions clicks. An outbound click is not a confirmed booking. Never send customer names/addresses/notes or prepared request text to analytics.

## Sources checked
- https://schema.org/HairSalon
- https://developers.google.com/search/docs/crawling-indexing/block-indexing
- https://web.dev/articles/vitals
- Installed Next16.3.6 documentation: metadata and OG images, robots.ts, sitemap.ts conventions.

## Local preview
http://127.0.0.1:3000/?seo=check. Bound to127.0.0.1, no public tunnel or deployment. To resume development: powershell -File C:\UCUTS\scripts\local.ps1 -Stop, then powershell -File C:\UCUTS\scripts\local.ps1. Rebuild after changing SEO settings. Do not put fixture domains in a real environment file.
