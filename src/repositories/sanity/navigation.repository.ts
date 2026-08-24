import { client } from '../../sanity/client'

export const getNavigationData = async () => {
  const query = `*[_type == "navigation"][0]`
  try {
    return await client.fetch(query, {}, {
      next: {
        tags: ['navigation'],
        revalidate: 3600,
      },
    })
  } catch (error) {
    console.error('Sanity fetch error (Navigation):', error)
    return null
  }
}

export const getFooterSettingsData = async () => {
  const query = `*[_type == "footerSettings"][0]`
  try {
    return await client.fetch(query, {}, {
      next: {
        tags: ['footer-settings'],
        revalidate: 3600,
      },
    })
  } catch (error) {
    console.error('Sanity fetch error (FooterSettings):', error)
    return null
  }
}
