# Local development

Project: C:\UCUTS on the user's Windows computer. Node.js 24 recommended (app minimum 20.9; the built-in TypeScript test runner needs newer Node, verified with 24.19). npm lockfile is authoritative: use npm ci for subsequent installs.

Convenient Windows PowerShell commands, verified on this machine:

    & C:\UCUTS\scripts\local.ps1
    & C:\UCUTS\scripts\local.ps1 -Stop

The script runs a hidden local server, records its PID and logs under ignored .local/, refuses an occupied port, and only stops a process matching this project's Next.js path. Preview: http://127.0.0.1:3000 . Log: C:\UCUTS\.local\dev.log . Error log: C:\UCUTS\.local\dev-error.log . No administrator shell is normally needed.

Standard Node/npm installation:

    cd C:\UCUTS
    npm ci
    npm run dev

Open http://127.0.0.1:3000 . Stop foreground server with Ctrl+C. Both dev and start scripts explicitly bind to 127.0.0.1. Never add a tunnel.

This computer currently uses bundled Node and a local npm CLI. If npm is not on PATH, use:

    & 'C:\Users\LENOVO\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' 'C:\Users\LENOVO\.cache\urbancut-tools\package\bin\npm-cli.js' run dev

Build with npm run build; check types with npm run typecheck; run date-rule tests with npm test using Node 24. No environment configuration is required. .env.example documents reserved future Supabase names; no connection is active.

Git checkpoint remote is named checkpoint. Use urbancut-continuation. Preserve main and all remote history. Vercel Git deployments are disabled in vercel.json; deployment requires a separate explicit request.
