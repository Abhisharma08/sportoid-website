import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Temporary: serve the coming-soon page for every public route while the site is revamped.
export function proxy(request: NextRequest) {
  return NextResponse.rewrite(new URL('/coming-soon', request.url))
}

export const config = {
  matcher: ['/((?!coming-soon|studio|api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.[\\w]+$).*)'],
}
