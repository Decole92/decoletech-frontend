import { MetadataRoute } from "next";

async function getServicesIds(): Promise<string[]> {
  try {
    // Use fetch with caching to allow static rendering
    const response = await fetch(
      `https://www.decoletech.com/api/services/getServices`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour (adjust as needed)
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch services: ${response.statusText}`);
    }

    const services = await response.json();

    return services.map((service: { id: string }) => service.id.toString());
  } catch (error) {
    console.error("Error fetching service IDs:", error);
    return []; // Return empty array on error to avoid breaking the build
  }
}
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
  const serviceIds = await getServicesIds();
  const dynamicRoutes = serviceIds.map((id: string) => ({
    url: `https://www.decoletech.com/service/${id}`,
    lastModified: currentDate,
    changeFreq: "weekly", // Optional
    priority: 0.7, // Optional: Lower priority for dynamic pages
  }));

  // Combine static and dynamic routes
  return [...staticRoutes, ...dynamicRoutes];
}
