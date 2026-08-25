import { getHomePageData } from '../../repositories/sanity/home.repository'

export const fetchHomePage = async () => {
  const data = await getHomePageData()
  return data
}

