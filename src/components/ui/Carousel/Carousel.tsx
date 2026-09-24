'use client'

import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export interface CarouselProps {
  children: React.ReactNode
  /** Auto-advance interval in ms; 0 disables autoplay */
  autoplayMs?: number
  /** Tailwind width classes applied to each slide */
  slideClassName?: string
  ariaLabel?: string
}

export function Carousel({
  children,
  autoplayMs = 5000,
  slideClassName = 'w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]',
  ariaLabel = 'Carousel',
}: CarouselProps) {
  const trackRef = React.useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = React.useState(false)
  const [canPrev, setCanPrev] = React.useState(false)
  const [canNext, setCanNext] = React.useState(false)
  const slides = React.Children.toArray(children)

  const updateButtons = React.useCallback(() => {
    const track = trackRef.current
    if (!track) return
    setCanPrev(track.scrollLeft > 4)
    setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 4)
  }, [])

  const scrollBySlide = React.useCallback((direction: 1 | -1) => {
    const track = trackRef.current
    const firstSlide = track?.firstElementChild as HTMLElement | null
    if (!track || !firstSlide) return

    const gap = parseFloat(getComputedStyle(track).columnGap) || 0
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4

    // Autoplay loops back to the start once it reaches the end
    if (direction === 1 && atEnd) {
      track.scrollTo({ left: 0, behavior: 'smooth' })
    } else {
      track.scrollBy({ left: direction * (firstSlide.offsetWidth + gap), behavior: 'smooth' })
    }
  }, [])

  React.useEffect(() => {
    updateButtons()
    window.addEventListener('resize', updateButtons)
    return () => window.removeEventListener('resize', updateButtons)
  }, [updateButtons, slides.length])

  React.useEffect(() => {
    if (!autoplayMs || isPaused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const timer = setInterval(() => {
      const track = trackRef.current
      if (track && track.scrollWidth > track.clientWidth) scrollBySlide(1)
    }, autoplayMs)
    return () => clearInterval(timer)
  }, [autoplayMs, isPaused, scrollBySlide])

  const buttonClass =
    'w-10 h-10 rounded-full border border-gray-200 bg-white text-dark flex items-center justify-center shadow-sm transition-all hover:border-primary hover:text-primary disabled:opacity-40 disabled:pointer-events-none cursor-pointer'

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
    >
      <div
        ref={trackRef}
        onScroll={updateButtons}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, idx) => (
          <div
            key={idx}
            role="group"
            aria-roledescription="slide"
            aria-label={`${idx + 1} of ${slides.length}`}
            className={`snap-start flex-shrink-0 ${slideClassName}`}
          >
            {slide}
          </div>
        ))}
      </div>

      {(canPrev || canNext) && (
        <div className="flex justify-end gap-3 mt-8">
          <button type="button" onClick={() => scrollBySlide(-1)} disabled={!canPrev} aria-label="Previous" className={buttonClass}>
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button type="button" onClick={() => scrollBySlide(1)} disabled={!canNext} aria-label="Next" className={buttonClass}>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  )
}
