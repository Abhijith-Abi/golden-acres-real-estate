import Image from "next/image";
import { Compass, Eye, ShieldCheck, HeartHandshake, KeyRound, Users } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, ImageReveal } from "@/components/ui/motion-primitives";
import { EnquiryCTA } from "@/components/sections/EnquiryCTA";
import { imagery } from "@/data/imagery";
import { brand } from "@/config/brand";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, coreKeywords } from "@/lib/seo";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";

const aboutDescription =
  "About Golden Acres Real Estates, a neighbourhood-level real estate consultancy in Trivandrum (Thiruvananthapuram) for residential, commercial and land property.";

export const metadata = buildMetadata({
  title: "About Golden Acres — Real Estate Consultants in Trivandrum",
  description: aboutDescription,
  path: "/about",
  keywords: ["about Golden Acres Real Estates", "real estate consultants Trivandrum", ...coreKeywords.slice(0, 5)],
});

const values = [
  {
    icon: ShieldCheck,
    title: "Transparency first",
    copy: "Documents we check, prices we quote, timelines we promise — everything is said plainly, up front.",
  },
  {
    icon: HeartHandshake,
    title: "Advice over sales",
    copy: "We recommend the property you should buy — even when it isn't the one we'd earn the most from.",
  },
  {
    icon: Compass,
    title: "Neighbourhood depth",
    copy: "We track Trivandrum street by street, so our guidance reflects today's ground reality, not last year's brochures.",
  },
  {
    icon: Users,
    title: "One consultant, start to finish",
    copy: "No handoffs, no call-centre runarounds. One person stays with your enquiry from first visit to registration.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About Us", path: "/about" },
          ]),
          webPageSchema({
            type: "AboutPage",
            name: `About ${brand.legalName}`,
            description: aboutDescription,
            path: "/about",
          }),
        ]}
      />
      <PageHero
        breadcrumb="About Us"
        eyebrow="Our story"
        title={
          <>
            Grounded in Trivandrum.{" "}
            <em className="italic text-gold-soft">Growing with it.</em>
          </>
        }
        lede={brand.description}
        backgroundImage={imagery.aboutMain}
      />

      {/* Story */}
      <section className="py-20 lg:py-28">
        <div className="container-site grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Who we are"
              title={
                <>
                  A consultancy built on <em className="italic text-gold-deep">local trust</em>
                </>
              }
            />
            <Reveal delay={0.1}>
              <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-muted-foreground">
                <p>
                  Golden Acres Real Estates works where most agencies only
                  advertise — on the ground. Site visits, boundary walks,
                  document checks and honest conversations across Kazhakootam,
                  Attukal, Vilappilsala, Pothencode, Anayara, Vellayani,
                  Malayinkeezhu, Enchakkal and the city centre.
                </p>
                <p>
                  We keep it simple: clear titles, honest price guidance, and
                  conversations without pressure. Whether it is a first flat, a
                  family home, a plot to build on, or a commercial address — we
                  walk with you from the first viewing to the day the keys are
                  yours.
                </p>
                <p>
                  That approach has shaped a portfolio spanning{" "}
                  {brand.focus.join(", ").toLowerCase()} — and relationships
                  that last well beyond the sale.
                </p>
              </div>
            </Reveal>

            {/* Mission / vision */}
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              <Reveal>
                <div className="glass-light h-full rounded-xl border border-charcoal/10 p-7 shadow-sm transition-all duration-300 hover:border-gold/50 hover:shadow-[0_8px_30px_rgba(212,175,55,0.1)]">
                  <Eye className="size-6 text-gold-deep" aria-hidden />
                  <h3 className="mt-4 font-serif text-xl font-light text-charcoal">Our mission</h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">
                    Make every property decision in Trivandrum an informed,
                    pressure-free one — with verified details and plain advice.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="glass-light h-full rounded-xl border border-charcoal/10 p-7 shadow-sm transition-all duration-300 hover:border-gold/50 hover:shadow-[0_8px_30px_rgba(212,175,55,0.1)]">
                  <Compass className="size-6 text-gold-deep" aria-hidden />
                  <h3 className="mt-4 font-serif text-xl font-light text-charcoal">Our vision</h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">
                    To be the name Trivandrum&apos;s families trust first — for
                    their first home, their next investment, and everything in
                    between.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Image composition */}
          <div className="relative lg:sticky lg:top-28">
            <ImageReveal className="aspect-[4/5] w-full">
              <Image
                src={imagery.aboutMain}
                alt={imagery.aboutMainAlt}
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover"
              />
            </ImageReveal>
            <ImageReveal
              className="absolute -bottom-8 -left-3 aspect-square w-44 sm:w-56 lg:-left-12"
              delay={0.2}
            >
              <Image
                src={imagery.aboutSecondary}
                alt={imagery.aboutSecondaryAlt}
                fill
                sizes="240px"
                className="object-cover"
              />
            </ImageReveal>
            <Reveal
              delay={0.3}
              className="glass-dark absolute -right-2 -top-6 rounded-xl px-6 py-5 text-ivory shadow-xl lg:-right-6 border border-white/20"
            >
              <KeyRound className="size-5 text-gold-soft" aria-hidden />
              <p className="mt-2 font-serif text-lg italic text-gold-soft">
                Keys, handed with confidence
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-charcoal py-20 text-ivory lg:py-28" aria-labelledby="values-heading">
        <div className="container-site">
          <SectionHeading
            dark
            align="center"
            eyebrow="What we stand for"
            title={
              <span id="values-heading">
                The values behind <em className="italic text-gold-soft">every handshake</em>
              </span>
            }
          />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.07} className="h-full">
                <div className="glass-dark group h-full rounded-xl p-8 transition-all duration-300 hover:border-gold/50 hover:shadow-[0_12px_36px_rgba(212,175,55,0.15)]">
                  <v.icon className="size-6 text-gold-soft" aria-hidden />
                  <h3 className="mt-5 font-serif text-xl font-light leading-snug">{v.title}</h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-ivory/60">{v.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 lg:py-28" aria-labelledby="team-heading">
        <div className="container-site grid items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <SectionHeading
            eyebrow="The team"
            title={
              <span id="team-heading">
                Consultants who <em className="italic text-gold-deep">know your street</em>
              </span>
            }
            lede="Our consultants work the neighbourhoods they live in. You'll always talk to someone who can tell you what the school commute is really like — not just the price per cent."
          />
          <Reveal delay={0.1}>
            <div className="grid gap-6 sm:grid-cols-2">
              <ImageReveal className="aspect-[3/4] w-full">
                <Image
                  src={imagery.aboutTertiary}
                  alt="Golden Acres consultants reviewing property details with clients"
                  fill
                  sizes="(min-width: 1024px) 22vw, 50vw"
                  className="object-cover"
                />
              </ImageReveal>
              <ImageReveal className="aspect-[3/4] w-full sm:mt-10" delay={0.12}>
                <Image
                  src={imagery.introSecondary}
                  alt="Inside a home shortlisted by Golden Acres"
                  fill
                  sizes="(min-width: 1024px) 22vw, 50vw"
                  className="object-cover"
                />
              </ImageReveal>
              <p className="text-[13px] leading-relaxed text-muted-foreground sm:col-span-2">
                <span className="font-medium text-charcoal">A note on people photography:</span>{" "}
                we&apos;re deliberately not filling this page with stock faces.
                Team portraits will be added once we have our own — the
                consultants you meet at a site visit are the ones who&apos;ll
                handle your file.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <EnquiryCTA />
    </>
  );
}
