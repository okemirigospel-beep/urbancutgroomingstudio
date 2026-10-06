# Website refinement — 6 October 2026

## Scope and publishing status

Local development and GitHub backup only. The owner reports the Netlify project disabled and explicitly confirmed **Build status is Stopped builds** in this conversation before pushing. That dashboard setting is owner-confirmed, not independently visible through the available API. No hosting settings were changed. Do not enable builds, create previews or deploy this update.

The read-only Netlify project/API check identified the existing project and published deploy `6ac29a002068a600080fd9d6`, source `45dccea0c017db9e2bed100854bcc0b75c553cd1`. The repository has no GitHub Actions workflow; Vercel Git deployments remain disabled. Git fetch confirmed the local baseline and `checkpoint/urbancut-continuation` matched before editing was committed. GitHub backup is authorised on that established branch with builds stopped.

`SITE_URL=https://urbancutgroomingstudio.netlify.app` remains unchanged; `SITE_INDEXING_ENABLED=false`. Preview/branch indexing guards remain unchanged. No domains, plans, accounts, backend, payments or external messages were changed.

## Approved implementation

DOM and visual order: Hero (including information band), The UrbanCut Story, Our Services, UrbanCut at Your Location, Why UrbanCut, The UrbanCut Lookbook, existing Client Reviews, Academy with Beyond the Chair, Grooming Collection, Visit & Connect/FAQ, footer.

- Hero headline, image order, timing and progressive loading retained; exact new supporting copy, region and secondary Home Service anchor added.
- Story uses the approved founder identity and closing statement. Decorative NW portrait placeholder; configuration in `src/lib/presentation.ts` accepts a future approved portrait without a new component.
- Services uses neutral media surfaces for IDs `haircuts`, `beard`, `hair-care`, `home`. Retained exceptions: `wellness` → `/media/services/wellness.webp`; `membership` (UrbanCut Black Card) → `/media/services/membership.webp`. Coming Soon and non-bookable behavior remain intact. The home-detail kit image is also removed. Source media files are preserved.
- Dedicated Home Service derives its price and package from `homeOffering` and opens the same Services state/dialog as the category; no second form, cart, validation or destination. Existing outside-Abuja support remains.
- Four approved Why UrbanCut statements, no extra labels/icons/CTA.
- Beyond the Chair is within Academy, below all five existing programmes; visibly Coming Soon, exact prepared enquiry to the existing admin, no checkout or promised availability.
- Six product cards retired from rendering. Historical catalogue/assets/tests retained; only the approved launch announcement is displayed. No product images, prices, purchase actions or product-offer schema.
- Two targeted FAQ answers updated; all 19 IDs/questions/order and six-first display preserved. TikTok added to Visit & Connect/footer and business sameAs. Confirmed legal name used for schema/copyright; year stays server-rendered.
- Sticky header retained. Navigation uses the mobile arrangement below 1280px to accommodate the new links without reducing the logo/text. About and Home Service anchors, footer links and both booking destinations verified.

## Reference lock and content audit

Primary reference: the existing UrbanCut implementation and the explicit section compositions/copy in the supplied brief. Existing DM Sans/Crimson Text, black/white/gold tokens, rectangular controls and shell widths retained. Editorial two-column Story, typography-led Home Service, unboxed Why statements and subordinate Academy future pathway. Refero live style lookup returned NO_SUBSCRIPTION; bundled craft guidance supported focus/readability checks. No new fonts, dependency, imagery, decorative icon grid or generated visual was introduced.

Rendered text was extracted for Story, Home Service, Why, Beyond the Chair and Collection and compared with the supplied approved copy. No unapproved customer-facing text, placeholder explanation, invented fact or extra CTA was added. Existing service form labels/validation/notices were preserved. The React checklist was reviewed: stable shared state, no new effect/listener, no new dependency, and static sections server-rendered where possible.

## Catalogue baseline and preservation

Baseline: `45dccea0c017db9e2bed100854bcc0b75c553cd1`. `catalogue.ts`, `booking.ts`, `appointments.ts`, `academy.ts`, `Reviews.tsx`, `HeroSlideshow.tsx` and historical `products.ts` are identical to baseline (line endings normalised). Service descriptions, category names, package contents and availability are therefore unchanged. Thirteen services bookable; three Coming Soon; exactly three verified durations.

| Service | Naira price | Duration (minutes) | Status |
|---|---:|---:|---|
| UrbanCut Signature Haircut | 15,000 | 45 | bookable |
| UrbanCut Express Haircut | 10,000 | 35 | bookable |
| Kids Haircut | 5,000 | Not specified | bookable |
| Ladies Haircut | 15,000 | Not specified | bookable |
| The UrbanCut Signature Experience | 32,000 | 45 | bookable |
| Premium Shave | 5,000 | Not specified | bookable |
| Shave + Enhancement | 8,000 | Not specified | bookable |
| Shampoo Treatment | 5,000 | Not specified | bookable |
| Black Hair Dye | 5,000 | Not specified | bookable |
| Texturizer | 6,000 | Not specified | bookable |
| Blonde Colour Tinting | 15,000 | Not specified | bookable |
| Other Colours | 25,000 | Not specified | bookable |
| Locs — Palm Rolling | 30,000 | Not specified | bookable |
| Manicure | 7,000 | Not specified | coming-soon |
| Pedicure | 10,000 | Not specified | coming-soon |
| Manicure + Pedicure | 15,000 | Not specified | coming-soon |

Signature Experience inclusions remain Haircut, Dye, Shave, Hairline detailing, Shampoo. Home Service remains ₦100,000 for the one-person premium grooming package in Abuja; outside-Abuja enquiries quoted separately. Black Card remains a non-bookable preview with ₦50,000 registration fee.

## Verification performed

- Local production build, standalone TypeScript check, all 31 existing unit tests passed. No lint command is configured. Node emits the existing MODULE_TYPELESS_PACKAGE_JSON warning; no build/type failure.
- `scripts/check-service-html.ts` passed: all 16 catalogue descriptions in initial HTML, no closed-form inputs, two initial hero images, noindex response, empty sitemap and genuine 404.
- Existing booking browser regression passed at desktop/mobile; extended the same script with shared Home Service entry-point regression: retained name/address, outside-Abuja destination/no Abuja charge, both focus-restoration targets, unchanged studio basket and entries.
- Browser checks covered multi-service add/remove, quantities/totals, required validation, next-day date restriction, weekday 09:00, Sunday 13:00 and clearing invalid time, studio/home prepared messages. Links/messages inspected only; WhatsApp messages were not sent.
- Academy details and required-field validation, current programme/name/notes in the handoff (window.open intercepted), FAQ expand/collapse and 6→19→6 questions, confirmed contact destinations passed.
- Rendered at 360, 390, 768, 1024, 1440px and 1280px desktop breakpoint; no horizontal overflow. Sticky anchor offsets, one H1, unique IDs, dialog top-layer/body lock and focus restoration passed.
- 720×450 landscape: expanded menu scrolls internally, bottom 442px within 450px screen; Escape closes/restores toggle focus; Home Service dialog remains usable.
- Actual Chrome **200% Page zoom** selected in an isolated test profile through chrome://settings/appearance. Verified DPR 2 and 632 CSS-pixel content width in a 1280px browser. Shared-entry, anchor and overflow checks passed; expanded menu scrolls within the short viewport; dialog/Escape checked. This was native page zoom, not CSS zoom or a device-scale-only emulation. User browser preferences untouched.
- Network resource inspection: only Wellness and Black Card Services image URLs; no retired category image fetches. Hero, Academy and Lookbook media source collections preserved. No new browser runtime errors.
- Title, exact description, canonical origin, noindex metadata and HairSalon schema inspected in browser. Legal name and exact TikTok URL present; no fabricated reviews/ratings or product offers.
- Full desktop, tablet and mobile screenshots saved locally; section screenshots visually inspected for Story, Home Service/Why, Beyond the Chair/Collection, mobile hero, and zoom/dialog.

## Evidence on this computer

Screenshots are review artifacts outside Git:
- `C:/Users/LENOVO/.cache/refinement-1440-full.png`
- `C:/Users/LENOVO/.cache/refinement-tablet-full.png`
- `C:/Users/LENOVO/.cache/refinement-390-full.png`
- `C:/Users/LENOVO/.cache/refinement-desktop-story.png`
- `C:/Users/LENOVO/.cache/refinement-desktop-home.png`
- `C:/Users/LENOVO/.cache/refinement-desktop-beyond.png`
- `C:/Users/LENOVO/.cache/refinement-mobile-home.png`
- `C:/Users/LENOVO/.cache/refinement-mobile-beyond.png`
- `C:/Users/LENOVO/.cache/refinement-tablet-story.png`
- `C:/Users/LENOVO/.cache/refinement-landscape-menu.png`
- `C:/Users/LENOVO/.cache/refinement-zoom.png`
- `C:/Users/LENOVO/.cache/refinement-zoom-dialog.png`

## Remaining assets and factual differences

Await approved founder portrait and authentic photography for the four neutral category media areas. No dedicated Home Service image is needed for this composition. The existing Visit & Connect has a directions link but **no embedded map preview**, despite the brief's reference to preserving one; this existing architecture is retained rather than inventing or adding a map. No physical-device or Safari/Firefox testing was performed. No automated lint configuration exists.

## Local preview and source files

This work runs on the owner's Windows computer, `C:/UCUTS`, not a remote localhost. Preview: `http://127.0.0.1:3000/?refinement=oct6`. The current production preview is managed by `.local/dev.pid`. To switch to development:

```powershell
cd C:\UCUTS
.\scripts\local.ps1 -Stop
$env:SITE_URL='https://urbancutgroomingstudio.netlify.app'
$env:SITE_INDEXING_ENABLED='false'
npm run dev
```

Use Node 24; `npm ci` only if dependencies are absent. The supplied local npm fallback is `node C:/Users/LENOVO/.cache/urbancut-tools/package/bin/npm-cli.js run dev` if npm is not on PATH. Do not run hosting deploy commands or enable builds.

Changed source: `src/app/page.tsx`, `globals.css`; components Story, HomeService, WhyUrbanCut, BeyondTheChair, Services, Academy, Products, Header, Footer, Lookbook, VisitConnect; libraries presentation, content, hero, studio, seo; existing booking browser regression. Documentation records scope/publishing changes separately.
