import Link from "next/link";
import { Phone } from "lucide-react";
import { Logo } from "./Logo";
import { navigation } from "@/data/navigation";
import { brand } from "@/config/brand";
import { contact } from "@/config/contact";
import { social } from "@/config/social";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";
import { buildWhatsAppUrl, generalEnquiryMessage } from "@/lib/whatsapp";

const contactLinks = [
  ...(contact.phone.display
    ? [{ label: contact.phone.display, href: `tel:${contact.phone.tel}` }]
    : []),
  ...(contact.phoneAlt.display
    ? [{ label: contact.phoneAlt.display, href: `tel:${contact.phoneAlt.tel}` }]
    : []),
  ...(contact.email.address
    ? [{ label: contact.email.address, href: `mailto:${contact.email.address}` }]
    : []),
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-charcoal text-ivory">
      <div className="container-site grid gap-14 py-20 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:py-24">
        {/* Brand */}
        <div className="max-w-sm">
          <Logo dark />
          <p className="mt-6 text-sm leading-relaxed text-ivory/60">
            {brand.shortDescription} Serving Kazhakootam, Anayara, Vellayani,
            Pothencode, Malayinkeezhu, Enchakkal and across Trivandrum.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Golden Acres on Instagram"
              className="flex size-10 items-center justify-center border border-ivory/20 text-ivory/70 transition-colors hover:border-gold hover:text-gold-soft"
            >
              <InstagramIcon className="size-4.5" />
            </a>
            <a
              href={buildWhatsAppUrl(contact.whatsapp.number, generalEnquiryMessage)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with Golden Acres on WhatsApp"
              className="flex size-10 items-center justify-center border border-ivory/20 text-ivory/70 transition-colors hover:border-gold hover:text-gold-soft"
            >
              <WhatsAppIcon className="size-4" />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <nav aria-label="Footer">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.32em] text-ivory/40">
            Explore
          </h2>
          <ul className="mt-5 space-y-3">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-ivory/75 transition-colors hover:text-gold-soft"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Service areas */}
        <div>
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.32em] text-ivory/40">
            Areas we serve
          </h2>
          <ul className="mt-5 space-y-3 text-sm text-ivory/75">
            {brand.serviceAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.32em] text-ivory/40">
            Get in touch
          </h2>
          <ul className="mt-5 space-y-3">
            {contactLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex items-center gap-2.5 text-sm text-ivory/75 transition-colors hover:text-gold-soft"
                >
                  <Phone className="size-3.5 text-gold" />
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={buildWhatsAppUrl(contact.whatsapp.number, generalEnquiryMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-sm text-ivory/75 transition-colors hover:text-gold-soft"
              >
                <WhatsAppIcon className="size-3.5 text-gold" />
                WhatsApp enquiry
              </a>
            </li>
          </ul>
          {contact.address.line1 ? (
            <address className="mt-6 text-sm not-italic leading-relaxed text-ivory/60">
              {contact.address.line1}
              <br />
              {contact.address.line2}
            </address>
          ) : null}
          <Link
            href="/contact"
            className="mt-6 inline-block border border-ivory/25 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-ivory transition-colors hover:border-gold hover:text-gold-soft"
          >
            Contact Page
          </Link>
        </div>
      </div>

      <div className="border-t border-ivory/[0.08]">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-6 text-xs text-ivory/45 sm:flex-row">
          <p>
            © {year} {brand.legalName}. All rights reserved.
          </p>
          <p>Real estate consultancy — Trivandrum, Kerala</p>
        </div>
      </div>
    </footer>
  );
}
