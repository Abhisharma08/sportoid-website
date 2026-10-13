import { PageSchema } from '@/components/seo/PageSchema'
import type { PageContent } from '@/types/content'
import { getPageSeo } from '@/repositories/sanity/seo.repository'
import * as React from 'react'
import { GalleryHero } from '@/features/gallery/components/GalleryHero'
import { GalleryGrid } from '@/features/gallery/components/GalleryGrid'
import { ALL_CATEGORIES } from '@/features/gallery/components/GalleryFilters'
import type { GalleryCategoryOption, GalleryEntry } from '@/features/gallery/types'
import { urlFor, type SanityImageSource } from '@/sanity/image'

import { fetchGalleryItems, fetchGalleryCategories, fetchGalleryPage } from '@/services/site/gallery.service'
import { constructMetadata } from '@/lib/metadata'

export async function generateMetadata() {
  return constructMetadata({
    seo: (await getPageSeo('galleryPage')) || undefined,
    title: 'Event & Tournament Gallery',
    description:
      'Explore the premier cricket tournaments, ICC World Cups, and IPL seasons delivered and managed by Sportoid.',
    canonicalPath: '/gallery',
  })
}

interface CmsGalleryPhoto {
  _key: string
  asset?: SanityImageSource
  caption?: string
  alt?: string
}

interface CmsGalleryItem {
  _id: string
  title: string
  eventDate?: string
  cover?: SanityImageSource
  photos?: CmsGalleryPhoto[]
  categorySlug?: string
}

const toGalleryEntry = (item: CmsGalleryItem): GalleryEntry => ({
  id: item._id,
  title: item.title,
  year: item.eventDate ? new Date(item.eventDate).getFullYear().toString() : '',
  categorySlug: item.categorySlug,
  cover: item.cover ? urlFor(item.cover).width(600).height(600).fit('crop').url() : undefined,
  photos: (item.photos || []).map((photo, i) => ({
    key: photo._key,
    src: urlFor(photo as SanityImageSource).width(1800).height(1400).fit('max').url(),
    thumb: urlFor(photo as SanityImageSource).width(160).height(120).fit('crop').url(),
    caption: photo.caption,
    alt: photo.alt || photo.caption || `${item.title} photo ${i + 1}`,
  })),
})

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams
  const [cmsItems, cmsCategories, pageSettings]: [CmsGalleryItem[], { title: string; slug?: { current?: string } }[], PageContent | null] =
    await Promise.all([fetchGalleryItems(), fetchGalleryCategories(), fetchGalleryPage()])

  const items = (cmsItems || []).map(toGalleryEntry)

  const categories: GalleryCategoryOption[] = (cmsCategories || []).flatMap((cat) =>
    cat.slug?.current ? [{ slug: cat.slug.current, title: cat.title }] : []
  )

  const requested = typeof resolvedParams?.category === 'string' ? resolvedParams.category.toLowerCase() : ALL_CATEGORIES
  const initialCategory = categories.some((cat) => cat.slug === requested) ? requested : ALL_CATEGORIES

  return (
    <>
      <PageSchema path="/gallery" title="Gallery" contentType="galleryPage" type="CollectionPage" />
      <GalleryHero data={pageSettings} />
      <GalleryGrid items={items} categories={categories} initialCategory={initialCategory} />
    </>
  )
}
