import Image from "next/image";
import { Reveal, ImageReveal } from "@/components/ui/motion-primitives";
import { GoldLink } from "@/components/ui/buttons";
import { imagery } from "@/data/imagery";
import { brand } from "@/config/brand";

/** Editorial introduction — brand philosophy with a two-image composition. */
export function Introduction() {
  return (
    <section className="py-24 lg:py-36" aria-labelledby="intro-heading">
      <div className="container-site grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Copy */}
        <Reveal>
          <p className="eyebrow">Who we are</p>
          <h2
            id="intro-heading"
            className="mt-4 text-balance font-serif text-4xl font-light leading-[1.1] text-charcoal sm:text-5xl"
          >
            A consultant who knows <em className="italic text-gold-deep">Trivandrum street by street.</em>
          </h2>
          <p className="mt-7 text-base leading-relaxed text-muted-foreground">
            Golden Acres Real Estates works at the neighbourhood level — the
            growth corridors of Kazhakootam, the quiet streets of Vellayani and
            Pothencode, the commercial stretches of Enchakkal and the city
            centre. That local fluency is how we match families and investors
            to property that genuinely fits.
          </p>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            We keep it simple: clear titles, honest price guidance, and
            conversations without pressure. Whether it is a first flat, a
            family home, a plot to build on, or a commercial address — we
            walk with you from the first viewing to the day the keys are
            yours.
          </p>

          <div className="mt-10">
            <GoldLink href="/about">Discover more about us</GoldLink>
          </div>
        </Reveal>

        {/* Imagery composition */}
        <div className="relative">
          <ImageReveal className="relative aspect-[4/3] w-full">
            <Image
              src={imagery.introMain}
              alt={imagery.introMainAlt}
              fill
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover"
            />
          </ImageReveal>
          <ImageReveal
            className="absolute -bottom-10 -left-2 hidden aspect-[4/5] w-40 sm:block lg:-left-10 lg:w-52"
            delay={0.2}
          >
            <Image
              src={imagery.introSecondary}
              alt={imagery.introSecondaryAlt}
              fill
              sizes="220px"
              className="object-cover"
            />
          </ImageReveal>
          {/* Overlapping brand card */}
          <Reveal
            delay={0.3}
            className="glass-dark absolute -bottom-8 right-0 rounded-xl px-7 py-6 text-ivory sm:right-8 shadow-[0_16px_40px_rgba(0,0,0,0.35)] border border-white/20"
          >
            <p className="font-serif text-2xl font-light italic text-gold-soft">
              Golden Acres
            </p>
            <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.28em] text-ivory/60">
              {brand.focus.join(" · ")}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
