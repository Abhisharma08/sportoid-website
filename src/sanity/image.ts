import { createImageUrlBuilder } from '@sanity/image-url'
import { dataset, projectId } from './env'

type SanityImageSource = Parameters<ReturnType<typeof createImageUrlBuilder>['image']>[0]

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlFor = (source: SanityImageSource) => {
  return imageBuilder?.image(source).auto('format').fit('max')
}

export const urlForImage = (source: SanityImageSource) => {
  return imageBuilder?.image(source).auto('format').fit('max')
}

/**
 * Returns optimized WebP/AVIF dimensions and quality parameters
 */
export const getOptimizedImageUrl = (
  source: SanityImageSource,
  width: number,
  height?: number,
  quality: number = 85
) => {
  let builder = imageBuilder?.image(source).auto('format').width(width).quality(quality)
  if (height) {
    builder = builder.height(height)
  }
  return builder.url()
}
