import { client } from '../../sanity/client'

export const getPeopleData = async () => {
  const query = `*[_type == "person"] | order(order asc, name asc)`
  try {
    return await client.fetch(query)
  } catch (error) {
    console.error('Sanity fetch error (People):', error)
    return []
  }
}
