import type { InstagramPost } from "@/types";
import { social } from "@/config/social";

/**
 * INSTAGRAM SHOWCASE.
 *
 * No approved post media is available yet, so the homepage shows the profile
 * link without substituting stock imagery for real posts.
 *
 * To show the grid, add approved post images and captions here.
 */
export const instagramPosts: InstagramPost[] = [];

export const instagramProfileUrl = social.instagram;
