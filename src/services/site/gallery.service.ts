import { getGalleryItemsData, getGalleryCategoriesData, getGalleryPageData } from '../../repositories/sanity/gallery.repository'

export const fetchGalleryItems = async () => {
  return await getGalleryItemsData()
}

export const fetchGalleryCategories = async () => {
  return await getGalleryCategoriesData()
}

export const fetchGalleryPage = async () => {
  return await getGalleryPageData()
}
