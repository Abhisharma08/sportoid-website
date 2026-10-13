import { getImageDimensions } from '@sanity/asset-utils'
import Image from 'next/image'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { TypedObject } from '@portabletext/types'
import { urlFor } from '@/sanity/image'
import { safeHref } from '@/lib/urls'

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      const dimensions = getImageDimensions(value)
      const crop = value.crop || {}
      const width = Math.max(1, Math.round(dimensions.width * (1 - (crop.left || 0) - (crop.right || 0))))
      const height = Math.max(1, Math.round(dimensions.height * (1 - (crop.top || 0) - (crop.bottom || 0))))
      return <figure className="my-8">
      <Image src={urlFor(value).width(1200).url()} width={width} height={height} sizes="(max-width: 1024px) 100vw, 800px" alt={value.alt || value.caption || ''} className="h-auto w-full rounded-lg" />
      {value.caption && <figcaption className="mt-2 text-center text-sm text-gray-600">{value.caption}</figcaption>}
    </figure>
    },
  },
  marks: {
    link: ({ value, children }) => {
      const href = safeHref(value?.href)
      return href ? <a href={href} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} className="underline text-primary underline-offset-4">{children}</a> : <>{children}</>
    },
  },
  block: {
    h1: ({ children }) => <h2 className="mt-10 mb-5 font-heading text-3xl font-semibold">{children}</h2>,
    h2: ({ children }) => <h2 className="mt-10 mb-5 font-heading text-3xl font-semibold">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-8 mb-4 font-heading text-2xl font-semibold">{children}</h3>,
    normal: ({ children }) => <p className="mb-6 text-lg leading-relaxed text-gray-700">{children}</p>,
    blockquote: ({ children }) => <blockquote className="my-8 border-l-4 border-primary bg-gray-50 p-6 text-xl italic">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul className="mb-6 list-disc space-y-3 pl-6 text-lg text-gray-700">{children}</ul>,
    number: ({ children }) => <ol className="mb-6 list-decimal space-y-3 pl-6 text-lg text-gray-700">{children}</ol>,
  },
}
export function PortableTextRenderer({ value }: { value: TypedObject[] }) {
  return <div className="max-w-none break-words"><PortableText value={value} components={components} /></div>
}
