'use client'

import * as React from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { GalleryPhoto } from '../types'

export interface GalleryLightboxProps {
  title: string
  photos: GalleryPhoto[]
  onClose: () => void
}

const SWIPE_THRESHOLD_PX = 50

export function GalleryLightbox({ title, photos, onClose }: GalleryLightboxProps) {
  const [index, setIndex] = React.useState(0)
  const closeButtonRef = React.useRef<HTMLButtonElement>(null)
  const thumbsRef = React.useRef<HTMLDivElement>(null)
  const touchStartX = React.useRef<number | null>(null)

  const count = photos.length
  const photo = photos[index]
  const goTo = React.useCallback((next: number) => setIndex((next + count) % count), [count])

  // Lock page scroll and move focus into the dialog (the grid returns focus to the card)
  React.useEffect(() => {
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = overflow
    }
  }, [])

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') goTo(index + 1)
      else if (e.key === 'ArrowLeft') goTo(index - 1)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [index, goTo, onClose])

  // Preload neighbours so next/previous feel instant
  React.useEffect(() => {
    if (count < 2) return
    for (const i of [index + 1, index - 1]) {
      const img = new window.Image()
      img.src = photos[(i + count) % count].src
    }
  }, [index, count, photos])

  // Keep the active thumbnail in view
  React.useEffect(() => {
    const thumb = thumbsRef.current?.children[index] as HTMLElement | undefined
    thumb?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
  }, [index])

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(delta) > SWIPE_THRESHOLD_PX) goTo(index + (delta < 0 ? 1 : -1))
    touchStartX.current = null
  }

  if (!photo) return null

  const navButtonClass =
    'absolute top-1/2 -translate-y-1/2 z-10 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-primary text-white flex items-center justify-center transition-colors cursor-pointer'

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} photo gallery`}
      className="fixed inset-0 z-[100] bg-black flex flex-col"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-4 text-white">
        <div className="min-w-0">
          <h2 className="text-sm sm:text-base font-heading font-semibold truncate normal-case">{title}</h2>
          <p className="text-xs text-white/60" aria-live="polite">
            {index + 1} / {count}
          </p>
        </div>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close gallery"
          className="w-10 h-10 flex-shrink-0 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main photo */}
      <div
        className="relative flex-1 min-h-0 flex items-center justify-center px-4 sm:px-20"
        onClick={(e) => e.target === e.currentTarget && onClose()}
        onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
        onTouchEnd={onTouchEnd}
      >
        <img
          key={photo.key}
          src={photo.src}
          alt={photo.alt}
          className="max-w-full max-h-full object-contain select-none"
          draggable={false}
        />

        {count > 1 && (
          <>
            <button type="button" onClick={() => goTo(index - 1)} aria-label="Previous photo" className={`${navButtonClass} left-2 sm:left-6`}>
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button type="button" onClick={() => goTo(index + 1)} aria-label="Next photo" className={`${navButtonClass} right-2 sm:right-6`}>
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {photo.caption && <p className="text-center text-sm text-white/80 px-6 pt-3">{photo.caption}</p>}

      {/* Thumbnails */}
      {count > 1 && (
        <div
          ref={thumbsRef}
          className="flex gap-2 overflow-x-auto px-4 sm:px-6 py-4 justify-start sm:justify-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {photos.map((thumb, i) => (
            <button
              key={thumb.key}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show photo ${i + 1}`}
              aria-current={i === index}
              className={`flex-shrink-0 w-16 h-12 sm:w-20 sm:h-14 rounded-md overflow-hidden border-2 transition-all cursor-pointer ${
                i === index ? 'border-primary opacity-100' : 'border-transparent opacity-50 hover:opacity-90'
              }`}
            >
              <img src={thumb.thumb} alt="" loading="lazy" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
