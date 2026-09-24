import { client } from '../../sanity/client'

export const getClientLogosData = async () => {
  const query = `*[_type == "clientLogo" && defined(logo)] | order(order asc, name asc){
    _id,
    name,
    logo,
    url
  }`
  try {
    return await client.fetch(query, {}, {
      next: {
        tags: ['clients'],
        revalidate: 3600,
      },
    })
  } catch (error) {
    console.error('Sanity fetch error (ClientLogos):', error)
    return []
  }
}
