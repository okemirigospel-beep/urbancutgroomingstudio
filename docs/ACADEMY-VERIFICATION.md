# Academy verification — 2 October 2026

## Implementation
Five standalone programmes in approved order: Foundation, Professional, Master, Elite, Executive. Single authoritative catalogue in src/lib/academy.ts supplies cards, details, summaries and messages. Replaces the old Academy in place; #academy retained. Academy FAQ updated to remove obsolete provisional wording.

Original extensionless files decode as PNG, all1448x1086. Generated real1080x810 WebP derivatives under public/media/academy; original ZIP untouched in Downloads. Mapping: foundation to Foundation, professional to Professional, master to Master, elite to Elite, executive to Executive. Complete4:3 compositions, lazy responsive Next Image delivery; no extra logo or overlay.

Heading reuses shared Crimson Text600 clamp(44px,5.5vw,78px); bodyDM Sans. Three equal cards plus two centred from1100px, two columns with centred fifth from650px, one column below650px. Native dialog with explicit Tab/Shift+Tab wrapping, Escape close, focus restoration, body scroll lock and independently scrolling content. No nested panels. Per-programme in-memory drafts retain name/experience/notes across Back and reopening, and isolate notes between programmes.

## Verification performed
- TypeScript and optimized production build passed. Existing test suite plus three Academy contract tests:21passed. No lint script is configured.
- All five names, durations, numeric fees and certificate boundaries checked. Curriculum counts9/10/11/20/3; Elite groups Barbering/Business/Content. Executive has only three supplied pillars and no separate certificate row.
- Actual browser widths360/390/768/1024/1440 and649/650/1099/1100: no page horizontal overflow. All five images decoded; rendered ratios approximately1.33333. Desktop cards equal width with centred last row.
- Opened every card and every Career Pathway control. Correct details and curriculum counts. Blank fields produced inline errors and focus on Full Name. No handoff for invalid inputs.
- Intercepted window.open locally, without opening WhatsApp or sending anything. All five messages matched the selected programme, fee and duration; destination exactly https://wa.me/2349163444436. Executive subtitle included. Accented/apostrophe/ampersand name preserved. Empty notes omit Questions. noopener,noreferrer passed.
- Back to Programme and reopening enquiry preserved entries. Switching programmes had separate empty notes. Successful handoff retained values without a sent/enrolled confirmation.
- Escape restored originating control and body scrolling. Forward/reverse Tab wrapping confirmed after a focused fix. At390x600 and720x450 close remained reachable and long content scrolled without inner horizontal overflow. Services category still opened correctly. Browser error list empty.
- Main screenshots: docs/screenshots/academy/desktop.png, tablet.png, mobile.png. Mobile screenshot shows the upper programmes; remaining programmes continue in normal flow. Additional panel evidence included.

## Limitations
Browser keyboard zoom shortcuts did not change zoom in the automated browser. Verified720px reflow (equivalent available width to1440px at200% native zoom), but native browser200% zoom and physical mobile keyboard behavior are not confirmed. A separate CSS-body-zoom stress test retained Academy card content without internal overflow, but enlarged the native top-layer dialog beyond the viewport; CSS zoom does not reproduce native browser zoom. Do not claim that test as native zoom compliance.

## Local operation
Verified on this Windows computer at http://127.0.0.1:3000/#academy, using the compiled local build. No deployment. vercel.json keeps Git deploymentEnabled:false.
For development, stop the managed preview with powershell -File C:\UCUTS\scripts\local.ps1 -Stop, then run powershell -File C:\UCUTS\scripts\local.ps1. The script binds127.0.0.1:3000 and keeps logs in .local.
