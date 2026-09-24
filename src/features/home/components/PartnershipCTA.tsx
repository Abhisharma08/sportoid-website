'use client'

import * as React from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { Handshake } from 'lucide-react'

export interface PartnershipCTAProps {
  data?: {
    heading?: string
    description?: string
    buttonText?: string
    buttonLink?: string
  }
}

export function PartnershipCTA({ data }: PartnershipCTAProps) {
  const heading = data?.heading || "LET'S BUILD SOMETHING EXTRAORDINARY TOGETHER"
  const description =
    data?.description || 'Partner with Sportoid and be a part of the growth story of Indian sport.'
  const buttonText = data?.buttonText || 'Get In Touch'
  const buttonLink = data?.buttonLink || '/contact'

  return (
    <section className="relative bg-gradient-to-r from-primary via-red-600 to-primary overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-20 -top-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-black/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 dotted-grid-subtle opacity-40" />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 py-10 sm:py-12 md:py-14 text-center sm:text-left">
          {/* Left: Icon + Text */}
          <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 md:gap-8">
            <FadeIn direction="left" delay={0.1}>
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center flex-shrink-0 animate-float-gentle">
                <Handshake className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-white leading-tight mb-1 sm:mb-2">
                  {heading}
                </h2>
                <p className="text-white/80 text-xs sm:text-sm md:text-base max-w-xl">{description}</p>
              </div>
            </FadeIn>
          </div>

          {/* Right: CTA Button */}
          <FadeIn direction="right" delay={0.3}>
            <Link
              href={buttonLink}
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 bg-white/10 backdrop-blur-sm border-2 border-white text-white font-semibold uppercase tracking-wider text-xs sm:text-sm rounded-md transition-all duration-300 ease-out hover:bg-white hover:text-primary hover:scale-[1.04] hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)] active:scale-[0.98] whitespace-nowrap w-full sm:w-auto"
            >
              {buttonText}
            </Link>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
