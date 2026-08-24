import { client } from '../../sanity/client'

export const getHomePageData = async () => {
  const query = `*[_type == "homePage"][0]{
    _id,
    title,
    heroHeading,
    heroSubtitle,
    heroDescription,
    heroBackgroundImage,
    heroCtaText,
    heroCtaLink,
    sliderItems[]{
      _key,
      title,
      subtitle,
      description,
      image,
      ctaText,
      ctaLink
    },
    whoWeAreHeading,
    whoWeAreSubtitle,
    whoWeAreDescription,
    whoWeAreParagraphs,
    strengthsHeading,
    strengthsSubtitle,
    strengths[]{
      _key,
      title,
      description,
      icon
    },
    featuredTournamentsHeading,
    featuredTournaments[]{
      _key,
      title,
      year,
      image
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
