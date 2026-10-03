# Netlify reconciliation — 3 October 2026

## Baseline inspected before publication

Netlify dashboard independently verified owner Gospel Okemiri VA & Admin Services, project urbancutgroomingstudio, linked GitHub repository okemirigospel-beep/urbancutgroomingstudio, production branch urbancut-continuation and exact published commit 600ebd788141b199257f25ae7103b4a821716621.
Rollback deploy: 6ac0fc7530acd9000879bb43. Builds Active; publishing unlocked. Production branch only; pull-request previews enabled. Build root /, command npm run build, publish .next, Next.js auto detection. Successful baseline Node 24.21.0 / npm 11.19.0 / Next.js 16.3.6 / Runtime 5.16.1. No project environment variables were set at inspection; Both approved variables were subsequently saved and revealed for verification: SITE_URL=https://urbancutgroomingstudio.netlify.app and SITE_INDEXING_ENABLED=false, All scopes and all contexts. Project ID independently read from General settings: 2d75c50c-1b1b-47c6-a058-dab47f46ef5f.

The plugin exposes skills but no account-management tools in this session. Dashboard inspection uses the existing signed-in browser; public HTTP checks are independent of dashboard access.

## Scope

Added reproducible Netlify build configuration and Node 24 major pin; approved stable Netlify origin validation; non-production CONTEXT indexing guard and regression tests. Retained disabled Vercel Git deployment configuration. Updated current documentation, preserved superseded Vercel handover as history. No website components, CSS, catalogue, assets or booking logic changed.

## Verification

31 tests passed, including booking, academy, products, slideshows and new preview-indexing regression cases. Production build and typecheck passed. Local HTTP regression passed (16 descriptions, closed details, no forms initially, two hero images, noindex, empty sitemap, real 404). Mobile browser booking regression passed: multiple services, quantities/removal, totals, weekday/Sunday hours, invalid-field handling, address requirements and prepared WhatsApp messages; nothing sent. Local mobile screenshot inspected with no browser errors. Live publication checks follow the Git push.
