import Link from "next/link";
import {
  Home,
  Handshake,
  Map,
  TrendingUp,
  Building2,
  Briefcase,
  ArrowUpRight,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/motion-primitives";
import { services } from "@/data/services";
import type { Service } from "@/types";

const iconMap: Record<Service["icon"], React.ComponentType<{ className?: string }>> = {
  Home,
  Handshake,
  Map,
  TrendingUp,
  Building2,
  Briefcase,
};

/** Services — editorial numbered rows with hairline dividers. */
export function ServicesSection() {
  return (
    <section className="py-24 lg:py-36" aria-labelledby="services-heading">
      <div className="container-site">
        <SectionHeading
          eyebrow="What we do"
          title={
            <span id="services-heading">
              Every step of the property journey, <em className="italic text-gold-deep">handled personally</em>
            </span>
          }
          lede="Residential and commercial — buying, selling, land and investment guidance under one roof."
          align="center"
        />

        <div className="mt-16 border-t border-charcoal/10">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Home;
            return (
              <Reveal key={service.slug} delay={i * 0.05}>
                <Link
                  href="/services"
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 border-b border-charcoal/10 py-7 transition-colors duration-300 hover:bg-secondary/70 sm:grid-cols-[64px_240px_1fr_auto] sm:gap-8 sm:px-4 lg:py-8"
                >
                  <span className="hidden font-serif text-lg text-charcoal/35 sm:block">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex items-center gap-3.5">
                    <Icon className="size-5 text-gold-deep" aria-hidden />
                    <h3 className="font-serif text-xl font-light text-charcoal sm:text-2xl">
                      {service.title}
                    </h3>
                  </span>
                  <p className="hidden text-sm leading-relaxed text-muted-foreground sm:block">
                    {service.description}
                  </p>
                  <span className="flex size-11 items-center justify-center border border-charcoal/15 text-charcoal/60 transition-all duration-300 group-hover:border-gold-deep group-hover:bg-gold-deep group-hover:text-ivory">
                    <ArrowUpRight className="size-4.5" aria-hidden />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
