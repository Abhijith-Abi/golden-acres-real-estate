import type { InstagramPost } from "@/types";
import { social } from "@/config/social";

/**
 * INSTAGRAM SHOWCASE.
 *
 * Embed recent public posts from the official profile instead of copying
 * Instagram CDN image URLs, which are signed and expire.
 *
 * Keep these permalinks current. Instagram supplies the post media and caption
 * through its official embed endpoint.
 */
export const instagramPosts: InstagramPost[] = [
  {
    href: "https://www.instagram.com/reel/DgFED37Tqch/",
    alt: "Property update from Golden Acres Real Estates",
    publishedAt: "Nov 23, 2026",
  },
  {
    href: "https://www.instagram.com/reel/DgDRcwzonCy/",
    alt: "Property update from Golden Acres Real Estates",
    publishedAt: "Nov 22, 2026",
  },
  {
    href: "https://www.instagram.com/p/Df_s5C_z7mT/",
    alt: "Three-bedroom house listing in Attukal",
    publishedAt: "Nov 20, 2026",
  },
];

export const instagramProfileUrl = social.instagram;
