import { MetadataRoute } from "next";
import { getServices } from "./[locale]/actions/services";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date().toISOString();

  // Static routes
  const staticRoutes = ["", "service", "projects", "contact"].map((route) => ({
    url: `https://www.decoletech.com/${route}`,
    lastModified: currentDate,
    changeFreq: "weekly", // Optional: Add change frequency
    priority: route === "" ? 1.0 : 0.8, // Optional: Set priority (homepage higher)
  }));

  // Dynamic service routes
  const serviceIds = await getServices();
  const dynamicRoutes = serviceIds.map((id: string) => ({
    url: `https://www.decoletech.com/service/${id}`,
    lastModified: currentDate,
    changeFreq: "weekly", // Optional
    priority: 0.7, // Optional: Lower priority for dynamic pages
  }));

  // Combine static and dynamic routes
  return [...staticRoutes, ...dynamicRoutes];
}
