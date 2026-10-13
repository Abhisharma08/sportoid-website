import { CONTENT_REVALIDATE_SECONDS, CONTENT_TAG } from '@/sanity/cache'
import { client } from '../../sanity/client'

export const getLinkedInPostsData = async (limit = 3) => {
  const query = `*[_type == "linkedinPost" && defined(embed)] | order(postedAt desc, _createdAt desc)[0...${Math.floor(limit)}]{
    _id,
    embed,
    embedHeight
  }`
  try {
    return await client.fetch(query, {}, {
      next: {
        tags: [CONTENT_TAG, 'linkedin-posts'],
        revalidate: CONTENT_REVALIDATE_SECONDS,
      },
    })
  } catch (error) {
    console.error('Sanity fetch error (LinkedInPosts):', error)
    throw error
  }
}
