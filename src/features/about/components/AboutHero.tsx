import * as React from 'react'
import { Container } from '@/components/ui/Container'
import { Target, Star, Heart } from 'lucide-react'

import { urlFor } from '@/sanity/image'

export interface AboutHeroProps {
  data?: any
}

export function AboutHero({ data }: AboutHeroProps) {
  const subtitle = data?.heroSubtitle || 'Who We Are'
  const heading = data?.heroHeading || 'PASSION BEYOND PLAY.'
  const description = data?.heroDescription || 'Sportoid is a young start-up committed to the professional representation, execution and valuation of sporting properties in India.'
  const missionTitle = data?.missionTitle || 'Our Mission'
  const missionDescription = data?.missionDescription || 'To grow the game, create value and leave a lasting legacy in the world of sport.'
  const visionTitle = data?.visionTitle || 'Our Vision'
  const visionDescription = data?.visionDescription || "To be India's most trusted partner in sports management and property representation."
  const bgImgUrl = data?.heroBackgroundImage ? urlFor(data.heroBackgroundImage).width(1920).height(1080).url() : null

  return (
    <div className="relative w-full py-24 md:py-32 bg-dark overflow-hidden flex items-center">
      {/* Background image layer */}
      {bgImgUrl ? (
        <div
          className="absolute inset-0 bg-cover bg-center md:bg-right opacity-80"
          style={{ backgroundImage: `url(${bgImgUrl})` }}
        />
      ) : (
        <div className="absolute inset-0 bg-[url('/about-hero-bg.jpg')] bg-cover bg-center md:bg-right opacity-60" />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/20" />
      
      <Container className="relative z-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-1 bg-primary"></div>
            <span className="font-bold text-xs md:text-sm uppercase tracking-widest text-primary">
              {subtitle}
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-heading font-black text-white leading-tight mb-6">
            PASSION <br className="hidden sm:inline" />
            <span className="text-primary">BEYOND PLAY.</span>
          </h1>
          <p className="text-gray-300 max-w-xl mb-12 text-base md:text-lg leading-relaxed">
            {description}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10 border-t border-gray-800 pt-10">
            <div className="p-4 bg-white/5 rounded-lg border border-white/5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-primary border rounded-full p-2 border-primary/40 bg-primary/10"><Target className="w-5 h-5" /></span>
                <h3 className="text-white font-bold text-base md:text-lg">{missionTitle}</h3>
              </div>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                {missionDescription}
              </p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg border border-white/5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-primary border rounded-full p-2 border-primary/40 bg-primary/10"><Star className="w-5 h-5" /></span>
                <h3 className="text-white font-bold text-base md:text-lg">{visionTitle}</h3>
              </div>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                {visionDescription}
              </p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg border border-white/5 sm:col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-primary border rounded-full p-2 border-primary/40 bg-primary/10"><Heart className="w-5 h-5" /></span>
                <h3 className="text-white font-bold text-base md:text-lg">Our Belief</h3>
              </div>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                Integrity, commitment and performance — on and off the field.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
