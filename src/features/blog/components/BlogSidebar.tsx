import Link from 'next/link'

export function BlogSidebar({ categories = [] }: { categories?: string[] }) {
  return (
    <aside className="space-y-8">
      <form action="/blog" method="get" role="search" className="flex gap-2">
        <label htmlFor="blog-search" className="sr-only">Search articles</label>
        <input id="blog-search" name="q" type="search" maxLength={100} placeholder="Search articles…" className="min-w-0 flex-1 rounded border border-gray-300 p-3" />
        <button type="submit" className="rounded bg-primary px-4 text-white">Search</button>
      </form>
      {categories.length > 0 && <div>
        <h2 className="mb-4 font-heading text-lg font-semibold">Categories</h2>
        <ul className="space-y-3">{categories.map((category) => <li key={category}><Link href={`/blog?category=${encodeURIComponent(category)}`} className="hover:text-primary">{category}</Link></li>)}</ul>
      </div>}
      <Link href="/blog" className="inline-block font-semibold text-primary-dark">View all articles →</Link>
      <div className="rounded-lg bg-light p-6">
        <h2 className="mb-3 font-heading text-lg font-semibold">Stay in the loop</h2>
        <p className="text-sm text-gray-600">Get the latest insights and news from Sportoid.</p>
        <a href="#newsletter" className="mt-4 inline-block font-semibold text-primary-dark">Subscribe to our newsletter →</a>
      </div>
    </aside>
  )
}
