import * as React from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'

const CATEGORIES = ['ALL', 'CRICKET', 'KABADDI', 'STADIUM', 'FOOTBALL']

interface GalleryFiltersProps {
  currentCategory: string
}

export function GalleryFilters({ currentCategory }: GalleryFiltersProps) {
  return (
    <div className="w-full bg-white border-b border-gray-100 py-6">
      <Container>
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <span className="font-bold text-sm text-dark uppercase tracking-widest">Sort Portfolio:</span>
          <div className="flex flex-wrap items-center gap-4 md:gap-8">
            {CATEGORIES.map((cat) => (
              <Link 
                key={cat}
                href={cat === 'ALL' ? '/gallery' : `/gallery?category=${cat}`}
                className={`font-bold text-sm uppercase tracking-widest transition-colors pb-1 border-b-2 ${
                  currentCategory === cat 
                    ? 'text-white bg-primary px-4 py-2 border-primary rounded' 
                    : 'text-gray-500 border-transparent hover:text-dark'
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}
