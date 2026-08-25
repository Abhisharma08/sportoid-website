import { client } from '../../sanity/client'

export const getHomePageData = async () => {
  const query = `*[_type == "homePage"][0]{
    _id,
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
      description
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
        tags: ['home'],
        revalidate: 3600,
      },
    })
  } catch (error) {
    console.error('Sanity fetch error (homePage):', error)
    return null
  }
}
