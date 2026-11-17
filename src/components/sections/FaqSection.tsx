import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/motion-primitives";
import type { Faq } from "@/data/faqs";

/**
 * Visible FAQ list using native <details> so every answer is in the HTML
 * (crawlable, quotable by AI assistants) and works without JavaScript.
 * The page that renders this must also emit matching FAQPage JSON-LD.
 */
export function FaqSection({
  faqs,
  eyebrow = "Questions answered",
  title,
  lede,
  id = "faq-heading",
  className = "py-20 lg:py-28",
}: {
  faqs: Faq[];
  eyebrow?: string;
  title: React.ReactNode;
  lede?: string;
  id?: string;
  className?: string;
}) {
  return (
    <section className={className} aria-labelledby={id}>
      <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <div id={id}>
          <SectionHeading eyebrow={eyebrow} title={title} lede={lede} />
        </div>
        <Reveal delay={0.1}>
          <div className="divide-y divide-charcoal/10 border-y border-charcoal/10">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left [&::-webkit-details-marker]:hidden">
                  <h3 className="font-serif text-lg font-light leading-snug text-charcoal sm:text-xl">
                    {faq.question}
                  </h3>
                  <Plus
                    className="mt-1 size-5 shrink-0 text-gold-deep transition-transform duration-300 group-open:rotate-45"
                    aria-hidden
                  />
                </summary>
                <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
