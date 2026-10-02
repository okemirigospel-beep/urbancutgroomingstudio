import type { MetadataRoute } from "next";
import { indexingConfig, sitemapEntries } from "@/lib/indexing";
export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapEntries(indexingConfig());
}
