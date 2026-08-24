import { getPeopleData, getPeoplePageData } from '../../repositories/sanity/people.repository'

export const fetchPeople = async () => {
  return await getPeopleData()
}

export const fetchPeoplePage = async () => {
  return await getPeoplePageData()
}
