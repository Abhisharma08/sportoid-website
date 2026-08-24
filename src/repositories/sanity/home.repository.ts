import { client } from '../../sanity/client'

export const getHomePageData = async () => {
  const query = `*[_type == "homePage"][0]`
  try {
    return await client.fetch(query, {}, {
      next: {
        tags: ['home'],
        revalidate: 3600, // Revalidate background cache every hour
      },
    })
  } catch (error) {
    console.error('Sanity fetch error (homePage):', error)
    return null
  }
}
