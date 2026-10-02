import type { MetadataRoute } from "next";
import { indexingConfig, robotsPolicy } from "@/lib/indexing";
export default function robots(): MetadataRoute.Robots {
  return robotsPolicy(indexingConfig());
}
