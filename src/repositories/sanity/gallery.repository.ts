import { client } from '../../sanity/client'

export const getGalleryItemsData = async () => {
  const query = `*[_type == "galleryItem"]{
    _id,
    title,
    image,
    eventDate,
    featured,
    "category": category->slug.current
  } | order(eventDate desc)`
  try {
    return await client.fetch(query)
  } catch (error) {
    console.error('Sanity fetch error (Gallery):', error)
    return []
  }
}

export const getGalleryCategoriesData = async () => {
  const query = `*[_type == "galleryCategory"] | order(title asc)`
  try {
    return await client.fetch(query)
  } catch (error) {
    console.error('Sanity fetch error (Gallery Categories):', error)
    return []
  }
}
