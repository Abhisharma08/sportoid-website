import { client } from '../../sanity/client'

export const getContactPageData = async () => {
  const query = `*[_type == "contactPage"][0]`
  try {
    return await client.fetch(query)
  } catch (error) {
    console.error('Sanity fetch error (Contact):', error)
    return null
  }
}
