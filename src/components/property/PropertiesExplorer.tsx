"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  LayoutGrid,
  List,
  SlidersHorizontal,
  SearchX,
  MapPin,
  BedDouble,
  Bath,
  Ruler,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { propertyCategories } from "@/data/properties";
import { formatPrice, cn } from "@/lib/utils";
import type { Property } from "@/types";

type SortKey = "featured" | "area-desc" | "area-asc" | "location-az" | "price-desc" | "price-asc";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured first" },
  { value: "area-desc", label: "Largest area first" },
  { value: "area-asc", label: "Smallest area first" },
  { value: "location-az", label: "Location A–Z" },
];

/**
 * Property discovery: search + category + location + status + sort,
 * with grid/list layouts and a price slider when priced listings exist.
 */
export function PropertiesExplorer({
  properties,
  initialCategory = "all",
}: {
  properties: Property[];
  initialCategory?: string;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [location, setLocation] = useState("all");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState<SortKey>("featured");
  const [view, setView] = useState<"grid" | "list">("grid");

  // Price slider only applies when at least one listing has a verified price.
  const priced = useMemo(
    () => properties.filter((p) => p.price != null) as (Property & { price: number })[],
    [properties]
  );
  const [priceMax, setPriceMax] = useState<number | null>(null);
  const priceActive = priced.length > 0 && priceMax != null;

  const locations = useMemo(
    () => Array.from(new Set(properties.map((p) => p.location))).sort(),
    [properties]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = properties.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (location !== "all" && p.location !== location) return false;
      if (status !== "all" && p.status !== status) return false;
      if (priceActive && (p.price == null || p.price > priceMax)) return false;
      if (q) {
        const haystack = `${p.title} ${p.location} ${p.summary} ${p.category}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });

    switch (sort) {
      case "area-desc":
        list = [...list].sort((a, b) => b.area.value - a.area.value);
        break;
      case "area-asc":
        list = [...list].sort((a, b) => a.area.value - b.area.value);
        break;
      case "location-az":
        list = [...list].sort((a, b) => a.location.localeCompare(b.location));
        break;
      case "price-desc":
        list = [...list].sort(
          (a, b) => (b.price ?? -1) - (a.price ?? -1)
        );
        break;
      case "price-asc":
        list = [...list].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
        break;
      default:
        list = [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return list;
  }, [properties, query, category, location, status, sort, priceActive, priceMax]);

  const hasFilters =
    query || category !== "all" || location !== "all" || status !== "all" || priceActive;

  const clearFilters = () => {
    setQuery("");
    setCategory("all");
    setLocation("all");
    setStatus("all");
    setPriceMax(null);
    setSort("featured");
  };

  return (
    <div>
      {/* Filter bar */}
      <div className="glass-light rounded-xl border border-charcoal/10 p-5 sm:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, area or keyword…"
              aria-label="Search properties"
              className="pl-10"
            />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full sm:w-[180px] sm:flex-none" aria-label="Filter by category">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {propertyCategories.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="w-full sm:w-[180px] sm:flex-none" aria-label="Filter by location">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All locations</SelectItem>
                {locations.map((l) => (
                  <SelectItem key={l} value={l}>
                    {l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full sm:w-[180px] sm:flex-none" aria-label="Filter by availability">
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="coming-soon">Coming soon</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
              <SelectTrigger className="w-full sm:w-[190px] sm:flex-none" aria-label="Sort properties">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
                {priced.length > 0 && (
                  <>
                    <SelectItem value="price-desc">Price: high to low</SelectItem>
                    <SelectItem value="price-asc">Price: low to high</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Second row: view toggle + result count + clear */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-charcoal/10 pt-4">
          <p className="text-[13px] text-muted-foreground" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? "property" : "properties"}
          </p>
          <div className="flex items-center gap-4">
            {hasFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-9 text-[12px] uppercase tracking-[0.14em] text-gold-deep hover:text-charcoal"
              >
                <SlidersHorizontal className="size-3.5" /> Clear filters
              </Button>
            )}
            <div
              className="flex border border-charcoal/15"
              role="group"
              aria-label="Layout"
            >
              <button
                type="button"
                onClick={() => setView("grid")}
                aria-pressed={view === "grid"}
                aria-label="Grid layout"
                className={cn(
                  "flex size-9 items-center justify-center transition-colors",
                  view === "grid" ? "bg-charcoal text-ivory" : "text-charcoal/60 hover:bg-secondary"
                )}
              >
                <LayoutGrid className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => setView("list")}
                aria-pressed={view === "list"}
                aria-label="List layout"
                className={cn(
                  "flex size-9 items-center justify-center transition-colors",
                  view === "list" ? "bg-charcoal text-ivory" : "text-charcoal/60 hover:bg-secondary"
                )}
              >
                <List className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="mt-12 flex flex-col items-center border border-dashed border-charcoal/15 bg-secondary/50 px-6 py-20 text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-charcoal/5">
            <SearchX className="size-6 text-charcoal/40" aria-hidden />
          </span>
          <h3 className="mt-5 font-serif text-2xl font-light text-charcoal">
            No properties match that search
          </h3>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Try a different keyword, widen the location, or clear the filters —
            and tell us what you need, we may know of something off-market.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button
              onClick={clearFilters}
              className="bg-charcoal text-ivory hover:bg-charcoal-soft"
            >
              Clear filters
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-charcoal/20 text-charcoal hover:bg-charcoal/[0.04]"
            >
              <Link href="/contact">Tell us what you need</Link>
            </Button>
          </div>
        </div>
      ) : view === "grid" ? (
        <div className="mt-10 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((p) => (
            <PropertyResultCard key={p.slug} property={p} />
          ))}
        </div>
      ) : (
        <div className="mt-10 flex flex-col gap-6">
          {filtered.map((p) => (
            <PropertyResultCard key={p.slug} property={p} list />
          ))}
        </div>
      )}
    </div>
  );
}

/** Local card wrapper so layout prop stays simple. */
function PropertyResultCard({
  property,
  list = false,
}: {
  property: Property;
  list?: boolean;
}) {
  const priceLabel = property.price != null ? formatPrice(property.price) : "Price on request";

  if (list) {
    return (
      <Link
        href={`/properties/${property.slug}`}
        className="group grid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:grid-cols-[320px_1fr]"
      >
        <div className="frame relative aspect-[4/3] overflow-hidden sm:aspect-auto sm:min-h-52">
          <Image
            src={property.images[0]}
            alt={`${property.title} — ${property.location}, Trivandrum`}
            fill
            sizes="(min-width: 640px) 320px, 100vw"
            loading="lazy"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </div>
        <div className="flex flex-col justify-center border border-l-0 border-t-0 border-charcoal/10 bg-card p-6 lg:p-8">
          <p className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            <MapPin className="size-3.5 text-gold-deep" />
            {property.location}, Trivandrum · {property.sample ? "Sample listing" : "Listing"}
          </p>
          <h3 className="mt-2.5 font-serif text-2xl font-light text-charcoal transition-colors group-hover:text-gold-deep">
            {property.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {property.summary}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[13px] text-muted-foreground">
            {property.bedrooms != null && (
              <span className="inline-flex items-center gap-1.5">
                <BedDouble className="size-4" /> {property.bedrooms} Beds
              </span>
            )}
            {property.bathrooms != null && (
              <span className="inline-flex items-center gap-1.5">
                <Bath className="size-4" /> {property.bathrooms} Baths
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Ruler className="size-4" /> {property.area.value.toLocaleString("en-IN")} {property.area.unit}
            </span>
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-charcoal/10 pt-4">
            <p className="font-medium text-charcoal">{priceLabel}</p>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep transition-transform group-hover:translate-x-1">
              View Details →
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return <GridCard property={property} />;
}

function GridCard({ property }: { property: Property }) {
  const priceLabel = property.price != null ? formatPrice(property.price) : "Price on request";
  const categoryLabel =
    propertyCategories.find((c) => c.value === property.category)?.label ?? property.category;

  return (
    <Link
      href={`/properties/${property.slug}`}
      className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
    >
      <div className="frame relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.images[0]}
          alt={`${property.title} — ${categoryLabel} in ${property.location}, Trivandrum`}
          fill
          sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 100vw"
          loading="lazy"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.045]"
        />
        <span className="absolute left-0 top-0 bg-charcoal/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-ivory backdrop-blur-sm">
          {categoryLabel}
        </span>
        {property.sample && (
          <span className="absolute right-3 top-3 rounded-full bg-ivory/90 px-3 py-1 text-[9px] font-medium uppercase tracking-[0.18em] text-charcoal/70 backdrop-blur-sm">
            Sample listing
          </span>
        )}
      </div>
      <div className="border border-t-0 border-charcoal/10 bg-card p-6">
        <p className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
          <MapPin className="size-3.5 text-gold-deep" />
          {property.location}, Trivandrum
        </p>
        <h3 className="mt-3 font-serif text-xl font-light leading-snug text-charcoal transition-colors group-hover:text-gold-deep sm:text-2xl">
          {property.title}
        </h3>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[13px] text-muted-foreground">
          {property.bedrooms != null && (
            <span className="inline-flex items-center gap-1.5">
              <BedDouble className="size-4" /> {property.bedrooms} Beds
            </span>
          )}
          {property.bathrooms != null && (
            <span className="inline-flex items-center gap-1.5">
              <Bath className="size-4" /> {property.bathrooms} Baths
            </span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <Ruler className="size-4" /> {property.area.value.toLocaleString("en-IN")} {property.area.unit}
          </span>
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-charcoal/10 pt-4">
          <p className="text-[15px] font-medium text-charcoal">{priceLabel}</p>
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep transition-transform group-hover:translate-x-1">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}
