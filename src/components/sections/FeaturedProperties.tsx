import { SectionHeading } from "@/components/ui/section-heading";
import { PropertyCard } from "@/components/property/PropertyCard";
import { GoldLink, GhostButton } from "@/components/ui/buttons";
import { Reveal } from "@/components/ui/motion-primitives";
import { getFeaturedProperties } from "@/data/properties";

/** Featured properties — asymmetric editorial grid. */
export function FeaturedProperties() {
  const featured = getFeaturedProperties().slice(0, 4);

  return (
    <section className="bg-secondary/60 py-24 lg:py-32" aria-labelledby="featured-heading">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="Featured collection"
            title={
              <span id="featured-heading">
                Handpicked from <em className="italic text-gold-deep">this week&apos;s walk-ins</em>
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

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((property, i) => (
            <Reveal
              key={property.slug}
              delay={i * 0.08}
              className={i === 0 ? "sm:col-span-2" : undefined}
            >
              <PropertyCard
                property={property}
                priority={i === 0}
              />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <GoldLink href="/properties">View all properties</GoldLink>
        </div>
      </div>
    </section>
  );
}
