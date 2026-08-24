import { client } from '../../sanity/client'

export const getAboutPageData = async () => {
  const query = `*[_type == "aboutPage"][0]{
    _id,
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
        tags: ['about'],
        revalidate: 3600,
      },
    })
  } catch (error) {
    console.error('Sanity fetch error (AboutPage):', error)
    return null
  }
}
