import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { Toaster } from "@/components/ui/sonner";
import { site, social } from "@/config/social";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteGraph } from "@/lib/schema";
import { coreKeywords, SITE_URL } from "@/lib/seo";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  axes: ["SOFT", "WONK"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const homeTitle = "Golden Acres Real Estates — Real Estate in Trivandrum";
const homeDescription =
  "Golden Acres Real Estates (goldenacresrealestate.co.in): Premier property consultants in Trivandrum for land, plots, flats, and luxury villas in Kerala.";
const homeOgDescription =
  "Premier property consultants in Trivandrum for land, plots, flats & luxury villas in Kerala. Find your dream property.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: homeTitle,
    template: `%s | Golden Acres`,
  },
  description: homeDescription,
  applicationName: site.name,
  keywords: coreKeywords,
  authors: [{ name: site.name, url: SITE_URL }],
  creator: site.name,
  publisher: site.name,
  category: "real estate",
  formatDetection: { telephone: true, email: true, address: true },
  // No canonical here: a layout-level canonical would be inherited by any
  // page that forgets its own and point it at the homepage. Every page sets
  // its canonical through buildMetadata().
  openGraph: {
    type: "website",
    siteName: site.name,
    title: homeTitle,
    description: homeOgDescription,
    url: SITE_URL,
    locale: site.locale,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        secureUrl: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: `${site.name} — real estate in Trivandrum, Kerala`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: social.twitter,
    creator: social.twitter,
    title: homeTitle,
    description: homeOgDescription,
    images: [`${SITE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ??
      "google008d788f2689e4cb",
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
  // Regional hints: read by Bing and some directories/AI crawlers (Google ignores them).
  other: {
    "geo.region": "IN-KL",
    "geo.placename": "Thiruvananthapuram",
    "geo.position": "8.5241;76.9366",
    ICBM: "8.5241, 76.9366",
  },
  icons: {
    icon: [
      // Google favicon rules: square, multiple of 48px, stable crawlable URLs.
      // The SVG (140 KB, embeds a raster) and the 32px PNG are not declared;
      // /favicon.ico still contains 16/32/48 for legacy clients.
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#F8F5EF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html
      lang="en-IN"
      className={`${fraunces.variable} ${manrope.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {gaId && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}', { page_path: window.location.pathname });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="flex min-h-full flex-col">
        <JsonLd data={siteGraph()} />
        <SmoothScrollProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-charcoal focus:px-4 focus:py-2 focus:text-ivory"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <FloatingWhatsApp />
          <Toaster position="bottom-center" />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
