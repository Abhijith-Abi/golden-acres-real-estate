import Image from "next/image";
import { MapPin } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal, ImageReveal } from "@/components/ui/motion-primitives";
import { SectionHeading } from "@/components/ui/section-heading";
import { EnquiryCTA } from "@/components/sections/EnquiryCTA";
import { projects } from "@/data/projects";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, coreKeywords } from "@/lib/seo";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { GoldLink } from "@/components/ui/buttons";
import { projectImagery } from "@/data/imagery";

const hasVerifiedProjects = projects.some((project) => !project.sample);
const projectsDescription = hasVerifiedProjects
  ? "Residences, plots and commercial spaces curated by Golden Acres Real Estates across Trivandrum's key neighbourhoods."
  : "Golden Acres Real Estates is preparing a verified project portfolio for Trivandrum.";

export const metadata = buildMetadata({
  title: "Projects Portfolio",
  description: projectsDescription,
  path: "/projects",
  keywords: ["real estate projects Trivandrum", ...coreKeywords.slice(0, 5)],
  noindex: !hasVerifiedProjects,
});

export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Our Projects", path: "/projects" },
          ]),
          webPageSchema({
            type: "CollectionPage",
            name: "Our Projects — Golden Acres Real Estates",
            description: projectsDescription,
            path: "/projects",
          }),
        ]}
      />
      <PageHero
        breadcrumb="Our Projects"
        eyebrow={hasVerifiedProjects ? "Selected work" : "Portfolio update"}
        title={
          hasVerifiedProjects ? (
            <>Addresses we&apos;ve matched, <em className="italic text-gold-soft">one handshake at a time</em></>
          ) : (
            <>Our verified work is <em className="italic text-gold-soft">being prepared</em></>
          )
        }
        lede={hasVerifiedProjects
          ? "Residences, plots and commercial spaces matched with the right families and businesses across Trivandrum."
          : "We are preparing the verified project portfolio. Contact us to discuss your property requirements across Trivandrum."}
        backgroundImage={projectImagery[0]}
      />

      <section className="py-20 lg:py-28">
        <div className="container-site flex flex-col gap-24 lg:gap-32">
          {projects.filter((project) => !project.sample).map((project, i) => {
            const reversed = i % 2 === 1;
            return (
              <article
                key={project.slug}
                id={project.slug}
                className="grid items-center gap-10 scroll-mt-28 lg:grid-cols-2 lg:gap-20"
              >
                <Reveal className={reversed ? "lg:order-2" : undefined}>
                  <ImageReveal className="aspect-[16/11] w-full" delay={0.05}>
                    <Image
                      src={project.image}
                      alt={`${project.title} — ${project.category} in ${project.location}`}
                      fill
                      sizes="(min-width: 1024px) 46vw, 100vw"
                      className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                    />
                  </ImageReveal>
                </Reveal>

                <div className={reversed ? "lg:order-1" : undefined}>
                  <Reveal>
                    <div className="flex items-center gap-4">
                      <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-gold-deep">
                        {project.category}
                      </span>
                      <span className="h-px flex-1 bg-charcoal/10" />
                      <span className="font-serif text-lg text-charcoal/30">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h2 className="mt-5 text-balance font-serif text-3xl font-light leading-[1.12] text-charcoal sm:text-4xl lg:text-5xl">
                      {project.title}
                    </h2>
                    <p className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="size-4 text-gold-deep" />
                      {project.location}
                    </p>
                    <div className="mt-6 max-w-lg space-y-4 text-[15px] leading-relaxed text-muted-foreground">
                      {project.description.map((para, j) => (
                        <p key={j}>{para}</p>
                      ))}
                    </div>
                    {project.sample && (
                      <p className="mt-6 inline-block border border-charcoal/15 px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-charcoal/50">
                        Sample project — full case study on enquiry
                      </p>
                    )}
                    <div className="mt-8">
                      <GoldLink href="/contact">Enquire about this project</GoldLink>
                    </div>
                  </Reveal>
                </div>
              </article>
            );
          })}
          {projects.every((project) => project.sample) && (
            <p className="mx-auto max-w-2xl border border-charcoal/10 bg-card px-8 py-12 text-center text-[14px] leading-relaxed text-muted-foreground">
              Our verified project portfolio is being updated. Contact us to discuss current property requirements across Trivandrum.
            </p>
          )}
        </div>

        {/* Closing note */}
        <div className="container-site mt-28 lg:mt-36">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Your project next"
              title={
                <>
                  Looking for something <em className="italic text-gold-deep">specific?</em>
                </>
              }
              lede="Tell us the brief — budget, area, timing — and we'll come back with considered options, including properties that never get publicly listed."
            />
          </Reveal>
        </div>
      </section>

      <EnquiryCTA />
    </>
  );
}
