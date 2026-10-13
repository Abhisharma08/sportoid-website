import { CONTENT_REVALIDATE_SECONDS, CONTENT_TAG } from '@/sanity/cache'
import { client } from '../../sanity/client'

const EVENT_CARD_PROJECTION = `{
  _id,
  _updatedAt,
  seo,
  title,
  "slug": slug.current,
  sport,
  eventType,
  startDate,
  endDate,
  venue,
  city,
  image,
  summary,
  registrationUrl,
  registrationLabel,
  featured
}`

// An event stays "upcoming" until it has finished (endDate), or until its start date for single-day events
const IS_UPCOMING = `select(defined(endDate) => dateTime(endDate) >= dateTime(now()), string::split(string(dateTime(startDate) + 19800), "T")[0] >= string::split(string(dateTime(now()) + 19800), "T")[0])`

export const getUpcomingEventsData = async (limit?: number) => {
  const slice = limit ? `[0...${Math.floor(limit)}]` : ''
  const query = `*[_type == "event" && defined(slug.current) && defined(startDate) && ${IS_UPCOMING}] | order(featured desc, startDate asc)${slice} ${EVENT_CARD_PROJECTION}`
  try {
    return await client.fetch(query, {}, {
      next: {
        tags: [CONTENT_TAG, 'events'],
        revalidate: CONTENT_REVALIDATE_SECONDS,
      },
    })
  } catch (error) {
    console.error('Sanity fetch error (UpcomingEvents):', error)
    throw error
  }
}

export const getPastEventsData = async (limit = 12) => {
  const query = `*[_type == "event" && defined(slug.current) && defined(startDate) && !(${IS_UPCOMING})] | order(startDate desc)[0...${Math.floor(limit)}] ${EVENT_CARD_PROJECTION}`
  try {
    return await client.fetch(query, {}, {
      next: {
        tags: [CONTENT_TAG, 'events'],
        revalidate: CONTENT_REVALIDATE_SECONDS,
      },
    })
  } catch (error) {
    console.error('Sanity fetch error (PastEvents):', error)
    throw error
  }
}

export const getEventBySlugData = async (slug: string) => {
  const query = `*[_type == "event" && defined(slug.current) && defined(startDate) && slug.current == $slug][0]{
    ...${EVENT_CARD_PROJECTION},
    body
  }`
  try {
    return await client.fetch(query, { slug }, {
      next: {
        tags: [CONTENT_TAG, `event:${slug}`, 'events'],
        revalidate: CONTENT_REVALIDATE_SECONDS,
      },
    })
  } catch (error) {
    console.error('Sanity fetch error (Event by slug):', error)
    throw error
  }
}
