import * as React from 'react'
import { Container } from '@/components/ui/Container'
import { Target, Star, Heart } from 'lucide-react'

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
  return (
    <div className="relative w-full py-24 md:py-32 bg-dark overflow-hidden flex items-center">
      {/* Background image placeholder */}
      <div className="absolute inset-0 bg-[url('/about-hero-bg.jpg')] bg-cover bg-right opacity-30 mix-blend-overlay"></div>
      
      <Container className="relative z-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-1 bg-primary"></div>
            <span className="font-bold text-sm uppercase tracking-widest text-primary">Who We Are</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-black text-white leading-none mb-6">
            PASSION <br />
            <span className="text-primary">BEYOND PLAY.</span>
          </h1>
          <p className="text-gray-300 max-w-xl mb-16 text-lg">
            Sportoid is a young start-up committed to the professional representation,
            execution and valuation of sporting properties in India.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 border-t border-gray-800 pt-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-primary border rounded-full p-2 border-primary"><Target className="w-6 h-6" /></span>
                <h3 className="text-white font-bold text-lg">Our Mission</h3>
              </div>
              <p className="text-gray-400 text-sm">
                To grow the game, create value and leave a lasting legacy in the world of sport.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-primary border rounded-full p-2 border-primary"><Star className="w-6 h-6" /></span>
                <h3 className="text-white font-bold text-lg">Our Vision</h3>
              </div>
              <p className="text-gray-400 text-sm">
                To be India's most trusted partner in sports management and property representation.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-primary border rounded-full p-2 border-primary"><Heart className="w-6 h-6" /></span>
                <h3 className="text-white font-bold text-lg">Our Belief</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Integrity, commitment and performance — on and off the field.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
