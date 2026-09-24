import { MetadataRoute } from 'next'
import { fetchGalleryItems } from '@/services/site/gallery.service'
import { fetchPosts } from '@/services/site/blog.service'
import { fetchUpcomingEvents, fetchPastEvents } from '@/services/site/events.service'
import type { EventSummary } from '@/features/events/utils'
import { fetchSiteSettings } from '@/services/site/settings.service'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await fetchSiteSettings()
  const baseUrl = (settings?.canonicalUrl || 'https://www.sportoid.com').replace(/\/$/, '')

  const [posts, upcomingEvents, pastEvents] = await Promise.all([
    fetchPosts(),
    fetchUpcomingEvents(),
    fetchPastEvents(50),
  ])
  const eventEntries: MetadataRoute.Sitemap = [...(upcomingEvents || []), ...(pastEvents || [])].map((event: EventSummary) => ({
    url: `${baseUrl}/events/${event.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const postEntries: MetadataRoute.Sitemap = (posts || []).map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/people`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]

  return [...staticRoutes, ...eventEntries, ...postEntries]
}
