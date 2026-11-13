> Follow-up photo review: Lookbook now has 51 photos. White-shirt photograph is first, patterned-shirt photograph second, former opening photograph seventh. The specified locs photograph (opening-4) is removed from the Lookbook; both identified child photographs move to the children group. All remaining relative order is preserved.

# 13 November 2026 — approved latest update

The owner approved all decisions in the latest draft, including the 13-photo opening archive order, compact footer and coordinated date/time layout. This update supersedes earlier media counts and colour-gallery instructions. Existing hosting settings, prices, booking policies and page order are unchanged. Netlify Git deployment is authorized; indexing stays off.

## Implemented

- Home and Lookbook videos now use the newest ZIP. Silent fast-start MP4 derivatives preserve the original encoded video streams without timeline cuts, cropping or speed changes. Home: 360×640, browser video duration 40.967s, 3,532,959 bytes. Lookbook: 478×850, 18.588s, 2,803,338 bytes. The slightly longer source container durations include the removed audio stream. Video stream hashes match the originals; posters were selected from the new footage. Originals are untouched.
- Hair & Scalp Care uses exactly three replacement photographs, in the specified order; responsive derivatives retain the existing card frame and slideshow lifecycle.
- Other Colours has a required Red/Green/Blue/Grey/Other selector, a required custom shade when Other is chosen, and no gallery. Its saved preference appears in selection summary, remains editable and accompanies the unchanged ₦25,000 service line in the prepared WhatsApp request. A saved preference applies to that service line and its quantity.
- Lookbook has 52 unique source-photo positions: 13 owner-designated opening images, 6 braids, 8 colours, 2 children and 23 remaining haircuts. Overlapping categories use the requested priority. Reused/recompressed/cropped copies are consolidated. Manifest records explicit filenames/order and aliases; the counter derives from the array.
- Charcoal/gold calendar and hourly time buttons replace native date/time controls in both studio and Home forms. Desktop uses adjacent columns; mobile stacks. Next-day Lagos dates, Sunday hours, known-duration closing limits and date-change revalidation remain enforced. Arrow keys, Home/End, PageUp/PageDown and year shortcuts work. No live availability or booking-confirmed claim is introduced. Resolved form errors clear when corrected.
- Footer now has the smaller logo, single brand/location line, six navigation links and four existing contact links. The final booking CTA remains. At 390px the measured footer height fell from 1308.8px to 748.5px (about 43%).

## Verification

- Production build and TypeScript passed; all 40 regression tests passed. Node reports the existing typeless-package parsing warning in tests; no failed tests.
- Calendar checked at 320, 390, 768, 1024 and 1440px: no picker/dialog horizontal overflow. Desktop/mobile screenshots are in screenshots/nov13-*.
- Required colour and custom-shade validation, Green selection, editing to Burgundy, saved summary, name/date/time requirements and encoded WhatsApp destination 2347063291013 checked without sending a message.
- Saturday-to-Sunday date change clears an invalid morning start; Sunday offers 1 PM through 8 PM. Calendar keyboard day/month navigation and selection checked. Date and time errors clear after correction in the final production build.
- Both videos played muted, inline and looping with contain framing and no website controls on mobile/desktop checks. Existing playback logic was preserved; lifecycle regression tests pass. This update did not repeat a full browser/OS matrix for autoplay blocking, hidden tabs or reduced motion.
- All 97 allocated responsive/gallery/poster image URLs decoded in Chromium. Lookbook backward/forward wrap 1 → 52 → 1 passed. The first two policy FAQs remain first. No application console errors were reported during the checks.
- Diff reviewed; no environment, hosting, price, section-order or WhatsApp destination change.

## Remaining owner review and limitations

Cross-photograph person identity groups are still pending owner confirmation. The source-photo ledger contains 68 groups and 88 placements, with no known source photograph allocated more than twice. This is NOT a completed two-appearances-per-person audit. No identity was inferred from faces. Review [numbered contact sheets and full filenames](review-nov13/index.html), then supply matching numbers/filenames to resolve person-level conflicts. All six sheets include filename captions; the index includes aliases and placements.

The existing control-free looping video design has no visitor pause control; this remains a motion-accessibility limitation, not a complete compliance claim. Browser/OS media controls are outside website control. Native Safari/iOS and Android hardware were not tested in this session.

## Source records

- [Media order and video hashes](nov13-media.json)
- [Source-photo allocation and asset hashes](image-usage-nov13.json)
- [Pending person review](person-usage-nov13.json)

Delivery uses urbancut-continuation on the checkpoint remote. Before this update, GitHub and Netlify both independently reported c326bfb22faafdb7d24470cca7e21d9515748fab. Final published commit and HTTP/indexing checks are reported in the delivery message after push.
