# Final scope verification — 25 October 2026

Starting source: 1068e766100c2c7cad97ef24e1396eb121b6a64e. Content/order milestone: 18baca3.

## Implemented
Five approved hero backgrounds in supplied order, 3 seconds of hold plus 600ms crossfade. Headline and mantra reveal once (650ms, 180ms/380ms stagger). Dark overlay and 5px blur affect backgrounds only. Existing image-area keyboard/tap pause remains without a visible control. Reduced motion disables cycling/reveals. Story uses supplied founder photo at natural 2:3 proportions with rounded corners, no decorative frame, and once-on-entry groups.

Order: Hero, Story, information strip, Services, Home Service, Lookbook, Academy, Why UrbanCut, Beyond the Chair, Collection, Reviews, Visit & Connect, closing/footer.

Approved catalogue prices, two Sporting Waves choices, unknown Waves durations, unpriced Coming Soon Massage/Facial, Home inclusions, Black Card exclusions/benefits, and review names are implemented. Home category card and Express Haircut removed. Academy Foundation/Elite unchanged; supplied Professional/Master/Executive replacements used.

## Asset record
Machine-readable source order and mapping: oct25-media.json. All derivatives live in public/media/oct25; source ZIP remains intact outside public assets.
Hair & Scalp Care: three dyed images `7.jpg`, `8 (2).jpg`, `9.jpg`; two braided images `2 (2).jpg`, `3.jpg`.
Removed photographs no longer occur in mounted media references: WA0027, former window/cape portrait, sunglasses/grey-shirt portrait, and glasses/dark-shirt side profile. Old historical asset files may remain unreferenced.
Home source already removed road-trip footage, but prep remained: keep 11.3 seconds to end. Output: 35.47s, 720×1280, H.264, no audio stream, fast-start MP4.
Lookbook source still contained dryer segment: remove 2.3–4.1s. Output: 4.37s, 478×850, H.264, no audio stream, fast-start MP4.
Source video over GitHub's 100MiB limit is not committed; optimized derivative is below the limit.

## Verification
Production build and typecheck passed; all 35 tests passed. Browser checks at 320, 390, 768 and 1440px: hero/Story/Lookbook inspected, no horizontal overflow observed. All 28 gallery files decoded. Actual section order checked from DOM. Both Sporting Waves options reached studio form and produced ₦75,000 selection total; missing-name/date validation retained. Existing message/quantity/availability/Academy tests passed without sending WhatsApp messages.
Home video visibly autoplays muted; browser confirms 9:16, looping, explicit pause persistence and offscreen suspension. Reduced-motion browser emulation holds hero and pauses Home video; text animation is none. Browser error log empty during checks. Indexing meta remains `noindex, follow`.

## Limits / unchanged policy
Sporting Waves durations remain unspecified; black hair dye/enhancement wording retained without interpretation. No new business claims. No payment, submission or confirmation is introduced. Removal of the historical Services pause control is not a claim of complete motion-accessibility compliance; automated previews retain reduced-motion and lifecycle safeguards. Real-device autoplay policies and native assistive-technology testing are not exhaustive.

## Hosting
Owner explicitly re-enabled Netlify builds and authorized the final implementation push. This supersedes October 6 stopped-build notes. Push may trigger existing Git-connected deployment. No hosting settings, production branch or indexing flag is changed by this update. SITE_INDEXING_ENABLED remains false.
