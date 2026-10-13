'use client'

import * as React from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'

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
  const [hovered, setHovered] = React.useState(false)
  const reducedMotion = useReducedMotion()
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
      track.scrollTo({ left: 0, behavior: reducedMotion ? 'auto' : 'smooth' })
    } else {
      track.scrollBy({ left: direction * (firstSlide.offsetWidth + gap), behavior: reducedMotion ? 'auto' : 'smooth' })
    }
  }, [reducedMotion])

  React.useEffect(() => {
    updateButtons()
    window.addEventListener('resize', updateButtons)
    return () => window.removeEventListener('resize', updateButtons)
  }, [updateButtons, slides.length])

  React.useEffect(() => {
    if (!autoplayMs || isPaused || hovered || reducedMotion) return

    const timer = setInterval(() => {
      const track = trackRef.current
      if (track && track.scrollWidth > track.clientWidth) scrollBySlide(1)
    }, autoplayMs)
    return () => clearInterval(timer)
  }, [autoplayMs, isPaused, hovered, reducedMotion, scrollBySlide])

  const buttonClass =
    'w-10 h-10 rounded-full border border-gray-200 bg-white text-dark flex items-center justify-center shadow-sm transition-all hover:border-primary hover:text-primary disabled:opacity-40 disabled:pointer-events-none cursor-pointer'

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setIsPaused(true)}
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
          {!!autoplayMs && !reducedMotion && <button type="button" onClick={() => setIsPaused((value) => !value)} aria-label={isPaused ? "Play carousel" : "Pause carousel"} className={buttonClass}>{isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}</button>}
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
