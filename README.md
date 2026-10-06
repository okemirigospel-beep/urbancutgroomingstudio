# UrbanCut Grooming Studio

Next.js / React website with self-hosted fonts and images, service and academy enquiries through WhatsApp, and products marked Coming Soon. No database or payment service is required.

Hosting is paused. The owner confirms Netlify builds are stopped. This milestone is local development and GitHub backup only; indexing remains disabled and the configured origin is unchanged.

GitHub source: okemirigospel-beep/urbancutgroomingstudio, production branch `urbancut-continuation`. Push only after confirming builds remain stopped. Do not enable Netlify, trigger a deployment or create a public preview.

- [October refinement and verification](docs/OCTOBER-REFINEMENT.md)
- [Netlify setup for a future authorised relaunch](docs/MANUAL-DEPLOYMENT.md)
- [Verification record](docs/NETLIFY-VERIFICATION.md)
- [Local development](docs/LOCAL-DEVELOPMENT.md)
- [SEO preparation](docs/SEO-PREPARATION.md)
- [Project status](docs/STATUS.md)

Use Node 24 and npm with package-lock.json. Copy .env.example to an untracked local .env file if needed. Run `npm ci`, `npm test`, `npm run typecheck`, `npm run build`. Local preview: `npm run dev` at http://127.0.0.1:3000.

Netlify uses repository root, `npm run build`, `.next`, and its automatic Next.js integration. No manual plugin pin or static export. Vercel instructions are superseded; vercel.json prevents unwanted Git deployments there.
