import { getAboutPageData } from '../../repositories/sanity/about.repository'

export const fetchAboutPage = async () => {
  return await getAboutPageData()
}
