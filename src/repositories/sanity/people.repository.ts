import { client } from '../../sanity/client'

export const getPeopleData = async () => {
  const query = `*[_type == "person"] | order(order asc)`
  try {
    return await client.fetch(query, {}, {
      next: {
        tags: ['people'],
        revalidate: 3600,
      },
    })
  } catch (error) {
    console.error('Sanity fetch error (People):', error)
    return []
  }
}
