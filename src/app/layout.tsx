import type { Metadata } from 'next'
import './globals.css'

import { fetchSiteSettings } from '@/services/site/settings.service'
import { urlFor } from '@/sanity/image'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSiteSettings()

  const title = settings?.metaTitle || settings?.siteTitle || "SPORTOID | Building Tomorrow's Champions"
  const description =
    settings?.metaDescription ||
    'Sportoid is a young start-up committed to the professional representation, execution and valuation of sporting properties in India.'
  const keywords = settings?.keywords || [
    'Sports Management',
    'Athlete Representation',
    'Cricket Sponsorship',
    'Event Execution',
    'India Sports',
  ]
  const canonical = settings?.canonicalUrl || 'https://www.sportoid.com'
  const ogImageUrl = settings?.ogImage ? urlFor(settings.ogImage).width(1200).height(630).url() : undefined

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(canonical),
    alternates: {
      canonical: '/',
    },
    robots: {
      index: settings?.robotsIndex ?? true,
      follow: settings?.robotsIndex ?? true,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: settings?.siteTitle || 'SPORTOID',
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630 }] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: settings?.twitterHandle || '@sportoid',
      images: ogImageUrl ? [ogImageUrl] : [],
    },
  }
}

import { Inter, Montserrat } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
  weight: ['400', '500', '700', '800', '900'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`h-full antialiased ${inter.variable} ${montserrat.variable}`}>
      <body className="min-h-full flex flex-col font-sans text-dark bg-light">
        {children}
      </body>
    </html>
  )
}
