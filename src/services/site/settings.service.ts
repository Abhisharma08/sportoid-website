import { cache } from 'react'
import { getSiteSettingsData } from '../../repositories/sanity/settings.repository'

export const fetchSiteSettings = cache(async () => {
  return await getSiteSettingsData()
})
