import * as React from 'react'
import Link from 'next/link'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

import { FadeIn } from '@/components/ui/FadeIn'

export interface WhoWeAreSectionProps {
  data?: {
    tagline?: string
    heading?: string
    description?: string
  }
}

export function WhoWeAreSection({ data }: WhoWeAreSectionProps) {
  const tagline = data?.tagline || 'Who We Are'
  const heading = data?.heading || 'DRIVEN BY PASSION. DEFINED BY PURPOSE.'
  const description = data?.description || 'From managing elite athletes to executing world-class sporting events and partnerships, we bring unmatched expertise and integrity to everything we do. Our mission is to grow the game, create value, and leave a lasting legacy in the world of sport.'

  return (
    <Section variant="light">
      <Container>
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <FadeIn direction="right" delay={0.1}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-1 bg-primary"></div>
                <span className="font-bold text-sm uppercase tracking-widest text-dark">{tagline}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-black mb-8 leading-tight">
                {heading}
              </h2>
              <div className="space-y-6 text-gray-600 mb-10 whitespace-pre-line leading-relaxed">
                <p>{description}</p>
              </div>
              <Link href="/about">
                <Button variant="outline">Learn More</Button>
              </Link>
            </FadeIn>
          </div>
          <div className="lg:w-1/2 w-full grid grid-cols-2 gap-4">
            {/* Placeholder for the collage & red stats card */}
            <FadeIn direction="up" delay={0.2} className="space-y-4">
              <div className="bg-gray-200 h-64 rounded-lg w-full"></div>
              <div className="bg-gray-300 h-48 rounded-lg w-full"></div>
            </FadeIn>
            <FadeIn direction="up" delay={0.35} className="bg-primary text-white p-8 flex flex-col justify-center rounded-lg space-y-12 shadow-lg">
              <div>
                <div className="text-4xl font-heading font-black">10+</div>
                <div className="text-sm">Years of Experience</div>
              </div>
              <div>
                <div className="text-4xl font-heading font-black">250+</div>
                <div className="text-sm">Events Executed</div>
              </div>
              <div>
                <div className="text-4xl font-heading font-black">100+</div>
                <div className="text-sm">Athletes Managed</div>
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </Section>
  )
}
