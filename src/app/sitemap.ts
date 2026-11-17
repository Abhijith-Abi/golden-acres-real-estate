import type { MetadataRoute } from "next";
import { properties } from "@/data/properties";
import { site } from "@/config/social";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ["", "/about", "/properties", "/services", "/projects", "/contact"].map(
    (route) => ({
      url: `${site.url}${route}`,
      lastModified: now,
      changeFrequency: route === "/properties" ? ("daily" as const) : ("monthly" as const),
      priority: route === "" ? 1 : route === "/properties" ? 0.9 : 0.7,
    })
  );

  const propertyRoutes = properties.map((p) => ({
    url: `${site.url}/properties/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...routes, ...propertyRoutes];
}
