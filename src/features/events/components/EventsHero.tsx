import * as React from 'react'
import { Container } from '@/components/ui/Container'

export function EventsHero() {
  return (
    <div className="relative w-full py-20 md:py-28 bg-gradient-to-br from-white via-light to-red-50 overflow-hidden border-b border-gray-100">
      <div className="absolute inset-0 dotted-grid opacity-20 pointer-events-none" />
      <div className="absolute -right-24 -top-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-2xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-1 bg-primary rounded-full" />
            <span className="font-semibold text-xs md:text-sm uppercase tracking-widest text-primary">
              Events Calendar
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading font-semibold text-dark leading-tight mb-6">
            UPCOMING <span className="text-primary">EVENTS.</span>
          </h1>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            Tournaments, leagues, clinics and experiences we are bringing to the field. Find an event near you and be
            part of the game.
          </p>
        </div>
      </Container>
    </div>
  )
}
