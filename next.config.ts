import type { NextConfig } from "next";
import { indexingConfig, indexingHeaders } from "./src/lib/indexing.ts";
const indexing = indexingConfig();
const config: NextConfig = {
  devIndicators: false,
  async headers() {
    const headers = indexingHeaders(indexing);
    return headers.length ? [{ source: "/:path*", headers }] : [];
  },
};
export default config;
