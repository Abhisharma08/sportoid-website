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
    image,
    "categoryTitle": category->title,
    "categorySlug": category->slug.current
  }`

  try {
    return await client.fetch(query, { category: category?.toLowerCase() }, {
      next: {
        tags: ['gallery'],
        revalidate: 3600,
      },
    })
  } catch (error) {
    console.error('Sanity fetch error (GalleryItems):', error)
    return []
  }
}

export const getGalleryCategoriesData = async () => {
  const query = `*[_type == "galleryCategory"] | order(title asc)`
  try {
    return await client.fetch(query, {}, {
      next: {
        tags: ['gallery-categories'],
        revalidate: 3600,
      },
    })
  } catch (error) {
    console.error('Sanity fetch error (GalleryCategories):', error)
    return []
  }
}
