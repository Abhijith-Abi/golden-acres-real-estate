import type { InstagramPost } from "@/types";
import { social } from "@/config/social";

/**
 * INSTAGRAM SHOWCASE.
 *
 * Show locally hosted thumbnails because Instagram blocks embedded posts in
 * many browsers. Keep each image paired with its official post permalink.
 *
 * Keep these permalinks and locally hosted thumbnails current together.
 */
export const instagramPosts: InstagramPost[] = [
  {
    href: "https://www.instagram.com/reel/DgFED37Tqch/",
    image: "/instagram/nov-23-2026.jpg",
    alt: "Property update from Golden Acres Real Estates",
    publishedAt: "Nov 23, 2026",
  },
  {
    href: "https://www.instagram.com/reel/DgDRcwzonCy/",
    image: "/instagram/nov-22-2026.jpg",
    alt: "Property update from Golden Acres Real Estates",
    publishedAt: "Nov 22, 2026",
  },
  {
    href: "https://www.instagram.com/p/Df_s5C_z7mT/",
    image: "/instagram/nov-20-2026.jpg",
    alt: "Three-bedroom house listing in Attukal",
    publishedAt: "Nov 20, 2026",
  },
];

export const instagramProfileUrl = social.instagram;
