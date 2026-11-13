# Media saving deterrents — 13 November 2026

Owner requested blocking direct saving of public website photos/videos. Added a shared client listener cancelling media contextmenu and dragstart events, including dynamically mounted dialog images. Media-only CSS disables supported iOS touch callouts, image dragging and selection. Videos request controlsList="nodownload" and are non-draggable. Existing autoplay, controls, deferred loading, keyboard navigation, booking flows and content are unchanged. Text, links and input context menus remain available.

These are casual-saving deterrents, NOT security or download-proof access control. Public asset URLs remain accessible; screenshots, screen recording, browser tools, disabled JavaScript and browser-specific exceptions can bypass restrictions. No DRM, authentication, watermark, hosting setting or origin change was introduced. WebKit touch-callout and controlsList support varies. Firefox Shift-right-click can bypass contextmenu handlers. Do not claim all browsers or devices prohibit saving.

Verification: production build/TypeScript passed. Browser event checks confirmed image/video context menus and image drag cancelled; text/link/input menus not cancelled. Studio service selection, name editing and gallery navigation work. Existing regression tests cover playback lifecycle separately. Native iOS/Android long-press menus were not hardware-tested; their CSS fallback is best effort. Indexing remains off.

References: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/controlsList and https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/-webkit-touch-callout and https://developer.mozilla.org/en-US/docs/Web/API/Element/contextmenu_event
