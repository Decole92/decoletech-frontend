import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/auth/", "/unauthorized"],
      },
    ],
    sitemap: `https://www.decoletech.com/sitemap.xml`,
  };
}
