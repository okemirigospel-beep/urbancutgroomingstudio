# Manual Vercel deployment handover — 2026-10-03

## Status
User will handle account setup and deployment in the Vercel dashboard. No deployment, project creation, subscription, domain purchase or indexing activation was performed. No production URL, deployment ID or deployed commit is claimed.

Repository: https://github.com/okemirigospel-beep/urbancutgroomingstudio
Production branch to select: `urbancut-continuation` (not `main`).
Previous verified checkpoint: `a7519305fa2829c51c37e63e64ebc94a8116be51`.
Section-order commit: `56b6d49`.
Deploy the subsequent `chore: prepare noindex Vercel dashboard handover` commit, which includes this record and the Vercel-origin guard adjustment. Resolve its full SHA with `git rev-parse HEAD`; the handover message supplies it after push verification.

## Dashboard settings
| Setting | Value |
| --- | --- |
| Framework preset | Next.js |
| Root directory | Repository root (`./`); do not enter the local C:/UCUTS path |
| Package manager | npm, using committed package-lock.json |
| Install command | npm ci |
| Build command | npm run build |
| Output directory | Framework default; no custom override or static export |
| Node.js | 24.x (local verification used 24.19.0) |
| Production branch | urbancut-continuation |
| Preferred project name | urbancutgroomingstudio, subject to actual availability |

Use an existing appropriate commercial-eligible account/plan. Account eligibility was not verified: the connector returned no accessible teams; there was no local Vercel project link or authenticated CLI. No plan changes authorised. Vercel Hobby is for personal, non-commercial use.

## Exact application environment variables
Apply to Production and Preview:
- `SITE_INDEXING_ENABLED=false` (literal string false).
- `SITE_URL`: initially omit/leave blank if the stable production address has not been assigned. Once the dashboard confirms it, enter that exact HTTPS origin, without path, query or fragment. If and only if the dashboard assigns the preferred address, the value is `https://urbancutgroomingstudio.vercel.app`. That address is NOT currently confirmed or claimed.

These are the only required application configuration names. No Supabase, payment, analytics or public client-side variables are needed. Never set SITE_URL to localhost, the temporary deployment-specific URL, or automatically inferred VERCEL_URL. Preview can use the same confirmed stable production origin while keeping indexing false, or omit SITE_URL until confirmation.

Both variables are build-time settings. After assigning/changing SITE_URL, create a new deployment from the same verified branch/commit. Redeploying an older build without rebuilding its environment-dependent metadata is insufficient. Verify the resulting canonical, Open Graph image and business URL use the stable address. Leave the indexing flag false throughout.

The narrowly revised validator accepts an explicitly configured single-label vercel.app origin only with indexing disabled. It cannot establish ownership or distinguish a manually misconfigured hash hostname from a stable alias: use the stable production domain shown by the project dashboard. Vercel origins still fail if indexing is true; any later launch/indexing change needs a separate review. Custom domain validation and all other guards remain.

## Git deployment checks
- `vercel.json` retains `git.deploymentEnabled: false`; automatic Vercel Git deployments are disabled by repository configuration.
- No GitHub Actions workflow is present in the repository.
- No local `.vercel/project.json` linkage was present.
- The connector returned no accessible teams, so account-side Git integrations, external webhooks and production-project settings could not be exhaustively inspected. Do not interpret that as proof that no external integration exists.
- Keep automatic Git deployments disabled. For the user's first manual dashboard deployment, select the exact branch/commit above. Verify the dashboard's source commit before launching a build. No automated deployment action was invoked by the assistant.

## Local checks
Passed: production build, TypeScript (including build type validation),28 tests; no lint script exists. Initial response contains all16 authoritative service descriptions outside scripts, no duplicate forms, noindex header, empty sitemap and genuine404. Vercel-origin/noindex metadata is covered by the additional configuration test.
Passed: DOM/visual order Hero→Services→Lookbook→Reviews→Academy→Products→Visit & Connect/FAQs→Footer at390/768/1024/1440px. No overflow or broken loaded images. Product/contact separation56–100px uses the existing spacing value. Main header is static in the current design, so it does not obscure anchors. Existing positive scroll offsets remain. Direct hash links and footer Services CTA verified after smooth scrolling settles. Mobile menu closes after Gallery navigation.
Passed: category/details/back, multiple selection, quantity increase/decrease/removal, totals, state after close/reopen, missing-field validation, weekday/Sunday time choices, invalid-time clearing, studio no-address and home required-address, prepared WhatsApp destination/messages inspected without sending. Products retain all six Coming Soon statuses and no purchase buttons. Five Academy programmes retained; Foundation details open. FAQ goes from6 to19 and opens an answer. Confirmed email links retained. Normal browser error log empty.
Passed: comparable fresh1440×1000 production browser, first10seconds:4 distinct720w hero photos /184,318 transferred bytes. No collection-wide burst. Prior pre-optimisation sample was20 /1,249,428bytes. Local sample only, not field Core Web Vitals. Timing differences can yield4–5 photos in the observation window. The previous complete loop/slow/failure checks remain recorded in SEO-PREPARATION.md; hero code was not changed by this task.
Screenshots: C:/Users/LENOVO/.cache/order-final-390.png, order-final-768.png, order-final-1024.png, order-final-1440.png.

## Not tested / remaining limits
No live deployment exists from this work: live HTTPS, hosting build, public assets, headers, runtime errors, stable alias and live booking smoke checks remain for the dashboard deployment. Account plan and external webhook settings were inaccessible. Browser viewport simulation is not a physical mobile test. Existing Visit & Connect has a Google Maps directions link, not an embedded map preview; no map was added. The previously encountered automatic approval failure was a usage-limit review failure, not an unsafe-action determination; the later authorised configuration command succeeded after usage reset.

## After manual deployment
1. Confirm ready state, exact source commit and public stable URL (no unexpected login wall).
2. Set the confirmed SITE_URL if initially omitted, keep false indexing, and rebuild/redeploy.
3. Check HTTP200 homepage,404 unknown route, fonts/photos/video/favicon/share image, noindex HTML/header, empty sitemap and robots allowing crawlers to read noindex. Inspect service descriptions in initial HTML.
4. On a real phone: open menu, follow Services and Gallery links, select two services/change quantity, select Sunday, inspect prepared request without sending, check Home address validation, Academy enquiry and FAQ expansion.
5. Share live results for a separate SEO launch review. Do not enable indexing or submit Search Console without explicit later authorisation.

## Rollback
No previous production deployment is assumed. Revert the relevant order/configuration commits and manually redeploy the reviewed result. `a751930` is the previous local/GitHub checkpoint; do not reset or force-push. Its origin validator rejects vercel.app, so a rollback to it requires SITE_URL omitted/blank and indexing false until reviewed. Once a verified live deployment exists, record its ID and use dashboard rollback only to that actual verified deployment.

Sources: https://vercel.com/docs/functions/runtimes/node-js/node-js-versions ; https://vercel.com/docs/plans/hobby
