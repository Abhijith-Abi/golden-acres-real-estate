import Link from "next/link";
import { Compass, ShieldCheck, Sparkles, Handshake, ArrowRight, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/ui/motion-primitives";
import { SectionHeading } from "@/components/ui/section-heading";

const pillars = [
  {
    number: "01",
    icon: Compass,
    title: "Local Market Fluency",
    tagline: "9 Core Corridors Tracked Daily",
    copy: "We track Trivandrum's micro-markets daily — the Kazhakootam Technopark growth corridor, the calm residential pockets of Vellayani and Malayinkeezhu, and prime commercial stretches around Enchakkal — ensuring our valuation and advice reflect true on-the-ground reality.",
    highlights: ["Kazhakootam & Technopark", "Anayara & Enchakkal", "Vellayani & Pothencode"],
  },
  {
    number: "02",
    icon: ShieldCheck,
    title: "Trust & Legal Due Diligence",
    tagline: "100% Title-Verified Documentation",
    copy: "Prior deeds, encumbrance certificates, land classifications, and boundary verifications are scrutinized before any property is presented. We would rather lose a transaction than recommend an address with legal ambiguity or mismatch.",
    highlights: ["Mother Deed Verification", "Clear Title Checks", "Zero Pushy Sales Tactics"],
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Curated, Never Flooded",
    tagline: "Precision Matching to Your Criteria",
    copy: "We deliberately filter out the noise. Instead of bombarding your phone with dozens of generic listings, we shortlist only 3 to 4 properties that rigorously align with your budget, commute routines, lifestyle, and investment horizon.",
    highlights: ["Targeted Shortlists", "Verified Pricing", "Respect for Your Time"],
  },
  {
    number: "04",
    icon: Handshake,
    title: "End-to-End Partnership",
    tagline: "Single Dedicated Senior Consultant",
    copy: "From your initial exploratory site visit to price negotiations, bank liaison, legal vetting, and final registration day at the sub-registrar office, one trusted senior consultant remains by your side through the entire journey.",
    highlights: ["Single Point of Contact", "Negotiation Support", "Registration Accompaniment"],
  },
];

const trustMetrics = [
  { value: "100%", label: "Title-Checked Due Diligence" },
  { value: "9+", label: "Trivandrum Micro-Markets" },
  { value: "1-on-1", label: "Dedicated Advisory" },
];

/**
 * Why Choose Us — Architectural Luxury Bento Grid.
 * Replaces the sterile list layout with high-contrast glassmorphic cards,
 * distinctive iconography, trust metrics, and polished hover micro-interactions.
 */
export function WhyChooseUs() {
  return (
    <section
      className="relative bg-charcoal py-24 text-ivory lg:py-36 overflow-hidden border-t border-ivory/[0.08]"
      aria-labelledby="why-heading"
    >
      {/* Background ambient gold aura */}
      <div className="pointer-events-none absolute -top-40 right-0 size-[500px] rounded-full bg-[radial-gradient(circle,_rgba(212,175,55,0.06)_0%,_transparent_70%)]" />
      <div className="pointer-events-none absolute -bottom-40 left-0 size-[500px] rounded-full bg-[radial-gradient(circle,_rgba(212,175,55,0.05)_0%,_transparent_70%)]" />

      <div className="container-site relative z-10">
        {/* Section Header with Stats Bar */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between pb-16 border-b border-ivory/10">
          <SectionHeading
            dark
            eyebrow="Why Golden Acres"
            title={
              <span id="why-heading">
                Chosen for how we{" "}
                <em className="font-light italic text-gold-soft bg-gradient-to-r from-[#F6E2AA] via-[#D4AF37] to-[#ECC878] bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(212,175,55,0.3)]">
                  treat people
                </em>
              </span>
            }
            lede="Property decisions stay with families for decades. We build for that timeline — with patience, honesty, and deep local expertise across Trivandrum."
            className="max-w-2xl"
          />

          {/* Quick Trust Stat Pills */}
          <Reveal delay={0.15} className="flex flex-wrap items-center gap-4 sm:gap-6 shrink-0">
            {trustMetrics.map((m) => (
              <div
                key={m.label}
                className="flex flex-col border border-ivory/15 bg-charcoal-soft/50 px-5 py-3.5 backdrop-blur-sm"
              >
                <span className="font-serif text-2xl font-light text-gold-soft sm:text-3xl">
                  {m.value}
                </span>
                <span className="mt-1 text-[11px] font-medium uppercase tracking-[0.2em] text-ivory/60">
                  {m.label}
                </span>
              </div>
            ))}
          </Reveal>
        </div>

        {/* 4-Card Luxury Bento Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:gap-8">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.number} delay={i * 0.1}>
                <div className="group relative flex h-full flex-col justify-between overflow-hidden border border-ivory/10 bg-charcoal-soft/40 p-8 sm:p-9 backdrop-blur-md transition-all duration-300 hover:border-gold/50 hover:bg-charcoal-soft/70 hover:shadow-[0_12px_36px_rgba(212,175,55,0.12)]">
                  {/* Subtle hover gradient glow inside card */}
                  <div className="pointer-events-none absolute -right-20 -top-20 size-48 rounded-full bg-gold/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                  <div>
                    {/* Top row: Number + Icon */}
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-3xl font-light text-gold/40 transition-colors duration-300 group-hover:text-gold-soft">
                        {p.number}
                      </span>
                      <div className="flex size-12 items-center justify-center rounded-lg border border-gold/30 bg-gold/10 text-gold transition-transform duration-300 group-hover:scale-105 group-hover:bg-gold group-hover:text-charcoal shadow-[0_2px_12px_rgba(212,175,55,0.2)]">
                        <Icon className="size-5" />
                      </div>
                    </div>

                    {/* Title & Tagline */}
                    <div className="mt-6">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-soft/80">
                        {p.tagline}
                      </span>
                      <h3 className="mt-1.5 font-serif text-2xl font-light tracking-[-0.01em] text-ivory transition-colors duration-300 group-hover:text-ivory sm:text-[1.75rem]">
                        {p.title}
                      </h3>
                    </div>

                    {/* Explanatory Copy */}
                    <p className="mt-4 text-[14.5px] leading-relaxed text-ivory/70 sm:text-[15px]">
                      {p.copy}
                    </p>
                  </div>

                  {/* Highlights Bullet Tags */}
                  <div className="mt-8 pt-6 border-t border-ivory/10">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-ivory/60">
                      {p.highlights.map((h) => (
                        <span key={h} className="inline-flex items-center gap-1.5">
                          <CheckCircle2 className="size-3 text-gold shrink-0" />
                          <span>{h}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom Editorial Callout Banner */}
        <Reveal delay={0.4} className="mt-14">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between border border-gold/30 bg-charcoal-soft/50 p-6 sm:p-8 backdrop-blur-md">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
                Client Advisory Commitment
              </span>
              <p className="mt-1 font-serif text-lg text-ivory sm:text-xl">
                Ready to explore verified residential or commercial property in Trivandrum?
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center gap-2.5 bg-gradient-to-r from-gold-soft via-gold to-gold-deep px-7 text-[12px] font-semibold uppercase tracking-[0.18em] text-charcoal shadow-[0_2px_14px_rgba(212,175,55,0.3)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_4px_22px_rgba(212,175,55,0.45)] active:scale-[0.98] shrink-0"
            >
              <span>Schedule a Consultation</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
