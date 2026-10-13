import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { getWriteClient } from '@/sanity/write-client'
import { checkRateLimit, privateId } from '@/lib/rateLimit'
import { newsletterSchema } from '@/lib/form-validation'
import { readFormBody, RequestError } from '@/lib/form-request'

export async function POST(req: NextRequest) {
  try {
    const { email, hp_field } = newsletterSchema.parse(await readFormBody(req))
    if (hp_field) return NextResponse.json({ message: 'Thank you for subscribing!' })
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown'
    const limit = await checkRateLimit(`newsletter:${ip}`)
    if (!limit.success) return NextResponse.json({ error: 'Subscription limit reached. Please try again later.' }, { status: 429, headers: { 'Retry-After': String(limit.resetInSeconds) } })
    const client = getWriteClient()
    // Normalize email and use a deterministic opaque private ID to prevent
    // duplicate subscriptions even when requests arrive concurrently.
    const existing = await client.fetch<string | null>(`*[_type == "newsletterSubscriber" && lower(email) == $email][0]._id`, { email }, { cache: 'no-store' })
    if (!existing) await client.createIfNotExists({
      _id: privateId('newsletter', email), _type: 'newsletterSubscriber', email,
      subscribedAt: new Date().toISOString(), status: 'subscribed',
    })
    if (existing) await client.patch(existing).set({ status: 'subscribed' }).commit()
    // Uniform response avoids revealing whether a particular email is stored.
    return NextResponse.json({ success: true, message: 'Thank you for subscribing!' })
  } catch (error) {
    if (error instanceof RequestError) return NextResponse.json({ error: error.message }, { status: error.status })
    if (error instanceof ZodError) return NextResponse.json({ error: error.issues[0]?.message || 'Invalid email address' }, { status: 400 })
    console.error('Newsletter subscription failed')
    return NextResponse.json({ error: 'Unable to subscribe. Please try again later.' }, { status: 503 })
  }
}
