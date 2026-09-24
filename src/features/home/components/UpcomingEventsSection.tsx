import * as React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { Carousel } from '@/components/ui/Carousel'
import { EventCard } from '@/features/events/components/EventCard'
import type { EventSummary } from '@/features/events/utils'

export interface UpcomingEventsSectionProps {
  events?: EventSummary[]
}

export function UpcomingEventsSection({ events }: UpcomingEventsSectionProps) {
  // No placeholder events: showing made-up dates publicly would mislead visitors
  if (!events || events.length === 0) return null

  return (
    <Section variant="light">
      <Container>
        <FadeIn direction="right" delay={0.1}>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 md:mb-14">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-8 h-1 bg-primary rounded-full" />
                <span className="font-semibold text-xs sm:text-sm uppercase tracking-widest text-dark">
                  On The Calendar
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-dark">
                UPCOMING EVENTS
              </h2>
            </div>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary hover:gap-3 transition-all"
            >
              View All Events <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.2}>
          <Carousel ariaLabel="Upcoming events" autoplayMs={5000}>
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </Carousel>
        </FadeIn>
      </Container>
    </Section>
  )
}
