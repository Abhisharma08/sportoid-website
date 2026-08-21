import { client } from '../../sanity/client'

export const getPostsData = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    mainImage,
    publishedAt,
    readingTime,
    "author": author->{name, role, avatar},
    "category": category->title
  } | order(publishedAt desc)`
  try {
    return await client.fetch(query)
  } catch (error) {
    console.error('Sanity fetch error (Posts):', error)
    return []
  }
}

export const getPostBySlugData = async (slug: string) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    mainImage,
    publishedAt,
    readingTime,
    body,
    "author": author->{name, role, avatar, bio},
    "category": category->title
  }`
  try {
    return await client.fetch(query, { slug })
  } catch (error) {
    console.error('Sanity fetch error (Post by slug):', error)
    return null
  }
}
