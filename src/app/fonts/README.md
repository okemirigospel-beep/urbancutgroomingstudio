# Local font provenance

Downloaded 27 September 2026 from the official Google Fonts repository. All fonts are SIL Open Font License 1.1, with the corresponding original copyright/license text alongside these files. No Reserved Font Names are declared in those copyright notices. FontTools 4.66.0 and Brotli 1.2.0 were used for local WOFF2 conversion; neither is an application dependency.

| File | Verified source name | Source |
| --- | --- | --- |
| dm-sans.woff2 | DM Sans 9pt Regular (variable DM Sans family, Colophon Foundry) | https://github.com/google/fonts/blob/main/ofl/dmsans/DMSans%5Bopsz%2Cwght%5D.ttf |
| crimson-text-semibold.woff2 | Crimson Text SemiBold (Sebastian Kosch) | https://github.com/google/fonts/blob/main/ofl/crimsontext/CrimsonText-SemiBold.ttf |
| crimson-text-semibold-italic.woff2 | Crimson Text SemiBold Italic (Sebastian Kosch) | https://github.com/google/fonts/blob/main/ofl/crimsontext/CrimsonText-SemiBoldItalic.ttf |
| naira.woff2 | Noto Sans Regular, U+20A6 subset only (Noto Project) | https://github.com/google/fonts/blob/main/ofl/notosans/NotoSans%5Bwdth%2Cwght%5D.ttf |

DM Sans retains its optical-size axis (9–40) and has its weight axis restricted to 400–700. Full glyph coverage is retained. Crimson files are losslessly converted from the original static 600 normal/italic TTFs, with full glyph coverage. Noto Sans has width pinned to 100, weight restricted to 400–700 and glyph coverage restricted to U+20A6 (₦). It is a functional currency fallback, not a third brand typography face. Both chosen brand families lack ₦; the explicit local subset prevents a dependency on OS-installed fonts for prices. The browser face has unicode-range U+20A6 and is not preloaded. Numerals, Latin copy, ampersand, curly quotes and en/em dashes exist in the brand fonts. SVG/image lettering is preserved as artwork.

Only the four WOFF2 files are delivered. Original TTFs and conversion utilities stay outside the repository. Normal and real italic Crimson Text are used at 600; DM Sans uses 400, 500, 600 and 700. All use next/font/local and display: swap. Brand faces are preloaded; metric-adjusted Arial/Times New Roman are temporary system fallbacks. Font synthesis is disabled. To reproduce, use fontTools.varLib.instancer.instantiateVariableFont with the axis limits above; subset Noto using fontTools.subset to U+20A6, set font.flavor='woff2', and save. Do not subset the two brand families to current copy only.

| File | Bytes | SHA-256 |
| --- | ---: | --- |
| crimson-text-semibold-italic.woff2 | 45,056 | `92df0c3fb22e3d368109639f78cc895911b7e9ba04cd1ed8df96c5e429cccd2d` |
| crimson-text-semibold.woff2 | 44,396 | `64b6a847464bf4f82dccf35784aca0c8fe0e6ce584ba20ff513b8e3669a92936` |
| dm-sans.woff2 | 52,308 | `d06099d4d4108cfad8d8c73f8c0702d03de689fa230d6a3da10f52d7ce4fcdcf` |
| naira.woff2 | 1,288 | `f3b812482b2820b160101e03744fb3f8cf9620de83d0109aa8d0d3254cd058fb` |
