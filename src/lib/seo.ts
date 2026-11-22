import type { Metadata } from "next";
import { site, social } from "@/config/social";

/** Canonical origin without a trailing slash. */
export const SITE_URL = site.url.replace(/\/+$/, "");

/** Build an absolute URL for a site path ("/about" → "https://…/about"). */
export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//i.test(path)) return path;
  if (path === "/" || path === "") return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** True while the site URL is still the placeholder from the repo. */
export const isPlaceholderSiteUrl = /example\.com/i.test(SITE_URL);

/**
 * Core Trivandrum / Thiruvananthapuram search terms used site-wide.
 * (Search engines ignore the meta keywords tag, but Bing and several
 * AI/answer engines still read it as a topical hint, and keeping the list
 * in one place keeps page copy consistent.)
 */
export const coreKeywords = [
  "real estate Trivandrum",
  "real estate Thiruvananthapuram",
  "real estate agents in Trivandrum",
  "property for sale in Trivandrum",
  "land for sale in Trivandrum",
  "plots for sale in Trivandrum",
  "flats for sale in Trivandrum",
  "apartments for sale in Trivandrum",
  "houses for sale in Trivandrum",
  "villas for sale in Trivandrum",
  "commercial property in Trivandrum",
  "property consultant Trivandrum",
  "real estate consultant Kerala",
  "Golden Acres Real Estates",
  "Golden Acres Real Estate",
  "Golden Acres",
  "goldenacres",
  "goldenacresrealestate",
  "Golden Acres Trivandrum",
];

interface BuildMetadataInput {
  /** Page title. The site name is appended unless `absoluteTitle` is set. */
  title: string;
  description: string;
  /** Optional shorter description for social preview cards (recommended <= 125 chars). */
  ogDescription?: string;
  /** Site-relative canonical path, e.g. "/about". */
  path: string;
  keywords?: string[];
  /** Social share image (absolute URL or site path). Falls back to the brand card. */
  image?: string;
  imageAlt?: string;
  /** Use the title exactly as given (no " — Site name" suffix). */
  absoluteTitle?: boolean;
  noindex?: boolean;
}

/** Formats descriptions for social share cards to prevent mobile truncation (< 125 chars) */
export function formatSocialDescription(desc: string, maxLen = 125): string {
  if (desc.length <= maxLen) return desc;
  const sliced = desc.slice(0, maxLen);
  const lastSpace = sliced.lastIndexOf(" ");
  if (lastSpace > 70) {
    return sliced.slice(0, lastSpace).replace(/[.,;:!?\s]+$/, "");
  }
  return sliced;
}

/**
 * One place to build page metadata so every route gets a consistent
 * canonical, Open Graph and Twitter block.
 *
 * Next.js replaces (not deep-merges) `openGraph` and `twitter` when a page
 * defines them, so each page must restate the full block — hence this helper.
 */
export function buildMetadata({
  title,
  description,
  ogDescription,
  path,
  keywords,
  image = "/og-image.png",
  imageAlt = `${site.name} — real estate in Trivandrum, Kerala`,
  absoluteTitle = false,
  noindex = false,
}: BuildMetadataInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | Golden Acres`;
  const fullImageUrl = absoluteUrl(image);
  const canonicalUrl = absoluteUrl(path);
  const socialDescription = ogDescription ?? formatSocialDescription(description);

  // Combine page-specific keywords with core brand keywords
  const allKeywords = Array.from(
    new Set([...(keywords ?? []), ...coreKeywords])
  );

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    applicationName: site.name,
    authors: [{ name: site.name, url: SITE_URL }],
    creator: site.name,
    publisher: site.name,
    category: "real estate",
    keywords: allKeywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en-IN": canonicalUrl,
        "x-default": canonicalUrl,
      },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: site.locale,
      url: canonicalUrl,
      title: fullTitle,
      description: socialDescription,
      images: [
        {
          url: fullImageUrl,
          secureUrl: fullImageUrl,
          width: 1200,
          height: 630,
          type: "image/png",
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: social.twitter,
      creator: social.twitter,
      title: fullTitle,
      description: socialDescription,
      images: [fullImageUrl],
    },
    robots: {
      index: !noindex,
      follow: true,
      googleBot: {
        index: !noindex,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    other: {
      "geo.region": "IN-KL",
      "geo.placename": "Thiruvananthapuram",
      "geo.position": "8.5241;76.9366",
      ICBM: "8.5241, 76.9366",
    },
  };
}
