import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from './env'

// Next.js owns caching. Bypass Sanity's CDN so a webhook cannot refill our
// freshly expired cache with an older CDN response. Never expose drafts.
export const client = createClient({ projectId, dataset, apiVersion, useCdn: false, perspective: 'published' })
