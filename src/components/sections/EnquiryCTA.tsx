import Image from "next/image";
import { Reveal } from "@/components/ui/motion-primitives";
import { WhatsAppIcon } from "@/components/ui/icons";
import { imagery } from "@/data/imagery";
import { contact } from "@/config/contact";
import { buildWhatsAppUrl, generalEnquiryMessage } from "@/lib/whatsapp";

/** Full-bleed enquiry band with WhatsApp handoff. */
export function EnquiryCTA() {
  return (
    <section className="relative overflow-hidden py-28 lg:py-40" aria-labelledby="enquiry-cta-heading">
      <Image
        src={imagery.ctaBackground}
        alt={imagery.ctaBackgroundAlt}
        fill
        sizes="100vw"
        loading="lazy"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-charcoal/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/60 to-transparent" />

      <div className="container-site relative z-10">
        <Reveal className="max-w-3xl">
          <div className="glass-dark relative overflow-hidden rounded-2xl p-8 sm:p-12 lg:p-14 border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            {/* Ambient gold spotlight inside glass card */}
            <div className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-gold/15 blur-3xl" />

            <p className="eyebrow text-gold-soft">Start the conversation</p>
            <h2
              id="enquiry-cta-heading"
              className="mt-4 text-balance font-serif text-3xl font-light leading-[1.1] text-ivory sm:text-4xl lg:text-5xl"
            >
              Let&apos;s find your ground in{" "}
              <em className="italic text-gold-soft bg-gradient-to-r from-[#F6E2AA] via-[#D4AF37] to-[#ECC878] bg-clip-text text-transparent">
                Trivandrum.
              </em>
            </h2>
            <p className="mt-5 max-w-xl text-sm sm:text-base leading-relaxed text-ivory/75">
              Tell us what you&apos;re looking for — a first flat, a family home,
              a plot or a commercial address. We&apos;ll come back with honest,
              considered options.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              <a
                href="/contact"
                className="group inline-flex h-13 sm:h-14 items-center justify-center gap-3 bg-gradient-to-r from-gold-soft via-gold to-gold-deep px-8 sm:px-9 text-[12px] font-semibold uppercase tracking-[0.18em] text-charcoal shadow-[0_4px_20px_rgba(212,175,55,0.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_6px_28px_rgba(212,175,55,0.5)] active:scale-[0.98] w-full sm:w-auto"
              >
                <span>Enquire Now</span>
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <a
                href={buildWhatsAppUrl(contact.whatsapp.number, generalEnquiryMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-13 sm:h-14 items-center justify-center gap-3 border border-ivory/30 bg-charcoal/40 px-8 sm:px-9 text-[12px] font-medium uppercase tracking-[0.18em] text-ivory backdrop-blur-md transition-all duration-300 hover:border-gold hover:text-gold-soft hover:bg-charcoal/70 w-full sm:w-auto"
              >
                <WhatsAppIcon className="size-4.5" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
