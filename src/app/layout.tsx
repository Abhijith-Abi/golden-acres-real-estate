import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { Toaster } from "@/components/ui/sonner";
import { site } from "@/config/social";
import { brand } from "@/config/brand";
import { social } from "@/config/social";

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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Real Estate Consultant in Trivandrum`,
    template: `%s — ${site.name}`,
  },
  description: brand.description,
  keywords: [
    "Golden Acres Real Estates",
    "real estate Trivandrum",
    "property consultant Trivandrum",
    "flats for sale Trivandrum",
    "land for sale Trivandrum",
    "houses for sale Trivandrum",
    "Kazhakootam property",
    "Anayara property",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — Real Estate Consultant in Trivandrum`,
    description: brand.shortDescription,
    url: site.url,
    locale: site.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Real Estate Consultant in Trivandrum`,
    description: brand.shortDescription,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#F8F5EF",
  width: "device-width",
  initialScale: 1,
};

/** Local SEO — real, published brand facts only. */
function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: brand.legalName,
    url: site.url,
    description: brand.description,
    areaServed: brand.serviceAreas.map((name) => ({
      "@type": "City",
      name: `${name}, Thiruvananthapuram`,
    })),
    sameAs: [social.instagram],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Thiruvananthapuram",
      addressRegion: "Kerala",
      addressCountry: "IN",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${fraunces.variable} ${manrope.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <StructuredData />
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
