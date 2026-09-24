import { SPORT_OPTIONS } from '../../../sanity/schemaTypes/constants/sports'
import type { SanityImageSource } from '@/sanity/image'

export interface EventSummary {
  _id: string
  title: string
  slug: string
  sport?: string
  eventType?: string
  startDate: string
  endDate?: string
  venue?: string
  city?: string
  image?: SanityImageSource
  summary?: string
  registrationUrl?: string
  registrationLabel?: string
  featured?: boolean
}

// Events are held in India; pin the timezone so server rendering never shifts dates
const TIME_ZONE = 'Asia/Kolkata'

const format = (iso: string, options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat('en-IN', { timeZone: TIME_ZONE, ...options }).format(new Date(iso))

export const getSportLabel = (sport?: string) =>
  SPORT_OPTIONS.find((option) => option.value === sport)?.title || 'Sport'

export const getDateBadge = (iso: string) => ({
  day: format(iso, { day: '2-digit' }),
  month: format(iso, { month: 'short' }).toUpperCase(),
})

export const formatEventDateRange = (startDate: string, endDate?: string) => {
  const start = format(startDate, { day: 'numeric', month: 'short', year: 'numeric' })
  if (!endDate) return start

  const end = format(endDate, { day: 'numeric', month: 'short', year: 'numeric' })
  return start === end ? start : `${start} – ${end}`
}

export const formatEventTime = (iso: string) => format(iso, { hour: 'numeric', minute: '2-digit', hour12: true })

export const formatEventLocation = (event: Pick<EventSummary, 'venue' | 'city'>) =>
  [event.venue, event.city].filter(Boolean).join(', ')
