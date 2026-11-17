import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/motion-primitives";
import { locations } from "@/data/locations";
import { propertyTypePages } from "@/data/property-types";

/** Internal-link hub: neighbourhood pages and property-type pages. */
export function AreasSection() {
  return (
    <section className="bg-secondary/60 py-20 lg:py-28" aria-labelledby="areas-heading">
      <div className="container-site">
        <div id="areas-heading">
          <SectionHeading
            eyebrow="Real estate in Trivandrum"
            title={
              <>
                Property by <em className="italic text-gold-deep">neighbourhood</em>
              </>
            }
            lede="Land, flats, houses and commercial property across Thiruvananthapuram. Pick an area for local context, or a property type to see what we check before you buy."
          />
        </div>

        <ul className="mt-12 grid gap-px overflow-hidden border border-charcoal/10 bg-charcoal/10 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((loc, i) => (
            <Reveal as="li" key={loc.slug} delay={(i % 3) * 0.06} className="bg-card">
              <Link
                href={`/locations/${loc.slug}`}
                className="group flex h-full items-center justify-between gap-4 p-6 transition-colors hover:bg-charcoal hover:text-ivory"
              >
                <span>
                  <span className="block font-serif text-xl font-light">{loc.name}</span>
                  <span className="mt-1 block text-[12px] text-muted-foreground group-hover:text-ivory/60">
                    Property for sale in {loc.name}
                  </span>
                </span>
                <ArrowUpRight className="size-5 shrink-0 text-gold-deep transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-soft" aria-hidden />
              </Link>
            </Reveal>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap gap-3">
          {propertyTypePages.map((t) => (
            <Link
              key={t.slug}
              href={`/trivandrum/${t.slug}`}
              className="border border-charcoal/15 bg-card px-5 py-3 text-[12px] font-medium uppercase tracking-[0.16em] text-charcoal transition-colors hover:border-gold hover:text-gold-deep"
            >
              {t.seoTitle}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
