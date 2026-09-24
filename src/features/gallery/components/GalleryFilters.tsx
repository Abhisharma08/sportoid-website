import * as React from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'

const CATEGORIES = ['ALL', 'CRICKET', 'KABADDI', 'STADIUM', 'FOOTBALL']

interface GalleryFiltersProps {
  currentCategory: string
}

export function GalleryFilters({ currentCategory }: GalleryFiltersProps) {
  return (
    <div className="w-full bg-white border-b border-gray-100 py-4 md:py-6">
      <Container>
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
          <span className="font-semibold text-xs md:text-sm text-dark uppercase tracking-widest">Sort Portfolio:</span>
          <div className="flex items-center gap-2 md:gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <Link 
                key={cat}
                href={cat === 'ALL' ? '/gallery' : `/gallery?category=${cat}`}
                className={`whitespace-nowrap font-semibold text-xs md:text-sm uppercase tracking-wider transition-all px-3.5 py-1.5 md:px-4 md:py-2 rounded-full border ${
                  currentCategory === cat 
                    ? 'text-white bg-primary border-primary shadow-sm' 
                    : 'text-gray-600 border-gray-200 hover:border-gray-400 hover:text-dark bg-gray-50/50'
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
