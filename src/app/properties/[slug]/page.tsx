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
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/seo";
import { ORG_ID, breadcrumbSchema, cityEntity, webPageSchema } from "@/lib/schema";
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
  const title = property.title.toLowerCase().includes(property.location.toLowerCase())
    ? property.title
    : `${property.title} in ${property.location}`;
  const description = `${property.summary} ${priceLabel} · ${property.area.value.toLocaleString("en-IN")} ${property.area.unit} in ${property.location}, Trivandrum.`;
  return buildMetadata({
    title,
    description,
    path: `/properties/${property.slug}`,
    image: property.images[0],
    imageAlt: property.title,
    // Sample/placeholder listings must not be indexed as real inventory.
    noindex: property.sample,
  });
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

  const path = `/properties/${property.slug}`;
  const listingSchema = property.sample
    ? null
    : {
        "@context": "https://schema.org",
        "@type": "RealEstateListing",
        "@id": absoluteUrl(`${path}#listing`),
        url: absoluteUrl(path),
        name: property.title,
        description: property.description.join(" "),
        image: property.images,
        inLanguage: "en-IN",
        publisher: { "@id": ORG_ID },
        about: {
          "@type": property.category === "land-plot" ? "Landform" : "Residence",
          name: property.title,
          floorSize: {
            "@type": "QuantitativeValue",
            value: property.area.value,
            unitText: property.area.unit,
          },
          ...(property.bedrooms != null ? { numberOfBedrooms: property.bedrooms } : {}),
          ...(property.bathrooms != null ? { numberOfBathroomsTotal: property.bathrooms } : {}),
          address: {
            "@type": "PostalAddress",
            addressLocality: property.location,
            addressRegion: "Kerala",
            addressCountry: "IN",
          },
          containedInPlace: cityEntity,
        },
        ...(property.price != null && property.status === "available"
          ? {
              offers: {
                "@type": "Offer",
                price: property.price,
                priceCurrency: "INR",
                availability: "https://schema.org/InStock",
                url: absoluteUrl(path),
                seller: { "@id": ORG_ID },
              },
            }
          : {}),
      };

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Properties", path: "/properties" },
            { name: property.title, path },
          ]),
          ...(listingSchema
            ? [listingSchema]
            : [
                webPageSchema({
                  name: property.title,
                  description: property.summary,
                  path,
                }),
              ]),
        ]}
      />

      {/* Header band with Property Hero Image Backdrop */}
      <section className="relative overflow-hidden bg-charcoal pb-12 pt-32 text-ivory sm:pt-36 lg:pt-40 border-b border-ivory/10">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/95 via-charcoal/80 to-charcoal/95" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/50 to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.08)_0%,_transparent_70%)]" />
        </div>
        <div className="container-site relative z-10">
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
          {/* Left: gallery + description + specs.
              min-w-0 is critical: without it the grid track sizes to the
              Swiper slides' min-content, which feeds back into Swiper's
              slide-width measurement and the layout grows unbounded. */}
          <div className="min-w-0">
            <PropertyGallery property={property} />

            {/* Price + quick facts bar */}
            <div className="glass-light mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-charcoal/10 p-6 shadow-sm">
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
              <dl className="glass-light mt-5 grid grid-cols-1 overflow-hidden rounded-xl border border-charcoal/10 sm:grid-cols-2">
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
          <aside id="enquiry" className="min-w-0 scroll-mt-28 lg:sticky lg:top-28 lg:self-start">
            <div className="glass-light rounded-xl border border-gold/30 p-6 sm:p-8 shadow-[0_12px_40px_rgba(212,175,55,0.08)]">
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
