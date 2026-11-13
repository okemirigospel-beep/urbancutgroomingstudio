import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { heroPhotos } from "../src/lib/hero.ts";
import { lookbookPhotos } from "../src/lib/lookbook.ts";
test("approved hero and categorized Lookbook use approved order and available assets", () => {
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
  const current = JSON.parse(readFileSync(new URL("../docs/nov13-media.json",import.meta.url),"utf8"));
  assert.deepEqual(lookbookPhotos.map(p=>p.source),current.lookbook.map((p:{source:string})=>p.source));
  assert.equal(lookbookPhotos.filter(p=>p.group==="owner-selection").length,13);
  assert.equal(new Set(lookbookPhotos.map(p=>p.source)).size,lookbookPhotos.length);
  const groups=["owner-selection","braids","colours","children","haircuts"];
  const order=lookbookPhotos.map(p=>groups.indexOf(p.group));
  assert.deepEqual(order,[...order].sort((a,b)=>a-b));
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
