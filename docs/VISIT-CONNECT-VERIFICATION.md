# Visit & Connect verification — 2026-10-02

## Scope and source audit
Replaces the standalone FAQ, contact section and final promotional banner. Footer and other components remain unchanged. New component: src/components/VisitConnect.tsx. Studio configuration: src/lib/studio.ts. FAQ source remains src/lib/content.ts. Page composition and narrowly scoped CSS updated; obsolete closing-section CSS removed.

Original FAQ baseline: commit 73505ce399f06b7f67dda80b5fc198ff6ab862e2, src/lib/content.ts. It contained 13 question/answer tuples with no IDs. Original order: location, hours, same-day, multiple-services, barber, home-service, nail-wellness, academy, products, deposit, changes, walk-ins, listed-prices. These are now their stable IDs. A pre-edit source snapshot was recorded locally and compared programmatically with the result: all 13 questions and their order retained; 11 answers unchanged.

Two minimum factual corrections: location replaces the pending-address sentence with the supplied full address; deposit replaces the unpublished-policy sentence with the supplied payment/deposit and team-confirmation requirement. The other wording in each answer remains. Confirmed hours still derive from studioSchedule (09–21 Monday–Saturday, 13–21 Sunday, Africa/Lagos).

Final collection: 19 unique IDs. Six new questions are appended exactly once: confirmation, arrival, late-arrival, cancellation-policy, missed-appointment, home-booking-terms. Their answers match the supplied brief. No FAQ structured data existed.

## Map and contact destinations
No map asset was added. Supplied codex-clipboard-0fad7191-d2d0-47ad-9855-f5d25d74f96f.png contains a large business popup, a conflicting 7 p.m. closing time and no visible provider attribution. No screenshot details were fabricated, cropped away or republished. The compact studio card can accept a suitable landscape linked map below its heading in a later update. No empty map frame is reserved.
Directions uses the exact supplied Google Maps destination. General WhatsApp uses existing whatsappBase (2349163444436), Instagram is urbancut9ja, and email is urbancut2020@gmail.com, confirmed in the brief's verification section. No external message or email was sent.

## Verification performed
- Build, TypeScript check and all 21 existing tests pass. No lint script exists.
- Actual Chromium renders inspected at 360, 390, 768, 1024 and 1440 pixels. No horizontal overflow; studio first in stacked layout below 950px; two columns above. Mobile hours remain two rows. Long questions wrap beside fixed-size chevrons.
- Initial visible question count 6; open answers 0. View More reveals all 19, preserving an open initial answer. Opening a second answer closes the previous one. Clicking the same question closes it.
- Show Fewer hides extra rows, clears a hidden open answer and leaves focus on the visible toggle after the rendering frame. Mobile checks repeated. Answers use natural height, no nested scroller. Studio card height stays unchanged when list expands.
- Enter opens and Space closes a focused question. Reduced motion gives chevron transition duration 0s.
- All internal anchor targets exist, with no duplicate IDs. Contact, FAQ and studio targets retained; directions target added. External destinations inspected without sending messages.
- Browser error list empty. Other components are unchanged; existing service, product and Academy logic tests pass.
- 2x CSS enlargement at 720px produced no overflow. This is not native browser 200% zoom; native zoom remains unverified.

Screenshots captured locally: C:/Users/LENOVO/.cache/connect-1440.png, connect-390.png, connect-360.png, connect-768.png, connect-1024.png and connect-policy-mobile.png.

## Local preview
Local compiled preview on http://127.0.0.1:3000/?connect=preview#contact. No deployment.
For local development: run powershell -File C:\UCUTS\scripts\local.ps1 -Stop, then powershell -File C:\UCUTS\scripts\local.ps1. The project scripts bind to 127.0.0.1.
