import Image from 'next/image'
import type { Author } from '@/types/content'
import { urlFor } from '@/sanity/image'
export function AuthorCard({ author }: { author?: Author }) {
  if (!author) return null
  return <div className="mb-8 rounded-lg border border-gray-100 p-8 text-center">
    <h2 className="mb-6 font-heading text-lg font-semibold">About the author</h2>
    {author.avatar && <Image src={urlFor(author.avatar).width(192).height(192).fit('crop').url()} width={96} height={96} alt={author.name} className="mx-auto mb-4 rounded-full" />}
    <h3 className="font-semibold">{author.name}</h3>
    {author.role && <p className="mt-2 text-sm text-primary">{author.role}</p>}
    {author.bio && <p className="mt-3 text-sm leading-relaxed text-gray-600">{author.bio}</p>}
  </div>
}
