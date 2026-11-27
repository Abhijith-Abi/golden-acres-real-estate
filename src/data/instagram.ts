import type { InstagramPost } from "@/types";
import { social } from "@/config/social";
import { imagery } from "./imagery";

/**
 * INSTAGRAM SHOWCASE.
 *
 * Hot-linking Instagram media is unreliable, so the showcase uses
 * client-approved images listed here (temporary brand-adjacent stock for
 * now). Each post links back to the official profile.
 *
 * TO UPDATE: drop real post images into /public/instagram and replace the
 * entries below, or set `images: []` to hide the grid and show only the
 * profile CTA.
 */
export const instagramPosts: InstagramPost[] = [
  { image: imagery.hero, alt: "Residential property featured by Golden Acres" },
  { image: imagery.introMain, alt: "Villa listing in Trivandrum" },
  { image: imagery.introSecondary, alt: "Interior showcase from a recent listing" },
  { image: imagery.aboutSecondary, alt: "Apartment interior featured by Golden Acres" },
  { image: imagery.servicesMain, alt: "Designer kitchen in a Golden Acres listing" },
  { image: imagery.aboutTertiary, alt: "Sunlit living space from a recent listing" },
  { image: imagery.aboutMain, alt: "Modern home exterior in Trivandrum" },
  { image: imagery.contactMain, alt: "Premium home with lawn, listed by Golden Acres" },
].map((p) => ({ ...p, href: social.instagram }));

export const instagramProfileUrl = social.instagram;
