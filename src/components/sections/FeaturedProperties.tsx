import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, BedDouble, Bath, Ruler, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { GhostButton } from "@/components/ui/buttons";
import { Reveal } from "@/components/ui/motion-primitives";
import { properties } from "@/data/properties";

const categoryNames: Record<string, string> = {
  "house-villa": "House · Villa",
  apartment: "Apartment",
  "land-plot": "Land · Plot",
  commercial: "Commercial",
};

/**
 * Featured Properties — Architectural Luxury Bento Grid.
 * Features an asymmetric yet geometrically harmonious layout:
 *   - Hero Showcase (Spans Left 7 Columns, 540px height)
 *   - Stacked Spotlight Tiles (Right 5 Columns, two 255px cards)
 *   - Lower Trio (Three balanced 300px cards including the Portfolio VIP Tile)
 */
export function FeaturedProperties() {
  const verified = properties.filter((property) => !property.sample && property.featured);
  if (verified.length < 5) return null;
  const [lead, p2, p3, p4, p5] = verified;

  return (
    <section
      className="bg-secondary/60 py-24 lg:py-32 overflow-hidden border-t border-charcoal/[0.08]"
      aria-labelledby="featured-heading"
    >
      <div className="container-site">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-8 pb-12 border-b border-charcoal/[0.08]">
          <SectionHeading
            eyebrow="Featured collection"
            title={
              <span id="featured-heading">
                Handpicked from{" "}
                <em className="italic text-gold-deep">current listings</em>
              </span>
            }
            lede="Explore verified residential and commercial properties currently available across Trivandrum."
            className="max-w-2xl"
          />
          <Reveal delay={0.15} className="hidden md:block">
            <GhostButton href="/properties" size="md">
              View all properties
            </GhostButton>
          </Reveal>
        </div>

        {/* Bento Grid Architecture */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-7">
          {/* ========================================================= */}
          {/* 1. Large Hero Bento Showcase (Col 1-7, 540px) */}
          {/* ========================================================= */}
          <div className="lg:col-span-7">
            <Reveal className="h-full">
              <Link
                href={`/properties/${lead.slug}`}
                className="group relative flex h-[500px] sm:h-[520px] lg:h-[540px] w-full flex-col justify-between overflow-hidden rounded-xl border border-charcoal/10 bg-charcoal shadow-sm transition-all duration-500 hover:border-gold/60 hover:shadow-[0_16px_40px_rgba(212,175,55,0.18)]"
              >
                {/* Full-bleed Photo */}
                <Image
                  src={lead.images[0]}
                  alt={lead.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Dark Vignette Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-charcoal/60" />
                <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 via-transparent to-transparent" />

                {/* Top Badges */}
                <div className="relative z-10 flex items-center justify-between gap-2 p-4 sm:p-7 lg:p-8">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <span className="glass-badge rounded-md px-2.5 py-1 text-[9.5px] sm:px-3.5 sm:py-1.5 sm:text-[10.5px] font-semibold uppercase tracking-[0.18em] sm:tracking-[0.22em] text-ivory whitespace-nowrap shrink-0">
                      {categoryNames[lead.category] || "Residence"}
                    </span>
                    <span className="rounded-md bg-gold/90 px-2 py-1 text-[9px] sm:px-3 sm:py-1.5 sm:text-[10px] font-semibold uppercase tracking-[0.16em] sm:tracking-[0.22em] text-charcoal backdrop-blur-sm whitespace-nowrap shrink-0 shadow-sm">
                      {lead.location}
                    </span>
                  </div>
                  <span className="hidden sm:inline-flex glass-badge rounded-full px-3 py-1 text-[9px] font-medium uppercase tracking-[0.2em] text-ivory/80 whitespace-nowrap shrink-0">
                    Featured Residence
                  </span>
                </div>

                {/* Bottom Property Specs Card */}
                <div className="relative z-10 p-4 sm:p-7 lg:p-8">
                  <div className="glass-dark rounded-xl p-4 sm:p-6 transition-all duration-300 group-hover:border-gold/50 group-hover:shadow-[0_16px_40px_rgba(212,175,55,0.2)]">
                    <p className="flex items-center gap-1.5 text-[10.5px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-gold-soft">
                      <MapPin className="size-3.5 text-gold shrink-0" />
                      {lead.location}, Trivandrum
                    </p>
                    <h3 className="mt-1.5 sm:mt-2 font-serif text-xl sm:text-2xl lg:text-3xl font-light text-ivory transition-colors group-hover:text-gold-soft">
                      {lead.title}
                    </h3>

                    <div className="mt-3.5 sm:mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-ivory/15 pt-3 sm:pt-4">
                      <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-[12px] sm:text-[13px] text-ivory/80">
                        {lead.bedrooms && (
                          <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                            <BedDouble className="size-3.5 sm:size-4 text-gold-soft shrink-0" />
                            {lead.bedrooms} Beds
                          </span>
                        )}
                        {lead.bathrooms && (
                          <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                            <Bath className="size-3.5 sm:size-4 text-gold-soft shrink-0" />
                            {lead.bathrooms} Baths
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                          <Ruler className="size-3.5 sm:size-4 text-gold-soft shrink-0" />
                          {lead.area.value.toLocaleString("en-IN")} {lead.area.unit}
                        </span>
                      </div>

                      <span className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-[0.18em] text-gold-soft group-hover:text-ivory transition-colors whitespace-nowrap shrink-0">
                        <span>Explore Property</span>
                        <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          </div>

          {/* ========================================================= */}
          {/* 2 & 3. Stacked Right Bento Tiles (Col 8-12, two 255px) */}
          {/* ========================================================= */}
          <div className="flex flex-col gap-6 sm:gap-7 lg:col-span-5">
            {/* Tile 2: Apartment Spotlight (255px) */}
            <Reveal className="h-full">
              <Link
                href={`/properties/${p2.slug}`}
                className="group relative flex h-[260px] sm:h-[255px] w-full flex-col justify-between overflow-hidden rounded-xl border border-charcoal/10 bg-charcoal shadow-sm transition-all duration-500 hover:border-gold/60 hover:shadow-[0_12px_30px_rgba(212,175,55,0.15)]"
              >
                <Image
                  src={p2.images[0]}
                  alt={p2.title}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/50 to-charcoal/40" />

                {/* Top Badges */}
                <div className="relative z-10 flex items-center justify-between p-4 sm:p-5">
                  <span className="rounded-md bg-charcoal/80 px-2.5 py-1 text-[9.5px] sm:text-[10px] font-semibold uppercase tracking-[0.18em] text-ivory backdrop-blur-md border border-ivory/15 whitespace-nowrap shrink-0">
                    {categoryNames[p2.category]}
                  </span>
                  <span className="rounded-md bg-gold-soft px-2.5 py-1 text-[9px] sm:text-[9.5px] font-semibold uppercase tracking-[0.18em] text-charcoal whitespace-nowrap shrink-0">
                    {p2.location}
                  </span>
                </div>

                {/* Bottom Details */}
                <div className="relative z-10 p-4 sm:p-5">
                  <p className="flex items-center gap-1.5 text-[10px] sm:text-[10.5px] font-medium uppercase tracking-[0.2em] text-gold-soft">
                    <MapPin className="size-3 text-gold shrink-0" />
                    {p2.location}, Trivandrum
                  </p>
                  <h3 className="mt-1 font-serif text-lg sm:text-xl font-light text-ivory transition-colors group-hover:text-gold-soft lg:text-[22px]">
                    {p2.title}
                  </h3>
                  <div className="mt-2.5 sm:mt-3 flex items-center justify-between text-[11.5px] sm:text-[12.5px] text-ivory/75 border-t border-ivory/15 pt-2 sm:pt-2.5">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span>{p2.bedrooms} Beds</span>
                      <span>·</span>
                      <span>{p2.bathrooms} Baths</span>
                      <span>·</span>
                      <span>{p2.area.value} {p2.area.unit}</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10.5px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-soft group-hover:text-ivory transition-colors whitespace-nowrap shrink-0">
                      <span>View</span>
                      <ArrowRight className="size-3 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>

            {/* Tile 3: Commercial Spotlight (255px) */}
            <Reveal className="h-full">
              <Link
                href={`/properties/${p3.slug}`}
                className="group relative flex h-[260px] sm:h-[255px] w-full flex-col justify-between overflow-hidden rounded-xl border border-charcoal/10 bg-charcoal shadow-sm transition-all duration-500 hover:border-gold/60 hover:shadow-[0_12px_30px_rgba(212,175,55,0.15)]"
              >
                <Image
                  src={p3.images[0]}
                  alt={p3.title}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/50 to-charcoal/40" />

                {/* Top Badges */}
                <div className="relative z-10 flex items-center justify-between p-4 sm:p-5">
                  <span className="rounded-md bg-charcoal/80 px-2.5 py-1 text-[9.5px] sm:text-[10px] font-semibold uppercase tracking-[0.18em] text-ivory backdrop-blur-md border border-ivory/15 whitespace-nowrap shrink-0">
                    {categoryNames[p3.category]}
                  </span>
                  <span className="rounded-md bg-gold-soft px-2.5 py-1 text-[9px] sm:text-[9.5px] font-semibold uppercase tracking-[0.18em] text-charcoal whitespace-nowrap shrink-0">
                    {p3.location}
                  </span>
                </div>

                {/* Bottom Details */}
                <div className="relative z-10 p-4 sm:p-5">
                  <p className="flex items-center gap-1.5 text-[10px] sm:text-[10.5px] font-medium uppercase tracking-[0.2em] text-gold-soft">
                    <MapPin className="size-3 text-gold shrink-0" />
                    {p3.location}, Trivandrum
                  </p>
                  <h3 className="mt-1 font-serif text-lg sm:text-xl font-light text-ivory transition-colors group-hover:text-gold-soft lg:text-[22px]">
                    {p3.title}
                  </h3>
                  <div className="mt-2.5 sm:mt-3 flex items-center justify-between text-[11.5px] sm:text-[12.5px] text-ivory/75 border-t border-ivory/15 pt-2 sm:pt-2.5">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span>{p3.area.value} {p3.area.unit}</span>
                      <span>·</span>
                      <span>Road Frontage</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10.5px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-soft group-hover:text-ivory transition-colors whitespace-nowrap shrink-0">
                      <span>View</span>
                      <ArrowRight className="size-3 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          </div>

          {/* ========================================================= */}
          {/* Lower Bento Tier: 3 Equal Tiles (300px each on lg) */}
          {/* ========================================================= */}

          {/* Tile 4: Land & Plot Spotlight */}
          <div className="lg:col-span-4">
            <Reveal className="h-full">
              <Link
                href={`/properties/${p4.slug}`}
                className="group relative flex h-[280px] sm:h-[300px] w-full flex-col justify-between overflow-hidden rounded-xl border border-charcoal/10 bg-charcoal shadow-sm transition-all duration-500 hover:border-gold/60 hover:shadow-[0_12px_30px_rgba(212,175,55,0.15)]"
              >
                <Image
                  src={p4.images[0]}
                  alt={p4.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/50 to-charcoal/35" />

                <div className="relative z-10 flex items-center justify-between p-4 sm:p-5">
                  <span className="rounded-md bg-charcoal/80 px-2.5 py-1 text-[9.5px] sm:text-[10px] font-semibold uppercase tracking-[0.18em] text-ivory backdrop-blur-md border border-ivory/15 whitespace-nowrap shrink-0">
                    {categoryNames[p4.category]}
                  </span>
                  <span className="rounded-md bg-gold-soft px-2.5 py-1 text-[9px] sm:text-[9.5px] font-semibold uppercase tracking-[0.18em] text-charcoal whitespace-nowrap shrink-0">
                    {p4.location}
                  </span>
                </div>

                <div className="relative z-10 p-4 sm:p-5">
                  <p className="flex items-center gap-1.5 text-[10px] sm:text-[10.5px] font-medium uppercase tracking-[0.2em] text-gold-soft">
                    <MapPin className="size-3 text-gold shrink-0" />
                    {p4.location}, Trivandrum
                  </p>
                  <h3 className="mt-1 font-serif text-lg font-light text-ivory transition-colors group-hover:text-gold-soft sm:text-xl">
                    {p4.title}
                  </h3>
                  <div className="mt-2.5 sm:mt-3 flex items-center justify-between text-[11.5px] sm:text-[12px] text-ivory/75 border-t border-ivory/15 pt-2 sm:pt-2.5">
                    <span>{p4.area.value} {p4.area.unit} · Lake View</span>
                    <span className="inline-flex items-center gap-1 text-[10.5px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-soft group-hover:text-ivory transition-colors whitespace-nowrap shrink-0">
                      <span>Explore</span>
                      <ArrowRight className="size-3 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          </div>

          {/* Tile 5: Garden Villa Spotlight */}
          <div className="lg:col-span-4">
            <Reveal className="h-full">
              <Link
                href={`/properties/${p5.slug}`}
                className="group relative flex h-[280px] sm:h-[300px] w-full flex-col justify-between overflow-hidden rounded-xl border border-charcoal/10 bg-charcoal shadow-sm transition-all duration-500 hover:border-gold/60 hover:shadow-[0_12px_30px_rgba(212,175,55,0.15)]"
              >
                <Image
                  src={p5.images[0]}
                  alt={p5.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/50 to-charcoal/35" />

                <div className="relative z-10 flex items-center justify-between p-4 sm:p-5">
                  <span className="rounded-md bg-charcoal/80 px-2.5 py-1 text-[9.5px] sm:text-[10px] font-semibold uppercase tracking-[0.18em] text-ivory backdrop-blur-md border border-ivory/15 whitespace-nowrap shrink-0">
                    {categoryNames[p5.category]}
                  </span>
                  <span className="rounded-md bg-gold-soft px-2.5 py-1 text-[9px] sm:text-[9.5px] font-semibold uppercase tracking-[0.18em] text-charcoal whitespace-nowrap shrink-0">
                    {p5.location}
                  </span>
                </div>

                <div className="relative z-10 p-4 sm:p-5">
                  <p className="flex items-center gap-1.5 text-[10px] sm:text-[10.5px] font-medium uppercase tracking-[0.2em] text-gold-soft">
                    <MapPin className="size-3 text-gold shrink-0" />
                    {p5.location}, Trivandrum
                  </p>
                  <h3 className="mt-1 font-serif text-lg font-light text-ivory transition-colors group-hover:text-gold-soft sm:text-xl">
                    {p5.title}
                  </h3>
                  <div className="mt-2.5 sm:mt-3 flex items-center justify-between text-[11.5px] sm:text-[12px] text-ivory/75 border-t border-ivory/15 pt-2 sm:pt-2.5">
                    <span>{p5.bedrooms} Beds · {p5.area.value} {p5.area.unit}</span>
                    <span className="inline-flex items-center gap-1 text-[10.5px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-soft group-hover:text-ivory transition-colors whitespace-nowrap shrink-0">
                      <span>Explore</span>
                      <ArrowRight className="size-3 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          </div>

          {/* Tile 6: The Full Portfolio VIP Card */}
          <div className="lg:col-span-4">
            <Reveal className="h-full">
              <Link
                href="/properties"
                className="glass-gold group relative flex h-auto min-h-[280px] sm:h-[300px] w-full flex-col justify-between overflow-hidden rounded-xl p-6 sm:p-7 text-ivory shadow-sm transition-all duration-500 hover:border-gold hover:shadow-[0_16px_40px_rgba(212,175,55,0.25)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              >
                {/* Ambient gold spotlight inside VIP tile */}
                <div className="pointer-events-none absolute -right-16 -top-16 size-44 rounded-full bg-gold/15 blur-2xl transition-all duration-500 group-hover:bg-gold/25" />

                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex size-9 sm:size-10 items-center justify-center rounded-lg border border-gold/40 bg-gold/15 text-gold shadow-[0_2px_10px_rgba(212,175,55,0.2)]">
                      <Sparkles className="size-4 sm:size-4.5" />
                    </div>
                    <span className="text-[9.5px] sm:text-[10px] font-semibold uppercase tracking-[0.22em] sm:tracking-[0.25em] text-gold whitespace-nowrap">
                      100+ Verified Listings
                    </span>
                  </div>

                  <h3 className="mt-4 sm:mt-5 font-serif text-xl sm:text-2xl font-light leading-snug text-ivory group-hover:text-gold-soft transition-colors">
                    Browse the Complete Portfolio
                  </h3>
                  <p className="mt-2 text-[12.5px] sm:text-[13px] leading-relaxed text-ivory/65">
                    Filter houses, apartments, plots, and commercial units across 9 prime Trivandrum corridors.
                  </p>
                </div>

                <div className="pt-4 border-t border-ivory/10 flex items-center justify-between mt-4">
                  <span className="text-[11.5px] sm:text-[12px] font-semibold uppercase tracking-[0.18em] text-gold-soft group-hover:text-ivory transition-colors whitespace-nowrap">
                    Explore All Properties
                  </span>
                  <div className="flex size-7 sm:size-8 items-center justify-center rounded-full bg-gold/20 text-gold transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-gold group-hover:text-charcoal shrink-0">
                    <ArrowRight className="size-3.5 sm:size-4" />
                  </div>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
