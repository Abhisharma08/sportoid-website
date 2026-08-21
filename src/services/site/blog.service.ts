import { getPostsData, getPostBySlugData } from '../../repositories/sanity/blog.repository'

export const fetchPosts = async () => {
  return await getPostsData()
}

export const fetchPostBySlug = async (slug: string) => {
  return await getPostBySlugData(slug)
}
