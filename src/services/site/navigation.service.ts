import { getNavigationData, getFooterSettingsData } from '../../repositories/sanity/navigation.repository'

export const fetchNavigation = async () => {
  return await getNavigationData()
}

export const fetchFooterSettings = async () => {
  return await getFooterSettingsData()
}
