import type { InstagramPost } from "@/types";
import { social } from "@/config/social";

/**
 * Official Instagram feed synced from @golden_acres_realestates
 * Real post images stored locally in /public/instagram/ to guarantee permanent
 * availability, instant loading, and zero CORS / hotlink degradation.
 */
export const instagramPosts: InstagramPost[] = [
  {
    image: "/instagram/post-06-Df_s5C_z7mT.webp",
    alt: "Latest property updates by Golden Acres Real Estates, Trivandrum",
    href: "https://www.instagram.com/golden_acres_realestates/p/Df_s5C_z7mT/",
  },
  {
    image: "/instagram/post-07-Df_O7KPz1uu.jpg",
    alt: "Property walkthrough reel in Trivandrum by Golden Acres Real Estates",
    href: "https://www.instagram.com/golden_acres_realestates/reel/Df_O7KPz1uu/",
  },
  {
    image: "/instagram/post-08-Df7m-RHzgIm.jpg",
    alt: "Residential property walkthrough in Trivandrum by Golden Acres Real Estates",
    href: "https://www.instagram.com/golden_acres_realestates/reel/Df7m-RHzgIm/",
  },
  {
    image: "/instagram/post-09-Df5EkUCTMnm.jpg",
    alt: "Property listings and neighborhood review by Golden Acres Real Estates",
    href: "https://www.instagram.com/golden_acres_realestates/reel/Df5EkUCTMnm/",
  },
  {
    image: "/instagram/post-10-Df39gkEzcU0.jpg",
    alt: "Land and plots for sale in Trivandrum — Golden Acres Real Estates",
    href: "https://www.instagram.com/golden_acres_realestates/reel/Df39gkEzcU0/",
  },
  {
    image: "/instagram/post-11-Dfpkk06y49b.jpg",
    alt: "Site visit and land survey in Trivandrum corridor",
    href: "https://www.instagram.com/golden_acres_realestates/reel/Dfpkk06y49b/",
  },
  {
    image: "/instagram/post-12-Dfm-MzAM0S_.jpg",
    alt: "Trivandrum prime locations and transportation connectivity update",
    href: "https://www.instagram.com/golden_acres_realestates/reel/Dfm-MzAM0S_/",
  },
  {
    image: "/instagram/post-01-DfXdTscswsi.jpg",
    alt: "Temple surroundings and scenic residential plot walkthrough",
    href: "https://www.instagram.com/golden_acres_realestates/reel/DfXdTscswsi/",
  },
  {
    image: "/instagram/post-02-DfB_awiz3Gc.webp",
    alt: "Golden Acres Real Estates official office and consultancy announcement",
    href: "https://www.instagram.com/golden_acres_realestates/p/DfB_awiz3Gc/",
  },
  {
    image: "/instagram/post-03-Dc5bTxWz_aG.jpg",
    alt: "Architectural floor plans and layout presentation for Trivandrum buyers",
    href: "https://www.instagram.com/golden_acres_realestates/reel/Dc5bTxWz_aG/",
  },
  {
    image: "/instagram/post-05-Db5ZhfYTYtp.jpg",
    alt: "Kerala real estate investment and villa project showcase",
    href: "https://www.instagram.com/golden_acres_realestates/reel/Db5ZhfYTYtp/",
  },
  {
    image: "/instagram/post-04-DZ-KlZZTvQp.jpg",
    alt: "Residential property walkthrough in Trivandrum",
    href: "https://www.instagram.com/golden_acres_realestates/reel/DZ-KlZZTvQp/",
  },
];

export const instagramProfileUrl = social.instagram;
