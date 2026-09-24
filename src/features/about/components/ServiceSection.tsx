import * as React from 'react'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

import { FadeIn } from '@/components/ui/FadeIn'

interface ServiceSectionProps {
  category: string
  title: string
  description: React.ReactNode
  imageSrc?: string
  imageAlignment: 'left' | 'right'
  variant?: 'light' | 'dark' | 'dark-gray'
}

export function ServiceSection({
  category,
  title,
  description,
  imageSrc,
  imageAlignment,
  variant = 'light'
}: ServiceSectionProps) {
  const isLeft = imageAlignment === 'left'

  // Default cricket action fallback images
  const defaultImages: Record<string, string> = {
    'Players': 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80',
    'Sponsorship': 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80',
    'Event Delivery': 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=1200&q=80',
  }

  const finalImageSrc = imageSrc?.startsWith('http') || imageSrc?.startsWith('/') && !imageSrc.endsWith('.jpg') 
    ? imageSrc 
    : (imageSrc && imageSrc.startsWith('http') ? imageSrc : defaultImages[category] || 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80')

  return (
    <Section variant={variant}>
      <Container>
        <div className={`flex flex-col gap-12 lg:gap-20 items-center ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
          <div className="w-full lg:w-1/2">
            <FadeIn direction={isLeft ? 'right' : 'left'} delay={0.1}>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-dark shadow-xl group">
                <img
                  src={finalImageSrc}
                  alt={`${title} - ${category}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </FadeIn>
          </div>
          <div className="w-full lg:w-1/2">
            <FadeIn direction={isLeft ? 'left' : 'right'} delay={0.2}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-1 bg-primary"></div>
                <span className={`font-semibold text-sm uppercase tracking-widest ${variant === 'light' ? 'text-dark' : 'text-primary'}`}>
                  {category}
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-heading font-semibold mb-8 leading-tight">
                {title.split('. ').map((part, i) => (
                  <React.Fragment key={i}>
                    {part}
                    {i < title.split('. ').length - 1 && '.'}
                    <br />
                  </React.Fragment>
                ))}
              </h2>
              <div className="space-y-6 text-gray-600 mb-10 text-lg leading-relaxed">
                {description}
              </div>
              <Button variant={variant === 'light' ? 'primary' : 'outline'}>Know More</Button>
            </FadeIn>
          </div>
        </div>
      </Container>
    </Section>
  )
}
