/**
 * Central imagery pool — TEMPORARY, professionally sourced stock photography
 * (Unsplash CDN). Every image on the site resolves through this file so the
 * client can swap in real brand photography by editing one file, or by
 * dropping files into /public/imagery and using local paths.
 */
const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

export const imagery = {
  hero: u("1613490493576-7fde63acd811", 2000),
  heroAlt: "Architectural luxury villa with illuminated infinity pool at dusk",
  introMain: u("1600596542815-ffad4c1539a9"),
  introMainAlt: "Contemporary luxury estate exterior with glowing architectural lighting",
  introSecondary: u("1600607687939-ce8a6c25118c"),
  introSecondaryAlt: "Bright living room interior with designer furnishings",
  ctaBackground: u("1564013799919-ab600027ffc6"),
  ctaBackgroundAlt: "Elegant house exterior at dusk",
  aboutMain: u("1512917774080-9991f1c4c750"),
  aboutMainAlt: "White modern architecture under clear sky",
  aboutSecondary: u("1522708323590-d24dbb6b0267"),
  aboutSecondaryAlt: "Warm apartment interior with natural textures",
  aboutTertiary: u("1502672260266-1c1ef2d93688"),
  aboutTertiaryAlt: "Sunlit reading corner of a premium apartment",
  servicesMain: u("1600585152220-90363fe7e115"),
  servicesMainAlt: "Designer kitchen with brass accents",
  contactMain: u("1600047509807-ba8f99d2cdde"),
  contactMainAlt: "Premium home exterior with manicured lawn",
} as const;

/** Property listing photography — replace with verified listing photos. */
export const propertyImagery = [
  u("1600566753190-17f0baa2a6c3"),
  u("1613977257363-707ba9348227"),
  u("1560448204-e02f11c3d0e2"),
  u("1523217582562-09d0def993a6"),
  u("1580587771525-78b9dba3b914"),
  u("1600566752229-250ed79470f8"),
  u("1560518883-ce09059eeffa"),
  u("1583608205776-bfd35f0d9f83", 1200),
] as const;
export const projectImagery = [
  u("1512917774080-9991f1c4c750", 1800),
  u("1600607687920-4e2a09cf159d", 1800),
  u("1564013799919-ab600027ffc6", 1800),
] as const;
