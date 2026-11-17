import type { Property } from "@/types";
import { propertyImagery } from "./imagery";

/**
 * SAMPLE LISTINGS.
 *
 * The brand's Instagram lists many properties, but verified listing data
 * (exact addresses, prices, photos) has not been supplied yet. These entries
 * use real Trivandrum neighbourhoods the brand actively serves and carry
 * `sample: true` + `price: null` so the UI renders "Price on request" and a
 * subtle sample badge. Replace with verified listings — prices, photos,
 * addresses — then set `sample: false` and `price` per property.
 */
export const properties: Property[] = [
  {
    slug: "sample-residence-kazhakootam",
    title: "Independent Residence near Kazhakootam",
    summary:
      "A well-located family home minutes from Kazhakootam's IT corridor.",
    description: [
      "Positioned in one of Trivandrum's fastest-growing neighbourhoods, this independent residence offers everyday convenience within walking distance — schools, hospitals and the Kazhakootam–Enchakkal IT corridor.",
      "The home opens onto generous, cross-ventilated living spaces designed for Kerala's climate, with a private courtyard that brings in morning light.",
    ],
    category: "house-villa",
    status: "available",
    location: "Kazhakootam",
    city: "Trivandrum",
    price: null,
    area: { value: 1650, unit: "sq.ft" },
    bedrooms: 3,
    bathrooms: 3,
    images: [propertyImagery[0], propertyImagery[1], propertyImagery[3]],
    specifications: [
      { label: "Built-up area", value: "1,650 sq.ft" },
      { label: "Plot", value: "6 cents" },
      { label: "Floors", value: "G+1" },
      { label: "Parking", value: "Covered, 2 cars" },
      { label: "Water", value: "Well + Corporation" },
    ],
    amenities: ["Compound wall & gate", "Car porch", "Water storage", "Back-up generator line"],
    featured: true,
    sample: true,
  },
  {
    slug: "sample-apartment-anayara",
    title: "Premium Apartment at Anayara",
    summary: "Contemporary city apartment with easy airport-side access.",
    description: [
      "A compact, efficient apartment in Anayara — the well-connected belt between the city centre and the airport, ideal for working professionals and nuclear families.",
      "Wide balconies and an elevated floor line give long views over the neighbourhood, while the complex maintains shared amenity space and covered parking.",
    ],
    category: "apartment",
    status: "available",
    location: "Anayara",
    city: "Trivandrum",
    price: null,
    area: { value: 1180, unit: "sq.ft" },
    bedrooms: 3,
    bathrooms: 2,
    images: [propertyImagery[2], propertyImagery[4], propertyImagery[1]],
    specifications: [
      { label: "Built-up area", value: "1,180 sq.ft" },
      { label: "Configuration", value: "3 BHK" },
      { label: "Floor", value: "5th of 7" },
      { label: "Ownership", value: "Freehold" },
      { label: "Lift", value: "Yes" },
    ],
    amenities: ["Lift", "Covered parking", "Visitor parking", "24×7 security", "Rooftop space"],
    featured: true,
    sample: true,
  },
  {
    slug: "sample-plot-vellayani",
    title: "Residential Plot overlooking Vellayani",
    summary: "Level residential land with lake-side calm, ready to build.",
    description: [
      "A level, road-facing residential plot in the Vellayani belt — quiet, green, and still minutes from the city. Clear title and ready-to-build access make it a strong first-home or investment choice.",
      "The plot enjoys soft evening light and unobstructed setbacks, ideal for a courtyard-style home.",
    ],
    category: "land-plot",
    status: "available",
    location: "Vellayani",
    city: "Trivandrum",
    price: null,
    area: { value: 10, unit: "cents" },
    bedrooms: null,
    bathrooms: null,
    images: [propertyImagery[6], propertyImagery[5], propertyImagery[3]],
    specifications: [
      { label: "Extent", value: "10 cents" },
      { label: "Classification", value: "Residential (purayidam)" },
      { label: "Road", value: "Tarred, 4 m access" },
      { label: "Water", value: "Well available" },
      { label: "Clearance", value: "Single-holder title" },
    ],
    amenities: ["Pucca road frontage", "Electricity available", "Clear title"],
    featured: false,
    sample: true,
  },
  {
    slug: "sample-commercial-enchakkal",
    title: "Commercial Space at Enchakkal",
    summary: "High-visibility commercial unit along a busy arterial road.",
    description: [
      "A commercial unit on the Enchakkal stretch, benefiting from steady road frontage and the area's growing retail traffic — suited to showrooms, clinics or offices.",
      "The building has a dedicated service entry and generous signage allowance, with separate metering for multi-tenant use.",
    ],
    category: "commercial",
    status: "available",
    location: "Enchakkal",
    city: "Trivandrum",
    price: null,
    area: { value: 2200, unit: "sq.ft" },
    bedrooms: null,
    bathrooms: 2,
    images: [propertyImagery[4], propertyImagery[6], propertyImagery[7]],
    specifications: [
      { label: "Floor area", value: "2,200 sq.ft" },
      { label: "Frontage", value: "22 ft" },
      { label: "Power", value: "Three-phase" },
      { label: "Parking", value: "Front + rear" },
      { label: "Suitable for", value: "Retail, office, clinic" },
    ],
    amenities: ["Road frontage", "Separate meters", "Service entry", "Signage space"],
    featured: true,
    sample: true,
  },
  {
    slug: "sample-house-pothencode",
    title: "Villa-style Home at Pothencode",
    summary: "Quiet residential street home near Pothencode junction.",
    description: [
      "A villa-style home set back from the road on a quiet street near Pothencode, offering privacy without isolation — schools, temple and market all within a short drive.",
      "Finished with an eye for detail: teak joinery, vitrified flooring and an open kitchen that flows into the dining area.",
    ],
    category: "house-villa",
    status: "available",
    location: "Pothencode",
    city: "Trivandrum",
    price: null,
    area: { value: 1900, unit: "sq.ft" },
    bedrooms: 4,
    bathrooms: 4,
    images: [propertyImagery[3], propertyImagery[0], propertyImagery[2]],
    specifications: [
      { label: "Built-up area", value: "1,900 sq.ft" },
      { label: "Plot", value: "8 cents" },
      { label: "Floors", value: "G+1" },
      { label: "Parking", value: "Car porch" },
      { label: "Water", value: "Well + Corporation" },
    ],
    amenities: ["Car porch", "Landscaped front yard", "Work area", "Fittings included"],
    featured: false,
    sample: true,
  },
  {
    slug: "sample-land-malayinkeezhu",
    title: "Land Parcel at Malayinkeezhu",
    summary: "Fertile, mixed-use land parcel with road access.",
    description: [
      "A mixed-use land parcel in Malayinkeezhu with pucca road access — suitable for a farm homestead or future residential division, subject to approvals.",
      "The land holds mature coconut and fruit trees, with a seasonal stream along one boundary.",
    ],
    category: "land-plot",
    status: "available",
    location: "Malayinkeezhu",
    city: "Trivandrum",
    price: null,
    area: { value: 1.2, unit: "acres" },
    bedrooms: null,
    bathrooms: null,
    images: [propertyImagery[5], propertyImagery[7], propertyImagery[6]],
    specifications: [
      { label: "Extent", value: "1.2 acres (approx. 52 cents)" },
      { label: "Classification", value: "Mixed / garden land" },
      { label: "Road", value: "Concrete road frontage" },
      { label: "Plantation", value: "Coconut, mango, banana" },
    ],
    amenities: ["Road frontage", "Water source", "Fencing on two sides"],
    featured: false,
    sample: true,
  },
  {
    slug: "sample-flat-attukal",
    title: "Compact Flat near Attukal",
    summary: "Efficient 2 BHK flat in the Attukal area, ready to move.",
    description: [
      "A value-focused 2 BHK flat near the Attukal area — thoughtfully planned, with all daily essentials in walking distance and city transit close by.",
      "Neutral finishes, abundant cross-ventilation and low maintenance make it an easy first purchase or rental asset.",
    ],
    category: "apartment",
    status: "available",
    location: "Attukal",
    city: "Trivandrum",
    price: null,
    area: { value: 940, unit: "sq.ft" },
    bedrooms: 2,
    bathrooms: 2,
    images: [propertyImagery[1], propertyImagery[2], propertyImagery[4]],
    specifications: [
      { label: "Built-up area", value: "940 sq.ft" },
      { label: "Configuration", value: "2 BHK" },
      { label: "Floor", value: "2nd of 4" },
      { label: "Lift", value: "Yes" },
      { label: "Water", value: "Corporation + well" },
    ],
    amenities: ["Lift", "Covered parking", "Security", "Water storage"],
    featured: false,
    sample: true,
  },
  {
    slug: "sample-villa-vilappilsala",
    title: "Garden Villa at Vilappilsala",
    summary: "Green-fronted villa with a landscaped garden and work area.",
    description: [
      "A garden villa on the Vilappilsala side, wrapped in mature planting with a true front lawn — rare open space for families who want room to breathe.",
      "The plan separates a private bedroom wing from the living spaces, with a dedicated home-office nook.",
    ],
    category: "house-villa",
    status: "available",
    location: "Vilappilsala",
    city: "Trivandrum",
    price: null,
    area: { value: 2100, unit: "sq.ft" },
    bedrooms: 4,
    bathrooms: 3,
    images: [propertyImagery[7], propertyImagery[3], propertyImagery[0]],
    specifications: [
      { label: "Built-up area", value: "2,100 sq.ft" },
      { label: "Plot", value: "12 cents" },
      { label: "Floors", value: "G+1" },
      { label: "Parking", value: "Car porch, 2 cars" },
      { label: "Water", value: "Well + storage" },
    ],
    amenities: ["Landscaped garden", "Car porch", "Home-office nook", "Work area", "Compound wall"],
    featured: true,
    sample: true,
  },
];

export const propertyCategories: { value: string; label: string }[] = [
  { value: "all", label: "All Properties" },
  { value: "house-villa", label: "Houses & Villas" },
  { value: "apartment", label: "Apartments" },
  { value: "land-plot", label: "Land & Plots" },
  { value: "commercial", label: "Commercial" },
];

export function getProperty(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function getFeaturedProperties(): Property[] {
  return properties.filter((p) => p.featured);
}

export function getSimilarProperties(current: Property, count = 3): Property[] {
  const sameCategory = properties.filter(
    (p) => p.slug !== current.slug && p.category === current.category
  );
  const others = properties.filter(
    (p) => p.slug !== current.slug && p.category !== current.category
  );
  return [...sameCategory, ...others].slice(0, count);
}
