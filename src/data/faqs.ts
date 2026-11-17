import { brand } from "@/config/brand";
import { contact } from "@/config/contact";

export interface Faq {
  question: string;
  answer: string;
}

/**
 * Site-wide FAQs. Written as complete, self-contained answers so search
 * engines and AI assistants can quote them without extra context.
 * No prices, statistics or claims the brand has not published.
 */
export const generalFaqs: Faq[] = [
  {
    question: "What is Golden Acres Real Estates?",
    answer: `Golden Acres Real Estates is a real estate consultancy in Trivandrum (Thiruvananthapuram), Kerala. It helps families and investors buy, sell and evaluate residential property, land and plots, and commercial property across ${brand.serviceAreas.join(", ")}.`,
  },
  {
    question: "Is Trivandrum the same as Thiruvananthapuram?",
    answer:
      "Yes. Thiruvananthapuram is the official name of the capital city of Kerala. Trivandrum is the older anglicised name and is still widely used in everyday speech and in property listings. Golden Acres Real Estates serves the same city under both names.",
  },
  {
    question: "Which areas of Trivandrum does Golden Acres Real Estates cover?",
    answer: `The team works across ${brand.serviceAreas.join(", ")}. Each area has its own page on this website with local context for buyers and investors.`,
  },
  {
    question: "What kinds of property can I find through Golden Acres Real Estates?",
    answer:
      "Houses and villas, apartments and flats, residential land and plots, and commercial space such as shops, offices and clinics in Trivandrum.",
  },
  {
    question: "How do I contact Golden Acres Real Estates?",
    answer: `Call or WhatsApp ${contact.phone.display}${contact.phoneAlt.display ? ` or ${contact.phoneAlt.display}` : ""}, use the contact form on this website, or message @${brand.instagramHandle} on Instagram. A consultant replies with options that match your budget and preferred area.`,
  },
  {
    question: "How do I find the latest properties available in Trivandrum?",
    answer: `New listings are shared on the Golden Acres Instagram page (@${brand.instagramHandle}) and on request over WhatsApp. Tell the team your budget, preferred area and property type and they will send matching options, including properties that are not publicly advertised.`,
  },
  {
    question: "How is land measured in Trivandrum and Kerala?",
    answer:
      "Land in Kerala is usually measured in cents and acres. One acre is 100 cents, and one cent is about 435.6 square feet (roughly 40.5 square metres). Plot sizes in Trivandrum listings are normally quoted in cents.",
  },
  {
    question: "What documents should I check before buying land in Kerala?",
    answer:
      "Typically the title deed and prior (mother) deeds, an encumbrance certificate, the latest land tax receipt, the possession certificate, the location sketch and the thandaper or basic tax details. For plots, also check the land classification and, where relevant, building-permit eligibility. Golden Acres consultants help coordinate document checks, and an independent review by an advocate is recommended before you pay an advance.",
  },
  {
    question: "Is Trivandrum a good place to invest in property?",
    answer:
      "Trivandrum is Kerala's capital and has long-running demand from IT and government employees, students and returning residents, with growth concentrated along corridors such as Kazhakootam. Returns depend on the specific locality, title and price paid, so the consultants at Golden Acres compare options area by area before recommending anything.",
  },
];
