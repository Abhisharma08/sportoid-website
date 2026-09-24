import * as React from 'react'
import { Container } from '@/components/ui/Container'

import { urlFor } from '@/sanity/image'

export interface PeopleHeroProps {
  data?: any
}

export function PeopleHero({ data }: PeopleHeroProps) {
  const subtitle = data?.heroSubtitle || 'Our Leaders'
  const heading = data?.heroHeading || 'THE PEOPLE\nBEHIND SPORTOID'
  const description = data?.heroDescription || 'Meet the visionaries driving our passion for sport and building lasting impact.'
  const bgImgUrl = data?.heroBackgroundImage ? urlFor(data.heroBackgroundImage).width(1920).height(1080).url() : null

  return (
    <div className="relative w-full py-24 md:py-32 bg-dark overflow-hidden flex items-center">
      {bgImgUrl ? (
        <div
          className="absolute inset-0 bg-cover bg-center md:bg-right opacity-80"
          style={{ backgroundImage: `url(${bgImgUrl})` }}
        />
      ) : (
        <div className="absolute inset-0 bg-[url('/people-hero-bg.jpg')] bg-cover bg-center md:bg-right opacity-60" />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />
      
      <Container className="relative z-10">
        <div className="max-w-2xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-1 bg-primary"></div>
            <span className="font-semibold text-xs md:text-sm uppercase tracking-widest text-primary">{subtitle}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-heading font-semibold text-white leading-tight mb-6">
            THE PEOPLE <br className="hidden sm:inline" />
            <span className="text-primary">BEHIND SPORTOID</span>
          </h1>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed">
            {description}
          </p>
        </div>
      </Container>
    </div>
  )
}
