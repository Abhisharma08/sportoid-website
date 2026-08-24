import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag, revalidatePath } from 'next/cache'

/**
 * Secret-protected Sanity On-Demand Revalidation Webhook
 * Configured in Sanity Project Settings -> API -> Webhooks
 * Triggered on document publish, update, or delete.
 */
export async function POST(req: NextRequest) {
  try {
    const secret = req.nextUrl.searchParams.get('secret') || req.headers.get('x-webhook-secret')
    const configuredSecret = process.env.SANITY_REVALIDATE_SECRET

    // Ensure endpoint security
    if (configuredSecret && secret !== configuredSecret) {
      return NextResponse.json({ message: 'Invalid or missing revalidation secret' }, { status: 401 })
    }

    const body = await req.json().catch(() => ({}))
    const { _type, slug } = body
    const revalidatedTags: string[] = []

    const purgeTag = (tag: string) => {
      try {
        revalidateTag(tag, { expire: 0 })
        revalidatedTags.push(tag)
      } catch (e) {
        console.warn(`Tag revalidation skipped for ${tag}:`, e)
      }
    }

    switch (_type) {
      case 'homePage':
        purgeTag('home')
        revalidatePath('/', 'page')
        break

      case 'aboutPage':
        purgeTag('about')
        revalidatePath('/about', 'page')
        break

      case 'peoplePage':
      case 'person':
        purgeTag('people')
        purgeTag('people-page')
        revalidatePath('/people', 'page')
        break

      case 'galleryPage':
      case 'galleryItem':
      case 'galleryCategory':
        purgeTag('gallery')
        purgeTag('gallery-categories')
        purgeTag('gallery-page')
        revalidatePath('/gallery', 'page')
        break

      case 'blogPage':
      case 'post':
      case 'postCategory':
      case 'author':
        purgeTag('posts')
        purgeTag('blog-page')
        revalidatePath('/blog', 'page')
        if (slug?.current) {
          purgeTag(`post:${slug.current}`)
          revalidatePath(`/blog/${slug.current}`, 'page')
        }
        break

      case 'contactPage':
        purgeTag('contact')
        revalidatePath('/contact', 'page')
        break

      case 'siteSettings':
        purgeTag('site-settings')
        revalidatePath('/', 'layout')
        break

      case 'navigation':
        purgeTag('navigation')
        revalidatePath('/', 'layout')
        break

      case 'footerSettings':
        purgeTag('footer-settings')
        revalidatePath('/', 'layout')
        break

      default:
        purgeTag('site-settings')
        purgeTag('home')
        revalidatePath('/', 'page')
    }

    return NextResponse.json({
      revalidated: true,
      type: _type || 'unknown',
      tags: revalidatedTags,
      now: Date.now(),
    })
  } catch (err: any) {
    console.error('Revalidation webhook error:', err)
    return NextResponse.json(
      { message: 'Error during on-demand revalidation', error: err?.message },
      { status: 500 }
    )
  }
}
