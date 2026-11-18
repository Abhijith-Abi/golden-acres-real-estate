import Image from "next/image";
import Link from "next/link";
import { MapPin, BedDouble, Bath, Ruler } from "lucide-react";
import type { Property } from "@/types";
import { formatPrice, cn } from "@/lib/utils";

const categoryLabels: Record<Property["category"], string> = {
  "house-villa": "House · Villa",
  apartment: "Apartment",
  "land-plot": "Land · Plot",
  commercial: "Commercial",
};

const statusLabels: Record<Property["status"], string> = {
  available: "Available",
  sold: "Sold",
  rented: "Rented",
  "coming-soon": "Coming soon",
};

/**
 * Property card — editorial frame, hover image settle, verified-only pricing.
 * When `price` is null the card shows "Price on request".
 */
export function PropertyCard({
  property,
  priority = false,
  list = false,
}: {
  property: Property;
  priority?: boolean;
  list?: boolean;
}) {
  const { slug, title, location, category, price, area, bedrooms, bathrooms, status, sample, images } = property;
  const priceLabel = price != null ? formatPrice(price) : "Price on request";

  return (
    <Link
      href={`/properties/${slug}`}
      className={cn(
        "group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold",
        list && "grid sm:grid-cols-[280px_1fr] lg:grid-cols-[360px_1fr]"
      )}
    >
      <div
        className={cn(
          "frame relative overflow-hidden",
          list ? "h-full min-h-56 w-full" : "aspect-[4/3]"
        )}
      >
        <Image
          src={images[0]}
          alt={`${title} — ${categoryLabels[category]} in ${location}, Trivandrum`}
          fill
          sizes={list ? "(min-width: 1024px) 360px, (min-width: 640px) 280px, 100vw" : "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"}
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
        />
        {/* Category + status rail */}
        <div className="absolute left-3 top-3 flex flex-wrap items-center gap-2">
          <span className="glass-badge rounded-md px-3 py-1.5 text-[9.5px] font-semibold uppercase tracking-[0.2em] text-ivory">
            {categoryLabels[category]}
          </span>
          {status !== "available" && (
            <span className="rounded-md bg-gold/90 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-charcoal backdrop-blur-sm shadow-sm">
              {statusLabels[status]}
            </span>
          )}
        </div>
        {sample && (
          <span className="absolute right-3 top-3 rounded-full bg-ivory/85 px-3 py-1 text-[9px] font-medium uppercase tracking-[0.18em] text-charcoal/80 backdrop-blur-md border border-charcoal/10 shadow-sm">
            Sample listing
          </span>
        )}
      </div>

      <div className={cn("glass-light border border-t-0 border-charcoal/10 p-6 transition-all duration-300 group-hover:border-gold/50 group-hover:shadow-[0_12px_32px_rgba(212,175,55,0.12)]", list && "border-l-0 border-t flex flex-col justify-center")}>
        <p className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
          <MapPin className="size-3.5 text-gold-deep" />
          {location}, Trivandrum
        </p>
        <h3 className="mt-3 font-serif text-xl font-light leading-snug text-charcoal transition-colors group-hover:text-gold-deep sm:text-2xl">
          {title}
        </h3>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[13px] text-muted-foreground">
          {bedrooms != null && (
            <span className="inline-flex items-center gap-1.5">
              <BedDouble className="size-4 text-charcoal/50" /> {bedrooms} Beds
            </span>
          )}
          {bathrooms != null && (
            <span className="inline-flex items-center gap-1.5">
              <Bath className="size-4 text-charcoal/50" /> {bathrooms} Baths
            </span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <Ruler className="size-4 text-charcoal/50" /> {area.value.toLocaleString("en-IN")} {area.unit}
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-charcoal/10 pt-4">
          <p className="text-[15px] font-medium text-charcoal">{priceLabel}</p>
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep transition-transform duration-300 group-hover:translate-x-1">
            View Details
            <span aria-hidden>→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
