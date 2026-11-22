"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { WhatsAppIcon } from "@/components/ui/icons";
import { contact } from "@/config/contact";
import { buildWhatsAppUrl, generalEnquiryMessage } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/analytics";

/** Floating WhatsApp button — appears after a short scroll, sits clear of the toaster. */
export function FloatingWhatsApp() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [80, 320], [0, 1]);
  const scale = useTransform(scrollY, [80, 320], [0.6, 1]);
  const pointer = useTransform(scrollY, (y) => (y > 80 ? "auto" : "none"));

  const href = buildWhatsAppUrl(contact.whatsapp.number, generalEnquiryMessage);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Golden Acres on WhatsApp"
      onClick={() => trackWhatsAppClick("floating_button")}
      style={reduced ? undefined : { opacity, scale, pointerEvents: pointer }}
      className="fixed bottom-5 right-5 z-40 flex size-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 sm:bottom-7 sm:right-7"
    >
      <WhatsAppIcon className="size-6.5" />
    </motion.a>
  );
}
