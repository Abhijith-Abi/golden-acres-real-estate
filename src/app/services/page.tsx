import Image from "next/image";
import {
  Home,
  Handshake,
  Map,
  TrendingUp,
  Building2,
  Briefcase,
  CheckCircle2,
} from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, ImageReveal } from "@/components/ui/motion-primitives";
import { EnquiryCTA } from "@/components/sections/EnquiryCTA";
import { services } from "@/data/services";
import type { Service } from "@/types";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, coreKeywords } from "@/lib/seo";
import { ORG_ID, breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/seo";

const servicesDescription =
  "Property buying and selling help, land and plot advisory, investment consultation, and residential and commercial property services in Trivandrum from Golden Acres Real Estates.";

export const metadata = buildMetadata({
  title: "Real Estate Services in Trivandrum",
  description: servicesDescription,
  path: "/services",
  keywords: [
    "property buying assistance Trivandrum",
    "sell property in Trivandrum",
    "land advisory Kerala",
    "property investment consultation Trivandrum",
    ...coreKeywords.slice(0, 5),
  ],
});

const iconMap: Record<Service["icon"], React.ComponentType<{ className?: string }>> = {
  Home,
  Handshake,
  Map,
  TrendingUp,
  Building2,
  Briefcase,
};

const processSteps = [
  {
    title: "Listen & shortlist",
    copy: "We start with your brief — budget, routine, plans — and shortlist properties that genuinely fit, not just what's easy to show.",
  },
  {
    title: "Verify before you visit",
    copy: "Titles, boundaries, approvals and access are checked before we ask for your time. What we show you is what you can actually buy.",
  },
  {
    title: "Visit & negotiate",
    copy: "Guided site visits, honest comparable pricing and negotiation handled on your side of the table.",
  },
  {
    title: "Close & hand over",
    copy: "Documentation, registration and handover coordinated end-to-end — you sign knowing everything has been checked.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
          {
            ...webPageSchema({
              type: "CollectionPage",
              name: "Real estate services in Trivandrum",
              description: servicesDescription,
              path: "/services",
            }),
            mainEntity: {
              "@type": "ItemList",
              itemListElement: services.map((s, i) => ({
                "@type": "ListItem",
                position: i + 1,
                item: {
                  "@type": "Service",
                  "@id": absoluteUrl(`/services#${s.slug}`),
                  name: s.title,
                  description: s.description,
                  serviceType: s.shortTitle,
                  provider: { "@id": ORG_ID },
                  areaServed: { "@type": "City", name: "Thiruvananthapuram" },
                },
              })),
            },
          },
        ]}
      />
      <PageHero
        breadcrumb="Services"
        eyebrow="What we do"
        title={
          <>
            Every property service,{" "}
            <em className="italic text-gold-soft">done personally</em>
          </>
        }
        lede="Residential and commercial — buying, selling, land and investment guidance under one roof, always with one consultant who stays with your file."
      />

      {/* Service editorial rows */}
      <section className="py-20 lg:py-28">
        <div className="container-site flex flex-col gap-20 lg:gap-28">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Home;
            const reversed = i % 2 === 1;
            return (
              <div
                key={service.slug}
                id={service.slug}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <Reveal className={reversed ? "lg:order-2" : undefined}>
                  <ImageReveal className="aspect-[4/3] w-full" delay={0.05}>
                    <Image
                      src={service.image}
                      alt={`${service.title} — Golden Acres Real Estates, Trivandrum`}
                      fill
                      sizes="(min-width: 1024px) 46vw, 100vw"
                      className="object-cover"
                    />
                  </ImageReveal>
                </Reveal>
                <Reveal delay={0.1} className={reversed ? "lg:order-1" : undefined}>
                  <div className="flex items-center gap-4">
                    <span className="flex size-12 items-center justify-center border border-gold/40 text-gold-deep">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <span className="font-serif text-lg text-charcoal/35">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h2 className="mt-6 text-balance font-serif text-3xl font-light leading-[1.15] text-charcoal sm:text-4xl">
                    {service.title}
                  </h2>
                  <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                  <ul className="mt-6 space-y-2.5">
                    {(i === 0
                      ? ["Guided property visits", "Document & title verification", "Price negotiation support", "Registration-day coordination"]
                      : i === 1
                        ? ["Presentation & photography advice", "Buyer screening & viewings", "Honest valuation guidance", "Paperwork coordination"]
                        : i === 2
                          ? ["Residential & mixed-use plots", "Boundary & access checks", "Title & classification review", "Build-ready advice"]
                          : i === 3
                            ? ["Growth-corridor analysis", "Rental-yield perspective", "Portfolio & resale thinking", "Long-term area outlook"]
                            : i === 4
                              ? ["First homes & upgrades", "Villas, houses & apartments", "Neighbourhood matching", "Resale guidance"]
                              : ["Retail & office spaces", "Frontage & footfall analysis", "Lease or purchase advisory", "Multi-tenant guidance"]
                    ).map((point) => (
                      <li key={point} className="flex items-center gap-2.5 text-[14px] text-charcoal/80">
                        <CheckCircle2 className="size-4 shrink-0 text-gold-deep" aria-hidden />
                        {point}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            );
          })}
        </div>
      </section>

      {/* Process */}
      <section className="bg-charcoal py-20 text-ivory lg:py-28" aria-labelledby="process-heading">
        <div className="container-site">
          <SectionHeading
            dark
            eyebrow="How we work"
            title={
              <span id="process-heading">
                A calm, checked-out <em className="italic text-gold-soft">path to your keys</em>
              </span>
            }
            lede="The same four steps, whether you're buying your first flat or placing a larger investment."
          />
          <ol className="mt-14 grid gap-px overflow-hidden border border-ivory/[0.12] bg-ivory/[0.12] sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 0.07} className="bg-charcoal">
                <div className="h-full p-8 transition-colors duration-300 hover:bg-charcoal-soft">
                  <span className="font-serif text-4xl font-light text-gold-soft/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-serif text-xl font-light leading-snug">{step.title}</h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-ivory/60">{step.copy}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <EnquiryCTA />
    </>
  );
}
