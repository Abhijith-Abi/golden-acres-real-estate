/**
 * WhatsApp deep links with pre-filled enquiry context.
 * The number is configured in src/config/contact.ts.
 */

interface EnquiryContext {
  property?: { title: string; location: string; slug: string };
  project?: { title: string; location: string };
  interest?: string;
}

export function buildWhatsAppUrl(
  number: string,
  message: string,
  context?: EnquiryContext
): string {
  const lines = [
    "Hello Golden Acres Real Estates,",
    "",
    ...(context?.property
      ? [
          `I'm interested in *${context.property.title}* (${context.property.location}).`,
          `View online: /properties/${context.property.slug}`,
          "",
        ]
      : []),
    ...(context?.project
      ? [
          `I'd like to know more about *${context.project.title}* (${context.project.location}).`,
          "",
        ]
      : []),
    ...(context?.interest ? [`Interested in: ${context.interest}`, ""] : []),
    message,
  ];
  const text = lines.join("\n");
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

/** Generic site-wide greeting used by the floating button and CTAs. */
export const generalEnquiryMessage =
  "I'd like to enquire about properties in Trivandrum. Please get in touch.";
