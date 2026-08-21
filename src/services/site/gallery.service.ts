import { getGalleryItemsData, getGalleryCategoriesData } from '../../repositories/sanity/gallery.repository'

export const fetchGalleryItems = async () => {
  return await getGalleryItemsData()
}

export const fetchGalleryCategories = async () => {
  return await getGalleryCategoriesData()
}
