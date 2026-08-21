import { getSiteSettingsData } from '../../repositories/sanity/settings.repository'

export const fetchSiteSettings = async () => {
  return await getSiteSettingsData()
}
