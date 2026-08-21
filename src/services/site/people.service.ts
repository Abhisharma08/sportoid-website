import { getPeopleData } from '../../repositories/sanity/people.repository'

export const fetchPeople = async () => {
  return await getPeopleData()
}
