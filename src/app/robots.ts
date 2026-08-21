import { MetadataRoute } from 'next'
import { fetchSiteSettings } from '@/services/site/settings.service'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await fetchSiteSettings()
  const baseUrl = (settings?.canonicalUrl || 'https://www.sportoid.com').replace(/\/$/, '')

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio', '/studio/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
