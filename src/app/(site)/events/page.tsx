import * as React from 'react'
import { CalendarX } from 'lucide-react'
import { EventsHero } from '@/features/events/components/EventsHero'
import { EventCard } from '@/features/events/components/EventCard'
import type { EventSummary } from '@/features/events/utils'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { fetchUpcomingEvents, fetchPastEvents } from '@/services/site/events.service'
import { constructMetadata } from '@/lib/metadata'

export async function generateMetadata() {
  return constructMetadata({
    title: 'Upcoming Sports Events',
    description:
      'Upcoming tournaments, leagues, clinics and sporting experiences organised and managed by Sportoid across India.',
    canonicalPath: '/events',
  })
}

export default async function EventsPage() {
  const [upcoming, past]: [EventSummary[], EventSummary[]] = await Promise.all([
    fetchUpcomingEvents(),
    fetchPastEvents(6),
  ])

  return (
    <>
      <EventsHero />

      <Section variant="light">
        <Container>
          {upcoming.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {upcoming.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          ) : (
            <div className="max-w-xl mx-auto text-center bg-white border border-gray-100 rounded-xl p-10 shadow-sm">
              <CalendarX className="w-10 h-10 text-primary mx-auto mb-4" />
              <h2 className="text-xl font-heading font-semibold text-dark mb-2">No Upcoming Events Right Now</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                New events are announced regularly. Follow us on social media or subscribe to our newsletter to hear
                about them first.
              </p>
            </div>
          )}
        </Container>
      </Section>

      {past.length > 0 && (
        <Section variant="light" className="bg-white border-t border-gray-100">
          <Container>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-8 h-1 bg-primary rounded-full" />
              <span className="font-semibold text-xs sm:text-sm uppercase tracking-widest text-dark">Recently Held</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-semibold text-dark mb-10">PAST EVENTS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {past.map((event) => (
                <EventCard key={event._id} event={event} isPast />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  )
}
