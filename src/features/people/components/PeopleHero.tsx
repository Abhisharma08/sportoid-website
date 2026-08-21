import * as React from 'react'
import { Container } from '@/components/ui/Container'

export function PeopleHero() {
  return (
    <div className="relative w-full py-24 md:py-32 bg-dark overflow-hidden flex items-center">
      {/* Background image placeholder */}
      <div className="absolute inset-0 bg-[url('/people-hero-bg.jpg')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
      
      <Container className="relative z-10">
        <div className="max-w-2xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-1 bg-primary"></div>
            <span className="font-bold text-sm uppercase tracking-widest text-primary">Our Leaders</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-black text-white leading-none mb-6">
            THE PEOPLE <br />
            <span className="text-primary">BEHIND SPORTOID</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Meet the visionaries driving our passion for sport and building lasting impact.
          </p>
        </div>
      </Container>
    </div>
  )
}
