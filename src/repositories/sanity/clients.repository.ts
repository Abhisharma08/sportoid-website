import { CONTENT_REVALIDATE_SECONDS, CONTENT_TAG } from '@/sanity/cache'
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
        tags: [CONTENT_TAG, 'clients'],
        revalidate: CONTENT_REVALIDATE_SECONDS,
      },
    })
  } catch (error) {
    console.error('Sanity fetch error (ClientLogos):', error)
    throw error
  }
}
