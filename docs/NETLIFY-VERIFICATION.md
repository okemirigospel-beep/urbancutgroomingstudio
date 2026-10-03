# Netlify reconciliation — 3 October 2026

## Baseline inspected before publication

Netlify dashboard independently verified owner Gospel Okemiri VA & Admin Services, project urbancutgroomingstudio, linked GitHub repository okemirigospel-beep/urbancutgroomingstudio, production branch urbancut-continuation and exact published commit 600ebd788141b199257f25ae7103b4a821716621.
Rollback deploy: 6ac0fc7530acd9000879bb43. Builds Active; publishing unlocked. Production branch only; pull-request previews enabled. Build root /, command npm run build, publish .next, Next.js auto detection. Successful baseline Node 24.21.0 / npm 11.19.0 / Next.js 16.3.6 / Runtime 5.16.1. No project environment variables were set at inspection; Both approved variables were subsequently saved and revealed for verification: SITE_URL=https://urbancutgroomingstudio.netlify.app and SITE_INDEXING_ENABLED=false, All scopes and all contexts. Project ID independently read from General settings: 2d75c50c-1b1b-47c6-a058-dab47f46ef5f.

The plugin exposes skills but no account-management tools in this session. Dashboard inspection uses the existing signed-in browser; public HTTP checks are independent of dashboard access.

## Scope

Added reproducible Netlify build configuration and Node 24 major pin; approved stable Netlify origin validation; non-production CONTEXT indexing guard and regression tests. Retained disabled Vercel Git deployment configuration. Updated current documentation, preserved superseded Vercel handover as history. No website components, CSS, catalogue, assets or booking logic changed.

## Verification

31 tests passed, including booking, academy, products, slideshows and new preview-indexing regression cases. Production build and typecheck passed. Local HTTP regression passed (16 descriptions, closed details, no forms initially, two hero images, noindex, empty sitemap, real 404). Mobile browser booking regression passed: multiple services, quantities/removal, totals, weekday/Sunday hours, invalid-field handling, address requirements and prepared WhatsApp messages; nothing sent. Local mobile screenshot inspected with no browser errors. Live publication checks follow the Git push.


## Published verification

Hosting implementation commit: `8ad43f8975b2b92a6769857d8a05efc862b06189`.
Published production deploy: `6ac149ca3a83170008a802b1`, ready and published at 2026-10-03T18:30:58.800Z. Netlify's public site API independently reports this as published_deploy, with the exact commit above and branch urbancut-continuation. GitHub remote SHA matched the local commit after push.
Deploy details: https://app.netlify.com/projects/urbancutgroomingstudio/deploys/6ac149ca3a83170008a802b1
Live site: https://urbancutgroomingstudio.netlify.app

Public verification passed:

- HTTPS homepage 200; unknown route 404. Homepage, 404, robots, sitemap and favicon responses carry X-Robots-Tag: noindex, follow. Homepage meta robots matches.
- Stable canonical/sharing/schema URLs use the approved Netlify origin; no active localhost or vercel.app metadata. No fabricated aggregate ratings or review counts in JSON-LD.
- robots.txt 200 permits crawling; sitemap.xml 200 contains no loc entries. Self-hosted font, CSS, optimized image, sharing image and favicon return 200.
- Static CSS/font/sharing-image and image-CDN responses have no X-Robots-Tag. The Next.js page/404 directives were verified separately rather than assuming a static header rule covers the server handler. This is page noindex, not access control or a guarantee that individual media files are excluded from image search.
- All sixteen authoritative service descriptions remain in initial HTML with closed detail panels and no initial booking forms. Two initial hero images; three or fewer mounted during sampled progression, all ready. Sampled live transitions advance without unloaded active frames.
- Approved section order preserved: Hero/information band, Services, Lookbook, Reviews, Academy, Products, Visit & Connect/FAQs, Footer.
- Live studio/home booking regression passed: multiple services, quantity increase/decrease, removal, totals, reopen persistence, required fields, weekday 09:00 and Sunday 13:00 starts, invalid-time clearing, home address requirement and current WhatsApp request content/destination.
- Academy required-field validation and prepared programme/name/experience/notes handoff passed. The browser test intercepted window.open, so no external request or message was sent.
- Mobile menu opens/closes and Gallery targets Lookbook; mobile appointment action targets Services. All six products remain Coming Soon with no purchase actions. FAQs expand; View More reveals all nineteen questions. Directions/Instagram/email destinations match confirmed business data.
- Browser simulation at 390x844, 768x1024 and 1440x1000: no horizontal overflow or broken images after scrolling; loaded fonts; no captured browser errors. Screenshots visually inspected. Lookbook video initially has no src, loads near its section, reaches readyState 4, and plays muted with loop enabled.

Screenshots retained locally outside Git: C:/Users/LENOVO/.cache/netlify-live-mobile.png, netlify-live-mobile-full.png, netlify-live-tablet.png, netlify-live-desktop.png. HTTP evidence: netlify-live-http.json in the same folder.

The signed-in Vercel account's UrbanCut project search returned no results. No account-wide integration was altered; vercel.json's Git deployment block remains. No GitHub Actions deployment workflow exists in this repository.

## Limits and follow-up

No failing application check remains. Testing used desktop browser simulation, not physical phones/tablets. Preview noindex behavior is covered by unit tests and explicit Netlify context overrides; no separate preview deployment was created. The existing contact section uses a Google Maps directions link, not an embedded map; this was preserved. The existing Netlify badge was not changed.
The successful baseline build log verifies Node 24.21.0; the new .nvmrc selects major 24. Final build success/publication is independently confirmed by Netlify API; the dashboard became intermittently unresponsive during final log inspection, so no new exact Node patch version is claimed.
No manual dashboard configuration remains: both approved environment values were saved and revealed for all scopes/contexts. Indexing activation and custom-domain migration remain separate future tasks.

This documentation-only verification record is committed after the implementation deploy. Its normal Git-triggered deployment uses identical application/configuration code. Resolve the latest published commit/deploy from Netlify and the final handover; do not mistake the implementation deploy above for an assertion about all future deploys.
