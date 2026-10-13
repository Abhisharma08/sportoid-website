import 'server-only'
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from './env'

export function getWriteClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN
  if (!token) throw new Error('Sanity write token is not configured')
  return createClient({ projectId, dataset, apiVersion, useCdn: false, perspective: 'raw', token })
}
