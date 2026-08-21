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
    return await client.fetch(query)
  } catch (error) {
    console.error('Sanity fetch error (SiteSettings):', error)
    return null
  }
}
