# Product status and slideshow — 30 September 2026

## Changes

- Our Products shares the actual Services heading styles: Crimson Text Semibold 600, normal, title case, -0.02em tracking, 1.08 line-height, clamp(40px,4.5vw,64px). Services styling is unchanged. Products remains light on black.
- All six catalogue records have coming-soon status. Current images, names, ordering, tag icons and prices are unchanged. Removed purchase UI entirely; validatePurchase rejects unavailable/unknown product IDs and purchaseMessage throws for valid stale pickup/delivery requests. Existing calculation/message code remains guarded for a future authorized launch. FAQ and section introduction now describe the forthcoming collection.
- Focusable informational status wrappers show the exact launch explanation on hover/focus, associate it with aria-describedby, support Escape dismissal and have no purchase handlers. Enter/Space do not begin any action. No pointer cursor or interactive hover styling.
- Six original slides remain first, unchanged. Fourteen photographs added in the requested order, IDs 7–20: total 20. See slideshow-additions.json for filenames, dimensions and hashes. No exact decoded-image duplicates or unreadable assets discovered.
- HeroSlideshow rendering changed only to report each image's actual width in srcset. Animation, 2800ms timer, 280ms ease-in-out directional slide, loop, motion preferences, controls, frame sizes and fitting are unchanged. Image-specific focal positions keep hairstyles in view; the narrow portrait is not upscaled.

## Checks

- All 18 tests passed, including unavailable-product request blocking and complete ordered asset sequence. Existing service/schedule tests passed. Production build, TypeScript and diff check passed. No lint script configured. Existing Node module-type warning remains non-blocking.
- Browser widths 1440, 768 and 390: both headings have exactly matching computed family, weight, font size, line height and tracking. No horizontal overflow. Six Coming Soon statuses; zero product purchase controls or panels. All prices match the catalogue.
- Mouse hover and keyboard focus reveal the exact tooltip. Click/Enter/Space produced zero window openings and zero opened dialogs. Service category panel still opens normally.
- Clean-load autoplay observed ordered slides 2 through 20, then 1 and onward, with every active image decoded/ready. All 20 assets loaded. Last-to-first navigation also verified with the existing arrow-key interaction. No browser errors or image errors.
- Desktop crops inspected for all additions; mobile portrait/landscape/narrow framing inspected. No stretched faces or added bars. Only focal position for one portrait was refined after inspection.
- Reduced-motion retains a stable frame and keyboard browsing. No added slideshow controls, captions or effects.

## Screenshots

[Desktop Products](screenshots/coming-soon/coming-products-1440.png) · [Tablet Products](screenshots/coming-soon/coming-products-768.png) · [Mobile Products](screenshots/coming-soon/coming-products-390.png) · [Keyboard tooltip](screenshots/coming-soon/coming-products-tooltip.png)

[Landscape on mobile](screenshots/coming-soon/mobile-photo-10.png) · [Narrow portrait on mobile](screenshots/coming-soon/mobile-photo-15.png)

Local preview: http://127.0.0.1:3000/ on the owner's Windows computer. No deployment or public preview. Browser automation uses desktop Chromium at responsive viewport sizes; physical touchscreen hardware was not exercised.
