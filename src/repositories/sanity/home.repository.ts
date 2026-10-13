import { CONTENT_REVALIDATE_SECONDS, CONTENT_TAG } from '@/sanity/cache'
import { client } from '../../sanity/client'

export const getHomePageData = async () => {
  const query = `*[_type == "homePage"][0]{
    _id,
    seo,
    _updatedAt,
    title,
    heroSlides[]{
      _key,
      title,
      subtitle,
      description,
      ctaText,
      ctaLink,
      backgroundImage
    },
    whoWeAre{
      tagline,
      heading,
      description,
      image1,
      image2
    },
    strengths[]{
      _key,
      title,
      description,
      icon
    },
    partnershipCta{
      heading,
      description,
      buttonText,
      buttonLink
    }
  }`
  try {
    return await client.fetch(query, {}, {
      next: {
        tags: [CONTENT_TAG, 'home'],
        revalidate: CONTENT_REVALIDATE_SECONDS,
      },
    })
  } catch (error) {
    console.error('Sanity fetch error (homePage):', error)
    throw error
  }
}
