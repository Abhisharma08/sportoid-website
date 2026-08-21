import { client } from '../../sanity/client'

export const getNavigationData = async () => {
  const query = `*[_type == "navigation"][0]`
  try {
    return await client.fetch(query)
  } catch (error) {
    console.error('Sanity fetch error (Navigation):', error)
    return null
  }
}

export const getFooterSettingsData = async () => {
  const query = `*[_type == "footerSettings"][0]`
  try {
    return await client.fetch(query)
  } catch (error) {
    console.error('Sanity fetch error (FooterSettings):', error)
    return null
  }
}
