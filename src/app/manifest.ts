import type { MetadataRoute } from "next";
import { site } from "@/config/social";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Golden Acres",
    description: "Real estate consultants in Trivandrum, Kerala.",
    start_url: "/",
    display: "standalone",
    background_color: "#F8F5EF",
    theme_color: "#F8F5EF",
    lang: "en-IN",
    icons: [
      { src: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { src: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
