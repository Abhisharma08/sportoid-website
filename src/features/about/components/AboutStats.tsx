import * as React from 'react'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Trophy, Calendar, Users, Handshake } from 'lucide-react'

export function AboutStats() {
  return (
    <Section variant="dark-gray" className="border-t-4 border-primary py-12 md:py-20">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x divide-gray-800">
          <div className="flex flex-col items-center text-center px-4">
            <div className="text-primary mb-4"><Trophy className="w-10 h-10" /></div>
            <div className="text-4xl md:text-5xl font-heading font-black text-white mb-2">10+</div>
            <div className="text-sm font-bold text-gray-400">Years of Experience</div>
          </div>
          <div className="flex flex-col items-center text-center px-4">
            <div className="text-primary mb-4"><Calendar className="w-10 h-10" /></div>
            <div className="text-4xl md:text-5xl font-heading font-black text-white mb-2">250+</div>
            <div className="text-sm font-bold text-gray-400">Events Executed</div>
          </div>
          <div className="flex flex-col items-center text-center px-4">
            <div className="text-primary mb-4"><Users className="w-10 h-10" /></div>
            <div className="text-4xl md:text-5xl font-heading font-black text-white mb-2">100+</div>
            <div className="text-sm font-bold text-gray-400">Athletes Managed</div>
          </div>
          <div className="flex flex-col items-center text-center px-4">
            <div className="text-primary mb-4"><Handshake className="w-10 h-10" /></div>
            <div className="text-4xl md:text-5xl font-heading font-black text-white mb-2">50+</div>
            <div className="text-sm font-bold text-gray-400">Brand Partnerships</div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
