# Netlify deployment workflow

Netlify is the current host. The former Vercel handover is historical only.

## Verified project and rollback baseline (3 October 2026)

- Public origin: https://urbancutgroomingstudio.netlify.app
- Project ID: 2d75c50c-1b1b-47c6-a058-dab47f46ef5f.
- Project: urbancutgroomingstudio; owner: Gospel Okemiri VA & Admin Services.
- Git repository: https://github.com/okemirigospel-beep/urbancutgroomingstudio
- Production branch: `urbancut-continuation`, independently verified in Netlify's dashboard.
- Previous published deploy: `6ac0fc7530acd9000879bb43`.
- Previous source commit: `600ebd788141b199257f25ae7103b4a821716621`.
- Rollback dashboard: https://app.netlify.com/projects/urbancutgroomingstudio/deploys/6ac0fc7530acd9000879bb43
- Builds active; automatic publishing unlocked. Only production branch deploys enabled; pull-request Deploy Previews enabled.

## Build configuration

Repository root, npm with committed package-lock.json, `npm run build`, publish `.next`.
Netlify automatically integrates Next.js through OpenNext; do not install or pin a legacy plugin, force static export, upload a local .next folder or add an SPA catch-all.
The baseline successful log shows Node 24.21.0, npm 11.19.0, Next.js 16.3.6 and Next.js Runtime 5.16.1 on Ubuntu Noble 24.04. `.nvmrc` retains Node 24; local verification uses Node 24.19.0.
Root `netlify.toml` records the matching build settings and takes precedence over conflicting dashboard build settings.

## Environment and indexing

| Variable | Value | Context |
| --- | --- | --- |
| SITE_URL | https://urbancutgroomingstudio.netlify.app | All contexts; deliberately stable canonical origin |
| SITE_INDEXING_ENABLED | false | All contexts |

These non-secret build values are committed in netlify.toml. Dashboard copies should match and cover Builds and Functions (All scopes on the current account). No other application environment variables are required. Netlify supplies CONTEXT automatically; do not override it.
Next.js prerenders the homepage, metadata, robots and sitemap during the build. Rebuild after changing values; changing an environment variable alone does not rewrite published HTML.
Deploy-preview and branch-deploy overrides keep indexing false. Application CONTEXT guards additionally refuse indexing outside production even if a true flag is inherited. Preview canonical URLs deliberately retain the stable origin; temporary deploy URLs are rejected as SITE_URL.
Next.js headers supply X-Robots-Tag; HTML also contains noindex, follow. Robots permits crawling to discover noindex; the disabled sitemap has no URL entries. A configured origin alone never enables indexing.
Do not enable indexing, submit to Search Console, or change domain in this task. Future custom-domain migration requires a separate reviewed change to origin, metadata and redirects, followed by rebuild and live checks.

## Publishing

1. Make scoped local changes or work on a branch. Local edits do not alter the live site.
2. Run `npm test`, `npm run typecheck`, `npm run build` with the above values and inspect the browser.
3. Commit reviewed changes and push to `urbancut-continuation` when publication is authorised. Do not merge into main merely for hosting.
4. Netlify builds that Git commit and automatically publishes a successful deploy. Do not also issue a manual CLI deployment.
5. Confirm the published deploy's full source commit, successful log and actual public response. Check noindex headers/HTML, canonical origin, empty sitemap, real 404, assets, booking and responsive layouts.

Keep vercel.json's Git deployment safeguard. No database, payment processor, authentication, Netlify Forms or additional host is required. WhatsApp requests remain manual customer handoffs.

## Rollback

Open the recorded successful deploy above and use Netlify's Publish deploy action if a material regression requires rollback. Preserve deployment history. If necessary lock publishing while correcting the repository, then revert/fix the bad commit without force-pushing; verify the replacement before unlocking. Rolling back a deploy does not revert Git or environment settings.

## References

- https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/
- https://docs.netlify.com/build/configure-builds/file-based-configuration/
- https://docs.netlify.com/build/environment-variables/overview/
- https://docs.netlify.com/build/configure-builds/manage-dependencies/

See NETLIFY-VERIFICATION.md for the verification record and any limitations.
