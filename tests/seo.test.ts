import test from "node:test";
import assert from "node:assert/strict";
import {
  indexingConfig,
  indexingHeaders,
  robotsPolicy,
  sitemapEntries,
} from "../src/lib/indexing.ts";
import {
  baseMetadata,
  homepageMetadata,
  businessSchema,
  jsonLd,
} from "../src/lib/seo.ts";

// Reserved fixture origin: never used as application configuration.
const origin = "https://seo-fixture.example";

test("no domain builds safe metadata without invented URLs or sitemap entries", () => {
  const config = indexingConfig({});
  assert.deepEqual(config, { origin: null, enabled: false });
  assert.deepEqual(baseMetadata(config).robots, { index: false, follow: true });
  assert.equal(homepageMetadata(config).alternates, undefined);
  assert.equal(homepageMetadata(config).metadataBase, undefined);
  assert.deepEqual(sitemapEntries(config), []);
  assert.equal(robotsPolicy(config).sitemap, undefined);
  assert.deepEqual(indexingHeaders(config), [
    { key: "X-Robots-Tag", value: "noindex, follow" },
  ]);
  const schema = businessSchema(config);
  assert.equal("@id" in schema, false);
  assert.equal("url" in schema, false);
});

test("a configured origin alone cannot enable indexing", () => {
  const config = indexingConfig({ SITE_URL: origin + "/" });
  assert.equal(config.origin, origin);
  assert.equal(config.enabled, false);
  assert.equal(homepageMetadata(config).alternates?.canonical, origin + "/");
  assert.deepEqual(sitemapEntries(config), []);
  assert.equal(robotsPolicy(config).sitemap, undefined);
  assert.equal(indexingHeaders(config).length, 1);
});

test("explicit launch enables only the canonical homepage and consistent schema URLs", () => {
  const config = indexingConfig({
    SITE_URL: origin,
    SITE_INDEXING_ENABLED: "true",
  });
  assert.deepEqual(baseMetadata(config).robots, { index: true, follow: true });
  assert.deepEqual(sitemapEntries(config), [{ url: origin + "/" }]);
  assert.deepEqual(robotsPolicy(config), {
    rules: { userAgent: "*", allow: "/" },
    sitemap: origin + "/sitemap.xml",
  });
  assert.deepEqual(indexingHeaders(config), []);
  const schema = businessSchema(config);
  assert.equal(schema["@type"], "HairSalon");
  assert.equal(schema["@id"], origin + "/#business");
  assert.equal(schema.address.addressCountry, "NG");
  assert.deepEqual(
    schema.openingHoursSpecification.map((h) => [h.opens, h.closes]),
    [
      ["09:00", "21:00"],
      ["13:00", "21:00"],
    ],
  );
  for (const key of ["telephone", "aggregateRating", "review", "offers", "geo"])
    assert.equal(key in schema, false);
  assert.equal(schema.contactPoint.url, "https://wa.me/2349163444436");
  assert.equal(schema.email, "urbancut2020@gmail.com");
});

test("invalid launch settings fail clearly rather than falling back", () => {
  for (const SITE_URL of [
    undefined,
    "",
    "http://public.example",
    "https://localhost",
    "https://127.0.0.1",
    "https://[::1]",
    "https://x.vercel.app",
    "https://x.netlify.app",
    "https://name:pass@public.example",
    origin + "/path",
    origin + "?query=1",
    origin + "#hash",
    origin + ":3000",
    "not a url",
  ]) {
    assert.throws(
      () => indexingConfig({ SITE_URL, SITE_INDEXING_ENABLED: "true" }),
      /SITE_URL/,
    );
  }
  assert.throws(
    () => indexingConfig({ SITE_INDEXING_ENABLED: "yes" }),
    /true or false/,
  );
});

test("JSON-LD escapes script terminators without altering parsed content", () => {
  const input = { name: "</script><script>bad</script>" };
  assert.equal(jsonLd(input).includes("<"), false);
  assert.deepEqual(JSON.parse(jsonLd(input)), input);
});
