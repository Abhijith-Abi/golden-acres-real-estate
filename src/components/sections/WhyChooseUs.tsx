import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/motion-primitives";
import { GoldLink } from "@/components/ui/buttons";

const strengths = [
  {
    number: "01",
    title: "Local market fluency",
    copy: "We track Trivandrum's micro-markets daily — the Kazhakootam growth corridor, the calm of Vellayani and Malayinkeezhu, and the commercial stretches around Enchakkal — so our guidance reflects what's real on the ground today.",
  },
  {
    number: "02",
    title: "Trust & transparency",
    copy: "Clear titles, verified documents and honest price conversations. We would rather lose a sale than push a property that isn't right for you.",
  },
  {
    number: "03",
    title: "Curated, not cluttered",
    copy: "We shortlist a few properties that genuinely match your budget, routine and plans — instead of flooding your day with listings that don't.",
  },
  {
    number: "04",
    title: "End-to-end guidance",
    copy: "From the first site visit to document checks, negotiation and registration day, one consultant stays with you through the whole journey.",
  },
];

/** Why choose us — dark editorial section with numbered hairline rows. */
export function WhyChooseUs() {
  return (
    <section className="bg-charcoal py-24 text-ivory lg:py-36" aria-labelledby="why-heading">
      <div className="container-site grid gap-16 lg:grid-cols-[1fr_1.35fr] lg:gap-24">
        <div>
          <SectionHeading
            dark
            eyebrow="Why Golden Acres"
            title={
              <span id="why-heading">
                Chosen for how we <em className="italic text-gold-soft">treat people</em>
              </span>
            }
            lede="Property decisions stay with families for decades. We build for that timeline — with patience, honesty and local depth."
          />
          <Reveal delay={0.2} className="mt-10">
            <GoldLink href="/about" className="text-gold-soft">
              More about our approach
            </GoldLink>
          </Reveal>
        </div>

        <ul className="divide-y divide-ivory/[0.12] border-y border-ivory/[0.12]">
          {strengths.map((s, i) => (
            <Reveal as="li" key={s.number} delay={i * 0.08}>
              <div className="group grid grid-cols-[auto_1fr] items-start gap-6 py-8 transition-colors sm:grid-cols-[72px_240px_1fr] sm:gap-8 lg:py-10">
                <span className="font-serif text-lg text-gold-soft/80">
                  {s.number}
                </span>
                <h3 className="font-serif text-2xl font-light leading-snug text-ivory sm:text-[1.7rem]">
                  {s.title}
                </h3>
                <p className="col-span-2 text-sm leading-relaxed text-ivory/60 sm:col-span-1 sm:text-[13.5px]">
                  {s.copy}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
