import type { Faq } from "./faqs";
import type { PropertyCategory } from "@/types";

/**
 * Search-intent landing pages ("land for sale in Trivandrum", etc.).
 * Served at /trivandrum/<slug>. One page per intent, deliberately NOT
 * multiplied per neighbourhood (that would be thin doorway content).
 */
export interface PropertyTypePage {
  slug: "land-for-sale" | "flats-for-sale" | "houses-villas-for-sale" | "commercial-property";
  /** Matches PropertyCategory so the page can list matching listings. */
  category: PropertyCategory;
  navLabel: string;
  seoTitle: string;
  seoDescription: string;
  heading: string;
  lede: string;
  keywords: string[];
  intro: string[];
  checklistTitle: string;
  checklist: string[];
  faqs: Faq[];
}

export const propertyTypePages: PropertyTypePage[] = [
  {
    slug: "land-for-sale",
    category: "land-plot",
    navLabel: "Land & Plots",
    seoTitle: "Land & Plots for Sale in Trivandrum",
    seoDescription:
      "Residential land and plots for sale in Trivandrum (Thiruvananthapuram). Title-checked options across Kazhakootam, Vellayani, Malayinkeezhu and more.",
    heading: "Land and plots for sale in Trivandrum",
    lede: "Residential plots and land parcels with title, classification and access checked before you commit.",
    keywords: [
      "land for sale in Trivandrum",
      "plots for sale in Trivandrum",
      "residential plots Thiruvananthapuram",
      "house plots near Kazhakootam",
      "land for sale in Kerala",
      "cent land Trivandrum",
    ],
    intro: [
      "Buying land in Trivandrum rewards careful checking. Plots are quoted in cents (one cent is about 435.6 sq ft), and two plots on the same road can differ in land classification, access and building eligibility.",
      "Golden Acres Real Estates helps you shortlist residential plots and land parcels across Kazhakootam, Pothencode, Vellayani, Vilappilsala and Malayinkeezhu, verify the paperwork and compare each plot with nearby alternatives.",
    ],
    checklistTitle: "What we check before you buy land in Trivandrum",
    checklist: [
      "Title deed and prior (mother) deeds",
      "Encumbrance certificate",
      "Latest land tax receipt and possession certificate",
      "Land classification, including any paddy or wetland data bank entry",
      "Road access, width and legal right of way",
      "Boundaries, location sketch and survey details",
    ],
    faqs: [
      {
        question: "How much does land cost in Trivandrum?",
        answer:
          "Prices per cent vary widely by locality, road frontage and distance from the city. Tell Golden Acres Real Estates your budget and preferred area and the team will share current options with actual asking prices rather than a generic range.",
      },
      {
        question: "Which areas of Trivandrum are good for buying a house plot?",
        answer:
          "Popular residential-plot areas include Kazhakootam, Pothencode, Vellayani, Vilappilsala and Malayinkeezhu. The right choice depends on your budget, your commute and whether you plan to build or hold the land as an investment.",
      },
      {
        question: "Can I build on any residential plot in Trivandrum?",
        answer:
          "Not always. Building eligibility depends on land classification, local body rules, setbacks and road access. Confirm these before paying an advance.",
      },
    ],
  },
  {
    slug: "flats-for-sale",
    category: "apartment",
    navLabel: "Flats & Apartments",
    seoTitle: "Flats & Apartments for Sale in Trivandrum",
    seoDescription:
      "2 BHK and 3 BHK flats and apartments for sale in Trivandrum (Thiruvananthapuram) — Kazhakootam, Anayara, Attukal and the city centre.",
    heading: "Flats and apartments for sale in Trivandrum",
    lede: "Ready-to-move and under-construction apartments, compared on builder record, approvals and location.",
    keywords: [
      "flats for sale in Trivandrum",
      "apartments for sale in Trivandrum",
      "2 BHK flat Trivandrum",
      "3 BHK flat Trivandrum",
      "flats near Technopark",
      "flats in Kazhakootam",
    ],
    intro: [
      "Trivandrum's apartment market is concentrated around Kazhakootam and Technopark, the city centre and the Anayara–airport side. The right flat depends on your commute, the builder's track record and whether the building is complete.",
      "Golden Acres Real Estates helps you compare apartments across these areas, review builder approvals and handover status, and negotiate with realistic price guidance.",
    ],
    checklistTitle: "What we check before you buy a flat in Trivandrum",
    checklist: [
      "Builder track record and delivered projects",
      "K-RERA registration for projects that require it",
      "Building permit and completion or occupancy certificate",
      "Clear title and approved plan",
      "Carpet, built-up and super built-up area as sold",
      "Maintenance charges, parking and water supply",
    ],
    faqs: [
      {
        question: "Which areas in Trivandrum are best for buying a flat?",
        answer:
          "Kazhakootam and the Technopark corridor suit IT professionals, the city centre suits those who want established surroundings, and Anayara suits buyers who want to be between the city and the airport. Golden Acres Real Estates can shortlist flats by area and budget.",
      },
      {
        question: "Should I buy a ready-to-move or an under-construction flat?",
        answer:
          "Ready-to-move flats let you inspect the finished building and move in quickly. Under-construction flats can cost less but carry delivery risk, so verify the builder's record and the project's registration with the Kerala Real Estate Regulatory Authority (K-RERA) before booking.",
      },
    ],
  },
  {
    slug: "houses-villas-for-sale",
    category: "house-villa",
    navLabel: "Houses & Villas",
    seoTitle: "Houses & Villas for Sale in Trivandrum",
    seoDescription:
      "Independent houses and villas for sale in Trivandrum (Thiruvananthapuram) — Kazhakootam, Pothencode, Vilappilsala and more.",
    heading: "Houses and villas for sale in Trivandrum",
    lede: "Independent homes and villas in Trivandrum's best residential streets, with documents checked first.",
    keywords: [
      "houses for sale in Trivandrum",
      "villas for sale in Trivandrum",
      "independent house Trivandrum",
      "villas in Kazhakootam",
      "resale houses Thiruvananthapuram",
    ],
    intro: [
      "An independent house or villa in Trivandrum gives you more space and privacy than an apartment, but needs closer checks on the plot, building approvals and structural condition.",
      "Golden Acres Real Estates helps families shortlist houses and villas in Kazhakootam, Pothencode, Vilappilsala, Vellayani and Attukal, arranges site visits and coordinates paperwork through to registration.",
    ],
    checklistTitle: "What we check before you buy a house or villa in Trivandrum",
    checklist: [
      "Title, encumbrance certificate and tax receipts for the plot",
      "Approved building plan and completion certificate",
      "Building age and structural condition",
      "Water source, drainage and electrical connection details",
      "Road access and boundary measurements",
      "Resale value compared with nearby sales",
    ],
    faqs: [
      {
        question: "Which areas of Trivandrum have independent houses and villas for sale?",
        answer:
          "Kazhakootam, Pothencode, Vilappilsala, Vellayani, Malayinkeezhu and parts of the city have independent homes. Golden Acres Real Estates can send current options by area and budget.",
      },
      {
        question: "What documents should I check when buying a resale house in Kerala?",
        answer:
          "Check the title deed and prior deeds, encumbrance certificate, latest tax receipts, approved building plan and completion certificate. An independent review by an advocate is recommended before you pay an advance.",
      },
    ],
  },
  {
    slug: "commercial-property",
    category: "commercial",
    navLabel: "Commercial",
    seoTitle: "Commercial Property for Sale & Rent in Trivandrum",
    seoDescription:
      "Shops, offices, showrooms and commercial space in Trivandrum (Thiruvananthapuram). Frontage, footfall and lease advice from Golden Acres Real Estates.",
    heading: "Commercial property in Trivandrum",
    lede: "Shops, offices and showroom space evaluated on frontage, footfall and returns.",
    keywords: [
      "commercial property in Trivandrum",
      "commercial space for sale Trivandrum",
      "shop for rent Trivandrum",
      "office space Trivandrum",
      "showroom space Thiruvananthapuram",
    ],
    intro: [
      "Commercial property is judged on frontage, footfall, parking and permitted use, not just on price per square foot. Trivandrum's commercial stretches include the city centre, the Kazhakootam–Technopark corridor and the south-side bypass around Enchakkal.",
      "Golden Acres Real Estates helps businesses and investors compare commercial space for purchase or lease, check approvals and permitted use, and evaluate returns.",
    ],
    checklistTitle: "What we check before you buy or lease commercial space in Trivandrum",
    checklist: [
      "Permitted use and building approvals",
      "Road frontage, visibility and parking",
      "Power load, separate metering and service access",
      "Lease terms, deposit and escalation clauses",
      "Title and encumbrances on the property",
      "Realistic rental yield for the specific location",
    ],
    faqs: [
      {
        question: "Which areas of Trivandrum are good for commercial property?",
        answer:
          "The city centre, the Kazhakootam–Technopark corridor and the bypass stretch around Enchakkal are commonly considered for retail, offices and clinics. The best fit depends on your customers and budget.",
      },
      {
        question: "Does Golden Acres Real Estates help with commercial leasing as well as purchases?",
        answer:
          "Yes. The team advises on both buying and leasing commercial space, including frontage, lease terms and multi-tenant arrangements.",
      },
    ],
  },
];

export function getPropertyTypePage(slug: string): PropertyTypePage | undefined {
  return propertyTypePages.find((p) => p.slug === slug);
}
