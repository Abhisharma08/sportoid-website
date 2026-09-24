import * as React from 'react'
import { Container } from '@/components/ui/Container'
import type { GalleryCategoryOption } from '../types'

export const ALL_CATEGORIES = 'all'

interface GalleryFiltersProps {
  categories: GalleryCategoryOption[]
  currentCategory: string
  onChange: (slug: string) => void
}

export function GalleryFilters({ categories, currentCategory, onChange }: GalleryFiltersProps) {
  const options = [{ slug: ALL_CATEGORIES, title: 'All' }, ...categories]

  return (
    <div className="w-full bg-white border-b border-gray-100 py-4 md:py-6">
      <Container>
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
          <span className="font-semibold text-xs md:text-sm text-dark uppercase tracking-widest">Sort Portfolio:</span>
          <div role="tablist" aria-label="Filter portfolio by category" className="flex items-center gap-2 md:gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {options.map((cat) => {
              const active = currentCategory === cat.slug
              return (
                <button
                  key={cat.slug}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => onChange(cat.slug)}
                  className={`whitespace-nowrap font-semibold text-xs md:text-sm uppercase tracking-wider transition-all px-3.5 py-1.5 md:px-4 md:py-2 rounded-full border cursor-pointer ${
                    active
                      ? 'text-white bg-primary border-primary shadow-sm'
                      : 'text-gray-600 border-gray-200 hover:border-gray-400 hover:text-dark bg-gray-50/50'
                  }`}
                >
                  {cat.title}
                </button>
              )
            })}
          </div>
        </div>
      </Container>
    </div>
  )
}
