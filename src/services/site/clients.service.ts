import { getClientLogosData } from '../../repositories/sanity/clients.repository'

export const fetchClientLogos = async () => {
  return await getClientLogosData()
}
