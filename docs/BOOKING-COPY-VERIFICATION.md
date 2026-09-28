# Booking copy verification — 28 September 2026

Focused cleanup of the existing studio/home request flow. Removed the specified repetitive introductions, review and handoff explanations and By arrangement label. Added one cream/gold information callout directly above CONTINUE TO BOOKING. The speech-bubble reference is represented by the existing Lucide MessageCircle family; no new asset dependency.

Studio messages now contain the entered name, each service and quantity/line total, Listed total immediately after services, date, Abuja time and non-empty optional notes. Review text and WhatsApp URL derive from current form/basket state. Advance-date text was removed from messages; scheduling validation remains unchanged. No payment or confirmation state was introduced.

## Verification

- Production build and TypeScript checks passed; all 14 tests passed. Existing Node module-type warning remains non-blocking.
- Browser: empty required-field submit rejected. Valid Sunday date/time accepted. Initial selection Signature Haircut x1 plus Kids Haircut x2 produced NGN25,000 with no Notes line.
- Returning to edit, changing name to Bola QA, removing Signature and increasing Kids to3 produced NGN15,000 plus the supplied notes.
- Encoded WhatsApp text equals the displayed review; destination remains https://wa.me/2349163444436 and target is a new tab. No message sent. External WhatsApp app launch was not exercised.
- Inspected form/review at 1440, 768 and 360 pixels; review document/dialog had no horizontal overflow. No browser errors reported.
- Tests cover next-day restriction, Sunday/closing-time eligibility, quantity arithmetic, optional notes, Unicode URL encoding and Home Service validation.

## Screenshots

| Width | Form | Review |
| --- | --- | --- |
| 1440 | [Desktop form](screenshots/booking-copy/booking-copy-form-1440.png) | [Desktop review](screenshots/booking-copy/booking-copy-review-1440.png) |
| 768 | [Tablet form](screenshots/booking-copy/booking-copy-form-768.png) | [Tablet review](screenshots/booking-copy/booking-copy-review-768.png) |
| 360 | [Mobile form](screenshots/booking-copy/booking-copy-form-360.png) | [Mobile review](screenshots/booking-copy/booking-copy-review-360.png) |

All entered names/notes are synthetic QA data. Site remains local; no deployment performed.
