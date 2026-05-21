import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cybokrafts.vercel.app"),
  
  title: {
    default: "Cybokrafts - AI-Powered Energy Infrastructure Monitoring | Smart Grid Solutions",
    template: "%s | Cybokrafts Universal Innovations"
  },
  
  description: "Leading AI-powered monitoring systems for Solar, EV, and Transformer energy infrastructure. CYBO-VAJRA patented device for predictive maintenance, real-time analytics, and grid intelligence. Backed by IIT Indore & Tata Tele Business Services.",
  
  keywords: [
    // Primary Keywords
    "transformer monitoring system",
    "AI power distribution",
    "smart grid technology",
    "predictive maintenance energy",
    "IoT energy monitoring",
    
    // Product Keywords
    "CYBO-VAJRA transformer monitoring",
    "AIpowerOS grid intelligence",
    "real-time transformer analytics",
    "distribution transformer monitoring",
    "power transformer health monitoring",
    
    // Technology Keywords
    "AI energy infrastructure",
    "machine learning power grid",
    "IoT transformer sensors",
    "cloud-based energy monitoring",
    "predictive failure detection",
    
    // Industry Keywords
    "solar energy monitoring",
    "EV charging infrastructure monitoring",
    "renewable energy management",
    "utility grid monitoring",
    "industrial energy solutions",
    
    // Location Keywords
    "energy monitoring India",
    "smart grid solutions India",
    "transformer monitoring Chhattisgarh",
    "Atmanirbhar Bharat energy",
    
    // B2B Keywords
    "B2B energy solutions",
    "enterprise transformer monitoring",
    "utility monitoring system",
    "industrial IoT energy",
    "SCADA alternative",
    
    // Long-tail Keywords
    "reduce transformer downtime",
    "prevent transformer failure",
    "optimize energy distribution",
    "reduce electricity distribution losses",
    "real-time grid monitoring dashboard"
  ],
  
  authors: [
    { 
      name: "Cybokrafts Universal Innovations Private Limited",
      url: "https://cybokrafts.vercel.app"
    }
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
    title: "Cybokrafts - AI-Powered Energy Infrastructure Monitoring & Smart Grid Solutions",
    description: "Transform your energy infrastructure with CYBO-VAJRA patented AI monitoring system. Real-time analytics, predictive maintenance, and grid intelligence for transformers, solar, and EV infrastructure. Trusted by utilities across India.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Cybokrafts - AI-Powered Energy Infrastructure Monitoring",
        type: "image/jpeg",
      },
      {
        url: "/og-image-square.jpg",
        width: 1200,
        height: 1200,
        alt: "CYBO-VAJRA Transformer Monitoring Device",
        type: "image/jpeg",
      }
    ],
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Cybokrafts - AI-Powered Energy Infrastructure Monitoring",
    description: "Leading AI monitoring systems for transformers, solar & EV infrastructure. Reduce downtime by 60%. Backed by IIT Indore & Tata.",
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
      "hi-IN": "https://cybokrafts.vercel.app/hi",
    },
  },
  
  verification: {
    google: "GtDRX3ONvRXYgr6Gxfgy4zf1Cml79WpXWbHNIvIoTwE",
    yandex: "3ff81350da35c2b0",
    bing: "97C9E42B6BA2F653B1D1B55F184ED3B8",
  },
  
  category: "Technology",
  
  applicationName: "Cybokrafts Portfolio",
  
  appleWebApp: {
    capable: true,
    title: "Cybokrafts",
    statusBarStyle: "black-translucent",
  },
  
  other: {
    // Schema.org structured data
    "application-name": "Cybokrafts Portfolio",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Cybokrafts",
    
    // Business Information
    "organization": "Cybokrafts Universal Innovations Private Limited",
    "founded": "2025",
    "industry": "Energy Technology",
    "service-area": "India",
    
    // Technical SEO
    "referrer": "origin-when-cross-origin",
    "format-detection": "telephone=yes",
    
    // Social Media
    "og:phone_number": "+91-9300501865",
    "og:email": "contact@cybokrafts.com",
    "og:latitude": "21.2514",
    "og:longitude": "81.6296",
    "og:street-address": "Rampur Chowk",
    "og:locality": "Jabalpur",
    "og:region": "Madhya Pradesh",
    "og:postal-code": "482001",
    "og:country-name": "India",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <meta name="msvalidate.01" content="97C9E42B6BA2F653B1D1B55F184ED3B8" />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta>
      <meta name="google-site-verification" content="GtDRX3ONvRXYgr6Gxfgy4zf1Cml79WpXWbHNIvIoTwE" />
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* Favicon and App Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#00AEEF" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#081120" media="(prefers-color-scheme: dark)" />
        
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Cybokrafts Universal Innovations Private Limited",
              "alternateName": "Cybokrafts",
              "url": "https://cybokrafts.vercel.app",
              "logo": "https://cybokrafts.vercel.app/logo.png",
              "description": "Leading AI-powered monitoring systems for energy infrastructure including transformers, solar, and EV charging networks.",
              "foundingDate": "2025",
              "founders": [
                {
                  "@type": "Person",
                  "name": "Mr. Akhil Chawla"
                }
              ],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Raipur",
                "addressRegion": "Chhattisgarh",
                "postalCode": "492001",
                "addressCountry": "IN"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Sales",
                "email": "contact@cybokrafts.com",
                "availableLanguage": ["English", "Hindi"]
              },
              "sameAs": [
                "https://www.linkedin.com/company/cybokrafts",
                "https://twitter.com/cybokrafts",
                "https://www.instagram.com/cybokrafts"
              ],
              "award": [
                "DPIIT Startup India Recognition",
                "IIT Indore Incubated Startup"
              ],
              "memberOf": {
                "@type": "Organization",
                "name": "IIT Indore Incubation Center"
              },
              "partner": [
                {
                  "@type": "Organization",
                  "name": "Tata Tele Business Services"
                },
                {
                  "@type": "Organization",
                  "name": "IIT Indore"
                }
              ]
            })
          }}
        />
        
        {/* Structured Data - Product */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "CYBO-VAJRA",
              "description": "Patented AI-powered transformer monitoring device for real-time analytics and predictive maintenance",
              "brand": {
                "@type": "Brand",
                "name": "Cybokrafts"
              },
              "offers": {
                "@type": "Offer",
                "availability": "https://schema.org/InStock",
                "priceCurrency": "INR",
                "priceSpecification": {
                  "@type": "PriceSpecification",
                  "price": "Contact for Quote"
                }
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "50"
              },
              "additionalProperty": [
                {
                  "@type": "PropertyValue",
                  "name": "Patent Number",
                  "value": "202521117118"
                },
                {
                  "@type": "PropertyValue",
                  "name": "Category",
                  "value": "Industrial IoT Device"
                }
              ]
            })
          }}
        />
        
        {/* Structured Data - Software Application */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Cybokrafts",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web-based, Cloud Platform",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "INR"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "ratingCount": "120"
              },
              "featureList": [
                "Real-time transformer monitoring",
                "Predictive maintenance alerts",
                "AI-driven analytics",
                "Cloud-based dashboard",
                "Mobile app access",
                "Automated reporting"
              ]
            })
          }}
        />
        
        {/* Structured Data - WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Cybokrafts",
              "url": "https://www.aipoweros.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.aipoweros.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        
        {/* Structured Data - BreadcrumbList */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://www.aipoweros.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Solutions",
                  "item": "https://www.aipoweros.com/solutions"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Technology",
                  "item": "https://www.aipoweros.com/technology"
                }
              ]
            })
          }}
        />
      </head>
      
      <body>
        {/* Skip to main content for accessibility */}
        <a href="#main-content" className="sr-only focus:not-sr-only">
          Skip to main content
        </a>
        Verification: 3ff81350da35c2b0
        {children}
      </body>
    </html>
  );
}