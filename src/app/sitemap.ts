import type { MetadataRoute } from 'next'
import { getSitemapDocuments } from '@/repositories/sanity/seo.repository'
import { fetchSiteSettings } from '@/services/site/settings.service'
import { httpUrl, siteOrigin } from '@/lib/urls'

export const revalidate = 60
const routes: Record<string, string> = {
  homePage: '/', aboutPage: '/about', peoplePage: '/people', galleryPage: '/gallery',
  eventsPage: '/events', blogPage: '/blog', contactPage: '/contact',
}
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [settings, documents] = await Promise.all([fetchSiteSettings(), getSitemapDocuments()])
  if (settings?.robotsIndex === false) return []
  const origin = siteOrigin(settings?.canonicalUrl)
  const entries = new Map<string, MetadataRoute.Sitemap[number]>()
  for (const path of Object.values(routes)) {
    const url = new URL(path, origin).href
    entries.set(url, { url })
  }
  for (const doc of documents) {
    const path = routes[doc._type] || (doc.slug ? `${doc._type === 'page' ? '' : doc._type === 'post' ? '/blog' : '/events'}/${encodeURIComponent(doc.slug)}` : null)
    if (!path) continue
    const url = new URL(path, origin).href
    const canonical = httpUrl(doc.seo?.canonicalUrl || doc.canonicalUrl)
    if (doc.noIndex || doc.seo?.noIndex || (canonical && canonical !== url)) {
      entries.delete(url)
      continue
    }
    entries.set(url, { url, lastModified: doc._updatedAt })
  }
  return [...entries.values()]
}
