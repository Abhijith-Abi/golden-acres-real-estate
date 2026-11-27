import { PageHero } from "@/components/layout/PageHero";
import { PropertiesExplorer } from "@/components/property/PropertiesExplorer";
import { properties } from "@/data/properties";
import { propertyImagery } from "@/data/imagery";
import { brand } from "@/config/brand";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, coreKeywords } from "@/lib/seo";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/seo";

const hasVerifiedListings = properties.some((property) => !property.sample);
const propertiesDescription = hasVerifiedListings
  ? "Browse houses, villas, flats, land, plots and commercial property for sale in Trivandrum (Thiruvananthapuram) with Golden Acres Real Estates."
  : "Request current property options in Trivandrum from Golden Acres Real Estates while verified listings are being prepared.";

export const metadata = buildMetadata({
  title: "Properties for Sale in Trivandrum",
  description: propertiesDescription,
  path: "/properties",
  keywords: coreKeywords,
  // Current catalog entries are explicitly marked as sample data. Keep the
  // collection out of search until verified inventory is published.
  noindex: !hasVerifiedListings,
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
            ...(hasVerifiedListings
              ? {
                  mainEntity: {
                    "@type": "ItemList",
                    itemListElement: properties
                      .filter((property) => !property.sample)
                      .map((property, index) => ({
                        "@type": "ListItem",
                        position: index + 1,
                        name: property.title,
                        url: absoluteUrl(`/properties/${property.slug}`),
                      })),
                  },
                }
              : {}),
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
        backgroundImage={propertyImagery[0]}
      />
      <section className="py-16 lg:py-24">
        <div className="container-site">
          {properties.some((property) => !property.sample) ? (
            <PropertiesExplorer properties={properties.filter((property) => !property.sample)} />
          ) : (
            <div className="mx-auto max-w-2xl border border-charcoal/10 bg-card px-8 py-12 text-center">
              <h2 className="font-serif text-2xl font-light text-charcoal">Current listings are being verified</h2>
              <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
                We publish property details after confirming availability and key documents. Contact us with your preferred area and property type for current options.
              </p>
              <a href="/contact" className="mt-6 inline-flex h-12 items-center justify-center bg-charcoal px-6 text-[11px] font-medium uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-charcoal-soft">
                Request current options
              </a>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
