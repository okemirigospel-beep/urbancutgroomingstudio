# Asset inventory and recovery

Originals in repository root are preserved byte-for-byte:

- URBANCUT-Grooming-Studio-Logo-1[1].svg — supplied approved logo, 1536×1536 declared canvas, opaque black background; VTracer-generated vector paths. Never recolour or stretch.
- 2647c413cb595be2d9d24779d0a863ca.mp4~2.mp4 — supplied stock barbering film; preserve original and create separate web derivative/poster.
- refero.design 5af49096-2a34-424c-8f91-4b5713a04e31.jpg — design reference only, not served as website content.
- Urban-Cuts-Audit-and-Rebuild.zip and Urban-Cuts-Framework-Pack-v0.1.zip — original specifications and older audit. Latest user instructions override conflicting recommendations.

Missing: approved actual-studio/gallery photography, genuine publishable reviews, product photographs and approved compact logo variant (optional). Stock film must not be presented as actual URBANCUT work. Contact URLs/map are also pending.

Web derivatives: public/media/urbancut-logo.svg is an unchanged copy of the supplied logo; hero.mp4 is silent H.264, 540x960, 30fps, fast-start, 620,031 bytes; hero-poster.jpg is a 540x960 frame at 1.1 seconds, 69,048 bytes. The original MP4 is 4.56 seconds with 1280x720 encoded dimensions and -90-degree rotation metadata (portrait display). Preserve the entire portrait framing. Embedded editing mark, internal cuts, black bands and a non-seamless end/start transition are source limitations. Obtain a clean authorised source before launch; do not remove the mark to conceal its origin.

All supplied files are small enough for regular Git tracking. No separate asset storage is required for the current local prototype. Once pushed and verified, clone the continuation branch and run npm ci to recover tracked source and assets. Git does not recover untracked secrets, databases or future external storage. No Supabase database or external storage has been created by this task.

## Live header/hero asset revision — 25 September 2026

Source pack: `C:\Users\LENOVO\Pictures\hero section edits URBANCUT.zip`, retained unchanged outside the repository. Six 720px-wide originals in `hero section UC/PICTURES TO BE USED FOR THE SLIDESHOW/` map in filename order to `public/media/grooming/look-1` through `look-6`, each with 480px and 720px WebP derivatives. Total derivative storage: 424,620 bytes (both sizes combined). Orientation normalised and metadata omitted; source composition retained without crop, stretch or upscaling. Originals should be stored separately with the supplied ZIP in the owner's asset backup.

1. IMG_20260924_230009.jpg — textured haircut (720 × 882).
2. IMG_20260924_230105.jpg — close-cropped haircut (720 × 806).
3. IMG_20260924_230641.jpg — sectioned twists (720 × 748).
4. IMG_20260924_230723.jpg — locs (720 × 813).
5. IMG_20260924_230807.jpg — curved shaved part and beard (720 × 747).
6. IMG_20260924_232710.jpg — child's cornrows (720 × 825).

Approved SVG in the new ZIP is byte-identical to `public/media/urbancut-logo.svg` (SHA-256 615cac50bfde9528d9bb4fb68e7682a2dc59c567137881a68a591606473769d2). Its artwork, colours, internal spacing and aspect ratio are unchanged.

Reference-only: current-homepage screenshots, annotated EDIT screenshots, navigation references I/II, slideshow concept, green media-outline screenshot, motion_slideshow reference only.mp4, and Refero/Spyglass screenshot. No new reference video is committed or served. The former hero video/poster remain preserved in Git but are no longer used by the page.

No assets are missing for this local header/hero implementation. Publication permission for identifiable people has not been supplied, particularly parental/guardian permission for the child. Confirm permission and scope before public website launch. Images are described only by visible grooming work; no staff/customer attribution is asserted. Existing unrelated gallery/product/contact approval gaps remain.

Latest responsive re-edit: web assets are unchanged, but display now uses full-frame proportional cover with per-photo focal positions instead of contain. Six desktop and mobile crops were visually reviewed. No reference MP4 is used. Original 720px-wide resolution limits fine detail; maximum display width is 620px.

Header logo derivative: public/media/urbancut-logo-header.svg changes only outer dimensions/viewBox to remove empty black canvas. All original paths/colours/transforms remain exact; source SVG and footer use are preserved. See the latest VERIFICATION.md entry for bounds and hash.


## Services category artwork — 27 September 2026

All six files in `C:\Users\LENOVO\Pictures\service section images __.zip` were verified as 1122 × 1402 PNG data despite having no extensions. The original ZIP is unchanged and outside Git; retain it in the owner's separate original-asset backup. Its production derivatives are tracked under `public/media/services/`, RGB WebP at 800 × 1000, quality 84, without metadata or upscaling. Total: 559,462 bytes. Next/Image supplies responsive delivery sizes.

| ZIP entry under service section images/ | Tracked derivative | Role |
| --- | --- | --- |
| barbering and grooming | haircuts.webp | Haircuts & Grooming |
| beard and shave | beard.webp | Beard & Shave |
| hair and scalp care | hair-care.webp | Hair & Scalp Care |
| urbancut wellness (nail and footcare) | wellness.webp | Coming Soon Nail & Foot Care |
| home service | home.webp | Enquiry-only package |
| blackcard membership | membership.webp | Coming Soon membership concept |

The supplied artwork is not represented as documentary studio/staff/treatment photography or an issued membership card. Original photo/video/logo assets and existing hero derivatives were not modified. WhatsApp destination is now approved; email/social/map details remain pending. The tracked derivative assets suffice to run the application from Git; source ZIPs outside the repository require separate storage.


## Self-hosted typography — 27 September 2026

Four licensed WOFF2 assets and three OFL licenses are tracked under src/app/fonts. The fonts/README.md records source URLs, real weights, Unicode coverage, currency-only fallback, conversion and hashes. All runtime font assets are included in Git; no separate storage or API credentials are required. Screenshot evidence is under docs/screenshots/typography. The original logo and all existing media remain byte-for-byte unchanged.


## Services refinement references — 28 September 2026

Inspected icons for service section.zip: clock icon.png, duration icon.png, price tag.png, shopping cart.png. These are shape references, adapted using the existing Lucide SVG family, not imported as raster production controls. No new runtime asset dependency. The new supplied logo is byte-identical to the original tracked SVG; panel headers reuse the already approved tight-bounds derivative. Source ZIP/originals remain unchanged. See SERVICES-REFINEMENT.md.


Products (29 September 2026): six extensionless files in C:/Users/LENOVO/Pictures/PRODUCTS IMAGES_.zip verified as PNG 1254x1254. Exact filename/product mapping is documented in PRODUCTS-VERIFICATION.md. Original archive remains untouched; descriptively named original PNG copies are at C:/Users/LENOVO/.cache/urbancut-product-originals. Source originals require separate storage/backup. Tracked web assets in public/media/products are uncropped 960x960 WebP derivatives (quality 88), about 461KB total, with responsive Next Image delivery. Packaging/labels/colours were not redesigned.


homepageadditives.zip: 14 valid JPEG photographs appended as IDs 7–20 in the requested order. Byte hashes/source dimensions and mapping recorded in slideshow-additions.json. All EXIF orientations normalized; 480/720-name WebP derivatives generated without cropping or upscaling. Narrow source WA0068 remains 607px wide in its larger derivative; srcset reports its true width. No decoded-pixel duplicates found against the six original slideshow JPEGs or within additions. Original ZIP remains in Downloads and requires separate source-asset backup; optimized derivatives are tracked. Original six derivatives unchanged.
Lookbook: public/media/lookbook contains 26 WebP derivatives (maximum 720px wide, no upscale), upright 540x960 audio-free MP4 and poster. src/lib/lookbook.ts maps stable IDs to original JPEG filenames. Originals remain separately in supplied Downloads/gallery.zip and original grooming MP4; preserve those separately. Optimized derivatives included in authorized Git checkpoint.
Customer review source ZIP inspected privately. Raw screenshots remain in Downloads/customerreviewssection.zip and local cache only; no customer images/names or source screenshots added to public assets or Git.
Academy images: Downloads/urbancut academy.zip preserved. Five extensionless PNGs1448x1086 mapped by basename to their corresponding programme. Genuine1080x810 WebP derivatives at public/media/academy/urbancut-{foundation,professional,master,elite,executive}.webp, quality86, no upscaling/crop. Original source ZIP requires separate storage.

Visit & Connect (2026-10-02): supplied map screenshot excluded because its business popup shows conflicting 7 p.m. hours and provider attribution is not visible. No map derivative or third-party map service added.

Footer now reuses approved urbancut-logo-header.svg with footer-only sizing. Both SVG files remain unchanged; no new logo variant generated.

SEO: icon.png (192x192) and urbancut-share.png (1200x630) rasterise the approved tight-bounds SVG on black without altering artwork. Original SVGs untouched; no new branding or external image service.

2026-10-03: No assets changed. All20 hero photographs retain IDs/order,480/720WebP variants and focal positions; only request timing changed. Mobile cold-load selected480w sources. See SEO-PREPARATION.md.

## 6 October 2026 — temporary approved placeholders

Founder portrait pending: `src/lib/presentation.ts` currently uses decorative NW, not a photograph. Four Services category IDs (`haircuts`, `beard`, `hair-care`, `home`) now render plain neutral media areas; home kit image also removed from detail view. `wellness` and `membership` retain their existing images and unavailable states. All original files retained. Product mockups are no longer rendered; historical files preserved. Hero, Lookbook and Academy media unchanged.

## 10 October 2026 — supplied web edits assets

Originals preserved in assets/originals/oct10. Extensionless collection identified as PNG 1672×941; 1092×941 WebP crop in public/media/urbancut-collection-teaser.webp. Transparent TikTok derivative in public/media/tiktok-mark.png. No Home Service video supplied or loaded. Full bounds, compression and evidence: OCT10-SCOPED-UPDATE.md.

## 10 October supplied services / Home Service / Academy media

Active mapping and sizes are documented in [OCT10-MEDIA-UPDATE.md](OCT10-MEDIA-UPDATE.md). Source: owner-supplied UC supply images and video for work.zip. New service assets are in public/media/service-previews, Academy replacements end in -workstation.webp. Loose Academy PNG files are authoritative, especially revised Master; nested archive is not imported. Approved Academy imagery is illustrative, not evidence of actual premises. Originals and the 172.6 MB film stay outside public/Git; only web derivatives are added. Original sequence preserved, decorative clip audio removed, main audio retained pending speech/caption review. Earlier asset records are historical and do not specify active fallbacks.
