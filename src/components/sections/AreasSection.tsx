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

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((loc, i) => (
            <Reveal as="li" key={loc.slug} delay={(i % 3) * 0.06} className="h-full">
              <Link
                href={`/locations/${loc.slug}`}
                className="glass-light group flex h-full items-center justify-between gap-4 rounded-xl border border-charcoal/10 p-6 transition-all duration-300 hover:border-gold/60 hover:bg-charcoal hover:text-ivory hover:shadow-[0_12px_32px_rgba(212,175,55,0.18)]"
              >
                <span>
                  <span className="block font-serif text-xl font-light">{loc.name}</span>
                  <span className="mt-1 block text-[12px] text-muted-foreground group-hover:text-ivory/70">
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
              className="glass-light rounded-lg border border-charcoal/15 px-5 py-3 text-[12px] font-medium uppercase tracking-[0.16em] text-charcoal transition-all duration-300 hover:border-gold hover:text-gold-deep hover:shadow-xs"
            >
              {t.seoTitle}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
