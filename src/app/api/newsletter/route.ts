import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { writeClient } from '@/sanity/client'
import { checkRateLimit } from '@/lib/rateLimit'

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

export async function POST(req: NextRequest) {
  try {
    // 1. IP-based Rate Limiting (5 subscriptions per 24 hours)
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'anonymous-ip'
    const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000
    const rateLimit = checkRateLimit(`newsletter-${ip}`, 5, TWENTY_FOUR_HOURS_MS)

    if (!rateLimit.success) {
      const remainingHours = Math.ceil(rateLimit.resetInSeconds / 3600)
      return NextResponse.json(
        {
          error: `Daily subscription limit reached (5 attempts per 24 hours). Please try again in ${
            remainingHours > 1 ? `${remainingHours} hours` : `${Math.ceil(rateLimit.resetInSeconds / 60)} minutes`
          }.`,
        },
        {
          status: 429,
          headers: {
            'Retry-After': rateLimit.resetInSeconds.toString(),
          },
        }
      )
    }

    // 2. Validate input
    const body = await req.json()
    const { email } = newsletterSchema.parse(body)

    // 3. Prevent duplicate subscriptions by checking Sanity
    const existing = await writeClient.fetch(
      `*[_type == "newsletterSubscriber" && email == $email][0]`,
      { email }
    )

    if (existing) {
      return NextResponse.json(
        { message: 'You are already subscribed to our newsletter!' },
        { status: 200 }
      )
    }

    // 4. Create new subscriber
    await writeClient.create({
      _type: 'newsletterSubscriber',
      email,
      subscribedAt: new Date().toISOString(),
      status: 'subscribed',
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for subscribing to our newsletter!',
      },
      { status: 201 }
    )
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message || 'Invalid email address' },
        { status: 400 }
      )
    }
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}
