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
    socialLinks
  }`
  try {
    return await client.fetch(query, {}, {
      next: {
        tags: ['site-settings'],
        revalidate: 3600,
      },
    })
  } catch (error) {
    console.error('Sanity fetch error (SiteSettings):', error)
    return null
  }
}
