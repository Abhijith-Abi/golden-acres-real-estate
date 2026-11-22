/** Social profiles — only links published by the brand. */

export const social = {
  instagram: "https://www.instagram.com/golden_acres_realestates/",
  twitter: process.env.NEXT_PUBLIC_TWITTER_HANDLE ?? "@goldenacresre",
} as const;

/**
 * Site-wide configuration: canonical URL, SEO defaults and how enquiries
 * are delivered.
 */
export const site = {
  /** Canonical production URL — set NEXT_PUBLIC_SITE_URL to override. */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://www.goldenacresrealestate.co.in",
  name: "Golden Acres Real Estates",
  locale: "en_IN",
  /** Enquiries: "none" until a backend is configured (see README). */
  enquiry: {
    /** Set ENQUIRY_WEBHOOK_URL in .env.local to enable server-side delivery. */
    webhookEnvKey: "ENQUIRY_WEBHOOK_URL",
  },
} as const;
