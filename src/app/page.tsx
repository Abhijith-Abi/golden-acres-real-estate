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
import { testimonials } from "@/data/testimonials";
import { site } from "@/config/social";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Introduction />
      <FeaturedProperties />
      <WhyChooseUs />
      <ServicesSection />
      <FeaturedProjects />
      <Testimonials items={testimonials} />
      <InstagramShowcase />
      <EnquiryCTA />
      {/* aria-label for skip-link target sanity */}
      <span className="sr-only">{site.name}</span>
    </>
  );
}
