import { PageHero } from "@/components/layout/PageHero";
import { FaqSection } from "@/components/sections/FaqSection";
import { EnquiryCTA } from "@/components/sections/EnquiryCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { generalFaqs } from "@/data/faqs";
import { buildMetadata, coreKeywords } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";

const description =
  "Answers on buying land, flats, and houses in Trivandrum: paperwork, land measurement in cents, and legal due diligence with Golden Acres Real Estates.";

export const metadata = buildMetadata({
  title: "Frequently Asked Questions",
  description,
  path: "/faq",
  keywords: [
    "Trivandrum property FAQ",
    "documents for buying land in Kerala",
    "cent to sq ft Kerala",
    "Trivandrum vs Thiruvananthapuram",
    ...coreKeywords.slice(0, 5),
  ],
});

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "FAQ", path: "/faq" },
          ]),
          webPageSchema({ name: "Real estate FAQs — Trivandrum", description, path: "/faq" }),
          faqSchema(generalFaqs),
        ]}
      />
      <PageHero
        breadcrumb="FAQ"
        eyebrow="Questions answered"
        title={
          <>
            Buying property in <em className="italic text-gold-soft">Trivandrum</em>
          </>
        }
        lede="Straight answers on areas, documents, land measurement and how to reach us."
      />
      <FaqSection
        faqs={generalFaqs}
        eyebrow="Frequently asked"
        title={
          <>
            Everything you <em className="italic text-gold-deep">need to know</em>
          </>
        }
      />
      <EnquiryCTA />
    </>
  );
}
