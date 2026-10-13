import { CONTENT_REVALIDATE_SECONDS, CONTENT_TAG } from '@/sanity/cache'
import { client } from '../../sanity/client'

export const getGalleryItemsData = async (category?: string) => {
  let query = `*[_type == "galleryItem"]`
  if (category && category !== 'ALL') {
    query = `*[_type == "galleryItem" && category->slug.current == $category]`
  }
  query += ` | order(eventDate desc) {
    _id,
    title,
    eventDate,
    "cover": coalesce(image, photos[0]),
    "photos": photos[defined(asset)]{
      _key,
      asset,
      hotspot,
      crop,
      caption,
      alt
    },
    "categoryTitle": category->title,
    "categorySlug": category->slug.current
  }`

  try {
    return await client.fetch(query, { category: category?.toLowerCase() }, {
      next: {
        tags: [CONTENT_TAG, 'gallery'],
        revalidate: CONTENT_REVALIDATE_SECONDS,
      },
    })
  } catch (error) {
    console.error('Sanity fetch error (GalleryItems):', error)
    throw error
  }
}

export const getGalleryCategoriesData = async () => {
  const query = `*[_type == "galleryCategory"] | order(title asc)`
  try {
    return await client.fetch(query, {}, {
      next: {
        tags: [CONTENT_TAG, 'gallery-categories'],
        revalidate: CONTENT_REVALIDATE_SECONDS,
      },
    })
  } catch (error) {
    console.error('Sanity fetch error (GalleryCategories):', error)
    throw error
  }
}

export const getGalleryPageData = async () => {
  const query = `*[_type == "galleryPage"][0]`
  try {
    return await client.fetch(query, {}, {
      next: {
        tags: [CONTENT_TAG, 'gallery-page'],
        revalidate: CONTENT_REVALIDATE_SECONDS,
      },
    })
  } catch (error) {
    console.error('Sanity fetch error (GalleryPage):', error)
    throw error
  }
}
