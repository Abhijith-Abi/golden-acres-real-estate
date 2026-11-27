# Golden Acres Real Estates — Premium Website

Production-quality website for **Golden Acres Real Estates**, a real estate
consultant in Trivandrum, Kerala (brand source:
[instagram.com/golden_acres_realestates](https://www.instagram.com/golden_acres_realestates/)).

Design direction: warm ivory + charcoal + champagne gold, editorial serif
(Fraunces) with Manrope body type, Lenis smooth scroll, GSAP/ScrollTrigger hero
& parallax, Framer Motion micro-interactions.

---

## 1. Quick start

```bash
npm install
npm run dev      # development  → http://localhost:3000
npm run build    # production build
npm run start    # production server
npm run lint     # eslint (react-compiler rules included)
```

## 2. Implemented pages

| Route | Purpose |
|---|---|
| `/` | Hero, introduction, featured properties, why-us, services, projects, testimonials, Instagram, enquiry CTA |
| `/about` | Brand story, mission/vision, values, team section |
| `/properties` | Discovery: search, category/location/status filters, sort, grid/list layouts, empty state, loading skeleton |
| `/properties/[slug]` | Gallery, price bar, description, specs, amenities, enquiry form + WhatsApp, similar properties |
| `/services` | Six service chapters + 4-step process |
| `/projects` | Editorial project showcase |
| `/contact` | Contact channels, form, areas served, map slot |
| `/api/enquiries` | Server-side lead delivery (webhook) |
| `sitemap.xml`, `robots.txt` | SEO |

## 3. Dependencies

Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS v4,
shadcn/ui (radix style), Lucide, **Framer Motion**, **GSAP + ScrollTrigger**,
**Lenis**, **React Hook Form + Zod + @hookform/resolvers**, **Sonner**,
**Swiper** (property gallery), next-themes (Sonner theming only).

## 4. Folder structure

```
src/
  app/                     routes, template.tsx (page transitions), sitemap, robots
    api/enquiries/route.ts lead delivery
  components/
    layout/                Navbar, MobileMenu, Footer, Logo, PageHero, FloatingWhatsApp
    sections/              Hero, Introduction, FeaturedProperties, WhyChooseUs, ServicesSection,
                           FeaturedProjects, Testimonials, InstagramShowcase, EnquiryCTA
    property/              PropertyCard, PropertiesExplorer, PropertyGallery
    forms/                 EnquiryForm, ContactForm
    providers/             SmoothScrollProvider (Lenis ⇄ GSAP ticker)
    ui/                    shadcn + motion-primitives (Reveal/LineReveal/ImageReveal), buttons, icons
  config/                  brand.ts, contact.ts, social.ts   ← business facts live here
  data/                    properties, services, projects, instagram, testimonials, imagery, navigation
  lib/                     utils, whatsapp, animations/variants, forms/submit, validations
  types/                   domain types
```

## 5. Content configuration (edit before launch)

- **`src/config/brand.ts`** — name, tagline, description, service areas.
- **`src/config/contact.ts`** — phones/WhatsApp/email/address. ⚠ The two phone
  numbers were found in the brand's own Instagram caption but are marked
  `verified: false`; confirm with the client, then set `verified: true`.
- **`src/data/properties.ts`** — listings. All current entries are **sample
  listings** (`sample: true`, `price: null` → "Price on request"). Replace with
  verified listings, set `price` (UI shows price + enables price sorting), and
  add `mapEmbedUrl`/`floorPlan` when verified.
- **`src/data/projects.ts`** — sample projects, same convention.
- **`src/data/testimonials.ts`** — empty on purpose (no published reviews). The
  section renders **nothing** until verified entries are added — never fake.
- **`src/data/imagery.ts`** — every image URL in one file (temporary Unsplash
  stock). Swap to real photography here, or drop files in `/public` and use
  local paths.

## 6. Enquiry / lead integration

Fields: name, phone (+91), email, property type, preferred location, budget,
message, consent — RHF + Zod, honeypot + fill-time bot checks.

**Without a backend configured (default):** the site does *not* pretend to save
anything. On submit it opens **WhatsApp with the full enquiry pre-filled**
(and says so in the toast).

**With a backend configured:**

1. `.env.local`:
   ```
   ENQUIRY_WEBHOOK_URL="https://your-endpoint/leads"
   NEXT_PUBLIC_ENQUIRY_BACKEND_CONFIGURED="true"
   # optional shared secret: ENQUIRY_WEBHOOK_TOKEN="..."
   ```
2. The browser POSTs to `/api/enquiries`; the server validates (same Zod
   schema) and forwards this JSON to your webhook:
   ```json
   { "kind": "enquiry", "name": "…", "phone": "…", "email": "…",
     "propertyType": "apartment", "location": "Anayara", "budget": "50l-1cr",
     "message": "…", "receivedAt": "ISO-8601", "source": "golden-acres-website" }
   ```
   (`kind: "contact"` for the contact form; `"subject"` instead of the
   property fields.)
3. The webhook URL/token never reach the browser. Restart `npm run build && npm run start` after adding env vars.
4. Optional: `NEXT_PUBLIC_SITE_URL` sets the canonical production URL for SEO.

## 7. Animation architecture

- **Lenis** drives smooth scroll and feeds `ScrollTrigger.update`; GSAP's
  ticker drives Lenis — one frame loop, no controller conflicts.
- Hero: GSAP timeline (masked line reveal) + ScrollTrigger scrub parallax.
- Scroll reveals/cards/forms: Framer Motion (`Reveal`, `LineReveal`,
  `ImageReveal`, route transition in `app/template.tsx`).
- `prefers-reduced-motion`: Lenis disabled, parallax skipped, reveals render
  in final state (also enforced in CSS).

## 8. Client checklist (assets & info needed)

1. Official logo file (currently a typographic GA lockup).
2. Confirmation of phone/WhatsApp numbers (`contact.ts` → set `verified: true`).
3. Public email address, office address + Google Maps embed URL.
4. Verified property listings: photos, prices, exact specs, addresses.
5. Verified projects with case-study details.
6. Genuine customer testimonials (optional).
7. Brand photography to replace temporary stock (`src/data/imagery.ts`),
   Instagram post images (`src/data/instagram.ts`), team portraits.
8. Optional OG/social share image (`public/og.jpg`) + private policy text link.
