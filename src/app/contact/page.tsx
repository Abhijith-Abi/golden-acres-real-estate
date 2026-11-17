import { Phone, Clock } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/motion-primitives";
import { ContactForm } from "@/components/forms/ContactForm";
import { WhatsAppIcon, InstagramIcon } from "@/components/ui/icons";
import { contact } from "@/config/contact";
import { social } from "@/config/social";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, coreKeywords } from "@/lib/seo";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";

import { brand } from "@/config/brand";
import { buildWhatsAppUrl, generalEnquiryMessage } from "@/lib/whatsapp";
import { imagery } from "@/data/imagery";
import Image from "next/image";

const contactDescription =
  "Contact Golden Acres Real Estates in Trivandrum. Call or WhatsApp for land, flat, house and commercial property enquiries, or send the form and we will call you back.";

export const metadata = buildMetadata({
  title: "Contact Golden Acres — Real Estate in Trivandrum",
  description: contactDescription,
  path: "/contact",
  keywords: ["contact real estate agent Trivandrum", "property enquiry Trivandrum", ...coreKeywords.slice(0, 5)],
});

export default function ContactPage() {
  const channels = [
    ...(contact.phone.display
      ? [
          {
            icon: Phone,
            title: "Call us",
            lines: [
              { label: contact.phone.display, href: `tel:${contact.phone.tel}` },
              ...(contact.phoneAlt.display
                ? [{ label: contact.phoneAlt.display, href: `tel:${contact.phoneAlt.tel}` }]
                : []),
            ],
          },
        ]
      : []),
    {
      icon: WhatsAppIcon,
      title: "WhatsApp",
      lines: [
        {
          label: "Start a chat",
          href: buildWhatsAppUrl(contact.whatsapp.number, generalEnquiryMessage),
          external: true,
        },
      ],
    },
    ...(contact.email.address
      ? [
          {
            icon: Clock,
            title: "Email",
            lines: [
              { label: contact.email.address, href: `mailto:${contact.email.address}` },
            ],
          },
        ]
      : []),
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
          webPageSchema({
            type: "ContactPage",
            name: `Contact ${brand.legalName}`,
            description: contactDescription,
            path: "/contact",
          }),
        ]}
      />
      <PageHero
        breadcrumb="Contact"
        eyebrow="Get in touch"
        title={
          <>
            Let&apos;s talk about{" "}
            <em className="italic text-gold-soft">your next address</em>
          </>
        }
        lede="Call, WhatsApp or send the form — a real consultant replies, usually the same day."
      />

      <section className="py-20 lg:py-28">
        <div className="container-site grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          {/* Form */}
          <Reveal>
            <p className="eyebrow">Send a message</p>
            <h2 className="mt-4 font-serif text-3xl font-light text-charcoal sm:text-4xl">
              Tell us what you&apos;re looking for
            </h2>
            <div className="mt-10">
              <ContactForm />
            </div>
          </Reveal>

          {/* Channels */}
          <div className="space-y-6">
            {channels.map((ch, i) => (
              <Reveal key={ch.title} delay={i * 0.08}>
                <div className="flex gap-5 border border-charcoal/10 bg-card p-7">
                  <span className="flex size-12 shrink-0 items-center justify-center border border-gold/40 text-gold-deep">
                    <ch.icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-serif text-xl font-light text-charcoal">{ch.title}</h3>
                    <ul className="mt-2 space-y-1">
                      {ch.lines.map((line) => (
                        <li key={line.href}>
                          <a
                            href={line.href}
                            {...("external" in line && line.external
                              ? { target: "_blank", rel: "noopener noreferrer" }
                              : {})}
                            className="text-[14px] text-muted-foreground transition-colors hover:text-gold-deep"
                          >
                            {line.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}

            {/* Instagram + areas */}
            <Reveal delay={0.2}>
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-5 bg-charcoal p-7 text-ivory"
              >
                <div className="flex items-center gap-5">
                  <span className="flex size-12 items-center justify-center border border-ivory/25 text-gold-soft">
                    <InstagramIcon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-serif text-xl font-light">Follow on Instagram</h3>
                    <p className="mt-1 text-[13px] text-ivory/60">
                      @{brand.instagramHandle} — new listings posted regularly
                    </p>
                  </div>
                </div>
                <span aria-hidden className="text-ivory/50 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="border border-charcoal/10 bg-secondary/60 p-7">
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-charcoal/60">
                  Areas we serve
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {brand.serviceAreas.map((area) => (
                    <span
                      key={area}
                      className="border border-charcoal/10 bg-card px-3 py-1.5 text-[12px] text-charcoal/75"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Office / map — only when verified */}
            {contact.address.mapsEmbedUrl ? (
              <Reveal delay={0.3}>
                <div className="aspect-[4/3] w-full overflow-hidden border border-charcoal/10">
                  <iframe
                    src={contact.address.mapsEmbedUrl}
                    title="Golden Acres Real Estates — office location"
                    className="h-full w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </Reveal>
            ) : (
              <Reveal delay={0.3}>
                <div className="relative overflow-hidden border border-charcoal/10">
                  <Image
                    src={imagery.contactMain}
                    alt={imagery.contactMainAlt}
                    width={1200}
                    height={900}
                    loading="lazy"
                    className="h-48 w-full object-cover opacity-90"
                  />
                  <div className="flex items-center justify-between gap-4 bg-card px-6 py-5">
                    <p className="text-[13px] text-muted-foreground">
                      Office address & map will be published once verified.
                      Until then, visits are by appointment — call or WhatsApp.
                    </p>
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
