import * as React from 'react'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

interface ServiceSectionProps {
  category: string
  title: string
  description: React.ReactNode
  imageSrc: string
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

  return (
    <Section variant={variant}>
      <Container>
        <div className={`flex flex-col gap-12 lg:gap-20 items-center ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200">
              {/* Image Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-bold">
                Image: {imageSrc}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-1 bg-primary"></div>
              <span className={`font-bold text-sm uppercase tracking-widest ${variant === 'light' ? 'text-dark' : 'text-primary'}`}>
                {category}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-black mb-8 leading-tight">
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
          </div>
        </div>
      </Container>
    </Section>
  )
}
