import { cache } from 'react'
import { client } from '@/sanity/client'
import { CONTENT_REVALIDATE_SECONDS, CONTENT_TAG } from '@/sanity/cache'
import type { SeoFields } from '@/lib/metadata'

export const getPageSeo = cache(async (type: string) =>
  client.fetch<SeoFields | null>(`*[_type == $type][0].seo`, { type }, { next: { tags: [CONTENT_TAG], revalidate: CONTENT_REVALIDATE_SECONDS } })
)

export interface SitemapDocument {
  _type: string
  _updatedAt: string
  slug?: string
  seo?: SeoFields
  noIndex?: boolean
  canonicalUrl?: string
}
export async function getSitemapDocuments() {
  return client.fetch<SitemapDocument[]>(`*[
    _type in ["page", "homePage", "aboutPage", "peoplePage", "galleryPage", "eventsPage", "blogPage", "contactPage", "post", "event"] &&
    (_type != "post" || !defined(publishedAt) || dateTime(publishedAt) <= dateTime(now()))
  ]{_type, _updatedAt, "slug": slug.current, seo, noIndex, canonicalUrl}`, {}, {
    next: { tags: [CONTENT_TAG], revalidate: CONTENT_REVALIDATE_SECONDS },
  })
}
