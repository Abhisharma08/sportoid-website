import { client } from '../../sanity/client'

const EVENT_CARD_PROJECTION = `{
  _id,
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
const IS_UPCOMING = `coalesce(endDate, startDate) >= now()`

export const getUpcomingEventsData = async (limit?: number) => {
  const slice = limit ? `[0...${Math.floor(limit)}]` : ''
  const query = `*[_type == "event" && ${IS_UPCOMING}] | order(featured desc, startDate asc)${slice} ${EVENT_CARD_PROJECTION}`
  try {
    return await client.fetch(query, {}, {
      next: {
        tags: ['events'],
        revalidate: 3600,
      },
    })
  } catch (error) {
    console.error('Sanity fetch error (UpcomingEvents):', error)
    return []
  }
}

export const getPastEventsData = async (limit = 12) => {
  const query = `*[_type == "event" && !(${IS_UPCOMING})] | order(startDate desc)[0...${Math.floor(limit)}] ${EVENT_CARD_PROJECTION}`
  try {
    return await client.fetch(query, {}, {
      next: {
        tags: ['events'],
        revalidate: 3600,
      },
    })
  } catch (error) {
    console.error('Sanity fetch error (PastEvents):', error)
    return []
  }
}

export const getEventBySlugData = async (slug: string) => {
  const query = `*[_type == "event" && slug.current == $slug][0]{
    ...${EVENT_CARD_PROJECTION},
    body
  }`
  try {
    return await client.fetch(query, { slug }, {
      next: {
        tags: [`event:${slug}`, 'events'],
        revalidate: 3600,
      },
    })
  } catch (error) {
    console.error('Sanity fetch error (Event by slug):', error)
    return null
  }
}
