import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { heroPhotos } from "../src/lib/hero.ts";
import { lookbookPhotos } from "../src/lib/lookbook.ts";
test("approved hero and 34-photo Lookbook use supplied order and available assets", () => {
  const manifest = JSON.parse(
    readFileSync(new URL("../docs/oct25-media.json", import.meta.url), "utf8"),
  );
  assert.equal(heroPhotos.length, 5);
  assert.deepEqual(
    heroPhotos.map((p) => p.source),
    [
      "2 (2).jpg",
      "5 (2).jpg",
      "IMG-20260929-WA0055.jpg",
      "IMG-20260929-WA0057.jpg",
      "IMG-20260929-WA0090.jpg",
    ],
  );
  assert.equal(lookbookPhotos.length, 34);
  assert.deepEqual(
    lookbookPhotos.slice(0, 28).map((p) => p.source),
    manifest.lookbook.map((p: { source: string }) => p.source),
  );
  assert.deepEqual(
    lookbookPhotos.slice(28).map((p) => p.source),
    [
      "1001242392.jpg",
      "1001242391.jpg",
      "1001242395.jpg",
      "1001242396.jpg",
      "1001242389.jpg",
      "1001242393.jpg",
    ],
  );
  for (const p of [...heroPhotos, ...lookbookPhotos])
    assert.ok(
      existsSync(
        new URL(
          `../public${p.src}${p.src.endsWith("webp") ? "" : ".webp"}`,
          import.meta.url,
        ),
      ),
    );
  assert.ok(!lookbookPhotos.some((p) => p.source.includes("WA0027")));
});
