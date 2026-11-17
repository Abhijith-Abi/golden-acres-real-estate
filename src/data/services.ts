import type { Service } from "@/types";
import { imagery } from "./imagery";

/**
 * Services — grounded in the brand's actual offering (residential &
 * commercial property consultancy in Trivandrum). Copy is service-generic,
 * not a business claim.
 */
export const services: Service[] = [
  {
    slug: "property-buying",
    title: "Property Buying Assistance",
    shortTitle: "Buying",
    description:
      "From shortlisting to registration, we guide you through viewings, document checks, price negotiation and closing — so you buy with full clarity.",
    icon: "Home",
    image: imagery.introMain,
  },
  {
    slug: "property-selling",
    title: "Property Selling & Listing",
    shortTitle: "Selling",
    description:
      "Selling a home, plot or commercial space? We present it to the right buyers across Trivandrum, handle enquiries and coordinate viewings end-to-end.",
    icon: "Handshake",
    image: imagery.aboutSecondary,
  },
  {
    slug: "land-and-plots",
    title: "Land & Plot Assistance",
    shortTitle: "Land & Plots",
    description:
      "Residential purayidam, mixed-use parcels and investment land across Kazhakootam, Vellayani, Malayinkeezhu and beyond — with title verification support.",
    icon: "Map",
    image: imagery.aboutTertiary,
  },
  {
    slug: "investment-consultation",
    title: "Investment Consultation",
    shortTitle: "Investment",
    description:
      "Thoughtful, pressure-free advice on where Trivandrum's growth is heading — so your capital works in the locations and asset types that fit your goals.",
    icon: "TrendingUp",
    image: imagery.servicesMain,
  },
  {
    slug: "residential-property",
    title: "Residential Property",
    shortTitle: "Residential",
    description:
      "Houses, villas and apartments for families at every stage — first home, upgrade or downsizing — in the neighbourhoods that match your routine.",
    icon: "Building2",
    image: imagery.hero,
  },
  {
    slug: "commercial-property",
    title: "Commercial Property",
    shortTitle: "Commercial",
    description:
      "Retail, office and commercial spaces with genuine road frontage and footfall logic — evaluated on returns, not just on brochure promises.",
    icon: "Briefcase",
    image: imagery.contactMain,
  },
];
