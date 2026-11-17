import type { Testimonial } from "@/types";

/**
 * Testimonials — renders nothing unless verified reviews exist in
 * src/data/testimonials.ts (the brand hasn't published any yet, so the
 * site never shows fabricated quotes).
 */
export function Testimonials({ items }: { items: Testimonial[] }) {
  if (items.length === 0) return null;

  return (
    <section className="py-24 lg:py-32" aria-labelledby="testimonials-heading">
      <div className="container-site">
        <h2
          id="testimonials-heading"
          className="font-serif text-3xl font-light text-charcoal sm:text-4xl"
        >
          What our clients say
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items
            .filter((t) => t.verified)
            .map((t) => (
              <figure
                key={t.name}
                className="border border-charcoal/10 bg-card p-8"
              >
                <blockquote className="font-serif text-lg font-light leading-relaxed text-charcoal/85">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-charcoal/10 pt-4 text-sm">
                  <span className="font-medium text-charcoal">{t.name}</span>
                  <span className="block text-muted-foreground">{t.role}</span>
                </figcaption>
              </figure>
            ))}
        </div>
      </div>
    </section>
  );
}
