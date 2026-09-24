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
        tags: ['linkedin-posts'],
        revalidate: 3600,
      },
    })
  } catch (error) {
    console.error('Sanity fetch error (LinkedInPosts):', error)
    return []
  }
}
