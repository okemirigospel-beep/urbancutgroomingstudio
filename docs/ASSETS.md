# Asset inventory and recovery

Originals in repository root are preserved byte-for-byte:

- URBANCUT-Grooming-Studio-Logo-1[1].svg — supplied approved logo, 1536×1536 declared canvas, opaque black background; VTracer-generated vector paths. Never recolour or stretch.
- 2647c413cb595be2d9d24779d0a863ca.mp4~2.mp4 — supplied stock barbering film; preserve original and create separate web derivative/poster.
- refero.design 5af49096-2a34-424c-8f91-4b5713a04e31.jpg — design reference only, not served as website content.
- Urban-Cuts-Audit-and-Rebuild.zip and Urban-Cuts-Framework-Pack-v0.1.zip — original specifications and older audit. Latest user instructions override conflicting recommendations.

Missing: approved actual-studio/gallery photography, genuine publishable reviews, product photographs and approved compact logo variant (optional). Stock film must not be presented as actual URBANCUT work. Contact URLs/map are also pending.

Web derivatives: public/media/urbancut-logo.svg is an unchanged copy of the supplied logo; hero.mp4 is silent H.264, 540x960, 30fps, fast-start, 620,031 bytes; hero-poster.jpg is a 540x960 frame at 1.1 seconds, 69,048 bytes. The original MP4 is 4.56 seconds with 1280x720 encoded dimensions and -90-degree rotation metadata (portrait display). Preserve the entire portrait framing. Embedded editing mark, internal cuts, black bands and a non-seamless end/start transition are source limitations. Obtain a clean authorised source before launch; do not remove the mark to conceal its origin.

All supplied files are small enough for regular Git tracking. No separate asset storage is required for the current local prototype. Once pushed and verified, clone the continuation branch and run npm ci to recover tracked source and assets. Git does not recover untracked secrets, databases or future external storage. No Supabase database or external storage has been created by this task.
