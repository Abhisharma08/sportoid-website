import * as React from 'react'
import Link from 'next/link'
import { CalendarDays, MapPin, ArrowRight } from 'lucide-react'
import { urlFor } from '@/sanity/image'
import {
  EventSummary,
  getDateBadge,
  getSportLabel,
  formatEventDateRange,
  formatEventLocation,
} from '../utils'

export interface EventCardProps {
  event: EventSummary
  isPast?: boolean
}

export function EventCard({ event, isPast = false }: EventCardProps) {
  const badge = getDateBadge(event.startDate)
  const location = formatEventLocation(event)
  const imageUrl = event.image ? urlFor(event.image).width(720).height(450).url() : null

  return (
    <Link
      href={`/events/${event.slug}`}
      className="group flex flex-col h-full bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={event.title}
            loading="lazy"
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${isPast ? 'grayscale-[40%]' : ''}`}
          />
        ) : (
          <div className="absolute inset-0 dotted-grid opacity-30" />
        )}

        {/* Date badge */}
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md px-3 py-2 text-center min-w-[3.5rem]">
          <div className="text-xl font-heading font-semibold text-dark leading-none">{badge.day}</div>
          <div className="text-[10px] font-semibold tracking-widest text-primary mt-1">{badge.month}</div>
        </div>

        {/* Sport chip */}
        <span className="absolute top-4 right-4 bg-primary/90 text-white text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full">
          {getSportLabel(event.sport)}
        </span>
      </div>

      <div className="flex flex-col flex-grow p-6">
        {event.eventType && (
          <div className="text-xs font-medium uppercase tracking-widest text-gray-500 mb-2">{event.eventType}</div>
        )}
        <h3 className="text-lg font-heading font-semibold text-dark leading-snug mb-3 group-hover:text-primary transition-colors normal-case">
          {event.title}
        </h3>
        {event.summary && <p className="text-sm text-gray-600 leading-relaxed mb-5 line-clamp-3">{event.summary}</p>}

        <div className="mt-auto space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-primary flex-shrink-0" />
            <span>{formatEventDateRange(event.startDate, event.endDate)}</span>
          </div>
          {location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
              <span>{location}</span>
            </div>
          )}
        </div>

        <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          {isPast ? 'View Recap' : 'View Details'}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}
