import { Metadata } from 'next'
import { fetchSiteSettings } from '@/services/site/settings.service'
import { urlFor } from '@/sanity/image'

export interface PageSeoOptions {
  title?: string
  description?: string
  keywords?: string[]
  canonicalPath?: string
  ogImage?: any
  noIndex?: boolean
}

export async function constructMetadata(options: PageSeoOptions = {}): Promise<Metadata> {
  const settings = await fetchSiteSettings()

  const siteTitle = settings?.siteTitle || 'SPORTOID'
  const baseCanonical = settings?.canonicalUrl || 'https://www.sportoid.com'

  const title = options.title
    ? `${options.title} | ${siteTitle}`
    : settings?.metaTitle || `${siteTitle} | Building Tomorrow's Champions`

  const description =
    options.description ||
    settings?.metaDescription ||
    'Sportoid is a young start-up committed to the professional representation, execution and valuation of sporting properties in India.'

  const keywords = options.keywords || settings?.keywords || [
    'Sports Management',
    'Athlete Representation',
    'Cricket Sponsorship',
    'Event Execution',
    'India Sports',
  ]

  const canonical = options.canonicalPath
    ? `${baseCanonical.replace(/\/$/, '')}${options.canonicalPath.startsWith('/') ? '' : '/'}${options.canonicalPath}`
    : baseCanonical

  const ogImageSource = options.ogImage || settings?.ogImage
  const ogImageUrl = ogImageSource ? urlFor(ogImageSource).width(1200).height(630).url() : undefined

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    robots: {
      index: options.noIndex ? false : (settings?.robotsIndex ?? true),
      follow: options.noIndex ? false : (settings?.robotsIndex ?? true),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteTitle,
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630, alt: title }] : [],
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
