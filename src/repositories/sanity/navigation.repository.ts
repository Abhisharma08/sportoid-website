import { CONTENT_REVALIDATE_SECONDS, CONTENT_TAG } from '@/sanity/cache'
import { client } from '../../sanity/client'

export const getNavigationData = async () => {
  const query = `*[_type == "navigation"][0]`
  try {
    return await client.fetch(query, {}, {
      next: {
        tags: [CONTENT_TAG, 'navigation'],
        revalidate: CONTENT_REVALIDATE_SECONDS,
      },
    })
  } catch (error) {
    console.error('Sanity fetch error (Navigation):', error)
    throw error
  }
}

export const getFooterSettingsData = async () => {
  const query = `*[_type == "footerSettings"][0]`
  try {
    return await client.fetch(query, {}, {
      next: {
        tags: [CONTENT_TAG, 'footer-settings'],
        revalidate: CONTENT_REVALIDATE_SECONDS,
      },
    })
  } catch (error) {
    console.error('Sanity fetch error (FooterSettings):', error)
    throw error
  }
}
