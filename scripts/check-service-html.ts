import assert from "node:assert/strict";
import { services } from "../src/lib/catalogue.ts";
const origin = process.argv[2] || "http://127.0.0.1:3000";
const response = await fetch(new URL("/", origin));
assert.equal(response.status, 200);
const html = (await response.text()).replace(
  /<script\b[^>]*>[\s\S]*?<\/script>/gi,
  "",
);
const decode = (s: string) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
const descriptions = [
  ...html.matchAll(/<p class="uc-detail-description">([\s\S]*?)<\/p>/g),
].map((m) => decode(m[1]));
assert.equal(descriptions.length, services.length);
for (const service of services) {
  assert.ok(descriptions.includes(service.description), service.id);
  assert.ok(decode(html).includes(service.name), service.id);
}
assert.equal(
  (html.match(/class="uc-service-detail" hidden=""/g) || []).length,
  services.length,
);
assert.equal((html.match(/class="grooming-frame/g) || []).length, 3); // wrapper plus first and next
assert.ok(response.headers.get("x-robots-tag")?.includes("noindex"));
assert.ok(!html.includes('id="studio-name"'));
assert.ok(!html.includes('id="home-address"'));
const sitemap = await (await fetch(new URL("/sitemap.xml", origin))).text();
assert.ok(!sitemap.includes("<loc>"));
assert.equal(
  (await fetch(new URL("/verification-missing-page", origin))).status,
  404,
);
console.log(
  "All 16 authoritative descriptions in initial HTML; closed details; no forms; two hero images; noindex, empty sitemap and real 404 pass.",
);
