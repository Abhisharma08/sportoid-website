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
    title: 'Event & Tournament Gallery',
    description:
      'Explore the premier cricket tournaments, ICC World Cups, and IPL seasons delivered and managed by Sportoid.',
    canonicalPath: '/gallery',
  })
}

// Fallback cards shown until the CMS has gallery items
const FALLBACK_ITEMS: GalleryEntry[] = [
  { id: '1', title: "ICC Women's Cricket World Cup", year: '2022', categorySlug: 'cricket', photos: [] },
  { id: '2', title: "ICC Men's T20 World Cup", year: '2021', categorySlug: 'cricket', photos: [] },
  { id: '3', title: 'ICC World Test Championship Final', year: '2021', categorySlug: 'cricket', photos: [] },
  { id: '4', title: 'ICC Cricket World Cup England & Wales', year: '2019', categorySlug: 'cricket', photos: [] },
  { id: '5', title: 'Indian Premier League', year: '2019', categorySlug: 'cricket', photos: [] },
  { id: '6', title: 'Indian Premier League', year: '2018', categorySlug: 'cricket', photos: [] },
  { id: '7', title: 'ICC Champions Trophy', year: '2017', categorySlug: 'cricket', photos: [] },
  { id: '8', title: 'Indian Premier League', year: '2017', categorySlug: 'cricket', photos: [] },
  { id: '9', title: 'Paytm T20 Trophy', year: '2016', categorySlug: 'cricket', photos: [] },
  { id: '10', title: 'ICC World Twenty20 India', year: '2016', categorySlug: 'cricket', photos: [] },
  { id: '11', title: 'Indian Premier League', year: '2016', categorySlug: 'cricket', photos: [] },
]

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
  const [cmsItems, cmsCategories, pageSettings]: [CmsGalleryItem[], { title: string; slug?: { current?: string } }[], unknown] =
    await Promise.all([fetchGalleryItems(), fetchGalleryCategories(), fetchGalleryPage()])

  const items = cmsItems && cmsItems.length > 0 ? cmsItems.map(toGalleryEntry) : FALLBACK_ITEMS

  const categories: GalleryCategoryOption[] = (cmsCategories || []).flatMap((cat) =>
    cat.slug?.current ? [{ slug: cat.slug.current, title: cat.title }] : []
  )
  if (categories.length === 0) categories.push({ slug: 'cricket', title: 'Cricket' })

  const requested = typeof resolvedParams?.category === 'string' ? resolvedParams.category.toLowerCase() : ALL_CATEGORIES
  const initialCategory = categories.some((cat) => cat.slug === requested) ? requested : ALL_CATEGORIES

  return (
    <>
      <GalleryHero data={pageSettings} />
      <GalleryGrid items={items} categories={categories} initialCategory={initialCategory} />
    </>
  )
}
