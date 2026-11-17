import { PageHero } from "@/components/layout/PageHero";
import { PropertiesExplorer } from "@/components/property/PropertiesExplorer";
import { properties } from "@/data/properties";
import { brand } from "@/config/brand";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, coreKeywords } from "@/lib/seo";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/seo";

const propertiesDescription =
  "Browse houses, villas, flats, land, plots and commercial property for sale in Trivandrum (Thiruvananthapuram) with Golden Acres Real Estates.";

export const metadata = buildMetadata({
  title: "Properties for Sale in Trivandrum",
  description: propertiesDescription,
  path: "/properties",
  keywords: coreKeywords,
});

export default function PropertiesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Properties", path: "/properties" },
          ]),
          {
            ...webPageSchema({
              type: "CollectionPage",
              name: "Properties for sale in Trivandrum",
              description: propertiesDescription,
              path: "/properties",
            }),
            mainEntity: {
              "@type": "ItemList",
              itemListElement: properties.map((p, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: p.title,
                url: absoluteUrl(`/properties/${p.slug}`),
              })),
            },
          },
        ]}
      />
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
