import * as React from 'react'

import { Images } from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'

export interface GalleryCardProps {
  title: string
  year: string
  imageSrc?: string
  photoCount?: number
  onOpen?: (trigger: HTMLButtonElement) => void
}

export function GalleryCard({ title, year, imageSrc, photoCount = 0, onOpen }: GalleryCardProps) {
  const cricketFallbacks = [
    'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=400&q=80',
  ]

  // Pick deterministic image based on title hash if not provided
  const hash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const finalImage = imageSrc || cricketFallbacks[hash % cricketFallbacks.length]

  return (
    <FadeIn direction="up" delay={0.1}>
      <div className="relative bg-white rounded-lg p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center text-center group h-full focus-within:ring-2 focus-within:ring-primary/50">
        {onOpen && (
          // Covers the whole card so any click opens the album
          <button
            type="button"
            onClick={(e) => onOpen(e.currentTarget)}
            aria-label={`Open ${title} gallery, ${photoCount} photos`}
            className="absolute inset-0 z-10 rounded-lg cursor-pointer focus:outline-none"
          />
        )}
        <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border border-gray-100 mb-6 bg-dark/5 flex items-center justify-center group-hover:scale-105 transition-transform duration-500 relative">
          <img src={finalImage} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
          {photoCount > 0 && (
            <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 bg-black/70 text-white text-[11px] font-medium px-2 py-1 rounded-full">
              <Images className="w-3.5 h-3.5" />
              {photoCount}
            </span>
          )}
        </div>
        
        <div className="w-full text-left">
          <div className="w-12 h-1 bg-primary mb-4 transition-all duration-300 group-hover:w-20"></div>
          <h3 className="text-lg font-heading font-semibold text-dark mb-2 leading-snug group-hover:text-primary transition-colors">{title}</h3>
          <div className="text-gray-500 text-sm">{year}</div>
        </div>
      </div>
    </FadeIn>
  )
}
