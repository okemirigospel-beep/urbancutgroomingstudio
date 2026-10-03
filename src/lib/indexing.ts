export type IndexingConfig = { origin: string | null; enabled: boolean };

export function indexingConfig(
  env: {
    SITE_URL?: string;
    SITE_INDEXING_ENABLED?: string;
    CONTEXT?: string;
  } = {
    SITE_URL: process.env.SITE_URL,
    SITE_INDEXING_ENABLED: process.env.SITE_INDEXING_ENABLED,
    CONTEXT: process.env.CONTEXT,
  },
): IndexingConfig {
  const flag = env.SITE_INDEXING_ENABLED?.trim() || "false";
  if (flag !== "true" && flag !== "false")
    throw new Error("SITE_INDEXING_ENABLED must be true or false.");
  const value = env.SITE_URL?.trim();
  let origin: string | null = null;
  if (value) {
    let url: URL;
    try {
      url = new URL(value);
    } catch {
      throw new Error("SITE_URL must be an absolute HTTPS public origin.");
    }
    // SITE_URL is explicitly supplied; never infer it from deployment/request hosts.
    // Vercel testing origins are accepted only while indexing is disabled.
    const host = url.hostname.toLowerCase();
    if (
      url.protocol !== "https:" ||
      /[?#\\\\]/.test(value) ||
      url.username ||
      url.password ||
      url.port ||
      url.pathname !== "/" ||
      url.search ||
      url.hash ||
      !host.includes(".") ||
      /^[\d.]+$/.test(host) ||
      host.includes(":") ||
      /(^|\.)(localhost|local|internal)$/.test(host) ||
      /\.(ngrok\.io|ngrok-free\.app)$/.test(host) ||
      (host.endsWith(".netlify.app") &&
        host !== "urbancutgroomingstudio.netlify.app") ||
      (host.endsWith(".vercel.app") &&
        (flag === "true" || host.split(".").length !== 3))
    ) {
      throw new Error(
        "SITE_URL must be a public HTTPS origin without credentials, path, port, query, fragment or preview hostname.",
      );
    }
    origin = url.origin;
  }
  if (flag === "true" && !origin)
    throw new Error("Enabling indexing requires a valid final SITE_URL.");
  // Netlify supplies CONTEXT at build time. Never index preview/branch/dev builds,
  // even if a shared production flag is accidentally inherited.
  const productionContext = !env.CONTEXT || env.CONTEXT === "production";
  return { origin, enabled: flag === "true" && productionContext };
}

export const publicRoutes = ["/"] as const;
export function sitemapEntries(config: IndexingConfig) {
  return config.enabled && config.origin
    ? publicRoutes.map((path) => ({ url: `${config.origin}${path}` }))
    : [];
}
export function robotsPolicy(config: IndexingConfig) {
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(config.enabled && config.origin
      ? { sitemap: `${config.origin}/sitemap.xml` }
      : {}),
  };
}
export function indexingHeaders(config: IndexingConfig) {
  return config.enabled
    ? []
    : [{ key: "X-Robots-Tag", value: "noindex, follow" }];
}
