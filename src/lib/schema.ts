import { brand } from "@/config/brand";
import { contact } from "@/config/contact";
import { social } from "@/config/social";
import { services } from "@/data/services";
import { absoluteUrl } from "@/lib/seo";

/** Stable @id values so every page's structured data points at the same entities. */
export const ORG_ID = absoluteUrl("/#organization");
export const WEBSITE_ID = absoluteUrl("/#website");

/** Thiruvananthapuram city centre (public, well-known coordinates). */
const CITY_GEO = { "@type": "GeoCoordinates", latitude: 8.5241, longitude: 76.9366 };

export const cityEntity = {
  "@type": "City",
  name: "Thiruvananthapuram",
  alternateName: "Trivandrum",
  sameAs: "https://en.wikipedia.org/wiki/Thiruvananthapuram",
  geo: CITY_GEO,
  containedInPlace: {
    "@type": "State",
    name: "Kerala",
    containedInPlace: { "@type": "Country", name: "India" },
  },
};

/** Serialise JSON-LD safely for a <script> tag (escapes "<" to prevent breakout). */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const telephones = [contact.phone.tel, contact.phoneAlt.tel].filter(Boolean);

/** Site-wide graph: the business (RealEstateAgent) and the WebSite. */
export function siteGraph() {
  const address: Record<string, string> = {
    "@type": "PostalAddress",
    addressLocality: "Thiruvananthapuram",
    addressRegion: "Kerala",
    addressCountry: "IN",
  };
  if (contact.address.line1) address.streetAddress = [contact.address.line1, contact.address.line2].filter(Boolean).join(", ");
  if (contact.address.postalCode) address.postalCode = contact.address.postalCode;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["RealEstateAgent", "LocalBusiness"],
        "@id": ORG_ID,
        name: brand.legalName,
        alternateName: ["Golden Acres", "Golden Acres Real Estates Trivandrum"],
        slogan: brand.tagline,
        description: brand.description,
        url: absoluteUrl("/"),
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/brand/logo-full.png"),
        },
        image: absoluteUrl("/og/golden-acres-og.png"),
        ...(telephones.length ? { telephone: telephones[0] } : {}),
        ...(contact.email.address ? { email: contact.email.address } : {}),
        address,
        areaServed: [
          cityEntity,
          ...brand.serviceAreas
            .filter((a) => a !== "Trivandrum City")
            .map((name) => ({
              "@type": "Place",
              name: `${name}, Thiruvananthapuram`,
              containedInPlace: { "@type": "City", name: "Thiruvananthapuram" },
            })),
        ],
        knowsAbout: [
          "Real estate in Thiruvananthapuram (Trivandrum)",
          "Residential property",
          "Commercial property",
          "Land and plots in Kerala",
          "Property investment",
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            ...(telephones.length ? { telephone: telephones[0] } : {}),
            areaServed: "IN-KL",
            availableLanguage: ["English", "Malayalam"],
          },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Real estate services in Trivandrum",
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: s.title,
              description: s.description,
              areaServed: { "@type": "City", name: "Thiruvananthapuram" },
            },
          })),
        },
        sameAs: [social.instagram],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: absoluteUrl("/"),
        name: brand.legalName,
        inLanguage: "en-IN",
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/** A regular content page that belongs to the site and is about/by the business. */
export function webPageSchema(opts: {
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage" | "FAQPage";
  name: string;
  description: string;
  path: string;
  about?: unknown;
}) {
  return {
    "@context": "https://schema.org",
    "@type": opts.type ?? "WebPage",
    "@id": absoluteUrl(`${opts.path}#webpage`),
    url: absoluteUrl(opts.path),
    name: opts.name,
    description: opts.description,
    inLanguage: "en-IN",
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORG_ID },
    ...(opts.about ? { about: opts.about } : {}),
  };
}
