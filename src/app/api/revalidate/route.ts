import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag, revalidatePath } from 'next/cache'
import { parseBody } from 'next-sanity/webhook'
import { timingSafeEqual } from 'node:crypto'
import { CONTENT_TAG } from '@/sanity/cache'
import { readLimitedText, RequestError } from '@/lib/form-request'
import { isContentType } from '@/lib/revalidation'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET?.trim()
  if (!secret) return NextResponse.json({ error: 'Revalidation is not configured' }, { status: 503 })
  if (Number(req.headers.get('content-length') || 0) > 16384) {
    return NextResponse.json({ error: 'Payload too large' }, { status: 413 })
  }

  try {
    let body: { _type?: unknown; _id?: string } | null
    if (req.headers.has('sanity-webhook-signature')) {
      // Includes Sanity's short consistency delay before invalidating caches.
      const raw = await readLimitedText(req)
      const boundedRequest = new NextRequest(req.url, { method: 'POST', headers: req.headers, body: raw })
      const parsed = await parseBody<typeof body>(boundedRequest, secret)
      if (!parsed.isValidSignature) return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
      body = parsed.body
    } else {
      // Keep existing header/query-secret integrations working during migration.
      const supplied = req.headers.get('x-webhook-secret') || req.nextUrl.searchParams.get('secret') || ''
      const left = Buffer.from(supplied)
      const right = Buffer.from(secret)
      if (left.length !== right.length || !timingSafeEqual(left, right)) {
        return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
      }
      body = JSON.parse(await readLimitedText(req))
      await new Promise((resolve) => setTimeout(resolve, 3000))
    }
    if (!body || !isContentType(body._type)) {
      return NextResponse.json({ error: 'Unsupported document type' }, { status: 400 })
    }
    if (body._id !== undefined && typeof body._id !== 'string') {
      return NextResponse.json({ error: 'Invalid document ID' }, { status: 400 })
    }
    if (body._id?.startsWith('drafts.') || body._id?.startsWith('versions.')) {
      return NextResponse.json({ revalidated: false, reason: 'Unpublished content' })
    }
    // Shared references, deleted documents and changed slugs affect more than
    // one URL. Invalidate the small site's complete content graph atomically.
    revalidateTag(CONTENT_TAG, { expire: 0 })
    revalidatePath('/', 'layout')
    revalidatePath('/sitemap.xml')
    revalidatePath('/robots.txt')
    return NextResponse.json({ revalidated: true, type: body._type })
  } catch (error) {
    if (error instanceof RequestError) return NextResponse.json({ error: error.message }, { status: error.status })
    if (error instanceof SyntaxError) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    console.error('Revalidation failed:', error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 })
  }
}
