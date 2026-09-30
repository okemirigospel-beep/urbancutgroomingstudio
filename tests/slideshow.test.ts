import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { heroPhotos } from "../src/lib/hero.ts";
test("slideshow retains six originals then appends fourteen unique ordered assets", () => {
  assert.equal(heroPhotos.length, 20);
  assert.deepEqual(
    heroPhotos.map((p) => p.id),
    Array.from({ length: 20 }, (_, i) => i + 1),
  );
  for (const photo of heroPhotos) {
    for (const size of [480, 720])
      assert.ok(
        existsSync(
          new URL(
            `../public/media/grooming/look-${photo.id}-${size}.webp`,
            import.meta.url,
          ),
        ),
      );
    assert.ok(photo.width > 0 && photo.height > 0 && photo.alt);
  }
  const manifest = JSON.parse(
    readFileSync(
      new URL("../docs/slideshow-additions.json", import.meta.url),
      "utf8",
    ),
  );
  assert.deepEqual(
    manifest.map((p: { source: string }) => p.source),
    [
      "0077",
      "0066",
      "0075",
      "0048",
      "0071",
      "0026",
      "0025",
      "0084",
      "0068",
      "0046",
      "0090",
      "0024",
      "0051",
      "0033",
    ].map((n) => `IMG-20260929-WA${n}.jpg`),
  );
});
