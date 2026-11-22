import type { Faq } from "./faqs";

/**
 * One entry per service area in `brand.serviceAreas`.
 *
 * Copy sticks to widely known, stable landmarks and avoids prices, rates of
 * return or counts. Review with the client before launch and add any
 * first-hand local knowledge (typical plot sizes, nearby schools, etc.).
 */
export interface Location {
  slug: string;
  name: string;
  /** Page <title> (without the site suffix). */
  seoTitle: string;
  /** Meta description, ~150 chars. */
  seoDescription: string;
  /** H1 plain text. */
  heading: string;
  /** Short hero lede. */
  lede: string;
  intro: string[];
  highlights: string[];
  /** Property types most relevant here, mapped to /trivandrum/* pages. */
  propertyTypes: ("land-for-sale" | "flats-for-sale" | "houses-villas-for-sale" | "commercial-property")[];
  faqs: Faq[];
}

export const locations: Location[] = [
  {
    slug: "kazhakootam",
    name: "Kazhakootam",
    seoTitle: "Property in Kazhakootam, Trivandrum",
    seoDescription:
      "Land, flats, villas and commercial property in Kazhakootam, Trivandrum — the Technopark corridor. Local guidance from Golden Acres Real Estates.",
    heading: "Property for sale in Kazhakootam, Trivandrum",
    lede: "Land, flats and houses in the Technopark corridor — Trivandrum's most active growth belt.",
    intro: [
      "Kazhakootam sits on the northern edge of Thiruvananthapuram along the NH 66 bypass and is best known as the neighbourhood around Technopark, Kerala's flagship IT park. Demand from IT professionals, together with institutions such as Sainik School Kazhakootam and the University of Kerala campus at Kariavattom, has made it one of the busiest residential and rental markets in the city.",
      "Golden Acres Real Estates tracks Kazhakootam plot by plot. We help you compare apartments, independent houses and residential land, check title and access, and judge how a particular road or lane compares with the wider corridor before you commit.",
    ],
    highlights: [
      "Close to Technopark and the Kazhakootam–Karyavattom institutional belt",
      "Direct access to the NH 66 bypass for the airport, Kovalam and the city",
      "Steady rental demand from working professionals and students",
      "Mix of apartments, independent houses and residential plots",
    ],
    propertyTypes: ["flats-for-sale", "land-for-sale", "houses-villas-for-sale", "commercial-property"],
    faqs: [
      {
        question: "Why is Kazhakootam popular with property buyers in Trivandrum?",
        answer:
          "Kazhakootam is the neighbourhood around Technopark, so it attracts IT professionals who want to live close to work. It also has direct access to the NH 66 bypass and a cluster of institutions, which supports both owner-occupier demand and rentals.",
      },
      {
        question: "What types of property are available in Kazhakootam?",
        answer:
          "Apartments and flats, independent houses and villas, residential plots and some commercial space. Golden Acres Real Estates can shortlist options by budget and distance from Technopark.",
      },
    ],
  },
  {
    slug: "attukal",
    name: "Attukal",
    seoTitle: "Property in Attukal, Trivandrum",
    seoDescription:
      "Flats, houses and land near Attukal, Trivandrum — close to the city centre and East Fort. Honest local advice from Golden Acres Real Estates.",
    heading: "Property for sale in Attukal, Trivandrum",
    lede: "Established city-side living near the Attukal Bhagavathy Temple, a short drive from the city centre.",
    intro: [
      "Attukal is a long-established residential neighbourhood in south Thiruvananthapuram, known for the Attukal Bhagavathy Temple. It sits a short drive from East Fort and the city centre, which makes it practical for families who want urban convenience, existing schools and hospitals, and established streets.",
      "Golden Acres Real Estates helps buyers compare compact flats and city homes around Attukal, check building approvals and documentation, and judge walkability and access for daily life.",
    ],
    highlights: [
      "Short drive from East Fort and the city centre",
      "Established neighbourhood with schools, markets and hospitals nearby",
      "Compact flats and city homes suited to first-time buyers and families",
    ],
    propertyTypes: ["flats-for-sale", "houses-villas-for-sale", "land-for-sale"],
    faqs: [
      {
        question: "Is Attukal close to the Trivandrum city centre?",
        answer:
          "Yes. Attukal is in south Thiruvananthapuram, a short drive from East Fort and the main city centre, which is one reason it suits families who want established, well-connected surroundings.",
      },
    ],
  },
  {
    slug: "vilappilsala",
    name: "Vilappilsala",
    seoTitle: "Property in Vilappilsala, Trivandrum",
    seoDescription:
      "Residential land, garden homes and villas in Vilappilsala, east Trivandrum. Title-checked options and local advice from Golden Acres Real Estates.",
    heading: "Property for sale in Vilappilsala, Trivandrum",
    lede: "Greener, more spacious plots and homes on the eastern side of Trivandrum.",
    intro: [
      "Vilappilsala lies on the eastern side of Thiruvananthapuram district and offers more open, greener plots than the city core. It appeals to buyers who want larger land parcels or a home with a garden while staying within reach of the city.",
      "Golden Acres Real Estates helps you assess road access, title and land classification here, and compare Vilappilsala with other outer-city options such as Malayinkeezhu and Vellayani.",
    ],
    highlights: [
      "More open land and larger plots than the city core",
      "Suited to garden homes, villas and family plots",
      "Road access, title and land classification checked before you commit",
    ],
    propertyTypes: ["land-for-sale", "houses-villas-for-sale"],
    faqs: [
      {
        question: "What kind of property is available in Vilappilsala?",
        answer:
          "Mostly residential plots and independent homes or villas on larger parcels. Golden Acres Real Estates can send current options by budget and plot size on request.",
      },
    ],
  },
  {
    slug: "pothencode",
    name: "Pothencode",
    seoTitle: "Property in Pothencode, Trivandrum",
    seoDescription:
      "Houses, villas and plots in Pothencode, north Trivandrum — quiet streets within reach of Kazhakootam. Guidance from Golden Acres Real Estates.",
    heading: "Property for sale in Pothencode, Trivandrum",
    lede: "Quiet residential streets on the north side of Trivandrum, within reach of Kazhakootam.",
    intro: [
      "Pothencode is a residential area on the northern side of Thiruvananthapuram, within reach of Kazhakootam, Sreekariyam and the NH 66 corridor. It is chosen by families who want a calmer street and a larger plot than the city centre offers, without giving up access to schools, markets and work.",
      "Golden Acres Real Estates helps buyers compare homes and plots in Pothencode, verify documents and measure travel time to Technopark and the city before deciding.",
    ],
    highlights: [
      "North Trivandrum location within reach of Kazhakootam and Technopark",
      "Quieter residential streets with room for independent homes",
      "Houses, villas and residential plots",
    ],
    propertyTypes: ["houses-villas-for-sale", "land-for-sale"],
    faqs: [
      {
        question: "How far is Pothencode from Technopark and Kazhakootam?",
        answer:
          "Pothencode is on the north side of Thiruvananthapuram and is within reach of Kazhakootam and Technopark. Exact travel time depends on the specific road and traffic, so Golden Acres Real Estates checks the route for each property before a viewing.",
      },
    ],
  },
  {
    slug: "anayara",
    name: "Anayara",
    seoTitle: "Property in Anayara, Trivandrum",
    seoDescription:
      "Apartments, houses and plots in Anayara, Trivandrum — between the city centre and the airport. Verified guidance from Golden Acres Real Estates.",
    heading: "Property for sale in Anayara, Trivandrum",
    lede: "Well-connected apartments and homes between the city centre and the airport side of Trivandrum.",
    intro: [
      "Anayara lies in Thiruvananthapuram between the city centre and the airport side of the city. Its position makes it practical for working professionals and families who want quick access to both, and it has a growing supply of apartments alongside independent homes.",
      "Golden Acres Real Estates helps you compare flats and houses in Anayara, check building approvals and builder track record, and match each option to your commute.",
    ],
    highlights: [
      "Between the city centre and the airport side of Trivandrum",
      "Apartments for working professionals and small families",
      "Independent homes and plots nearby",
    ],
    propertyTypes: ["flats-for-sale", "houses-villas-for-sale", "land-for-sale"],
    faqs: [
      {
        question: "Is Anayara a good area for flats in Trivandrum?",
        answer:
          "Anayara suits buyers who want to be between the city centre and the airport side. Whether a particular flat is a good purchase depends on the builder, approvals and price, which Golden Acres Real Estates checks with you before you decide.",
      },
    ],
  },
  {
    slug: "vellayani",
    name: "Vellayani",
    seoTitle: "Plots & Land in Vellayani, Trivandrum",
    seoDescription:
      "Residential plots and homes near Vellayani Lake, Trivandrum. Quiet, green surroundings with title checks by Golden Acres Real Estates.",
    heading: "Property for sale in Vellayani, Trivandrum",
    lede: "Quiet, green plots and homes near Vellayani Lake, south of the city.",
    intro: [
      "Vellayani, south of Thiruvananthapuram, is known for Vellayani Lake, the largest freshwater lake in Thiruvananthapuram district, and for the College of Agriculture of Kerala Agricultural University. The area appeals to buyers looking for green surroundings and larger residential plots within reach of the city.",
      "Because land classification and low-lying areas matter near water bodies, Golden Acres Real Estates checks title, classification and access carefully before recommending any plot or home in Vellayani.",
    ],
    highlights: [
      "Green, low-density surroundings near Vellayani Lake",
      "Residential plots and independent homes",
      "Extra checks on land classification and drainage near water bodies",
    ],
    propertyTypes: ["land-for-sale", "houses-villas-for-sale"],
    faqs: [
      {
        question: "What should I check when buying land near Vellayani Lake?",
        answer:
          "Check the land classification (residential, paddy or wetland data bank entries), the title and encumbrance certificate, access road width and drainage or flooding history. Golden Acres Real Estates helps coordinate these checks before you pay an advance.",
      },
    ],
  },
  {
    slug: "malayinkeezhu",
    name: "Malayinkeezhu",
    seoTitle: "Property in Malayinkeezhu, Trivandrum",
    seoDescription:
      "Land parcels, plots and homes in Malayinkeezhu, Trivandrum, on the Kattakada road side. Honest advice from Golden Acres Real Estates.",
    heading: "Property for sale in Malayinkeezhu, Trivandrum",
    lede: "Larger land parcels and family homes on the Kattakada side of Trivandrum.",
    intro: [
      "Malayinkeezhu is on the south-eastern side of Thiruvananthapuram on the Kattakada road side, with a more spacious, semi-urban character. It suits buyers looking for larger parcels, garden land or a family home with room to expand.",
      "Golden Acres Real Estates helps you compare land parcels here, confirm land classification and road access, and understand what you can and cannot build on each parcel.",
    ],
    highlights: [
      "Semi-urban setting with larger parcels and garden land",
      "Suited to family homes, homesteads and plots for investment",
      "Land classification and building eligibility checked before purchase",
    ],
    propertyTypes: ["land-for-sale", "houses-villas-for-sale"],
    faqs: [
      {
        question: "Can I build a house on any land parcel in Malayinkeezhu?",
        answer:
          "Not always. It depends on the land's classification, local body rules and access. Golden Acres Real Estates checks classification and building eligibility before you commit to a parcel.",
      },
    ],
  },
  {
    slug: "enchakkal",
    name: "Enchakkal",
    seoTitle: "Property in Enchakkal, Trivandrum",
    seoDescription:
      "Commercial space, flats, houses and plots in Enchakkal, Trivandrum, on the bypass corridor towards Kovalam. Advice from Golden Acres Real Estates.",
    heading: "Property for sale in Enchakkal, Trivandrum",
    lede: "Road-frontage commercial space and homes on the bypass corridor towards Kovalam.",
    intro: [
      "Enchakkal is in south Thiruvananthapuram on the bypass corridor leading towards Kovalam. Road frontage and passing traffic make it of interest for commercial uses such as showrooms, clinics and offices, while the surrounding streets offer homes and plots.",
      "Golden Acres Real Estates helps you assess commercial frontage and parking, compare residential options, and verify title and approvals before you commit.",
    ],
    highlights: [
      "Bypass-corridor location in south Trivandrum, towards Kovalam",
      "Commercial space with road frontage",
      "Homes, flats and plots in the surrounding area",
    ],
    propertyTypes: ["commercial-property", "flats-for-sale", "land-for-sale", "houses-villas-for-sale"],
    faqs: [
      {
        question: "Is Enchakkal suitable for commercial property?",
        answer:
          "Its position on the south-side bypass corridor makes it a candidate for showrooms, clinics and offices. Frontage, parking and local approvals vary by building, so Golden Acres Real Estates reviews each property with you.",
      },
    ],
  },
  {
    slug: "trivandrum-city",
    name: "Trivandrum City",
    seoTitle: "Property in Trivandrum City Centre",
    seoDescription:
      "Flats, houses and commercial property in Trivandrum city — Pattom, Kowdiar, Vazhuthacaud and the city centre. Golden Acres Real Estates.",
    heading: "Property for sale in Trivandrum city centre",
    lede: "Flats, homes and commercial space in the established heart of Thiruvananthapuram.",
    intro: [
      "The city centre of Thiruvananthapuram, including established neighbourhoods such as Pattom, Kowdiar and Vazhuthacaud, is where the government secretariat, major hospitals, schools and the city's established retail areas are concentrated. It is the most mature property market in the district, with limited land and strong demand for well-located flats and homes.",
      "Golden Acres Real Estates helps buyers and investors in central Trivandrum compare options, verify documents and negotiate with realistic price guidance.",
    ],
    highlights: [
      "Established neighbourhoods close to hospitals, schools and offices",
      "Flats, homes and commercial space",
      "Limited land supply, so documentation and price comparison matter",
    ],
    propertyTypes: ["flats-for-sale", "commercial-property", "houses-villas-for-sale", "land-for-sale"],
    faqs: [
      {
        question: "Which neighbourhoods are considered part of Trivandrum city centre?",
        answer:
          "Areas such as Pattom, Kowdiar, Vazhuthacaud, Palayam, Thampanoor and East Fort are generally considered central Thiruvananthapuram. Tell Golden Acres Real Estates your budget and needs and they will suggest where to look.",
      },
    ],
  },
];

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}
