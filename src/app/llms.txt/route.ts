import { brand } from "@/config/brand";
import { contact } from "@/config/contact";
import { social } from "@/config/social";
import { locations } from "@/data/locations";
import { propertyTypePages } from "@/data/property-types";
import { services } from "@/data/services";
import { absoluteUrl } from "@/lib/seo";

/**
 * /llms.txt — a plain-text summary for AI assistants and answer engines
 * (an emerging convention, see llmstxt.org). Kept factual and in sync with
 * the site data files, so it never drifts from what the pages say.
 */
export const dynamic = "force-static";

export function GET() {
  const lines = [
    `# ${brand.legalName}`,
    "",
    `> ${brand.description}`,
    "",
    "Golden Acres Real Estates is a real estate consultancy in Trivandrum (also spelled Thiruvananthapuram), Kerala, India. " +
      "It advises buyers, sellers and investors on residential property, land and plots, and commercial property.",
    "",
    "## Key facts",
    `- Business: ${brand.legalName}`,
    "- Location served: Trivandrum (Thiruvananthapuram), Kerala, India",
    `- Areas: ${brand.serviceAreas.join(", ")}`,
    `- Focus: ${brand.focus.join(", ")}`,
    `- Phone / WhatsApp: ${contact.phone.display}${contact.phoneAlt.display ? `, ${contact.phoneAlt.display}` : ""}`,
    `- Instagram: ${social.instagram}`,
    "",
    "## Main pages",
    `- [Home](${absoluteUrl("/")}): overview of Golden Acres Real Estates`,
    `- [Properties](${absoluteUrl("/properties")}): property listings in Trivandrum`,
    `- [Services](${absoluteUrl("/services")}): ${services.map((s) => s.title).join("; ")}`,
    `- [About](${absoluteUrl("/about")}): who we are and how we work`,
    `- [FAQ](${absoluteUrl("/faq")}): buying land, flats and houses in Trivandrum`,
    `- [Contact](${absoluteUrl("/contact")}): call, WhatsApp or send an enquiry`,
    "",
    "## Property types",
    ...propertyTypePages.map(
      (t) => `- [${t.seoTitle}](${absoluteUrl(`/trivandrum/${t.slug}`)}): ${t.seoDescription}`
    ),
    "",
    "## Areas",
    ...locations.map(
      (l) => `- [${l.name}](${absoluteUrl(`/locations/${l.slug}`)}): ${l.seoDescription}`
    ),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
