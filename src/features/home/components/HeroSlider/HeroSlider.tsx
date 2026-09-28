'use client'

import * as React from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { urlFor } from '@/sanity/image'
import gsap from 'gsap'

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

// Hero copy lives here; Sanity slides only supply the rotating background images.
const MESSAGE_SLIDES: HeroSlideItem[] = [
  {
    subtitle: 'The Opportunity',
    title: 'SPORT IS THE NEW ENGAGEMENT MEDIUM',
    description:
      'Sport, in itself, has become one of the biggest engagement mediums for brands today - and spending on sport in India is rising sharply.',
    ctaText: 'Discover More',
    ctaLink: '/about',
  },
  {
    subtitle: 'Unbiased Advice',
    title: 'COUNSEL FREE OF VESTED INTERESTS',
    description:
      'In this rapidly evolving landscape, every brand owner deserves professional, unbiased advice - free of vested interests - on which sports property or personality to partner with, or indeed, whether sport is the right fit at all.',
    ctaText: 'Talk to Us',
    ctaLink: '/contact',
  },
  {
    subtitle: 'Two Decades of Relationships',
    title: 'EXPERIENCE THAT OPENS DOORS',
    description:
      'At Sportoid, drawing on relationships built over two decades in the industry, we offer exactly that: professional counsel on the briefs and challenges brand owners face across categories.',
    ctaText: 'Meet the Team',
    ctaLink: '/people',
  },
  {
    subtitle: 'Our Commitment',
    title: 'RESULTS. TRANSPARENCY. NO SURPRISES.',
    description:
      'Our commitment is simple - deliver the results our clients ask for, with complete transparency, and no hidden surprises or costs.',
    ctaText: 'Get in Touch',
    ctaLink: '/contact',
  },
]

export function HeroSlider({ slides }: HeroSliderProps) {
  const images = (slides ?? []).map((slide) => slide.backgroundImage).filter(Boolean)
  const activeSlides = MESSAGE_SLIDES.map((slide, index) => ({
    ...slide,
    backgroundImage: images.length > 0 ? images[index % images.length] : undefined,
  }))
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isPaused, setIsPaused] = React.useState(false)
  const contentRef = React.useRef<HTMLDivElement>(null)
  const slideKeyRef = React.useRef(0)

  // Auto-advance slider every 8 seconds (longer copy needs reading time) if not hovered/paused
  React.useEffect(() => {
    if (isPaused || activeSlides.length <= 1) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeSlides.length)
    }, 8000)

    return () => clearInterval(timer)
  }, [isPaused, activeSlides.length])

  // Staggered text entrance on slide change
  React.useEffect(() => {
    const el = contentRef.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    slideKeyRef.current += 1

    const targets = el.querySelectorAll('[data-animate]')
    if (targets.length === 0) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        {
          opacity: 0,
          y: 30,
          scale: 0.98,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          clearProps: 'all',
        }
      )
    }, el)

    return () => ctx.revert()
  }, [currentIndex])

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activeSlides.length) % activeSlides.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeSlides.length)
  }

  return (
    <div
      className="relative w-full h-[420px] sm:h-[500px] md:h-[650px] lg:h-[750px] bg-dark flex items-center overflow-hidden group select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides with smooth cross-fade + Ken Burns */}
      {activeSlides.map((slide, index) => {
        const isActive = index === currentIndex
        const bgImgUrl = slide.backgroundImage
          ? urlFor(slide.backgroundImage).width(1920).height(1080).url()
          : null

        return (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Image Layer with Ken Burns */}
            {bgImgUrl ? (
              <div
                className={`absolute inset-0 bg-cover bg-center will-change-transform ${
                  isActive ? 'animate-ken-burns' : ''
                }`}
                style={{
                  backgroundImage: `url(${bgImgUrl})`,
                  transformOrigin: 'center center',
                }}
              />
            ) : (
              <div className="absolute inset-0 bg-dark" />
            )}

            {/* Multi-layer gradient overlays for spatial depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>
        )
      })}

      {/* Slide Content with Staggered Entrance */}
      <div className="relative h-full w-full flex items-center z-20" ref={contentRef}>
        {/* Side padding clears the prev/next arrows until the centred container's margin does (2xl) */}
        <Container className="relative px-5 sm:px-20 md:px-24 lg:px-24 2xl:px-8">
          <div className="max-w-3xl">
            {activeSlides[currentIndex]?.subtitle && (
              <p
                data-animate
                className="glass-dark inline-block text-primary font-semibold text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.2em] sm:tracking-[0.25em] mb-3 sm:mb-5 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full"
              >
                {activeSlides[currentIndex].subtitle}
              </p>
            )}
            <h1
              data-animate
              className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-heading font-semibold text-white leading-[1.08] tracking-tight mb-3 sm:mb-6"
            >
              {activeSlides[currentIndex]?.title}
            </h1>
            {activeSlides[currentIndex]?.description && (
              <p
                data-animate
                className="text-gray-300 max-w-xl mb-6 sm:mb-10 text-sm sm:text-base md:text-lg leading-relaxed"
              >
                {activeSlides[currentIndex].description}
              </p>
            )}
            {activeSlides[currentIndex]?.ctaText && (
              <div data-animate>
                <Link href={activeSlides[currentIndex].ctaLink || '/about'}>
                  <Button variant="primary" size="lg" className="font-semibold tracking-wider">
                    {activeSlides[currentIndex].ctaText}
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </Container>
      </div>

      {/* Glassmorphic Navigation Arrows */}
      {activeSlides.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            aria-label="Previous Slide"
            className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full glass-dark text-white hidden sm:flex items-center justify-center transition-all duration-300 hover:bg-primary/80 hover:border-primary/40 hover:scale-110 active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button
            onClick={goToNext}
            aria-label="Next Slide"
            className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full glass-dark text-white hidden sm:flex items-center justify-center transition-all duration-300 hover:bg-primary/80 hover:border-primary/40 hover:scale-110 active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </>
      )}

      {/* Animated Pagination Dots */}
      {activeSlides.length > 1 && (
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex items-center gap-2 sm:gap-3 glass-dark px-3 sm:px-5 py-2 sm:py-2.5 rounded-full">
          {activeSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`rounded-full transition-all duration-500 ease-out cursor-pointer ${
                idx === currentIndex
                  ? 'w-8 h-2.5 bg-primary glow-primary'
                  : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
