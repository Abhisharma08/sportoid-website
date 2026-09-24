export interface GalleryPhoto {
  key: string
  src: string
  thumb: string
  alt: string
  caption?: string
}

export interface GalleryEntry {
  id: string
  title: string
  year: string
  categorySlug?: string
  cover?: string
  photos: GalleryPhoto[]
}

export interface GalleryCategoryOption {
  slug: string
  title: string
}
