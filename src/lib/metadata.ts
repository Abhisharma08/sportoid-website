import type { Metadata } from 'next'
import { fetchSiteSettings } from '@/services/site/settings.service'
import { urlFor, type SanityImageSource } from '@/sanity/image'
import { httpUrl, siteOrigin } from './urls'

export interface SeoFields {
  title?: string
  description?: string
  image?: SanityImageSource
  canonicalUrl?: string
  noIndex?: boolean
}
export interface PageSeoOptions {
  title?: string
  description?: string
  keywords?: string[]
  canonicalPath?: string
  canonicalUrl?: string
  ogImage?: SanityImageSource
  noIndex?: boolean
  seo?: SeoFields
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
}

export async function constructMetadata(options: PageSeoOptions = {}): Promise<Metadata> {
  const settings = await fetchSiteSettings()
  const siteTitle = settings?.siteTitle || 'SPORTOID'
  const origin = siteOrigin(settings?.canonicalUrl)
  const pageTitle = options.seo?.title || options.title
  const title = pageTitle ? `${pageTitle} | ${siteTitle}` : settings?.metaTitle || `${siteTitle} | Building Tomorrow's Champions`
  const description = options.seo?.description || options.description || settings?.metaDescription || 'Sports management, athlete representation, commercial partnerships and event execution by Sportoid in India.'
  const canonical = httpUrl(options.seo?.canonicalUrl || options.canonicalUrl) || new URL(options.canonicalPath || '/', origin).href
  const imageSource = options.seo?.image || options.ogImage || settings?.ogImage || settings?.logo
  const image = imageSource ? urlFor(imageSource).width(1200).height(630).fit('crop').url() : `${origin}/og`
  const index = !(options.noIndex || options.seo?.noIndex || settings?.robotsIndex === false)
  return {
    metadataBase: new URL(origin), title, description,
    keywords: options.keywords || settings?.keywords,
    alternates: { canonical },
    robots: { index, follow: true, googleBot: { index, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
    openGraph: {
      title, description, url: canonical, siteName: siteTitle, locale: 'en_IN',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      ...(options.type === 'article' ? { type: 'article' as const, publishedTime: options.publishedTime, modifiedTime: options.modifiedTime, authors: options.author ? [options.author] : undefined } : { type: 'website' as const }),
    },
    twitter: { card: 'summary_large_image', title, description, creator: settings?.twitterHandle, images: [image] },
    icons: settings?.favicon ? { icon: urlFor(settings.favicon).width(64).height(64).url() } : undefined,
  }
}
