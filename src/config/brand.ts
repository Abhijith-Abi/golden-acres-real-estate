/**
 * Brand identity — Golden Acres Real Estates
 * Source of truth: https://www.instagram.com/golden_acres_realestates/
 *
 * All business-facing copy lives here (or in src/data/*) so the client can
 * update the site without touching components.
 */

export const brand = {
  name: "Golden Acres",
  legalName: "Golden Acres Real Estates",
  shortDescription:
    "Real estate consultant in Trivandrum — residential and commercial property.",
  /** Editorial tagline shown in hero / footer */
  tagline: "Where your address becomes a legacy",
  description:
    "Golden Acres Real Estates is a real estate consultancy based in Trivandrum, Kerala, helping families and investors find, value and close residential and commercial property across the city's most promising neighbourhoods.",
  /** What the business actually does — per its own Instagram profile */
  focus: ["Residential property", "Commercial property", "Land & plots"],
  serviceAreas: [
    "Kazhakootam",
    "Attukal",
    "Vilappilsala",
    "Pothencode",
    "Anayara",
    "Vellayani",
    "Malayinkeezhu",
    "Enchakkal",
    "Trivandrum City",
  ],
  instagramHandle: "golden_acres_realestates",
} as const;

export type Brand = typeof brand;
