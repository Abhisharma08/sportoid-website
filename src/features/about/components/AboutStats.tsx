import * as React from 'react'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Trophy, Calendar, Users, Handshake } from 'lucide-react'

export function AboutStats() {
  return (
    <Section variant="light" className="bg-white border-y border-gray-100 py-12 md:py-20">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x divide-gray-200">
          <div className="flex flex-col items-center text-center px-4">
            <div className="text-primary mb-4"><Trophy className="w-10 h-10" /></div>
            <div className="text-4xl md:text-5xl font-heading font-semibold text-dark mb-2">10+</div>
            <div className="text-sm font-semibold text-gray-600">Years of Experience</div>
          </div>
          <div className="flex flex-col items-center text-center px-4">
            <div className="text-primary mb-4"><Calendar className="w-10 h-10" /></div>
            <div className="text-4xl md:text-5xl font-heading font-semibold text-dark mb-2">250+</div>
            <div className="text-sm font-semibold text-gray-600">Events Executed</div>
          </div>
          <div className="flex flex-col items-center text-center px-4">
            <div className="text-primary mb-4"><Users className="w-10 h-10" /></div>
            <div className="text-4xl md:text-5xl font-heading font-semibold text-dark mb-2">100+</div>
            <div className="text-sm font-semibold text-gray-600">Athletes Managed</div>
          </div>
          <div className="flex flex-col items-center text-center px-4">
            <div className="text-primary mb-4"><Handshake className="w-10 h-10" /></div>
            <div className="text-4xl md:text-5xl font-heading font-semibold text-dark mb-2">50+</div>
            <div className="text-sm font-semibold text-gray-600">Brand Partnerships</div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
