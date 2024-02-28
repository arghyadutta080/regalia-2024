import type { MetadataRoute } from "next";

// To tell search engine crawlers which URLs they can access on stabble.

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // disallow: "/coming-soon/",
    },
    sitemap: "http://regalia.rcciit.org.in/sitemap.xml",
  };
}

// Output:

// User-Agent: *
// Allow: /
// Disallow: /coming-soon/
// Sitemap: http://regalia.rcciit.org.in/sitemap.xml
