import type { MetadataRoute } from "next";
import { properties } from "@/data/properties";
import { locations } from "@/data/locations";
import { propertyTypePages } from "@/data/property-types";
import { absoluteUrl } from "@/lib/seo";

/**
 * Update this date whenever page content meaningfully changes. A fixed date
 * is deliberate: stamping `new Date()` on every build tells crawlers every
 * page changed every time, and they learn to ignore the signal.
 */
const CONTENT_UPDATED = new Date("2026-11-17");

export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (
    path: string,
    priority: number,
    changeFrequency: "daily" | "weekly" | "monthly"
  ) => ({
    url: absoluteUrl(path),
    lastModified: CONTENT_UPDATED,
    changeFrequency,
    priority,
  });

  return [
    entry("/", 1, "weekly"),
    entry("/properties", 0.9, "daily"),
    // Search-intent landing pages
    ...propertyTypePages.map((t) => entry(`/trivandrum/${t.slug}`, 0.9, "weekly")),
    entry("/locations", 0.8, "monthly"),
    ...locations.map((l) => entry(`/locations/${l.slug}`, 0.8, "monthly")),
    entry("/services", 0.7, "monthly"),
    entry("/about", 0.6, "monthly"),
    entry("/projects", 0.6, "monthly"),
    entry("/faq", 0.6, "monthly"),
    entry("/contact", 0.7, "monthly"),
    // Sample listings are noindex, so keep them out of the sitemap too.
    ...properties
      .filter((p) => !p.sample)
      .map((p) => entry(`/properties/${p.slug}`, 0.8, "weekly")),
  ];
}
