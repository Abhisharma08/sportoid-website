import { getContactPageData } from '../../repositories/sanity/contact.repository'

export const fetchContactPage = async () => {
  return await getContactPageData()
}
