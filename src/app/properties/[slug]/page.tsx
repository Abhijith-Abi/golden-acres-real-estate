import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  BedDouble,
  Bath,
  Ruler,
  CheckCircle2,
  LayoutTemplate,
} from "lucide-react";
import { PropertyGallery } from "@/components/property/PropertyGallery";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { PropertyCard } from "@/components/property/PropertyCard";
import { SectionHeading } from "@/components/ui/section-heading";
import { WhatsAppIcon } from "@/components/ui/icons";
import { getProperty, getSimilarProperties, properties } from "@/data/properties";
import { contact } from "@/config/contact";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { formatPrice } from "@/lib/utils";
import { site } from "@/config/social";
import type { PropertyCategory } from "@/types";

const categoryLabels: Record<PropertyCategory, string> = {
  "house-villa": "House · Villa",
  apartment: "Apartment",
  "land-plot": "Land · Plot",
  commercial: "Commercial",
};

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) return {};
  const priceLabel =
    property.price != null ? formatPrice(property.price) : "Price on request";
  const title = `${property.title} — ${property.location}`;
  const description = `${priceLabel} · ${property.summary}`;
  return {
    title,
    description,
    alternates: { canonical: `/properties/${property.slug}` },
    openGraph: {
      title,
      description,
      type: "website",
      images: [{ url: property.images[0], alt: property.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) notFound();

  const similar = getSimilarProperties(property);
  const priceLabel =
    property.price != null ? formatPrice(property.price) : "Price on request";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Offer" as const,
    itemOffered: {
      "@type": "Residence" as const,
      name: property.title,
      address: {
        "@type": "PostalAddress" as const,
        addressLocality: property.location,
        addressRegion: "Kerala",
        addressCountry: "IN",
      },
      photo: property.images[0],
    },
    ...(property.price != null
      ? {
          price: property.price,
          priceCurrency: "INR",
        }
      : {}),
    availability: "https://schema.org/InStock",
    url: `${site.url}/properties/${property.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header band */}
      <section className="bg-charcoal pb-10 pt-32 text-ivory sm:pt-36 lg:pt-40">
        <div className="container-site">
          <nav aria-label="Breadcrumb" className="mb-6 text-[11px] uppercase tracking-[0.24em] text-ivory/45">
            <Link href="/" className="hover:text-gold-soft">Home</Link>
            <span aria-hidden className="mx-2.5 text-ivory/25">/</span>
            <Link href="/properties" className="hover:text-gold-soft">Properties</Link>
            <span aria-hidden className="mx-2.5 text-ivory/25">/</span>
            <span className="text-gold-soft">{property.location}</span>
          </nav>
          <p className="eyebrow text-gold-soft">{categoryLabels[property.category]}</p>
          <h1 className="mt-4 max-w-3xl text-balance font-serif text-4xl font-light leading-[1.1] sm:text-5xl">
            {property.title}
          </h1>
          <p className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ivory/65">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-4 text-gold-soft" />
              {property.location}, Trivandrum
            </span>
            {property.bedrooms != null && (
              <span className="inline-flex items-center gap-1.5">
                <BedDouble className="size-4 text-gold-soft" /> {property.bedrooms} Bedrooms
              </span>
            )}
            {property.bathrooms != null && (
              <span className="inline-flex items-center gap-1.5">
                <Bath className="size-4 text-gold-soft" /> {property.bathrooms} Bathrooms
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Ruler className="size-4 text-gold-soft" />
              {property.area.value.toLocaleString("en-IN")} {property.area.unit}
            </span>
          </p>
          {property.sample && (
            <p className="mt-4 inline-block border border-ivory/25 px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-ivory/60">
              Sample listing — full details on enquiry
            </p>
          )}
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container-site grid gap-12 lg:grid-cols-[1.55fr_1fr] lg:gap-14">
          {/* Left: gallery + description + specs */}
          <div>
            <PropertyGallery property={property} />

            {/* Price + quick facts bar */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border border-charcoal/10 bg-card px-6 py-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  Asking price
                </p>
                <p className="mt-1 font-serif text-2xl text-charcoal sm:text-3xl">
                  {priceLabel}
                </p>
                {property.price == null && (
                  <p className="mt-1 text-[12px] text-muted-foreground">
                    Shared after our consultant confirms current details with you.
                  </p>
                )}
              </div>
              <a
                href={buildWhatsAppUrl(contact.whatsapp.number, "I'd like details about this property.", {
                  property: { title: property.title, location: property.location, slug: property.slug },
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2.5 bg-[#25D366] px-6 text-[12px] font-medium uppercase tracking-[0.16em] text-white transition-transform hover:scale-[1.02]"
              >
                <WhatsAppIcon className="size-4.5" />
                WhatsApp Enquiry
              </a>
            </div>

            {/* Mobile quick-enquire — jumps straight to the enquiry form */}
            <div className="mt-4 lg:hidden">
              <a
                href="#enquiry"
                className="flex h-13 w-full items-center justify-center gap-3 bg-charcoal text-[12px] font-medium uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-charcoal-soft"
              >
                Enquire Now
                <span aria-hidden>↓</span>
              </a>
            </div>

            {/* Description */}
            <div className="mt-12">
              <h2 className="font-serif text-2xl font-light text-charcoal sm:text-3xl">
                About this property
              </h2>
              <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
                {property.description.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            {/* Specifications */}
            <div className="mt-12">
              <h2 className="font-serif text-2xl font-light text-charcoal sm:text-3xl">
                Specifications
              </h2>
              <dl className="mt-5 grid grid-cols-1 border border-charcoal/10 bg-card sm:grid-cols-2">
                {property.specifications.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-center justify-between gap-4 border-b border-charcoal/10 px-6 py-4 last:border-b-0 sm:odd:border-r sm:[&:nth-last-child(-n+2)]:border-b-0"
                  >
                    <dt className="text-[13px] text-muted-foreground">{spec.label}</dt>
                    <dd className="text-right text-[13px] font-medium text-charcoal">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Amenities */}
            {property.amenities.length > 0 && (
              <div className="mt-12">
                <h2 className="font-serif text-2xl font-light text-charcoal sm:text-3xl">
                  Amenities & features
                </h2>
                <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {property.amenities.map((a) => (
                    <li key={a} className="flex items-center gap-2.5 text-[14px] text-charcoal/80">
                      <CheckCircle2 className="size-4 shrink-0 text-gold-deep" aria-hidden />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Floor plan — only when supplied */}
            {property.floorPlan && (
              <div className="mt-12">
                <h2 className="flex items-center gap-2.5 font-serif text-2xl font-light text-charcoal sm:text-3xl">
                  <LayoutTemplate className="size-6 text-gold-deep" aria-hidden />
                  Floor plan
                </h2>
                <div className="mt-5 border border-charcoal/10 bg-card p-4">
                  <Image
                    src={property.floorPlan}
                    alt={`Floor plan — ${property.title}`}
                    width={1200}
                    height={850}
                    className="w-full object-contain"
                  />
                </div>
              </div>
            )}

            {/* Map — only when a verified embed exists */}
            {property.mapEmbedUrl && (
              <div className="mt-12">
                <h2 className="font-serif text-2xl font-light text-charcoal sm:text-3xl">
                  Location
                </h2>
                <div className="mt-5 aspect-[16/9] w-full overflow-hidden border border-charcoal/10">
                  <iframe
                    src={property.mapEmbedUrl}
                    title={`Map — ${property.title}`}
                    className="h-full w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <p className="mt-2 text-[12px] text-muted-foreground">
                  Exact location shared on enquiry, to protect the seller&apos;s privacy.
                </p>
              </div>
            )}
          </div>

          {/* Right: sticky enquiry panel */}
          <aside id="enquiry" className="scroll-mt-28 lg:sticky lg:top-28 lg:self-start">
            <div className="border border-charcoal/10 bg-card p-6 sm:p-8">
              <p className="eyebrow">Enquire</p>
              <h2 className="mt-3 font-serif text-2xl font-light leading-snug text-charcoal">
                Ask about this property
              </h2>
              <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
                Send your details and our consultant will call you back with
                price, availability and a viewing slot.
              </p>
              <div className="mt-6">
                <EnquiryForm
                  compact
                  context={{
                    kind: "enquiry",
                    property: {
                      title: property.title,
                      location: property.location,
                      slug: property.slug,
                    },
                  }}
                  defaultPropertyType={property.category}
                  defaultLocation={property.location}
                />
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Similar properties */}
      <section className="bg-secondary/60 py-20 lg:py-28">
        <div className="container-site">
          <SectionHeading
            eyebrow="Keep exploring"
            title={
              <>
                Similar properties <em className="italic text-gold-deep">you may like</em>
              </>
            }
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((p) => (
              <PropertyCard key={p.slug} property={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
