import { client } from '../../sanity/client'

export const getAboutPageData = async () => {
  const query = `*[_type == "aboutPage"][0]`
  try {
    return await client.fetch(query)
  } catch (error) {
    console.error('Sanity fetch error (About):', error)
    return null
  }
}
