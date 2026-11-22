import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/motion-primitives";
import { EnquiryCTA } from "@/components/sections/EnquiryCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { locations } from "@/data/locations";
import { buildMetadata, coreKeywords } from "@/lib/seo";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/seo";

const description =
  "Property for sale across Trivandrum: Kazhakootam, Attukal, Vilappilsala, Pothencode, Anayara, Vellayani, Malayinkeezhu, and city centre corridors.";

export const metadata = buildMetadata({
  title: "Areas We Serve in Trivandrum",
  description,
  path: "/locations",
  keywords: ["Trivandrum localities property", "areas in Thiruvananthapuram real estate", ...coreKeywords.slice(0, 6)],
});

export default function LocationsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Locations", path: "/locations" },
          ]),
          {
            ...webPageSchema({
              type: "CollectionPage",
              name: "Areas we serve in Trivandrum",
              description,
              path: "/locations",
            }),
            mainEntity: {
              "@type": "ItemList",
              itemListElement: locations.map((l, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: l.heading,
                url: absoluteUrl(`/locations/${l.slug}`),
              })),
            },
          },
        ]}
      />
      <PageHero
        breadcrumb="Locations"
        eyebrow="Areas we serve"
        title={
          <>
            Real estate across <em className="italic text-gold-soft">Trivandrum</em>
          </>
        }
        lede="Neighbourhood-level guidance for buyers, sellers and investors in Thiruvananthapuram."
      />
      <section className="py-20 lg:py-28">
        <div className="container-site">
          <ul className="grid gap-px overflow-hidden border border-charcoal/10 bg-charcoal/10 sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((loc, i) => (
              <Reveal as="li" key={loc.slug} delay={(i % 3) * 0.06} className="bg-card">
                <Link
                  href={`/locations/${loc.slug}`}
                  className="group flex h-full flex-col justify-between gap-6 p-8 transition-colors hover:bg-charcoal hover:text-ivory"
                >
                  <span>
                    <span className="block font-serif text-2xl font-light">{loc.name}</span>
                    <span className="mt-3 block text-[13.5px] leading-relaxed text-muted-foreground group-hover:text-ivory/65">
                      {loc.lede}
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep group-hover:text-gold-soft">
                    Explore {loc.name}
                    <ArrowUpRight className="size-4" aria-hidden />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      <EnquiryCTA />
    </>
  );
}
