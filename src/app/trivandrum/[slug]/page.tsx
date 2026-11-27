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
import { getPropertyTypePage, propertyTypePages } from "@/data/property-types";
import { locations } from "@/data/locations";
import { properties } from "@/data/properties";
import { contact } from "@/config/contact";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { buildMetadata, coreKeywords } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";

export function generateStaticParams() {
  return propertyTypePages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getPropertyTypePage(slug);
  if (!page) return {};
  return buildMetadata({
    title: page.seoTitle,
    description: page.seoDescription,
    path: `/trivandrum/${page.slug}`,
    keywords: [...page.keywords, ...coreKeywords.slice(0, 4)],
  });
}

export default async function PropertyTypePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getPropertyTypePage(slug);
  if (!page) notFound();

  const path = `/trivandrum/${page.slug}`;
  const matching = properties.filter((p) => !p.sample && p.category === page.category);
  const others = propertyTypePages.filter((t) => t.slug !== page.slug);
  const areas = locations.filter((l) => l.propertyTypes.includes(page.slug));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Properties", path: "/properties" },
            { name: page.seoTitle, path },
          ]),
          webPageSchema({
            name: page.seoTitle,
            description: page.seoDescription,
            path,
          }),
          faqSchema(page.faqs),
        ]}
      />

      <PageHero
        breadcrumb={page.navLabel}
        eyebrow="Trivandrum, Kerala"
        title={page.heading}
        lede={page.lede}
      />

      <section className="py-20 lg:py-28">
        <div className="container-site grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div>
            <Reveal>
              <div className="space-y-5 text-[15px] leading-relaxed text-muted-foreground">
                {page.intro.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <h2 className="mt-12 font-serif text-2xl font-light text-charcoal sm:text-3xl">
                {page.checklistTitle}
              </h2>
              <ul className="mt-5 space-y-3">
                {page.checklist.map((c) => (
                  <li key={c} className="flex items-start gap-2.5 text-[14.5px] text-charcoal/80">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-gold-deep" aria-hidden />
                    {c}
                  </li>
                ))}
              </ul>

              <h2 className="mt-12 font-serif text-2xl font-light text-charcoal sm:text-3xl">
                Where we help
              </h2>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {areas.map((l) => (
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
            </Reveal>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="border border-charcoal/10 bg-card p-7">
              <p className="eyebrow">Talk to a consultant</p>
              <h2 className="mt-3 font-serif text-2xl font-light leading-snug text-charcoal">
                {page.navLabel} in Trivandrum
              </h2>
              <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">
                Tell us your budget and preferred area. We reply with current
                options, including properties that are not publicly advertised.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={buildWhatsAppUrl(
                    contact.whatsapp.number,
                    `I'm looking for ${page.navLabel.toLowerCase()} in Trivandrum. Please share current options.`,
                    { interest: `${page.navLabel} in Trivandrum` }
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
          </aside>
        </div>
      </section>

      {matching.length > 0 && (
        <section className="bg-secondary/60 py-20 lg:py-28">
          <div className="container-site">
            <SectionHeading
              eyebrow="From our portfolio"
              title={
                <>
                  {page.navLabel} <em className="italic text-gold-deep">to explore</em>
                </>
              }
            />
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {matching.map((p) => (
                <PropertyCard key={p.slug} property={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <FaqSection
        faqs={page.faqs}
        eyebrow="Questions answered"
        title={
          <>
            {page.navLabel} in Trivandrum, <em className="italic text-gold-deep">explained</em>
          </>
        }
      />

      <section className="border-t border-charcoal/10 py-14" aria-labelledby="other-types-heading">
        <div className="container-site">
          <h2 id="other-types-heading" className="text-[11px] font-semibold uppercase tracking-[0.24em] text-charcoal/60">
            More property types in Trivandrum
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {others.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/trivandrum/${t.slug}`}
                  className="inline-block border border-charcoal/10 bg-card px-4 py-2 text-[13px] text-charcoal/75 transition-colors hover:border-gold hover:text-gold-deep"
                >
                  {t.seoTitle}
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
