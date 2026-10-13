import { CONTENT_REVALIDATE_SECONDS, CONTENT_TAG } from '@/sanity/cache'
import { client } from '../../sanity/client'

export const getPeopleData = async () => {
  const query = `*[_type == "person"] | order(order asc){
    _id,
    seo,
    _updatedAt,
    name,
    role,
    bio,
    avatar,
    order
  }`
  try {
    return await client.fetch(query, {}, {
      next: {
        tags: [CONTENT_TAG, 'people'],
        revalidate: CONTENT_REVALIDATE_SECONDS,
      },
    })
  } catch (error) {
    console.error('Sanity fetch error (People):', error)
    throw error
  }
}

export const getPeoplePageData = async () => {
  const query = `*[_type == "peoplePage"][0]{
    _id,
    seo,
    _updatedAt,
    title,
    heroSubtitle,
    heroHeading,
    heroBackgroundImage,
    heroDescription
  }`
  try {
    return await client.fetch(query, {}, {
      next: {
        tags: [CONTENT_TAG, 'people-page'],
        revalidate: CONTENT_REVALIDATE_SECONDS,
      },
    })
  } catch (error) {
    console.error('Sanity fetch error (PeoplePage):', error)
    throw error
  }
}
