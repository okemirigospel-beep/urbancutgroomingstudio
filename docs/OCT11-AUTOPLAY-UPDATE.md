# Services controls removal and silent Home Service autoplay — 11 October 2026

Continues from 6470688b004df259592babb637dc153c8e796915 on urbancut-continuation. Local/GitHub backup only; owner-confirmed stopped Netlify builds and disabled public site remain unchanged. No deployment authorised or performed. Indexing stays disabled.

## Changes

- Removed the Services Pause/Play previews button, icon, wrapper, dedicated spacing, control-only pause state and handlers. Cards follow the existing introduction directly. No replacement copy or external controls.
- The three existing four-photo loops retain their mapping, order, 3-second dwell and 400 ms directional transition. Offscreen, hidden-tab, dialog, reduced-motion and card hover/focus suspension remain. The short equipment video remains silent and looping.
- Main Home Service video now starts silently when meaningfully visible, loops, and plays inline. The source is attached within 400 px of the viewport with metadata preload, not eagerly attached on the initial homepage. Native controls remain available; the custom overlay is removed.
- Lifecycle pauses are distinguished from explicit native-control pause. Offscreen/hidden/dialog pauses may resume when eligible. A visitor's pause persists across reentry. Reduced motion prevents automatic playback and retains the poster, with native controls available for intentional playback.
- A policy refusal stops automatic retrying. The poster and native play control remain usable; successful manual playback recovers normally. Playback promises are handled and observers/listeners are cleaned up.
- New derivative: public/media/service-previews/home-service-feature-silent.mp4, 720×1280, 30 fps, H.264/yuv420p, 59.17 seconds, 14,723,956 bytes, fast start, **no audio stream**. Video stream copied without re-encoding; full sequence and composition preserved. Replaces the previous 14,782,761-byte public derivative. Supplied original and earlier derivative remain outside public in the owner's source/cache locations.
- Exact 9:16 frame, responsive player dimensions, black/gold section, copy, price, enquiry action and all unrelated sections preserved. WhatsApp remains https://wa.me/2347063291013.

## Verification

- Production build including TypeScript passed; 35 unit tests passed. No lint script is configured. Diff whitespace check passed.
- Browser checks at 1440, 768 and 390 px passed: no Services control/wrapper or empty control row; slideshow advancement; silent looping card video; main deferred load, muted inline autoplay, loop after seeking near the end, offscreen/hidden suspension and resumption, explicit pause persistence, native controls, 9:16 frame and no horizontal overflow.
- Native keyboard Space successfully pauses the main video and remains paused after viewport reentry. Injected NotAllowedError produced exactly one automatic play attempt across reentry; poster and controls remained available, and native keyboard play recovered.
- Reduced-motion emulation kept the main film at time zero with its poster and retained still service previews.
- Existing booking browser regression passed: category opening, quantities/removal/totals, validation, dates/times, Coming Soon guards, retained state, shared Home entry points, outside-Abuja quoting and focus return. No messages sent.
- Initial HTML/SEO verification passed: 16 descriptions, closed details, no visible forms, two initial hero images, noindex, empty sitemap and actual 404. Browser runtime error logs contained no errors or unhandled playback rejections.
- Screenshots: C:/Users/LENOVO/.cache/uc-media-update/autoplay-desktop-services.png, autoplay-desktop-home.png, autoplay-services-768.png, autoplay-home-768.png, autoplay-services-390.png, autoplay-home-390.png, autoplay-reduced-final.png.

## Private accessibility limitation

Removing the shared Services control removes a persistent visitor-operated pause mechanism for those previews. Hover/focus are temporary suspensions, and reduced-motion preference is respected, but visitors who do not use that preference cannot persistently stop all Services animation. Complete motion-accessibility compliance is **not** claimed. This limitation is recorded only here, with no new website explanation. The main video retains its own native pause control. The new website film has no audio track, superseding the previous derivative's outstanding speech/caption question.

## Local preview

http://127.0.0.1:3000/?autoplay=verified#services. The loopback preview is left running. If needed, start with `powershell -ExecutionPolicy Bypass -File C:\UCUTS\scripts\local.ps1`; add `-Stop` to stop it. No hosting settings or environment values were changed.
