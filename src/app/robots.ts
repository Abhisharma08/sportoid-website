import type { MetadataRoute } from 'next'
import { fetchSiteSettings } from '@/services/site/settings.service'
import { siteOrigin } from '@/lib/urls'

export const revalidate = 60
export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await fetchSiteSettings()
  return {
    // Allow crawling noindex pages so crawlers can see their robots meta tag.
    rules: { userAgent: '*', allow: '/', disallow: ['/studio', '/api/'] },
    sitemap: settings?.robotsIndex === false ? undefined : `${siteOrigin(settings?.canonicalUrl)}/sitemap.xml`,
  }
}
