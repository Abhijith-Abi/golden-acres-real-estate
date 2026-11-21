/**
 * Contact configuration — EDIT BEFORE LAUNCH.
 *
 * ⚠ UNVERIFIED: the two phone numbers below were found in the brand's own
 * Instagram caption ("Call or WhatsApp: 92922 90826 / 95627 27636") but have
 * not been independently confirmed. Confirm with the client before go-live.
 * Everything else in this file is intentionally left empty until verified.
 */

export const contact = {
  /** Primary phone shown across the site — mark `verified` true only after confirmation. */
  phone: {
    display: "+91 92922 90826",
    tel: "+919292290826",
    verified: false, // ← set to true after client confirmation
  },
  /** Secondary phone (used on the contact page only). */
  phoneAlt: {
    display: "+91 95627 27636",
    tel: "+919562727636",
    verified: false, // ← set to true after client confirmation
  },
  /**
   * WhatsApp number (international format, digits only, no "+" or spaces).
   * Powers the floating button, enquiry handoff and pre-filled messages.
   */
  whatsapp: {
    number: "919292290826",
    verified: false, // ← set to true after client confirmation
  },
  /** Official public email address. */
  email: {
    address: "abi@abisolutions.in",
    verified: true,
  },
  /** No verified street address yet — leave empty to hide address blocks. */
  address: {
    line1: "",
    line2: "",
    city: "Trivandrum",
    state: "Kerala",
    postalCode: "",
    mapsEmbedUrl: "", // Google Maps embed URL — add only when verified
  },
  /** Simple availability line, only shown when filled. */
  businessHours: "",
} as const;
