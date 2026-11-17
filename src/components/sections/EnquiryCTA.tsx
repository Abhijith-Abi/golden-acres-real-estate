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
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-gold-soft">Start the conversation</p>
          <h2
            id="enquiry-cta-heading"
            className="mt-4 text-balance font-serif text-4xl font-light leading-[1.08] text-ivory sm:text-5xl lg:text-6xl"
          >
            Let&apos;s find your ground in{" "}
            <em className="italic text-gold-soft">Trivandrum.</em>
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-ivory/70">
            Tell us what you&apos;re looking for — a first flat, a family home,
            a plot or a commercial address. We&apos;ll come back with honest,
            considered options.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="/contact"
              className="group inline-flex h-14 items-center gap-3 bg-gradient-to-r from-gold-soft via-gold to-gold-deep px-9 text-[12px] font-semibold uppercase tracking-[0.18em] text-charcoal shadow-[0_4px_20px_rgba(212,175,55,0.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_6px_28px_rgba(212,175,55,0.5)] active:scale-[0.98]"
            >
              Enquire Now
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a
              href={buildWhatsAppUrl(contact.whatsapp.number, generalEnquiryMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center gap-3 border border-ivory/30 px-9 text-[12px] font-medium uppercase tracking-[0.18em] text-ivory transition-colors hover:border-ivory/70 hover:bg-ivory/10"
            >
              <WhatsAppIcon className="size-4.5" />
              WhatsApp Us
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
