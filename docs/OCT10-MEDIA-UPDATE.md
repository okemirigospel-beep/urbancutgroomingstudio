# Services media, Home Service film, Academy and WhatsApp update

Local implementation against `154a04c103fbce891297a3fd5bd6946b51132fd0`, on `urbancut-continuation`. The owner reconfirmed Netlify **Stopped builds** in this brief. No build enabling, hosting change, deployment, indexing change or message sending is part of this update.

## Completed changes

- Desktop navigation displays **Gallery** and keeps `#gallery`. Mobile/tablet retain **Lookbook**. The section heading remains **The UrbanCut Lookbook**.
- Three independent four-photo previews use a stable 4:5 media frame. Each holds for 3 seconds and slides left in 400 ms, including 4 → 1. Initial offsets are 0/180/360 ms. Only the media moves. Current/previous/next images are mounted as needed; upcoming media waits for successful loading. Failed upcoming images are skipped while the current image stays visible.
- One separate **Pause previews / Play previews** action controls these photos and the short equipment clip. Explicit pause is separate from temporary visibility, hover, focus, dialog and hidden-tab suspension. Reduced motion gives stable previews. Animation state is isolated from booking/form state.
- The short Home Service card clip is silent, inline and looping only when allowed. Its entire source frame is contained within the shared 4:5 card, leaving restrained dark side space rather than cutting off the equipment. No toolbar is nested inside the category button.
- The main Home Service film is a separate, user-started native player: play/pause, seeking, volume and fullscreen support, no automatic looping. No video URL is attached before intent. A grooming-scene poster replaces the blank placeholder. The wrapper and film are both 9:16; there is no CSS letterboxing. Offscreen/hidden/dialog suspension never automatically resumes audible playback.
- All five Academy images use the loose supplied PNG files, including the revised **Master specialist workstation**. They remain static, full-composition 4:3 illustrations. The nested ZIP and older human imagery are not used as fallbacks.
- `src/lib/booking.ts` remains the single WhatsApp configuration and encoder. The destination is now **https://wa.me/2347063291013**. General contact, studio/Home/outside-Abuja, all five Academy enquiries, Beyond the Chair and footer derive from it. The retired product flow remains unavailable. No local environment override was found; only `.env.example` exists and has no WhatsApp override. Old numbers in historical verification reports describe past runs, not current configuration.

## Asset mapping

| Supplied files | Stable destination |
| --- | --- |
| H&G IMG 1–4.jpeg | `public/media/service-previews/haircuts-{1..4}-{480,720}.webp` |
| beard img 1–4.jpeg | `public/media/service-previews/beard-{1..4}-{480,720}.webp` |
| H&S_C IMG 1–4.jpeg | `public/media/service-previews/hair-care-{1..4}-{480,720}.webp` |
| home service card vid.mp4 | `public/media/service-previews/home-service-card.mp4` and matching poster |
| home service section vid.mp4 | `public/media/service-previews/home-service-feature.mp4`; `home-service-grooming-poster.webp` at 23 seconds |
| FOUNDATION IMAGE_ACADEMY | `public/media/academy/urbancut-foundation-workstation.webp` |
| PROFESSIONAL IMAGE_ACADEMY | `public/media/academy/urbancut-professional-workstation.webp` |
| MASTER IMAGE_ACADEMY (loose revised file) | `public/media/academy/urbancut-master-workstation.webp` |
| ELITE IMAGE_ACADEMY | `public/media/academy/urbancut-elite-workstation.webp` |
| EXECUTIVE IMAGE_ACADEMY | `public/media/academy/urbancut-executive-workstation.webp` |

Service photo dimensions vary from 720×747 to 960×1280. Derivatives do not upscale; per-photo focal positions are in `src/lib/service-media.ts`. Faces, fades, braids and beard outlines were inspected. Academy sources are PNG 1448×1086, delivered as 1080×810 WebP (118–221 KB each). All five compositions are retained. The existing Wellness and Black Card photographs and unavailable states are unchanged.

| Video | Original | Web derivative |
| --- | --- | --- |
| Equipment card | 464×832, ~5.44 s, 1,665,493 bytes, H.264 + AAC | 464×832, ~5.40 s video, 1,123,007 bytes, H.264/yuv420p, **no audio**, fast start |
| Full Home Service film | 1440×2560, ~59.11 s, 172,600,320 bytes, H.264 + AAC | 720×1280, ~59.17 s, 14,782,761 bytes, 30 fps H.264/yuv420p, AAC 96 kb/s, fast start |

Small duration differences are container/frame-rate/audio-tail rounding, not editorial trimming. The film sequence is preserved. Source and derivative contact sheets were compared across travel, kit, grooming, hands, faces and dark areas. No source-wide embedded side bars were seen in inspected frames; existing in-film edits, text and transitions are preserved. Original ZIP/media remain in the owner's Downloads and the local cache extraction, outside public and outside this commit. No external hosting or Git LFS was introduced.

## Verification

- Production build and TypeScript checks pass. **34 unit tests pass**, including preview mapping/wrap/failure behavior, all suspension gates, new WhatsApp destination, exact-once encoding and existing booking/Academy/SEO tests. No lint command is configured.
- Existing browser booking regression passes at desktop and 390 px: service selection, quantities/removal, totals, required inputs, weekday/Sunday schedule, date/time changes, Coming Soon guards, dialog/focus return, shared Home entry points, outside-Abuja quoting and retained studio state.
- All five Academy enquiries intercepted locally without opening WhatsApp. Correct destination, programme data, name, punctuation and multiline notes verified. Public WhatsApp anchors all use the new number. Source/config/tests/current operational instructions contain no active old destination.
- Photo previews observed through a complete wrap: numerical order correct, no blank frames, stable caption geometry, ~3-second dwell plus 400 ms transition. Explicit pause survives leaving/re-entering viewport. Focus, hover, hidden-document and open-dialog suspension checked. An injected upcoming-image error preserves the loaded current image. Reduced-motion browser emulation keeps photos stable and avoids loading the card video.
- Equipment video plays muted without native controls and follows shared pause. Main video initially has no `src` or network request; a real browser click starts it. Native seeking and volume work. Offscreen pause and intentional-only resume checked. Fullscreen capability is available; physical-device native fullscreen was not tested.
- Actual renders inspected at **360, 390, 768, 1024, 1440 px**, **812×390 landscape**, and native **200% Chrome zoom** (632×312 CSS viewport, DPR 2). No horizontal overflow. Academy images load in 4:3; feature video remains 9:16. Main video sizes: 278×494 at 360; 308×548 at 390; 310×551 at 768; 330×587 at 1024/1440. Short landscape reduces it to ~164×291; zoom to ~131×233, with normal page scrolling.
- Desktop Gallery and mobile Lookbook links reach the same section with ~16 px clearance below the sticky header. Native dialogs remain above it. Browser runtime error logs are clean; temporary test-harness quoting errors were corrected separately.
- Initial HTML still includes all 16 service descriptions with closed details, no visible form and only two initial hero images. `noindex`, empty sitemap and real 404 checks pass. `SITE_URL=https://urbancutgroomingstudio.netlify.app` and `SITE_INDEXING_ENABLED=false` are unchanged.

## Remaining verification limits

- Audio is retained, but this session has no listening/transcription tool. Whether meaningful speech needs captions remains to be confirmed; no dialogue or captions were fabricated. Any speech must receive an accurate transcript/caption track before accessibility sign-off.
- Correct chat links do not establish registration of the destination account or native WhatsApp behavior on every physical device. No actual message was sent.
- Netlify stopped-build status is the owner's confirmed dashboard setting, not independently read from account management. Hosting and indexing remain untouched.

## Files and local preview

Main implementation: `ServiceMedia.tsx`, `HomeServiceVideo.tsx`, `Services.tsx`, `HomeService.tsx`, `Header.tsx`, `service-media.ts`, `academy.ts`, `booking.ts`, `globals.css`; focused unit tests, updated destination assertions/browser check, AGENTS/current status/design/assets documentation and the mapped web assets.

Local preview: http://127.0.0.1:3000/?media=final. The production preview is left running on loopback only. If stopped, run `powershell -ExecutionPolicy Bypass -File C:\UCUTS\scripts\local.ps1` to start local development. Stop with the same script plus `-Stop`. No tunnel or deployment is required.

Representative captures are in `C:\Users\LENOVO\.cache\uc-media-update`: `desktop-services.png`, `desktop-home.png`, `desktop-academy.png`, `services-360.png`, `home-390.png`, `mobile-player.png`, `mobile-equipment.png`, tablet/1024 captures, `landscape-home.png` and `zoom-home.png`.
