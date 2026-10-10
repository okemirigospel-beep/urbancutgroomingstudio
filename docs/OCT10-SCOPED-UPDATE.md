# Four scoped updates — 10 October 2026

## Implemented

- Home Service is a near-black, single gold-bordered, 45/55 desktop grid with all approved concise information and white CTA in the left column. The right column is an empty decorative media wrapper (no video element, source, player, focus stop or visible label). Its configurable `--home-media-ratio` is 4:3 on desktop and 16:9 when stacked below 1100px. Existing callback, price and package source remain unchanged.
- Why UrbanCut uses the exact Reviews ivory, `#f5f2ea`, now shared as `--ivory`. Reviews' computed colour and layout are unchanged. One shared surface, four/two/one benefit columns, existing wording unchanged.
- Collection uses the exact new copy and the supplied covered-product illustration. No product cards, prices, offers, waitlist or actions. Responsive Next Image has explicit 1092×941 intrinsic dimensions, sizes and default lazy loading. Only a subtle left image-edge mask blends the seam; no text overlay or decorative effect.
- Visit & Connect TikTok link has the supplied decorative mark, in the same `#866514` contact gold as adjacent icons (shared `--contact-icon-gold`), 20×20px contain mask. The label and icon form one existing link. Footer has independent text-only links, not a shared social-icon component; it remains unchanged.

## Assets

Input ZIP preserved at `C:/Users/LENOVO/Desktop/web edits image.zip`. Its extensionless collection file was identified by Pillow/file signature as **PNG, RGB, 1672×941**. Original project copy: `assets/originals/oct10/urbancut-collection-teaser.png` (unchanged bytes). Original TikTok: `assets/originals/oct10/tiktok-mark.png` (512×512 RGBA, unchanged bytes).

Derivatives:
- `public/media/urbancut-collection-teaser.webp`: 1092×941, crop rectangle (580,0)–(1672,941), WebP quality 90, 105,982 bytes. Only surplus left negative space removed; tallest form and lower drapery retained. Next Image supplies responsive delivery.
- `public/media/tiktok-mark.png`: transparent 450×512 silhouette, alpha bounds (31,0)–(481,512) trimmed, 8,384 bytes. CSS mask preserves its aspect ratio and applies existing contact gold. No coloured badge or opaque box.

No AI generation, new dependency, font, video or unrelated imagery was used. Final Home Service video is still needed.

## Verification

- Production build, standalone TypeScript and all 31 existing tests passed. No lint script exists. Existing Node module-type warning remains non-fatal.
- Existing `scripts/check-booking-browser.js` passed on desktop and mobile, including both Home Service entry points, retained data, correct ₦100,000 Abuja package, outside-Abuja destination without Abuja charge, dates/Sunday rules, quantities/totals, studio basket preservation, dialog close and focus restoration. Prepared URLs inspected; no WhatsApp message/email sent.
- `scripts/check-service-html.ts` passed: 16 initial-HTML descriptions, two initial hero photos, noindex, empty sitemap, real 404.
- Browser rendered checks at 360,390,768,1024,1440px; no horizontal overflow. Exact Home/Collection copy, no fake player/placeholder labels, one TikTok link, unchanged contact destinations, FAQ 6→19→6 and anchor clearance passed.
- Native Chrome 200% page zoom in isolated test profile verified by DPR 2 / 632 CSS px within 1280px outer browser; affected layout, FAQ, anchor and overflow checks passed. User's browser preferences untouched.
- Desktop/mobile screenshots inspected for full covered forms, comfortable stacked Home Service frame, ivory match and TikTok alignment. First desktop image capture preceded lazy decode; final screenshots wait for decode. No runtime browser errors reported.
- Service catalogue, booking/schedule logic, Services controller, Reviews, Header/Footer, FAQ and contact data compared byte-for-byte (normalised line endings) to baseline `d004d5d`; unchanged. No unrelated page sections or hosting settings changed.

## Screenshots on this computer

- `C:/Users/LENOVO/.cache/oct10-desktop-home.png`
- `C:/Users/LENOVO/.cache/oct10-desktop-collection.png`
- `C:/Users/LENOVO/.cache/oct10-desktop-why.png`
- `C:/Users/LENOVO/.cache/oct10-desktop-contact.png`
- `C:/Users/LENOVO/.cache/oct10-390-home.png`
- `C:/Users/LENOVO/.cache/oct10-390-collection.png`
- `C:/Users/LENOVO/.cache/oct10-mobile-contact.png`
- Additional 360,768,1024px Home/Collection and native zoom captures use the same oct10 prefix.

## Scope, Git and local preview

Changed implementation: `src/components/HomeService.tsx`, `Products.tsx`, `VisitConnect.tsx`, `src/app/globals.css`, plus the four original/derivative assets. Documentation records the result. No new tests mirroring static styles were added; existing behavioral regressions reused.

Branch `urbancut-continuation`; remote `checkpoint` → `okemirigospel-beep/urbancutgroomingstudio`. The owner's current brief reconfirms Netlify **Stopped builds** and authorises this backup push. No deployment/preview/build trigger is authorised or invoked. SITE_INDEXING_ENABLED remains false; SITE_URL remains https://urbancutgroomingstudio.netlify.app. Hosting configuration is unchanged.

Local Windows checkout: `C:/UCUTS`. Preview runs on the owner's computer at http://127.0.0.1:3000/?update=oct10. To switch the running production preview to development, run `./scripts/local.ps1 -Stop`, then `npm run dev` from C:/UCUTS (Node 24). If npm is unavailable, use `node C:/Users/LENOVO/.cache/urbancut-tools/package/bin/npm-cli.js run dev`. No public tunnel.

Remaining: genuine Home Service video/poster pending. No unresolved visual or functional issue found in Chromium; physical-device, Safari and Firefox verification not performed.
