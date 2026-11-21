import type { Metadata } from "next";
import { site } from "@/config/social";

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
];

interface BuildMetadataInput {
  /** Page title. The site name is appended unless `absoluteTitle` is set. */
  title: string;
  description: string;
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
  path,
  keywords,
  image = "/og-image.png",
  imageAlt = `${site.name} — real estate in Trivandrum, Kerala`,
  absoluteTitle = false,
  noindex = false,
}: BuildMetadataInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} — ${site.name}`;
  const fullImageUrl = absoluteUrl(image);
  const canonicalUrl = absoluteUrl(path);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: site.locale,
      url: canonicalUrl,
      title: fullTitle,
      description,
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
      title: fullTitle,
      description,
      images: [fullImageUrl],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
