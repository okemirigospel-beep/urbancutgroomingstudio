# URBANCUT project instructions

This is a NEW implementation, not recovered source. Preserve the supplied root assets, ZIPs and original repository history.

- Local development only; bind to 127.0.0.1. No tunnels, public previews, Sites or Vercel deployment without explicit authorisation. Keep Vercel Git deployments disabled.
- Stack: Next.js App Router, TypeScript, Tailwind; one SVG icon family, Lucide.
- Git checkpoint remote: https://github.com/okemirigospel-beep/urbancutgroomingstudio . Use urbancut-continuation; never force-push or overwrite main.
- Commit meaningful verified milestones and verify remote SHA after each push. No secrets, actual .env, customer data, dependencies or builds in Git.
- Supplied section specifications govern content. Latest user direction overrides older recommendations. Primary visual reference is the supplied Spyglass screenshot; approximately 50% white, 40% near-black and 10% restrained logo-aligned gold.
- Never introduce decorative arrow pointers. The Lookbook is explicitly authorized to use exactly two Lucide arrow buttons for manual photograph navigation; Academy pathway connectors and Explore Programme arrows are also explicitly approved. Other navigation uses text labels. Arrow-key keyboard support is allowed.
- Latest hero direction: 20 supplied photographs replace the live video (original six followed by 14 ordered additions). Keep approved logo intact, rectangular booking CTAs, prominent actual SVG header logo (tight-bounds derivative; no redundant companion wordmark), and a black business-information band.
- Responsive header: single brand/toggle row below desktop; booking belongs inside the expanded menu. Header booking white, hero booking black and uppercase. Photo hero uses full-frame cover with focal positions, 2.8-second cycling with a short opaque directional slide; image-region click/tap/Enter/Space toggles pause with no visible controls, never the old footer controls.
- Preserve supplied logo proportions/colours and original video. Generate derivatives separately. No invented monogram, customer work, testimonials, business facts or confirmed availability.
- Services use the approved 16-item catalogue: 13 bookable studio services, 3 Coming Soon nail services, and only 3 verified durations. Academy uses the five approved standalone programmes in src/lib/academy.ts; admissions are open. Products uses six approved images and listed prices in src/lib/products.ts. All products are Coming Soon: no purchase panel or WhatsApp product request may be opened or generated. Central availability guards govern this; services remain bookable. Home Service is a separate enquiry (Abuja ₦100,000; outside Abuja quoted separately). Black Card is preview-only with a ₦50,000 registration fee, not a monthly fee. No unavailable offering may enter the studio basket.
- Current schedule: Africa/Lagos; Monday–Saturday 09:00–21:00, Sunday 13:00–21:00. Hourly preferred starts end at 20:00 and must fit known durations. Studio and Home forms share appointments.ts, require next-day-or-later dates and clear ineligible times when dates change. Outside-Abuja Home preferences also use Abuja time; travel/duration and quotes are confirmed by enquiry.
- Manual WhatsApp click-to-chat handoff to 2349163444436 is authorised. It does not send, save or confirm a request. Production booking storage, WhatsApp automation and payments are deferred. Supabase remains the designated future backend; no production project or schema changes are authorised here.
- Maintain docs/STATUS.md, docs/DESIGN.md, docs/ASSETS.md and local setup instructions. Verify actual browser renders and relevant build/type checks before milestone claims.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
