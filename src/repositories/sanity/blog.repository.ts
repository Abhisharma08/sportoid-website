import type { Post } from '@/types/content'
import { CONTENT_REVALIDATE_SECONDS, CONTENT_TAG } from '@/sanity/cache'
import { client } from '../../sanity/client'

export const getPostsData = async () => {
  const query = `*[_type == "post" && defined(slug.current) && (!defined(publishedAt) || dateTime(publishedAt) <= dateTime(now()))]{
    _id,
    _updatedAt,
    seoTitle, seoDescription, keywords, ogImage, canonicalUrl, noIndex,
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
    return await client.fetch<Post[]>(query, {}, {
      next: {
        tags: [CONTENT_TAG, 'posts'],
        revalidate: CONTENT_REVALIDATE_SECONDS,
      },
    })
  } catch (error) {
    console.error('Sanity fetch error (Posts):', error)
    throw error
  }
}

export const getPostBySlugData = async (slug: string) => {
  const query = `*[_type == "post" && defined(slug.current) && (!defined(publishedAt) || dateTime(publishedAt) <= dateTime(now())) && slug.current == $slug][0]{
    _id,
    _updatedAt,
    seoTitle, seoDescription, keywords, ogImage, canonicalUrl, noIndex,
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
    return await client.fetch<Post | null>(query, { slug }, {
      next: {
        tags: [CONTENT_TAG, `post:${slug}`, 'posts'],
        revalidate: CONTENT_REVALIDATE_SECONDS,
      },
    })
  } catch (error) {
    console.error('Sanity fetch error (Post by slug):', error)
    throw error
  }
}

export const getBlogPageData = async () => {
  const query = `*[_type == "blogPage"][0]`
  try {
    return await client.fetch(query, {}, {
      next: {
        tags: [CONTENT_TAG, 'blog-page'],
        revalidate: CONTENT_REVALIDATE_SECONDS,
      },
    })
  } catch (error) {
    console.error('Sanity fetch error (BlogPage):', error)
    throw error
  }
}

export async function getBlogListingData(page: number, search: string, category: string) {
  const filter = `_type == "post" && defined(slug.current) && (!defined(publishedAt) || dateTime(publishedAt) <= dateTime(now()))`
  const matching = `${filter} && ($search == "" || title match $search || excerpt match $search) && ($category == "" || category->title == $category)`
  return client.fetch<{ total: number; posts: import('@/types/content').Post[]; categories: string[] }>(`{
    "total": count(*[${matching}]),
    "posts": *[${matching}] | order(publishedAt desc, _id asc)[$start...$end]{_id, title, "slug": slug.current, excerpt, mainImage, publishedAt, "category": category->title},
    "categories": array::unique(*[${filter} && defined(category->title)].category->title)
  }`, { search, category, start: (page - 1) * 9, end: page * 9 }, {
    next: { tags: [CONTENT_TAG, 'posts'], revalidate: CONTENT_REVALIDATE_SECONDS },
  })
}
