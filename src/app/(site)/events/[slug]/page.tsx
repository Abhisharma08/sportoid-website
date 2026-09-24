import * as React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, CalendarDays, Clock, MapPin, Trophy } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { PortableTextRenderer } from '@/components/portable-text/PortableTextRenderer'
import { fetchEventBySlug } from '@/services/site/events.service'
import { constructMetadata } from '@/lib/metadata'
import { urlFor } from '@/sanity/image'
import {
  getSportLabel,
  formatEventDateRange,
  formatEventTime,
  formatEventLocation,
} from '@/features/events/utils'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = await fetchEventBySlug(slug)

  if (!event) {
    return constructMetadata({ title: 'Event Not Found', canonicalPath: `/events/${slug}`, noIndex: true })
  }

  return constructMetadata({
    title: event.title,
    description: event.summary,
    canonicalPath: `/events/${event.slug}`,
    ogImage: event.image,
  })
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = await fetchEventBySlug(slug)
  if (!event) notFound()

  const location = formatEventLocation(event)
  const imageUrl = event.image ? urlFor(event.image).width(1600).height(800).url() : null
  const isPast = new Date(event.endDate || event.startDate) < new Date()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: event.title,
    startDate: event.startDate,
    endDate: event.endDate || event.startDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    sport: getSportLabel(event.sport),
    description: event.summary,
    image: imageUrl ? [imageUrl] : undefined,
    location: location
      ? {
          '@type': 'Place',
          name: event.venue || event.city,
          address: { '@type': 'PostalAddress', addressLocality: event.city, addressCountry: 'IN' },
        }
      : undefined,
    organizer: { '@type': 'Organization', name: 'Sportoid' },
  }

  const details = [
    { icon: Trophy, label: 'Sport', value: [getSportLabel(event.sport), event.eventType].filter(Boolean).join(' · ') },
    { icon: CalendarDays, label: 'Date', value: formatEventDateRange(event.startDate, event.endDate) },
    { icon: Clock, label: 'Starts', value: `${formatEventTime(event.startDate)} IST` },
    ...(location ? [{ icon: MapPin, label: 'Venue', value: location }] : []),
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      <div className="bg-gradient-to-br from-white via-light to-red-50 border-b border-gray-100">
        <Container className="py-10 md:py-14">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> All Events
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-primary/10 text-primary text-[11px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full">
              {getSportLabel(event.sport)}
            </span>
            {isPast && (
              <span className="bg-gray-200 text-gray-600 text-[11px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full">
                Event Ended
              </span>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold text-dark leading-tight max-w-4xl">
            {event.title}
          </h1>
        </Container>
      </div>

      <Section variant="light" className="bg-white">
        <Container>
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
            <div className="lg:w-2/3">
              {imageUrl && (
                <div className="mb-10 rounded-xl overflow-hidden aspect-[2/1] shadow-md bg-gray-100">
                  <img src={imageUrl} alt={event.title} className="w-full h-full object-cover" />
                </div>
              )}
              {event.body ? (
                <PortableTextRenderer value={event.body} />
              ) : (
                event.summary && <p className="text-gray-700 text-lg leading-relaxed">{event.summary}</p>
              )}
            </div>

            <aside className="lg:w-1/3">
              <div className="lg:sticky lg:top-28 bg-light border border-gray-100 rounded-xl p-6 sm:p-8">
                <h2 className="text-sm font-heading font-semibold text-dark tracking-widest mb-6">EVENT DETAILS</h2>
                <dl className="space-y-5">
                  {details.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex gap-4">
                      <Icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <dt className="text-[11px] uppercase tracking-widest text-gray-500 mb-0.5">{label}</dt>
                        <dd className="text-sm text-dark font-medium">{value}</dd>
                      </div>
                    </div>
                  ))}
                </dl>

                {!isPast && event.registrationUrl && (
                  <a
                    href={event.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 block text-center w-full px-6 py-3.5 bg-primary text-white text-sm font-semibold uppercase tracking-wider rounded-md hover:bg-red-700 transition-colors"
                  >
                    {event.registrationLabel || 'Register Now'}
                  </a>
                )}
                <Link
                  href="/contact"
                  className="mt-3 block text-center w-full px-6 py-3 border border-gray-300 text-dark text-xs font-semibold uppercase tracking-wider rounded-md hover:border-primary hover:text-primary transition-colors"
                >
                  Partner / Sponsor Enquiry
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  )
}
