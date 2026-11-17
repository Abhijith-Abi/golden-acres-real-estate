import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { PropertiesExplorer } from "@/components/property/PropertiesExplorer";
import { properties } from "@/data/properties";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "Properties",
  description:
    "Browse houses, villas, apartments, land and commercial property across Trivandrum with Golden Acres Real Estates.",
  alternates: { canonical: "/properties" },
};

export default function PropertiesPage() {
  return (
    <>
      <PageHero
        breadcrumb="Properties"
        eyebrow="The portfolio"
        title={
          <>
            Property across <em className="italic text-gold-soft">Trivandrum&apos;s best streets</em>
          </>
        }
        lede={`Houses, apartments, land and commercial spaces in ${brand.serviceAreas.slice(0, 5).join(", ")} and more. Filter by what matters to you — or tell us what you need and we'll search off-market too.`}
      />
      <section className="py-16 lg:py-24">
        <div className="container-site">
          <PropertiesExplorer properties={properties} />
          <p className="mt-10 text-center text-[13px] text-muted-foreground">
            Listings shown are samples pending final verification — every
            property you&apos;ll actually view comes with checked documents and
            confirmed details from our consultants.
          </p>
        </div>
      </section>
    </>
  );
}
