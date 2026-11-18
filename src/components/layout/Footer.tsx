"use client";

import Link from "next/link";
import { Phone, MapPin, ArrowUp, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Logo } from "./Logo";
import { navigation } from "@/data/navigation";
import { locations } from "@/data/locations";
import { propertyTypePages } from "@/data/property-types";
import { brand } from "@/config/brand";
import { contact } from "@/config/contact";
import { social } from "@/config/social";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";
import { buildWhatsAppUrl, generalEnquiryMessage } from "@/lib/whatsapp";

/**
 * World-class luxury footer for Golden Acres Real Estate.
 * Features an editorial pre-footer consultation prompt, balanced 4-column
 * architectural grid, direct advisory lines, trust credentials, and an interactive back-to-top.
 */
export function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-charcoal text-ivory overflow-hidden border-t border-gold/20">
      {/* Background subtle gold ambient spotlight */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(212,175,55,0.06)_0%,_transparent_70%)]" />

      {/* 1. Pre-Footer Luxury Advisory Prompt */}
      <div className="glass-dark relative border-b border-ivory/10">
        <div className="container-site py-12 lg:py-14">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="eyebrow text-gold font-medium tracking-[0.32em] text-[11px]">
                Private Real Estate Advisory
              </span>
              <h2 className="mt-3 font-serif text-2xl font-light tracking-[-0.01em] text-ivory sm:text-3xl lg:text-4xl">
                Looking to buy, sell, or evaluate property in{" "}
                <em className="italic text-gold-soft font-normal">Trivandrum?</em>
              </h2>
              <p className="mt-2 text-sm text-ivory/70 sm:text-[15px]">
                Speak directly with an experienced consultant for honest, confidential market guidance.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 shrink-0 w-full lg:w-auto">
              <a
                href={buildWhatsAppUrl(contact.whatsapp.number, generalEnquiryMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-12 items-center justify-center gap-2.5 bg-gradient-to-r from-gold-soft via-gold to-gold-deep px-6 text-[12px] font-semibold uppercase tracking-[0.18em] text-charcoal shadow-[0_2px_14px_rgba(212,175,55,0.3)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_4px_22px_rgba(212,175,55,0.45)] active:scale-[0.98] w-full sm:w-auto"
              >
                <WhatsAppIcon className="size-4" />
                <span>WhatsApp Advisory</span>
              </a>

              <a
                href={`tel:${contact.phone.tel}`}
                className="inline-flex h-12 items-center justify-center gap-2.5 border border-ivory/25 bg-charcoal-soft/60 px-6 text-[12px] font-medium uppercase tracking-[0.18em] text-ivory backdrop-blur-md transition-all duration-300 hover:border-gold hover:text-gold-soft hover:bg-charcoal active:scale-[0.98] w-full sm:w-auto"
              >
                <Phone className="size-3.5 text-gold" />
                <span>Call {contact.phone.display}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Architectural Grid */}
      <div className="container-site relative z-10 py-16 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.9fr_1.1fr_1.1fr] lg:gap-14">
          {/* Column 1: Brand Authority & Heritage */}
          <div className="flex flex-col justify-between">
            <div>
              <Logo dark />
              <p className="mt-5 text-[14px] leading-relaxed text-ivory/70 max-w-sm">
                Golden Acres Real Estate is a premier consultancy based in Trivandrum, Kerala.
                We provide title-checked guidance across residential homes, luxury villas, commercial spaces, and verified land parcels.
              </p>

              {/* Trust badges */}
              <div className="mt-6 space-y-2 text-[12px] text-ivory/60">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-gold shrink-0" />
                  <span>Title & Mother Deed Legal Due Diligence</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-gold shrink-0" />
                  <span>Technopark Corridor & Trivandrum City Specialists</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-gold shrink-0" />
                  <span>Direct, Honest Investor & Family Advisory</span>
                </div>
              </div>
            </div>

            {/* Social & WhatsApp connect */}
            <div className="mt-8 pt-6 border-t border-ivory/10">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.3em] text-ivory/40">
                Direct Channels
              </span>
              <div className="mt-3 flex items-center gap-3">
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Golden Acres on Instagram"
                  className="group inline-flex items-center gap-2.5 border border-ivory/20 bg-charcoal-soft/40 px-3.5 py-2 text-xs text-ivory/75 transition-all duration-300 hover:border-gold hover:text-gold-soft hover:bg-charcoal"
                >
                  <InstagramIcon className="size-4" />
                  <span className="text-[11px] font-medium tracking-wider">@{brand.instagramHandle}</span>
                </a>

                <a
                  href={buildWhatsAppUrl(contact.whatsapp.number, generalEnquiryMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Golden Acres WhatsApp"
                  className="flex size-9 items-center justify-center border border-ivory/20 bg-charcoal-soft/40 text-ivory/75 transition-all duration-300 hover:border-gold hover:text-gold-soft hover:bg-charcoal"
                >
                  <WhatsAppIcon className="size-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation & Discover */}
          <div>
            <h3 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">
              <span>Navigation</span>
              <span className="h-px w-6 bg-gold/40" />
            </h3>
            <ul className="mt-6 space-y-3.5 text-[14px]">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-ivory/70 transition-colors duration-200 hover:text-gold-soft"
                  >
                    <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-2" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/faq"
                  className="group inline-flex items-center gap-2 text-ivory/70 transition-colors duration-200 hover:text-gold-soft"
                >
                  <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-2" />
                  <span>Frequently Asked Questions</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Property Types & Prime Locations */}
          <div>
            <h3 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">
              <span>Property Portfolio</span>
              <span className="h-px w-6 bg-gold/40" />
            </h3>
            <ul className="mt-6 space-y-3 text-[13.5px]">
              {propertyTypePages.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/trivandrum/${t.slug}`}
                    className="inline-flex items-center gap-2 text-ivory/70 transition-colors hover:text-gold-soft"
                  >
                    <span className="text-gold/50 text-[10px]">›</span>
                    <span>{t.navLabel} in Trivandrum</span>
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="mt-8 flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.3em] text-ivory/45">
              <span>Key Areas We Serve</span>
              <span className="h-px w-4 bg-ivory/20" />
            </h4>
            <div className="mt-3.5 grid grid-cols-2 gap-x-3 gap-y-2 text-[12.5px] text-ivory/65">
              {locations.slice(0, 8).map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/locations/${loc.slug}`}
                  className="transition-colors hover:text-gold-soft truncate"
                >
                  {loc.name}
                </Link>
              ))}
            </div>
            <Link
              href="/locations"
              className="mt-3.5 inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-gold-soft hover:text-ivory transition-colors"
            >
              <span>Explore all locations</span>
              <ArrowRight className="size-3" />
            </Link>
          </div>

          {/* Column 4: Private Concierge & Advisory Contacts */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">
                <span>Advisory Office</span>
                <span className="h-px w-6 bg-gold/40" />
              </h3>

              <div className="mt-6 space-y-3.5">
                {/* Primary phone */}
                <a
                  href={`tel:${contact.phone.tel}`}
                  className="glass-dark group flex items-start gap-3 rounded-lg p-3 transition-all duration-300 hover:border-gold/60"
                >
                  <Phone className="size-4 text-gold mt-0.5 shrink-0 transition-transform duration-300 group-hover:scale-110" />
                  <div>
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.25em] text-ivory/40">
                      Primary Advisory Line
                    </span>
                    <span className="text-[14px] font-medium text-ivory group-hover:text-gold-soft transition-colors">
                      {contact.phone.display}
                    </span>
                  </div>
                </a>

                {/* Secondary phone */}
                {contact.phoneAlt.display && (
                  <a
                    href={`tel:${contact.phoneAlt.tel}`}
                    className="glass-dark group flex items-start gap-3 rounded-lg p-3 transition-all duration-300 hover:border-gold/60"
                  >
                    <Phone className="size-4 text-gold mt-0.5 shrink-0 transition-transform duration-300 group-hover:scale-110" />
                    <div>
                      <span className="block text-[10px] font-semibold uppercase tracking-[0.25em] text-ivory/40">
                        Alternate Line
                      </span>
                      <span className="text-[14px] font-medium text-ivory group-hover:text-gold-soft transition-colors">
                        {contact.phoneAlt.display}
                      </span>
                    </div>
                  </a>
                )}

                {/* Location */}
                <div className="glass-dark flex items-start gap-3 rounded-lg p-3">
                  <MapPin className="size-4 text-gold mt-0.5 shrink-0" />
                  <div>
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.25em] text-ivory/40">
                      Operations Hub
                    </span>
                    <span className="text-[13px] text-ivory/80 leading-relaxed">
                      Thiruvananthapuram (Trivandrum), Kerala, India
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              className="glass-gold mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-lg px-5 text-[11.5px] font-semibold uppercase tracking-[0.2em] text-gold-soft transition-all duration-300 hover:border-gold hover:text-charcoal hover:bg-gold"
            >
              <span>Schedule Private Consultation</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Bottom Legal & Copyright Bar */}
      <div className="border-t border-ivory/10 bg-[#0B0907]">
        <div className="container-site flex flex-col items-center justify-between gap-4 py-6 text-[12px] text-ivory/50 sm:flex-row">
          <p className="text-center sm:text-left">
            © {year} <span className="text-ivory/80 font-medium">{brand.legalName}</span>. All rights reserved. Real Estate Consultancy — Trivandrum, Kerala.
          </p>

          <div className="flex items-center gap-6">
            <span className="text-ivory/40 hidden md:inline">
              Kazhakootam · Anayara · Trivandrum City
            </span>

            {/* Back to top button */}
            <button
              type="button"
              onClick={scrollToTop}
              className="group inline-flex items-center gap-2 border border-ivory/15 bg-charcoal px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-ivory/70 transition-all duration-300 hover:border-gold hover:text-gold-soft hover:bg-charcoal-soft"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 text-gold" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
