"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import Link from "next/link";
import { navigation } from "@/data/navigation";
import { contact } from "@/config/contact";
import { social } from "@/config/social";
import { Logo } from "./Logo";
import { buildWhatsAppUrl, generalEnquiryMessage } from "@/lib/whatsapp";
import { InstagramIcon } from "@/components/ui/icons";
import { EASE } from "@/lib/animations/variants";
import { cn } from "@/lib/utils";

/** Full-screen charcoal mobile navigation with staggered link reveal. */
export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const links = [
    ...navigation,
    { label: "Enquire Now", href: "/contact" },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-charcoal lg:hidden"
        >
          <div className="container-site flex h-20 items-center justify-between">
            <div onClick={onClose}>
              <Logo dark />
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="flex size-11 items-center justify-center border border-ivory/30 text-ivory"
            >
              <X className="size-5" />
            </button>
          </div>

          <nav
            aria-label="Mobile"
            className="container-site flex min-h-0 flex-1 flex-col justify-center py-6"
          >
            <ul className="space-y-1">
              {links.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.06 + i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "group flex items-baseline gap-4 border-b border-ivory/[0.08] py-3 sm:py-4",
                      item.label === "Enquire Now" ? "text-gold-soft" : "text-ivory"
                    )}
                  >
                    <span className="font-serif text-3xl font-light tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                      {item.label}
                    </span>
                    <ArrowUpRight className="size-5 self-center opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="container-site pb-10"
          >
            <div className="flex flex-col gap-2 text-sm text-ivory/70">
              <a href={`tel:${contact.phone.tel}`} className="hover:text-ivory">
                {contact.phone.display}
              </a>
              <a
                href={buildWhatsAppUrl(contact.whatsapp.number, generalEnquiryMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ivory"
              >
                WhatsApp us
              </a>
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-ivory"
              >
                <InstagramIcon className="size-4" /> @golden_acres_realestates
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
