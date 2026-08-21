import { client } from '../../sanity/client'

export const getHomePageData = async () => {
  const query = `*[_type == "homePage"][0]`
  try {
    return await client.fetch(query)
  } catch (error) {
    console.error('Sanity fetch error (Dataset likely missing):', error)
    return null
  }
}
