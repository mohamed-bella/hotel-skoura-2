import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import NavigationLoader from '@/components/layout/NavigationLoader'

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: 'Bassatine Skoura | Luxury Hotel in Morocco',
  description: 'Experience luxury and comfort at Bassatine Skoura, a premium hotel in Ouarzazate, Morocco. Enjoy our elegant suites, exceptional service, and authentic Moroccan hospitality.',
  keywords: 'luxury hotel, morocco hotel, skoura, ouarzazate, premium accommodation, desert retreat',
  openGraph: {
    title: 'Bassatine Skoura | Luxury Hotel in Morocco',
    description: 'Experience luxury and comfort at Bassatine Skoura, a premium hotel in Ouarzazate, Morocco.',
    url: 'https://bassatineskoura.com',
    siteName: 'Bassatine Skoura',
    images: [
      {
        url: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg',
        width: 1200,
        height: 630,
        alt: 'Bassatine Skoura Luxury Hotel',
      },
    ],
    locale: 'en_US',
    type: 'website',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="font-sans text-neutral-800 bg-neutral-50">
        <Header />
        <NavigationLoader />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}