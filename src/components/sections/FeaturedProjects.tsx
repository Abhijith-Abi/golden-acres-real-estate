import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { GhostButton } from "@/components/ui/buttons";
import { Reveal } from "@/components/ui/motion-primitives";
import { getFeaturedProjects } from "@/data/projects";

/**
 * Featured Projects — Architectural Luxury Bento Grid.
 * Replaces the disjointed photo blocks with an asymmetric, geometrically balanced Bento Grid:
 *   - Top Tier: 7-col Hero Showcase + 5-col Land Portfolio (both 460px height)
 *   - Lower Tier: 6-col Commercial Hub + 6-col Bespoke Advisory VIP Tile (both 320px height)
 */
export function FeaturedProjects() {
  const [lead, side, closing] = getFeaturedProjects();
  if (!lead || !side || !closing) return null;

  return (
    <section
      className="bg-secondary/60 py-24 lg:py-32 overflow-hidden border-t border-charcoal/[0.08]"
      aria-labelledby="projects-heading"
    >
      <div className="container-site">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-8 pb-12 border-b border-charcoal/[0.08]">
          <SectionHeading
            eyebrow="Our projects"
            title={
              <span id="projects-heading">
                Work we&apos;re{" "}
                <em className="font-light italic text-gold-deep bg-gradient-to-r from-[#B88E33] via-[#D4AF37] to-[#A6802C] bg-clip-text text-transparent">
                  proud to walk you through
                </em>
              </span>
            }
            lede="Residences, plots and commercial addresses we've matched across Trivandrum's most promising neighbourhoods."
            className="max-w-2xl"
          />
          <Reveal delay={0.15} className="hidden md:block">
            <GhostButton href="/projects" size="md">
              View all projects
            </GhostButton>
          </Reveal>
        </div>

        {/* Bento Grid Architecture */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-7">
          {/* ========================================================= */}
          {/* 1. Project Lead Hero Bento (Col 1-7, 460px) */}
          {/* ========================================================= */}
          {lead && (
            <div className="lg:col-span-7">
              <Reveal className="h-full">
                <Link
                  href={`/projects#${lead.slug}`}
                  className="group relative flex h-[440px] sm:h-[460px] w-full flex-col justify-between overflow-hidden rounded-xl border border-charcoal/10 bg-charcoal shadow-sm transition-all duration-500 hover:border-gold/60 hover:shadow-[0_16px_40px_rgba(212,175,55,0.18)]"
                >
                  {/* Full-bleed Photo */}
                  <Image
                    src={lead.image}
                    alt={`${lead.title} — ${lead.category} in ${lead.location}`}
                    fill
                    priority
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Dark Vignette Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-charcoal/60" />
                  <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 via-transparent to-transparent" />

                  {/* Top Badges */}
                  <div className="relative z-10 flex items-center justify-between gap-2 p-4 sm:p-7">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <span className="glass-badge rounded-md px-2.5 py-1 text-[9.5px] sm:px-3 sm:py-1 sm:text-[10px] font-semibold uppercase tracking-[0.18em] sm:tracking-[0.22em] text-ivory whitespace-nowrap shrink-0">
                        {lead.category}
                      </span>
                      <span className="rounded-md bg-gold/90 px-2 py-1 text-[9px] sm:px-2.5 sm:py-1 sm:text-[9.5px] font-semibold uppercase tracking-[0.16em] sm:tracking-[0.2em] text-charcoal whitespace-nowrap shrink-0 shadow-sm">
                        {lead.location.split(",")[0]}
                      </span>
                    </div>
                    <span className="hidden sm:inline-flex glass-badge rounded-full px-3 py-1 text-[9px] font-medium uppercase tracking-[0.2em] text-ivory/80 whitespace-nowrap shrink-0">
                      Featured Project
                    </span>
                  </div>

                  {/* Bottom Info Card */}
                  <div className="relative z-10 p-4 sm:p-7">
                    <div className="glass-dark rounded-xl p-4 sm:p-6 transition-all duration-300 group-hover:border-gold/50 group-hover:shadow-[0_16px_40px_rgba(212,175,55,0.2)]">
                      <p className="flex items-center gap-1.5 text-[10px] sm:text-[10.5px] font-medium uppercase tracking-[0.2em] text-gold-soft">
                        <MapPin className="size-3.5 text-gold shrink-0" />
                        {lead.location}
                      </p>
                      <h3 className="mt-1.5 sm:mt-2 font-serif text-xl sm:text-2xl lg:text-[1.75rem] font-light text-ivory transition-colors group-hover:text-gold-soft">
                        {lead.title}
                      </h3>
                      <p className="mt-2 text-[12.5px] sm:text-[13.5px] leading-relaxed text-ivory/70 line-clamp-2">
                        {lead.description[0]}
                      </p>

                      <div className="mt-3.5 sm:mt-4 flex flex-wrap items-center justify-between gap-2.5 border-t border-ivory/15 pt-3 sm:pt-3.5 text-[11.5px] sm:text-[12px]">
                        <span className="text-ivory/60 whitespace-nowrap">
                          Verified Title · Technopark Belt
                        </span>
                        <span className="inline-flex items-center gap-1.5 font-semibold uppercase tracking-[0.18em] text-gold-soft group-hover:text-ivory transition-colors whitespace-nowrap shrink-0">
                          <span>View Case Study</span>
                          <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            </div>
          )}

          {/* ========================================================= */}
          {/* 2. Side Project Bento (Col 8-12, 460px) */}
          {/* ========================================================= */}
          {side && (
            <div className="lg:col-span-5">
              <Reveal delay={0.1} className="h-full">
                <Link
                  href={`/projects#${side.slug}`}
                  className="group relative flex h-[440px] sm:h-[460px] w-full flex-col justify-between overflow-hidden rounded-xl border border-charcoal/10 bg-charcoal shadow-sm transition-all duration-500 hover:border-gold/60 hover:shadow-[0_16px_40px_rgba(212,175,55,0.18)]"
                >
                  <Image
                    src={side.image}
                    alt={`${side.title} — ${side.category} in ${side.location}`}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/45 to-charcoal/50" />

                  {/* Top Badges */}
                  <div className="relative z-10 flex items-center justify-between p-4 sm:p-7">
                    <span className="glass-badge rounded-md px-2.5 py-1 text-[9.5px] sm:px-3 sm:py-1 sm:text-[10px] font-semibold uppercase tracking-[0.18em] sm:tracking-[0.22em] text-ivory whitespace-nowrap shrink-0">
                      {side.category}
                    </span>
                    <span className="rounded-md bg-gold-soft px-2.5 py-1 text-[9px] sm:text-[9.5px] font-semibold uppercase tracking-[0.18em] text-charcoal whitespace-nowrap shrink-0">
                      {side.location.split(",")[0]}
                    </span>
                  </div>

                  {/* Bottom Info Card */}
                  <div className="relative z-10 p-4 sm:p-7">
                    <div className="glass-dark rounded-xl p-4 sm:p-5 transition-all duration-300 group-hover:border-gold/40">
                      <p className="flex items-center gap-1.5 text-[10px] sm:text-[10.5px] font-medium uppercase tracking-[0.2em] text-gold-soft">
                        <MapPin className="size-3.5 text-gold shrink-0" />
                        {side.location}
                      </p>
                      <h3 className="mt-1.5 font-serif text-xl sm:text-2xl font-light text-ivory transition-colors group-hover:text-gold-soft">
                        {side.title}
                      </h3>
                      <p className="mt-2 text-[12.5px] sm:text-[13px] leading-relaxed text-ivory/70 line-clamp-2">
                        {side.description[0]}
                      </p>

                      <div className="mt-3.5 sm:mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-ivory/15 pt-3 text-[11.5px] sm:text-[12px]">
                        <span className="text-ivory/60 whitespace-nowrap">
                          10-25 Cents · Clear Deeds
                        </span>
                        <span className="inline-flex items-center gap-1.5 font-semibold uppercase tracking-[0.18em] text-gold-soft group-hover:text-ivory transition-colors whitespace-nowrap shrink-0">
                          <span>View Portfolio</span>
                          <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            </div>
          )}

          {/* ========================================================= */}
          {/* 3. Commercial Project Bento (Col 1-6, 320px) */}
          {/* ========================================================= */}
          {closing && (
            <div className="lg:col-span-6">
              <Reveal delay={0.15} className="h-full">
                <Link
                  href={`/projects#${closing.slug}`}
                  className="group relative flex h-[300px] sm:h-[320px] w-full flex-col justify-between overflow-hidden rounded-xl border border-charcoal/10 bg-charcoal shadow-sm transition-all duration-500 hover:border-gold/60 hover:shadow-[0_12px_30px_rgba(212,175,55,0.15)]"
                >
                  <Image
                    src={closing.image}
                    alt={`${closing.title} — ${closing.category} in ${closing.location}`}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-charcoal/30" />

                  {/* Top Badges */}
                  <div className="relative z-10 flex items-center justify-between p-4 sm:p-6">
                    <span className="glass-badge rounded-md px-2.5 py-1 text-[9.5px] sm:px-3 sm:py-1 sm:text-[10px] font-semibold uppercase tracking-[0.18em] sm:tracking-[0.2em] text-ivory whitespace-nowrap shrink-0">
                      {closing.category}
                    </span>
                    <span className="rounded-md bg-gold-soft px-2.5 py-1 text-[9px] sm:text-[9.5px] font-semibold uppercase tracking-[0.18em] text-charcoal whitespace-nowrap shrink-0">
                      {closing.location}
                    </span>
                  </div>

                  {/* Bottom Info Card */}
                  <div className="relative z-10 p-4 sm:p-6">
                    <div className="glass-dark rounded-xl p-4 sm:p-5 transition-all duration-300 group-hover:border-gold/40">
                      <p className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-gold-soft">
                        <MapPin className="size-3 text-gold shrink-0" />
                        {closing.location}
                      </p>
                      <h3 className="mt-1 font-serif text-lg sm:text-xl font-light text-ivory transition-colors group-hover:text-gold-soft sm:text-2xl">
                        {closing.title}
                      </h3>
                      <div className="mt-2.5 sm:mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-ivory/15 pt-2 sm:pt-2.5 text-[11.5px] sm:text-[12px]">
                        <span className="text-ivory/65 whitespace-nowrap">
                          High Footfall Frontage
                        </span>
                        <span className="inline-flex items-center gap-1.5 font-semibold uppercase tracking-[0.18em] text-gold-soft group-hover:text-ivory transition-colors whitespace-nowrap shrink-0">
                          <span>View Details</span>
                          <ArrowRight className="size-3 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            </div>
          )}

          {/* ========================================================= */}
          {/* 4. Bespoke Client Project Consulting VIP Tile (Col 7-12, 320px) */}
          {/* ========================================================= */}
          <div className="lg:col-span-6">
            <Reveal delay={0.2} className="h-full">
              <div className="glass-gold group relative flex h-auto min-h-[300px] sm:h-[320px] w-full flex-col justify-between overflow-hidden rounded-xl p-6 sm:p-8 text-ivory shadow-sm transition-all duration-500 hover:border-gold hover:shadow-[0_16px_40px_rgba(212,175,55,0.25)]">
                {/* Ambient gold spotlight glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-gold/15 blur-2xl transition-all duration-500 group-hover:bg-gold/25" />

                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex size-9 sm:size-10 items-center justify-center rounded-lg border border-gold/40 bg-gold/15 text-gold shadow-[0_2px_10px_rgba(212,175,55,0.2)]">
                      <Sparkles className="size-4 sm:size-4.5" />
                    </div>
                    <span className="text-[9.5px] sm:text-[10px] font-semibold uppercase tracking-[0.22em] sm:tracking-[0.25em] text-gold whitespace-nowrap">
                      Bespoke Advisory
                    </span>
                  </div>

                  <h3 className="mt-4 sm:mt-5 font-serif text-xl sm:text-2xl lg:text-[1.75rem] font-light leading-snug text-ivory">
                    Looking for a Specific Plot, Home or Commercial Parcel?
                  </h3>
                  <p className="mt-2 sm:mt-2.5 max-w-lg text-[12.5px] sm:text-[13.5px] leading-relaxed text-ivory/70">
                    We discreetly source, vet mother deeds, and negotiate unlisted residential properties and commercial plots tailored to your exact criteria.
                  </p>
                </div>

                <div className="pt-4 border-t border-ivory/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mt-4">
                  <span className="text-[11px] sm:text-[11.5px] text-ivory/50">
                    Confidential · Title Due Diligence · 1-on-1
                  </span>
                  <Link
                    href="/contact"
                    className="inline-flex h-11 items-center justify-center gap-2 bg-gradient-to-r from-gold-soft via-gold to-gold-deep px-5 text-[11.5px] font-semibold uppercase tracking-[0.18em] text-charcoal shadow-[0_2px_12px_rgba(212,175,55,0.3)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_4px_18px_rgba(212,175,55,0.45)] active:scale-[0.98] w-full sm:w-auto"
                  >
                    <span>Start Private Search</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
