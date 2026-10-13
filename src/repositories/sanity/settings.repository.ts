import { CONTENT_REVALIDATE_SECONDS, CONTENT_TAG } from '@/sanity/cache'
import { client } from '../../sanity/client'

export const getSiteSettingsData = async () => {
  const query = `*[_type == "siteSettings"][0]{
    _id,
    siteTitle,
    tagline,
    logo,
    favicon,
    metaTitle,
    metaDescription,
    keywords,
    canonicalUrl,
    robotsIndex,
    ogImage,
    twitterHandle,
    socialLinks,
    linkedinFeedProfile,
    linkedinWidget
  }`
  try {
    return await client.fetch(query, {}, {
      next: {
        tags: [CONTENT_TAG, 'site-settings'],
        revalidate: CONTENT_REVALIDATE_SECONDS,
      },
    })
  } catch (error) {
    console.error('Sanity fetch error (SiteSettings):', error)
    throw error
  }
}
