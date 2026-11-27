import type { Project } from "@/types";
import { projectImagery } from "./imagery";

/**
 * SAMPLE PROJECTS.
 * The brand showcases completed and ongoing property work on Instagram, but
 * verified project data has not been supplied. Entries below are sample
 * placeholders (marked `sample: true`) using real service-area locations.
 * Replace with verified projects before launch.
 */
export const projects: Project[] = [
  {
    slug: "sample-kazhakootam-residences",
    title: "Kazhakootam Residences",
    description: [
      "A curation of family homes in and around the Kazhakootam corridor — from starter apartments to independent residences near the IT belt.",
      "Each home was evaluated for construction quality, title clarity and long-term neighbourhood value before being presented to buyers.",
    ],
    location: "Kazhakootam, Trivandrum",
    image: projectImagery[0],
    category: "Residential",
    featured: true,
    sample: true,
  },
  {
    slug: "sample-vellayani-plots",
    title: "Vellayani Plot Portfolio",
    description: [
      "A portfolio of clear-title residential plots in the Vellayani belt, matched with families building their first homes.",
      "Guidance covered plot selection, boundary and access checks, and builder referrals through construction.",
    ],
    location: "Vellayani, Trivandrum",
    image: projectImagery[1],
    category: "Land & Plots",
    featured: true,
    sample: true,
  },
  {
    slug: "sample-city-commercial",
    title: "Trivandrum City Commercial",
    description: [
      "Commercial spaces in the city's key retail stretches, paired with businesses looking for genuine frontage and footfall.",
      "Every space was assessed on visibility, access, parking and returns before listing.",
    ],
    location: "Trivandrum City",
    image: projectImagery[2],
    category: "Commercial",
    featured: true,
    sample: true,
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
