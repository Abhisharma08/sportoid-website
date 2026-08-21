'use client'

import * as React from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { urlFor } from '@/sanity/image'

export interface HeroSlideItem {
  title?: string
  subtitle?: string
  description?: string
  ctaText?: string
  ctaLink?: string
  backgroundImage?: any
}

export interface HeroSliderProps {
  slides?: HeroSlideItem[]
}

const DEFAULT_SLIDES: HeroSlideItem[] = [
  {
    subtitle: 'Sports Capability. Experience. Beliefs.',
    title: "BUILDING TOMORROW'S CHAMPIONS",
    description:
      'Sportoid is a young start-up committed to the professional representation, execution and valuation of sporting properties in India.',
    ctaText: 'Discover More',
    ctaLink: '/about',
  },
  {
    subtitle: 'Global Sponsorships & Valuation',
    title: 'PARTNERSHIPS THAT SHAPE THE GAME',
    description:
      'Connecting top brands with premier sporting events, leagues, and athletes across India and internationally.',
    ctaText: 'Explore Partnerships',
    ctaLink: '/gallery',
  },
  {
    subtitle: 'End-to-End Excellence',
    title: 'FLAWLESS EXECUTION. UNMATCHED IMPACT.',
    description:
      'Delivering world-class cricket leagues, tournaments, and fan engagement experiences with precision.',
    ctaText: 'Our Capabilities',
    ctaLink: '/about',
  },
]

export function HeroSlider({ slides }: HeroSliderProps) {
  const activeSlides = slides && slides.length > 0 ? slides : DEFAULT_SLIDES
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isPaused, setIsPaused] = React.useState(false)

  // Auto-advance slider every 6 seconds if not hovered/paused
  React.useEffect(() => {
    if (isPaused || activeSlides.length <= 1) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeSlides.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [isPaused, activeSlides.length])

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activeSlides.length) % activeSlides.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeSlides.length)
  }

  return (
    <div
      className="relative w-full h-[600px] md:h-[750px] bg-dark flex items-center overflow-hidden group select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides with smooth cross-fade */}
      {activeSlides.map((slide, index) => {
        const isActive = index === currentIndex
        const bgImgUrl = slide.backgroundImage ? urlFor(slide.backgroundImage).width(1920).height(1080).url() : null

        return (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Image Layer */}
            {bgImgUrl ? (
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-7000 ease-out scale-105"
                style={{ backgroundImage: `url(${bgImgUrl})` }}
              />
            ) : (
              <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-40 mix-blend-overlay" />
            )}

            {/* Gradient Overlays for Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-black/30" />

            {/* Slide Content */}
            <div className="relative h-full flex items-center">
              <Container className="relative z-20">
                <div className="max-w-3xl">
                  {slide.subtitle && (
                    <p className="text-primary font-bold text-xs md:text-sm uppercase tracking-[0.25em] mb-4 inline-block px-3 py-1 bg-primary/10 border border-primary/20 rounded">
                      {slide.subtitle}
                    </p>
                  )}
                  <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading font-black text-white leading-[1.05] tracking-tight mb-6">
                    {slide.title}
                  </h1>
                  {slide.description && (
                    <p className="text-gray-300 max-w-xl mb-10 text-base md:text-lg leading-relaxed">
                      {slide.description}
                    </p>
                  )}
                  {slide.ctaText && (
                    <Link href={slide.ctaLink || '/about'}>
                      <Button variant="primary" size="lg" className="font-bold tracking-wider">
                        {slide.ctaText}
                      </Button>
                    </Link>
                  )}
                </div>
              </Container>
            </div>
          </div>
        )
      })}

      {/* Navigation Arrows (visible on hover) */}
      {activeSlides.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            aria-label="Previous Slide"
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/40 hover:bg-primary text-white border border-white/20 flex items-center justify-center transition-all duration-300 opacity-80 hover:opacity-100 hover:scale-105"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            aria-label="Next Slide"
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/40 hover:bg-primary text-white border border-white/20 flex items-center justify-center transition-all duration-300 opacity-80 hover:opacity-100 hover:scale-105"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Pagination Dot Controls */}
      {activeSlides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex items-center space-x-3 bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
          {activeSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-8 bg-primary' : 'w-2.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
