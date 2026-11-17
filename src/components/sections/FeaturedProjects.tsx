import Image from "next/image";
import { MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, ImageReveal } from "@/components/ui/motion-primitives";
import { GoldLink } from "@/components/ui/buttons";
import { getFeaturedProjects } from "@/data/projects";

/**
 * Featured projects — an editorial magazine grid: one wide lead card,
 * one tall side card, one full-width closing card.
 */
export function FeaturedProjects() {
  const [lead, side, closing] = getFeaturedProjects();

  return (
    <section
      className="bg-secondary/60 py-24 lg:py-32"
      aria-labelledby="projects-heading"
    >
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="Our projects"
            title={
              <span id="projects-heading">
                Work we&apos;re <em className="italic text-gold-deep">proud to walk you through</em>
              </span>
            }
            lede="Residences, plots and commercial addresses we've matched across Trivandrum's most promising neighbourhoods."
          />
          <Reveal delay={0.15}>
            <GoldLink href="/projects">All projects</GoldLink>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-12">
          {/* Lead — wide */}
          {lead && (
            <Reveal className="lg:col-span-7">
              <article>
                <ImageReveal className="aspect-[16/10] w-full">
                  <Image
                    src={lead.image}
                    alt={`${lead.title} — ${lead.category} project in ${lead.location}`}
                    fill
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                  />
                </ImageReveal>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-gold-deep">
                      {lead.category}
                    </p>
                    <h3 className="mt-2 font-serif text-3xl font-light text-charcoal">
                      {lead.title}
                    </h3>
                    <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="size-3.5" /> {lead.location}
                    </p>
                  </div>
                  <GoldLink href={`/projects#${lead.slug}`}>View project</GoldLink>
                </div>
              </article>
            </Reveal>
          )}

          {/* Side — tall */}
          {side && (
            <Reveal delay={0.12} className="lg:col-span-5">
              <article>
                <ImageReveal className="aspect-[4/5] w-full" delay={0.1}>
                  <Image
                    src={side.image}
                    alt={`${side.title} — ${side.category} project in ${side.location}`}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                  />
                </ImageReveal>
                <div className="mt-6">
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-gold-deep">
                    {side.category}
                  </p>
                  <h3 className="mt-2 font-serif text-3xl font-light text-charcoal">
                    {side.title}
                  </h3>
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="size-3.5" /> {side.location}
                  </p>
                  <div className="mt-4">
                    <GoldLink href={`/projects#${side.slug}`}>View project</GoldLink>
                  </div>
                </div>
              </article>
            </Reveal>
          )}

          {/* Closing — full width, text-left image-right */}
          {closing && (
            <Reveal delay={0.1} className="lg:col-span-12">
              <article className="grid gap-8 border border-charcoal/10 bg-card p-6 sm:p-10 lg:grid-cols-2 lg:items-center lg:gap-14">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-gold-deep">
                    {closing.category}
                  </p>
                  <h3 className="mt-3 font-serif text-3xl font-light text-charcoal sm:text-4xl">
                    {closing.title}
                  </h3>
                  <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
                    {closing.description[0]}
                  </p>
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="size-3.5" /> {closing.location}
                  </p>
                  <div className="mt-6">
                    <GoldLink href={`/projects#${closing.slug}`}>View project</GoldLink>
                  </div>
                </div>
                <ImageReveal className="aspect-[16/10] w-full" delay={0.15}>
                  <Image
                    src={closing.image}
                    alt={`${closing.title} — ${closing.category} in ${closing.location}`}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </ImageReveal>
              </article>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
