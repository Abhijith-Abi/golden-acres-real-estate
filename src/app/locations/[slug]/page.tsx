import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/motion-primitives";
import { SectionHeading } from "@/components/ui/section-heading";
import { WhatsAppIcon } from "@/components/ui/icons";
import { FaqSection } from "@/components/sections/FaqSection";
import { EnquiryCTA } from "@/components/sections/EnquiryCTA";
import { PropertyCard } from "@/components/property/PropertyCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { getLocation, locations } from "@/data/locations";
import { propertyTypePages } from "@/data/property-types";
import { properties } from "@/data/properties";
import { contact } from "@/config/contact";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { buildMetadata, coreKeywords } from "@/lib/seo";
import { breadcrumbSchema, cityEntity, faqSchema, webPageSchema } from "@/lib/schema";

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const loc = getLocation(slug);
  if (!loc) return {};
  return buildMetadata({
    title: loc.seoTitle,
    description: loc.seoDescription,
    path: `/locations/${loc.slug}`,
    keywords: [
      `property for sale in ${loc.name}`,
      `land for sale in ${loc.name}`,
      `flats in ${loc.name}`,
      `real estate ${loc.name} Trivandrum`,
      `${loc.name} Thiruvananthapuram property`,
      ...coreKeywords.slice(0, 6),
    ],
  });
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const loc = getLocation(slug);
  if (!loc) notFound();

  const path = `/locations/${loc.slug}`;
  const nearby = properties.filter((p) => p.location === loc.name);
  const otherAreas = locations.filter((l) => l.slug !== loc.slug);
  const types = propertyTypePages.filter((t) => loc.propertyTypes.includes(t.slug));

  const placeName =
    loc.slug === "trivandrum-city" ? "Thiruvananthapuram city centre" : `${loc.name}, Thiruvananthapuram`;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Locations", path: "/locations" },
            { name: loc.name, path },
          ]),
          webPageSchema({
            name: loc.seoTitle,
            description: loc.seoDescription,
            path,
            about: {
              "@type": "Place",
              name: placeName,
              containedInPlace: cityEntity,
            },
          }),
          faqSchema(loc.faqs),
        ]}
      />

      <PageHero
        breadcrumb={`Locations / ${loc.name}`}
        eyebrow="Trivandrum, Kerala"
        title={loc.heading}
        lede={loc.lede}
      />

      <section className="py-20 lg:py-28">
        <div className="container-site grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow={`About ${loc.name}`}
              title={
                <>
                  Buying in <em className="italic text-gold-deep">{loc.name}</em>
                </>
              }
            />
            <Reveal delay={0.08}>
              <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-muted-foreground">
                {loc.intro.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <h2 className="mt-12 font-serif text-2xl font-light text-charcoal sm:text-3xl">
                Why buyers look at {loc.name}
              </h2>
              <ul className="mt-5 space-y-3">
                {loc.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-[14.5px] text-charcoal/80">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-gold-deep" aria-hidden />
                    {h}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="border border-charcoal/10 bg-card p-7">
              <p className="eyebrow">Talk to a consultant</p>
              <h2 className="mt-3 font-serif text-2xl font-light leading-snug text-charcoal">
                Looking in {loc.name}?
              </h2>
              <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">
                Share your budget and property type. We reply with current
                options in {loc.name}, including ones that are not publicly
                advertised.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={buildWhatsAppUrl(
                    contact.whatsapp.number,
                    `I'm looking for property in ${loc.name}, Trivandrum. Please share current options.`,
                    { interest: `Property in ${loc.name}` }
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2.5 bg-[#25D366] px-6 text-[12px] font-medium uppercase tracking-[0.16em] text-white transition-transform hover:scale-[1.02]"
                >
                  <WhatsAppIcon className="size-4.5" />
                  WhatsApp us
                </a>
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center border border-charcoal/20 px-6 text-[12px] font-medium uppercase tracking-[0.16em] text-charcoal transition-colors hover:border-charcoal/60"
                >
                  Send an enquiry
                </Link>
              </div>
            </div>

            <div className="mt-6 border border-charcoal/10 bg-secondary/60 p-7">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-charcoal/60">
                Property types in {loc.name}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {types.map((t) => (
                  <li key={t.slug}>
                    <Link
                      href={`/trivandrum/${t.slug}`}
                      className="text-[14px] text-charcoal/80 transition-colors hover:text-gold-deep"
                    >
                      {t.seoTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {nearby.length > 0 && (
        <section className="bg-secondary/60 py-20 lg:py-28">
          <div className="container-site">
            <SectionHeading
              eyebrow="Featured here"
              title={
                <>
                  Properties in <em className="italic text-gold-deep">{loc.name}</em>
                </>
              }
            />
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {nearby.map((p) => (
                <PropertyCard key={p.slug} property={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <FaqSection
        faqs={loc.faqs}
        eyebrow={`${loc.name} FAQs`}
        title={
          <>
            Questions about <em className="italic text-gold-deep">{loc.name}</em>
          </>
        }
      />

      <section className="border-t border-charcoal/10 py-14" aria-labelledby="other-areas-heading">
        <div className="container-site">
          <h2 id="other-areas-heading" className="text-[11px] font-semibold uppercase tracking-[0.24em] text-charcoal/60">
            Other areas we serve in Trivandrum
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {otherAreas.map((l) => (
              <li key={l.slug}>
                <Link
                  href={`/locations/${l.slug}`}
                  className="inline-block border border-charcoal/10 bg-card px-4 py-2 text-[13px] text-charcoal/75 transition-colors hover:border-gold hover:text-gold-deep"
                >
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <EnquiryCTA />
    </>
  );
}
