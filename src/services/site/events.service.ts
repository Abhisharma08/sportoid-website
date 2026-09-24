import { getUpcomingEventsData, getPastEventsData, getEventBySlugData } from '../../repositories/sanity/events.repository'

export const fetchUpcomingEvents = async (limit?: number) => {
  return await getUpcomingEventsData(limit)
}

export const fetchPastEvents = async (limit?: number) => {
  return await getPastEventsData(limit)
}

export const fetchEventBySlug = async (slug: string) => {
  return await getEventBySlugData(slug)
}
