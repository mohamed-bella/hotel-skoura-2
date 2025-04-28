'use client'
import Script from 'next/script'

interface SEOProps {
  pageType?: 'home' | 'room' | 'restaurant' | 'about' | 'contact';
  roomName?: string;
  roomPrice?: string;
}

export default function SEO({
  pageType = 'home',
  roomName,
  roomPrice,
}: SEOProps) {
  
  // Generate structured data based on page type
  const generateSchema = () => {
    switch(pageType) {
      case 'room':
        return `{
          "@context": "https://schema.org/",
          "@type": "Product",
          "name": "${roomName || 'Room at Bassatine Skoura'}",
          "description": "Luxurious accommodation at Bassatine Skoura, the premier hotel in Skoura, Morocco",
          "image": "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
          "offers": {
            "@type": "Offer",
            "url": "https://bassatineskoura.com/rooms",
            "priceCurrency": "USD",
            "price": "${roomPrice || '120'}",
            "availability": "https://schema.org/InStock"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "127"
          }
        }`;
      
      case 'restaurant':
        return `{
          "@context": "https://schema.org/",
          "@type": "Restaurant",
          "name": "Bassatine Restaurant Skoura",
          "description": "Experience authentic Moroccan cuisine at our restaurant in Skoura with panoramic views and local ingredients",
          "image": "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
          "servesCuisine": "Moroccan, Mediterranean",
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
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              "opens": "07:00",
              "closes": "22:00"
            }
          ]
        }`;
      
      case 'contact':
        return `{
          "@context": "https://schema.org/",
          "@type": "ContactPage",
          "name": "Contact Bassatine Skoura Hotel",
          "description": "Contact information for Bassatine Skoura, the premier hotel in Skoura, Morocco",
          "mainEntity": {
            "@type": "Organization",
            "name": "Bassatine Skoura Hotel",
            "telephone": "+212-000-0000",
            "email": "info@bassatineskoura.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Route de Ouarzazate",
              "addressLocality": "Skoura",
              "addressRegion": "Ouarzazate",
              "postalCode": "45350",
              "addressCountry": "MA"
            }
          }
        }`;
      
      // Default home page schema reinforcing local business
      default:
        return `{
          "@context": "https://schema.org/",
          "@type": "LocalBusiness",
          "name": "Bassatine Skoura Hotel",
          "description": "The premier hotel in Skoura offering luxury accommodations, fine dining restaurant in Skoura, and authentic Moroccan hospitality",
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
          "url": "https://bassatineskoura.com",
          "sameAs": [
            "https://www.facebook.com/bassatineskoura",
            "https://www.instagram.com/bassatineskoura",
            "https://www.tripadvisor.com/bassatineskoura"
          ]
        }`;
    }
  };
  
  return (
    <Script id={`schema-${pageType}`} type="application/ld+json">
      {generateSchema()}
    </Script>
  );
} 