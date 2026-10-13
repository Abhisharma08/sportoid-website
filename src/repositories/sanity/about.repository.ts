import { CONTENT_REVALIDATE_SECONDS, CONTENT_TAG } from '@/sanity/cache'
import { client } from '../../sanity/client'

export const getAboutPageData = async () => {
  const query = `*[_type == "aboutPage"][0]{
    _id,
    seo,
    _updatedAt,
    title,
    heroSubtitle,
    heroHeading,
    heroBackgroundImage,
    heroDescription,
    missionTitle,
    missionDescription,
    visionTitle,
    visionDescription,
    beliefTitle,
    beliefDescription,
    services[]{
      _key,
      category,
      title,
      image,
      paragraphs,
      imageAlignment
    },
    stats[]{
      _key,
      value,
      label,
      icon
    }
  }`
  try {
    return await client.fetch(query, {}, {
      next: {
        tags: [CONTENT_TAG, 'about'],
        revalidate: CONTENT_REVALIDATE_SECONDS,
      },
    })
  } catch (error) {
    console.error('Sanity fetch error (AboutPage):', error)
    throw error
  }
}
