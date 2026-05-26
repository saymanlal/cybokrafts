import type { Metadata } from "next";
import { Barlow_Condensed, DM_Sans, JetBrains_Mono } from "next/font/google";
import { LazyMotion, domAnimation } from "framer-motion";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-barlow",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cybokrafts.vercel.app"),

  title: {
    default:
      "Cybokrafts - AI-Powered Energy Infrastructure Monitoring | Smart Grid Solutions",
    template: "%s | Cybokrafts Universal Innovations",
  },

  description:
    "Leading AI-powered monitoring systems for Solar, EV, and Transformer energy infrastructure. CYBO-VAJRA patented device for predictive maintenance, real-time analytics, and grid intelligence.",

  keywords: [
    "transformer monitoring system",
    "AI power distribution",
    "smart grid technology",
    "predictive maintenance energy",
    "IoT energy monitoring",
    "CYBO-VAJRA transformer monitoring",
    "AIpowerOS grid intelligence",
    "real-time transformer analytics",
    "distribution transformer monitoring",
    "power transformer health monitoring",
    "AI energy infrastructure",
    "machine learning power grid",
    "IoT transformer sensors",
    "cloud-based energy monitoring",
    "predictive failure detection",
    "solar energy monitoring",
    "EV charging infrastructure monitoring",
    "renewable energy management",
    "utility grid monitoring",
    "industrial energy solutions",
    "energy monitoring India",
    "smart grid solutions India",
    "transformer monitoring Chhattisgarh",
    "Atmanirbhar Bharat energy",
    "B2B energy solutions",
    "enterprise transformer monitoring",
    "utility monitoring system",
    "industrial IoT energy",
    "SCADA alternative",
    "reduce transformer downtime",
    "prevent transformer failure",
    "optimize energy distribution",
    "reduce electricity distribution losses",
    "real-time grid monitoring dashboard",
  ],

  authors: [
    {
      name: "Cybokrafts Universal Innovations Private Limited",
      url: "https://cybokrafts.vercel.app",
    },
  ],

  creator: "Cybokrafts Universal Innovations Pvt. Ltd.",
  publisher: "Cybokrafts Universal Innovations Pvt. Ltd.",

  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://cybokrafts.vercel.app",
    siteName: "Cybokrafts Universal Innovations",
    title:
      "Cybokrafts - AI-Powered Energy Infrastructure Monitoring & Smart Grid Solutions",
    description:
      "Transform your energy infrastructure with CYBO-VAJRA patented AI monitoring system. Real-time analytics, predictive maintenance, and grid intelligence.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Cybokrafts - AI-Powered Energy Infrastructure Monitoring",
      },
      {
        url: "/og-image-square.jpg",
        width: 1200,
        height: 1200,
        alt: "CYBO-VAJRA Transformer Monitoring Device",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Cybokrafts - AI-Powered Energy Infrastructure Monitoring",
    description:
      "Leading AI monitoring systems for transformers, solar & EV infrastructure.",
    images: ["/twitter-image.jpg"],
    creator: "@cybokrafts",
    site: "@cybokrafts",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://cybokrafts.vercel.app",
    languages: {
      "en-IN": "https://cybokrafts.vercel.app",
    },
  },

  verification: {
    google: "GtDRX3ONvRXYgr6Gxfgy4zf1Cml79WpXWbHNIvIoTwE",
    yandex: "3ff81350da35c2b0",
    other: {
      "msvalidate.01": "97C9E42B6BA2F653B1D1B55F184ED3B8",
    },
  },

  category: "Technology",

  applicationName: "Cybokrafts",

  appleWebApp: {
    capable: true,
    title: "Cybokrafts",
    statusBarStyle: "black-translucent",
  },

  other: {
    "application-name": "Cybokrafts",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style":
      "black-translucent",
    "apple-mobile-web-app-title": "Cybokrafts",
    referrer: "origin-when-cross-origin",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Cybokrafts Universal Innovations Private Limited",
    alternateName: "Cybokrafts",
    url: "https://cybokrafts.vercel.app",
    logo: "https://cybokrafts.vercel.app/logo.png",
    description:
      "Leading AI-powered monitoring systems for energy infrastructure including transformers, solar, and EV charging networks.",
    foundingDate: "2025",

    founders: [
      {
        "@type": "Person",
        name: "Mr. Akhil Chawla",
      },
    ],

    address: {
      "@type": "PostalAddress",
      addressLocality: "Raipur",
      addressRegion: "Chhattisgarh",
      postalCode: "492001",
      addressCountry: "IN",
    },

    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Sales",
      email: "contact@cybokrafts.com",
      availableLanguage: ["English", "Hindi"],
    },

    sameAs: [
      "https://www.linkedin.com/company/cybokrafts",
      "https://twitter.com/cybokrafts",
      "https://www.instagram.com/cybokrafts",
    ],

    award: [
      "DPIIT Startup India Recognition",
      "IIT Indore Incubated Startup",
    ],

    memberOf: {
      "@type": "Organization",
      name: "IIT Indore Incubation Center",
    },

    partner: [
      {
        "@type": "Organization",
        name: "Tata Tele Business Services",
      },
      {
        "@type": "Organization",
        name: "IIT Indore",
      },
    ],
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "CYBO-VAJRA",

    description:
      "Patented AI-powered transformer monitoring device for real-time analytics and predictive maintenance",

    brand: {
      "@type": "Brand",
      name: "Cybokrafts",
    },

    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "50",
    },

    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Patent Number",
        value: "202521117118",
      },
      {
        "@type": "PropertyValue",
        name: "Category",
        value: "Industrial IoT Device",
      },
    ],
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "AIpowerOS",

    applicationCategory: "BusinessApplication",

    operatingSystem: "Web-based",

    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },

    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "120",
    },

    featureList: [
      "Real-time transformer monitoring",
      "Predictive maintenance alerts",
      "AI-driven analytics",
      "Cloud dashboard",
      "Automated reporting",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Charset */}
        <meta
          httpEquiv="Content-Type"
          content="text/html; charset=UTF-8"
        />

        {/* Preconnect */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* DNS Prefetch */}
        <link
          rel="dns-prefetch"
          href="https://www.google-analytics.com"
        />

        <link
          rel="dns-prefetch"
          href="https://www.googletagmanager.com"
        />

        {/* Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />

        <link
          rel="icon"
          href="/icon.svg"
          type="image/svg+xml"
        />

        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon.png"
        />

        <link rel="manifest" href="/manifest.json" />

        {/* Theme */}
        <meta name="theme-color" content="#00AEEF" />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        {/* Product Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productSchema),
          }}
        />

        {/* Software Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareSchema),
          }}
        />
      </head>

      <body suppressHydrationWarning className={`${dmSans.variable} ${barlowCondensed.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[#F4F6F9] text-[#0C1929]`}>
        <LazyMotion features={domAnimation}>
          {/* Accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only"
          >
            Skip to main content
          </a>
          <Navbar />
          <main id="main-content">
            {children}
          </main>
          <Footer />
        </LazyMotion>
      </body>
    </html>
  );
}