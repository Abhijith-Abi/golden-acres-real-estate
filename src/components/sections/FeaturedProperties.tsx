import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { PropertyCard } from "@/components/property/PropertyCard";
import { GhostButton } from "@/components/ui/buttons";
import { Reveal } from "@/components/ui/motion-primitives";
import { getFeaturedProperties } from "@/data/properties";

/**
 * Featured properties — editorial grid that stays complete at every
 * breakpoint:
 *   mobile: 1 column (lead, cards, CTA tile stacked)
 *   ≥sm:    2 columns — lead spans 2, remaining cards pair up
 *   ≥lg:    3 columns — lead spans 2 + one card, then two cards + CTA tile
 */
export function FeaturedProperties() {
  const [lead, ...rest] = getFeaturedProperties().slice(0, 4);
  const cards = rest.slice(0, 3);

  return (
    <section
      className="bg-secondary/60 py-24 lg:py-32"
      aria-labelledby="featured-heading"
    >
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="Featured collection"
            title={
              <span id="featured-heading">
                Handpicked from{" "}
                <em className="italic text-gold-deep">this week&apos;s walk-ins</em>
              </span>
            }
            lede="A snapshot of what's currently moving across Trivandrum. For the full picture — including land and commercial options — browse the complete portfolio."
          />
          <Reveal delay={0.15} className="hidden md:block">
            <GhostButton href="/properties" size="md">
              View all properties
            </GhostButton>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {lead && (
            <Reveal className="sm:col-span-2">
              <PropertyCard property={lead} priority />
            </Reveal>
          )}
          {cards.map((property) => (
            <Reveal key={property.slug} delay={0.08}>
              <PropertyCard property={property} />
            </Reveal>
          ))}

          {/* CTA tile — completes the grid on ≥lg and ≥sm layouts */}
          <Reveal delay={0.2}>
            <Link
              href="/properties"
              className="group flex h-full min-h-44 flex-col justify-between bg-charcoal p-7 text-ivory transition-colors hover:bg-charcoal-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold lg:min-h-full"
            >
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-gold-soft">
                  The full portfolio
                </p>
                <p className="mt-4 font-serif text-3xl font-light leading-tight">
                  Browse every property in Trivandrum
                </p>
                <p className="mt-3 text-[13px] leading-relaxed text-ivory/60">
                  Land, apartments, villas and commercial spaces — filterable by
                  what matters to you.
                </p>
              </div>
              <span className="mt-8 inline-flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.18em] text-gold-soft">
                View all
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1.5"
                  aria-hidden
                />
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
