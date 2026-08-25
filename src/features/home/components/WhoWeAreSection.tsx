'use client'

import * as React from 'react'
import Link from 'next/link'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { FadeIn } from '@/components/ui/FadeIn'
import { urlFor } from '@/sanity/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export interface WhoWeAreSectionProps {
  data?: {
    tagline?: string
    heading?: string
    description?: string
    image1?: any
    image2?: any
  }
}

interface AnimatedCounterProps {
  target: number
  suffix?: string
  label: string
  icon: React.ReactNode
  delay?: number
}

function AnimatedCounter({ target, suffix = '+', label, icon, delay = 0 }: AnimatedCounterProps) {
  const counterRef = React.useRef<HTMLDivElement>(null)
  const numberRef = React.useRef<HTMLSpanElement>(null)

  React.useEffect(() => {
    const el = counterRef.current
    const numEl = numberRef.current
    if (!el || !numEl) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      numEl.textContent = `${target}${suffix}`
      return
    }

    const ctx = gsap.context(() => {
      const counter = { val: 0 }

      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(counter, {
            val: target,
            duration: 2,
            delay,
            ease: 'power2.out',
            onUpdate: () => {
              numEl.textContent = `${Math.round(counter.val)}${suffix}`
            },
          })
        },
      })
    }, el)

    return () => ctx.revert()
  }, [target, suffix, delay])

  return (
    <div ref={counterRef} className="flex items-center gap-3 sm:gap-4">
      <div className="text-white/80 flex-shrink-0">{icon}</div>
      <div>
        <div className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-white leading-none mb-1">
          <span ref={numberRef}>0{suffix}</span>
        </div>
        <div className="text-[9px] sm:text-[10px] md:text-xs text-white/80 uppercase tracking-widest font-medium">
          {label}
        </div>
      </div>
    </div>
  )
}

export function WhoWeAreSection({ data }: WhoWeAreSectionProps) {
  const tagline = data?.tagline || 'Who We Are'
  const heading = data?.heading || 'PASSION BEYOND PLAY.'
  const description =
    data?.description ||
    'Sportoid is committed to the professional representation, execution and valuation of sporting properties in India. We bridge talent and opportunity.\n\nOur mission is to grow the game, create value, and leave a lasting legacy in the world of sport.'

  return (
    <Section variant="light">
      <Container>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="lg:w-[45%] relative z-20">
            <FadeIn direction="right" delay={0.1}>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-8 h-1 bg-primary rounded-full" />
                <span className="font-bold text-xs sm:text-sm uppercase tracking-widest text-dark">
                  {tagline}
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black mb-6 leading-[1.1] text-dark">
                {heading}
              </h2>
              <div className="space-y-4 text-gray-600 mb-8 md:mb-10 text-sm sm:text-base leading-relaxed whitespace-pre-line max-w-lg">
                <p>{description}</p>
              </div>
              <Link href="/about">
                <Button variant="outline" className="border-gray-300 font-bold tracking-widest text-xs px-8 py-3.5">
                  LEARN MORE
                </Button>
              </Link>
            </FadeIn>
          </div>

          {/* Right: Image Collage + Stats Card */}
          <div className="lg:w-[55%] w-full relative">
            <div className="relative flex items-center min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] w-full">
              
              {/* Images Column */}
              <div className="w-[85%] sm:w-[75%] flex flex-col gap-4 sm:gap-6 relative z-0">
                {/* Top Image */}
                <FadeIn direction="up" delay={0.2} className="mr-8 sm:mr-16">
                  <div className="relative h-48 sm:h-64 lg:h-72 rounded-xl overflow-hidden float-shadow-lg bg-gradient-to-br from-gray-200 to-gray-300">
                    {data?.image1 ? (
                      <img src={urlFor(data.image1).width(800).height(800).url()} alt="Sportoid 1" className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <div className="absolute inset-0 dotted-grid opacity-30" />
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent" />
                      </>
                    )}
                  </div>
                </FadeIn>
                
                {/* Bottom Image */}
                <FadeIn direction="up" delay={0.3} className="ml-8 sm:ml-16">
                  <div className="relative h-48 sm:h-64 lg:h-72 rounded-xl overflow-hidden float-shadow-lg bg-gradient-to-tl from-gray-300 to-gray-200">
                    {data?.image2 ? (
                      <img src={urlFor(data.image2).width(800).height(800).url()} alt="Sportoid 2" className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <div className="absolute inset-0 dotted-grid opacity-30" />
                        <div className="absolute inset-0 bg-gradient-to-tl from-black/5 to-transparent" />
                      </>
                    )}
                  </div>
                </FadeIn>
              </div>

              {/* Stats Card - Overlapping right side */}
              <FadeIn direction="left" delay={0.4} className="absolute right-0 top-1/2 -translate-y-1/2 w-[50%] sm:w-[45%] md:w-[40%] z-10">
                <div className="bg-[#d61b22] text-white p-5 sm:p-6 md:p-8 lg:p-10 rounded-xl float-shadow-primary space-y-6 sm:space-y-8 relative overflow-hidden shadow-[0_20px_50px_rgba(214,27,34,0.3)] border border-red-500/20">
                  {/* Decorative glow */}
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/20 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-black/10 rounded-full blur-2xl pointer-events-none" />

                  <AnimatedCounter
                    target={10}
                    label="Years of Experience"
                    delay={0}
                    icon={
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    }
                  />
                  <AnimatedCounter
                    target={250}
                    label="Events Executed"
                    delay={0.2}
                    icon={
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    }
                  />
                  <AnimatedCounter
                    target={100}
                    label="Athletes Managed"
                    delay={0.4}
                    icon={
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    }
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
