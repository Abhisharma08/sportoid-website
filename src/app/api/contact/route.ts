import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { writeClient } from '@/sanity/client'
import { checkRateLimit } from '@/lib/rateLimit'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  email: z.string().email('Please enter a valid email address').max(150, 'Email is too long'),
  phone: z.string().max(30, 'Phone number is too long').optional(),
  subject: z.string().min(3, 'Subject must be at least 3 characters').max(200, 'Subject is too long'),
  message: z.string().min(5, 'Message must be at least 5 characters').max(3000, 'Message is too long (max 3000 characters)'),
  hp_field: z.string().optional(), // Honeypot field (should be empty for human users)
})

export async function POST(req: NextRequest) {
  try {
    // 1. IP-based Rate Limiting (5 submissions per 24 hours)
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'anonymous-ip'
    const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000
    const rateLimit = checkRateLimit(`contact-${ip}`, 5, TWENTY_FOUR_HOURS_MS)

    if (!rateLimit.success) {
      const remainingHours = Math.ceil(rateLimit.resetInSeconds / 3600)
      return NextResponse.json(
        {
          error: `Daily submission limit reached (5 messages per 24 hours). Please try again in ${
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

    // 2. Body validation with Zod
    const body = await req.json()
    const validated = contactSchema.parse(body)

    // Honeypot bot protection: Silently accept but do not persist
    if (validated.hp_field && validated.hp_field.trim().length > 0) {
      return NextResponse.json({ success: true, message: 'Message sent successfully!' }, { status: 200 })
    }

    // 3. Persist into Sanity
    const doc = await writeClient.create({
      _type: 'contactSubmission',
      name: validated.name,
      email: validated.email,
      phone: validated.phone || '',
      subject: validated.subject,
      message: validated.message,
      submittedAt: new Date().toISOString(),
      status: 'new',
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been sent successfully!',
        id: doc._id,
      },
      { status: 201 }
    )
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message || 'Invalid form input' },
        { status: 400 }
      )
    }
    console.error('Contact submission error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}
