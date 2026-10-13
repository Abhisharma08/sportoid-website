import 'server-only'
import { createHmac } from 'node:crypto'
import { getWriteClient } from '@/sanity/write-client'

export function privateId(namespace: string, identifier: string) {
  const secret = process.env.FORM_ID_SECRET || process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN
  if (!secret) throw new Error('Form security secret is not configured')
  return `private.${namespace}.${createHmac('sha256', secret).update(identifier).digest('hex')}`
}

// Revision-checked shared storage works across serverless instances. Dotted IDs
// require authenticated reads in Sanity, including on a public dataset.
export async function checkRateLimit(identifier: string, maxRequests = 5, windowMs = 86400000) {
  const client = getWriteClient()
  const id = privateId('rateLimit', identifier)
  for (let attempt = 0; attempt < 5; attempt++) {
    const now = Date.now()
    const record = await client.getDocument<{ _id: string; _rev: string; count: number; resetTime: number }>(id)
    if (!record) {
      await client.createIfNotExists({ _id: id, _type: 'formRateLimit', count: 0, resetTime: now + windowMs })
      continue
    }
    const expired = now >= record.resetTime
    const count = expired ? 0 : record.count
    const resetTime = expired ? now + windowMs : record.resetTime
    const resetInSeconds = Math.max(1, Math.ceil((resetTime - now) / 1000))
    if (count >= maxRequests) return { success: false, remaining: 0, resetInSeconds }
    try {
      await client.patch(id).ifRevisionId(record._rev).set({ count: count + 1, resetTime }).commit()
      return { success: true, remaining: maxRequests - count - 1, resetInSeconds }
    } catch (error) {
      if (!(error && typeof error === 'object' && 'statusCode' in error && error.statusCode === 409)) throw error
    }
  }
  return { success: false, remaining: 0, resetInSeconds: 2 }
}
