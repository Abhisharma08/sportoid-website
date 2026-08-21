import * as React from 'react'
import { GalleryHero } from '@/features/gallery/components/GalleryHero'
import { GalleryFilters } from '@/features/gallery/components/GalleryFilters'
import { GalleryCard } from '@/features/gallery/components/GalleryCard'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'

import { fetchGalleryItems } from '@/services/site/gallery.service'
import { constructMetadata } from '@/lib/metadata'

export async function generateMetadata() {
  return constructMetadata({
    title: 'Event & Tournament Gallery',
    description:
      'Explore the premier cricket tournaments, ICC World Cups, and IPL seasons delivered and managed by Sportoid.',
    canonicalPath: '/gallery',
  })
}

// Dummy data for gallery items fallback
const FALLBACK_ITEMS = [
  { id: 1, title: "ICC Women's Cricket World Cup", year: '2022', category: 'CRICKET' },
  { id: 2, title: "ICC Men's T20 World Cup", year: '2021', category: 'CRICKET' },
  { id: 3, title: 'ICC World Test Championship Final', year: '2021', category: 'CRICKET' },
  { id: 4, title: 'ICC Cricket World Cup England & Wales', year: '2019', category: 'CRICKET' },
  { id: 5, title: 'Indian Premier League', year: '2019', category: 'CRICKET' },
  { id: 6, title: 'Indian Premier League', year: '2018', category: 'CRICKET' },
  { id: 7, title: 'ICC Champions Trophy', year: '2017', category: 'CRICKET' },
  { id: 8, title: 'Indian Premier League', year: '2017', category: 'CRICKET' },
  { id: 9, title: 'Paytm T20 Trophy', year: '2016', category: 'CRICKET' },
  { id: 10, title: 'ICC World Twenty20 India', year: '2016', category: 'CRICKET' },
  { id: 11, title: 'Indian Premier League', year: '2016', category: 'CRICKET' },
]

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams
  const categoryParam = resolvedParams?.category
  const category = typeof categoryParam === 'string' ? categoryParam : 'ALL'

  const cmsItems = await fetchGalleryItems()
  const rawItems = cmsItems && cmsItems.length > 0
    ? cmsItems.map((item: any) => ({
        id: item._id,
        title: item.title,
        year: item.eventDate ? new Date(item.eventDate).getFullYear().toString() : '2024',
        category: (item.category || 'CRICKET').toUpperCase(),
      }))
    : FALLBACK_ITEMS

  const filteredItems = category === 'ALL' 
    ? rawItems 
    : rawItems.filter((item: any) => item.category === category)

  return (
    <>
      <GalleryHero />
      <GalleryFilters currentCategory={category} />
      <Section className="bg-light">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item: any) => (
              <GalleryCard key={item.id} title={item.title} year={item.year} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
