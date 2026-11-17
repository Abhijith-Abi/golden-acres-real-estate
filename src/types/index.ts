export type PropertyCategory =
  | "house-villa"
  | "apartment"
  | "land-plot"
  | "commercial";

export type PropertyStatus = "available" | "sold" | "rented" | "coming-soon";

export interface PropertySpec {
  label: string;
  value: string;
}

export interface Property {
  slug: string;
  title: string;
  /** Short one-liner used on cards */
  summary: string;
  description: string[];
  category: PropertyCategory;
  status: PropertyStatus;
  location: string;
  /** District — used for grouping/filtering */
  city: string;
  /**
   * Price in INR. Leave null when unverified — the UI shows
   * "Price on request" and excludes the listing from price filters.
   */
  price: number | null;
  area: {
    value: number;
    unit: "sq.ft" | "cents" | "acres";
  };
  bedrooms: number | null;
  bathrooms: number | null;
  /**
   * Temporary stock imagery. Replace with the client's own photography
   * (place files in /public/properties and update src/data/properties.ts).
   */
  images: string[];
  specifications: PropertySpec[];
  amenities: string[];
  /** Optional floor-plan image URL */
  floorPlan?: string;
  /** Only set after client verification; map embed is hidden otherwise. */
  mapEmbedUrl?: string;
  featured: boolean;
  /** Marks sample content pending client verification — shown as a subtle badge. */
  sample: boolean;
}

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: string; // lucide icon key, mapped in components
  image: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string[];
  location: string;
  image: string;
  category: string;
  featured: boolean;
  /** Sample flag — pending client verification. */
  sample: boolean;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  /** Only add entries verified by the client. */
  verified: boolean;
}

export interface InstagramPost {
  image: string;
  alt: string;
  /** Optional link to the specific reel/post; falls back to the profile. */
  href?: string;
}

export type EnquiryFormData = {
  name: string;
  phone: string;
  email: string;
  propertyType: string;
  location: string;
  budget: string;
  message: string;
  consent: boolean;
};

export type ApiResult = {
  ok: boolean;
  message: string;
  /** "webhook" when delivered server-side, "whatsapp" when handed off. */
  channel?: "webhook" | "whatsapp";
};
