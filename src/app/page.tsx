import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Introduction } from "@/components/sections/Introduction";
import { FeaturedProperties } from "@/components/sections/FeaturedProperties";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Testimonials } from "@/components/sections/Testimonials";
import { InstagramShowcase } from "@/components/sections/InstagramShowcase";
import { EnquiryCTA } from "@/components/sections/EnquiryCTA";
import { AreasSection } from "@/components/sections/AreasSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { generalFaqs } from "@/data/faqs";
import { faqSchema, webPageSchema } from "@/lib/schema";
import { testimonials } from "@/data/testimonials";
import { site } from "@/config/social";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            name: "Golden Acres Real Estates — Property for Sale in Trivandrum",
            description:
              "Real estate consultants in Trivandrum (Thiruvananthapuram) for land, plots, flats, villas and commercial property.",
            path: "/",
          }),
          faqSchema(generalFaqs),
        ]}
      />
      <Hero />
      <Introduction />
      <FeaturedProperties />
      <WhyChooseUs />
      <ServicesSection />
      <FeaturedProjects />
      <Testimonials items={testimonials} />
      <InstagramShowcase />
      <AreasSection />
      <FaqSection
        faqs={generalFaqs}
        title={
          <>
            Property in Trivandrum, <em className="italic text-gold-deep">answered</em>
          </>
        }
        lede="Quick answers on areas, documents and how we work."
      />
      <EnquiryCTA />
      {/* aria-label for skip-link target sanity */}
      <span className="sr-only">{site.name}</span>
    </>
  );
}
