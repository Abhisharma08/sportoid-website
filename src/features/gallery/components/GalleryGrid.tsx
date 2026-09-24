'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { GalleryFilters, ALL_CATEGORIES } from './GalleryFilters'
import { GalleryCard } from './GalleryCard'
import { GalleryLightbox } from './GalleryLightbox'
import type { GalleryCategoryOption, GalleryEntry } from '../types'

export interface GalleryGridProps {
  items: GalleryEntry[]
  categories: GalleryCategoryOption[]
  initialCategory: string
}

export function GalleryGrid({ items, categories, initialCategory }: GalleryGridProps) {
  const pathname = usePathname()
  const [category, setCategory] = React.useState(initialCategory)
  const [openItem, setOpenItem] = React.useState<GalleryEntry | null>(null)
  // Clicking doesn't focus buttons in every browser (e.g. Safari), so remember the opener explicitly
  const openerRef = React.useRef<HTMLButtonElement | null>(null)

  const openAlbum = (item: GalleryEntry, trigger: HTMLButtonElement) => {
    openerRef.current = trigger
    setOpenItem(item)
  }

  const closeAlbum = React.useCallback(() => {
    setOpenItem(null)
    openerRef.current?.focus({ preventScroll: true })
  }, [])

  // Filter in place and keep the URL shareable, without a navigation (which scrolls to the top)
  const changeCategory = (slug: string) => {
    setCategory(slug)
    const url = slug === ALL_CATEGORIES ? pathname : `${pathname}?category=${encodeURIComponent(slug)}`
    window.history.replaceState(null, '', url)
  }

  const visibleItems = category === ALL_CATEGORIES ? items : items.filter((item) => item.categorySlug === category)

  return (
    <>
      <GalleryFilters categories={categories} currentCategory={category} onChange={changeCategory} />
      <Section className="bg-light">
        <Container>
          {visibleItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {visibleItems.map((item) => (
                <GalleryCard
                  key={item.id}
                  title={item.title}
                  year={item.year}
                  imageSrc={item.cover}
                  photoCount={item.photos.length}
                  onOpen={item.photos.length > 0 ? (trigger) => openAlbum(item, trigger) : undefined}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-12">No portfolio items in this category yet.</p>
          )}
        </Container>
      </Section>

      {openItem && <GalleryLightbox title={openItem.title} photos={openItem.photos} onClose={closeAlbum} />}
    </>
  )
}
