import { client } from '../../sanity/client'

export const getAboutPageData = async () => {
  const query = `*[_type == "aboutPage"][0]`
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
