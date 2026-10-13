import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'node:crypto'
import { ZodError } from 'zod'
import { getWriteClient } from '@/sanity/write-client'
import { checkRateLimit } from '@/lib/rateLimit'
import { contactSchema } from '@/lib/form-validation'
import { readFormBody, RequestError } from '@/lib/form-request'

export async function POST(req: NextRequest) {
  try {
    const validated = contactSchema.parse(await readFormBody(req))
    if (validated.hp_field) return NextResponse.json({ message: 'Message sent successfully!' })
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown'
    const limit = await checkRateLimit(`contact:${ip}`)
    if (!limit.success) return NextResponse.json({ error: 'Submission limit reached. Please try again later.' }, { status: 429, headers: { 'Retry-After': String(limit.resetInSeconds) } })
    const { hp_field: _honeypot, ...fields } = validated
    void _honeypot
    await getWriteClient().create({
      _id: `private.contact.${randomUUID()}`, _type: 'contactSubmission', ...fields,
      submittedAt: new Date().toISOString(), status: 'new',
    })
    return NextResponse.json({ success: true, message: 'Your message has been sent successfully!' }, { status: 201 })
  } catch (error) {
    if (error instanceof RequestError) return NextResponse.json({ error: error.message }, { status: error.status })
    if (error instanceof ZodError) return NextResponse.json({ error: error.issues[0]?.message || 'Invalid input' }, { status: 400 })
    console.error('Contact submission failed')
    return NextResponse.json({ error: 'Unable to send your message. Please try again later or contact us by email.' }, { status: 503 })
  }
}
