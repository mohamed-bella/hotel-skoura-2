import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import NavigationLoader from '@/components/layout/NavigationLoader'
import InitialLoader from '@/components/layout/InitialLoader'
import Script from 'next/script'

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: 'Bassatine Skoura | Best Luxury Hotel in Skoura, Morocco',
  description: 'Experience authentic luxury at Bassatine Skoura, the premier hotel in Skoura with exceptional rooms, fine dining restaurant in Skoura, and authentic Moroccan hospitality. Book your stay at one of the best hotels in Skoura today.',
  keywords: 'hotel in skoura, hotel skoura, bassatine skoura, skoura, restaurant skoura, hotels in skoura, luxury accommodation skoura, moroccan hotel, ouarzazate hotel, palm grove hotel, desert hotel morocco',
  metadataBase: new URL('https://bassatineskoura.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'fr-FR': '/fr-FR',
      'ar-MA': '/ar-MA',
    },
  },
  openGraph: {
    title: 'Bassatine Skoura | Premier Luxury Hotel & Restaurant in Skoura',
    description: 'Discover Bassatine Skoura, the finest hotel in Skoura offering luxurious rooms, authentic Moroccan cuisine, and exceptional desert experiences. Perfect for relaxation and adventure.',
    url: 'https://bassatineskoura.com',
    siteName: 'Bassatine Skoura Hotel',
    images: [
      {
        url: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg',
        width: 1200,
        height: 630,
        alt: 'Bassatine Skoura - Luxury Hotel in Skoura, Morocco',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bassatine Skoura | Top Hotel in Skoura, Morocco',
    description: 'Experience true Moroccan luxury at Bassatine Skoura hotel. Elegant rooms, fine dining, and desert adventures await at the best hotel in Skoura.',
    images: ['https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code', // Replace with your actual Google verification code
  },
  category: 'travel',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={montserrat.variable}>
      <head>
        <meta name="geo.region" content="MA-08" />
        <meta name="geo.placename" content="Skoura, Morocco" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="font-sans text-neutral-800 bg-neutral-50">
        <Script id="hotel-schema" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Hotel",
              "name": "Bassatine Skoura",
              "description": "Experience authentic Moroccan luxury at Bassatine Skoura, the premier hotel in Skoura with luxurious accommodations, fine dining, and desert experiences.",
              "url": "https://bassatineskoura.com",
              "sameAs": [
                "https://www.facebook.com/bassatineskoura",
                "https://www.instagram.com/bassatineskoura",
                "https://www.tripadvisor.com/bassatineskoura"
              ],
              "image": "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
              "priceRange": "$$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Route de Ouarzazate",
                "addressLocality": "Skoura",
                "addressRegion": "Ouarzazate",
                "postalCode": "45350",
                "addressCountry": "MA"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "31.0642",
                "longitude": "-6.5788"
              },
              "telephone": "+212-000-0000",
              "starRating": {
                "@type": "Rating",
                "ratingValue": "5"
              },
              "amenityFeature": [
                {"@type": "LocationFeatureSpecification", "name": "Free WiFi"},
                {"@type": "LocationFeatureSpecification", "name": "Restaurant"},
                {"@type": "LocationFeatureSpecification", "name": "Swimming Pool"},
                {"@type": "LocationFeatureSpecification", "name": "Spa"}
              ],
              "hasMap": "https://www.google.com/maps?cid=your-google-maps-id"
            }
          `}
        </Script>
        <InitialLoader />
        <Header />
        <NavigationLoader />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}