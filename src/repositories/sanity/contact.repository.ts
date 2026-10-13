import { CONTENT_REVALIDATE_SECONDS, CONTENT_TAG } from '@/sanity/cache'
import { client } from '../../sanity/client'

export const getContactPageData = async () => {
  const query = `*[_type == "contactPage"][0]{
    _id,
    seo,
    _updatedAt,
    title,
    heroHeading,
    heroBackgroundImage,
    heroDescription,
    phone,
    email,
    address,
    officeHours
  }`
  try {
    return await client.fetch(query, {}, {
      next: {
        tags: [CONTENT_TAG, 'contact'],
        revalidate: CONTENT_REVALIDATE_SECONDS,
      },
    })
  } catch (error) {
    console.error('Sanity fetch error (ContactPage):', error)
    throw error
  }
}
