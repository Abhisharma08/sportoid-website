import { cache } from 'react'
import type { TypedObject } from '@portabletext/types'
import { client } from '@/sanity/client'
import { CONTENT_TAG, CONTENT_REVALIDATE_SECONDS } from '@/sanity/cache'
import type { SeoFields } from '@/lib/metadata'
import type { SanityImageSource } from '@/sanity/image'
interface ContentPage { title: string; description?: string; image?: SanityImageSource; body?: TypedObject[]; seo?: SeoFields; slug: string }
export const getContentPage = cache(async (slug: string) => client.fetch<ContentPage | null>(
  `*[_type == "page" && slug.current == $slug][0]{title, description, image, body, seo, "slug": slug.current}`,
  { slug }, { next: { tags: [CONTENT_TAG], revalidate: CONTENT_REVALIDATE_SECONDS } },
))
