import * as React from 'react'
import { PortableText, PortableTextComponents } from '@portabletext/react'

const customComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-3xl font-heading font-semibold text-dark mt-12 mb-6 border-l-4 border-primary pl-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-heading font-semibold text-dark mt-8 mb-4">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="text-gray-700 text-lg leading-relaxed mb-6">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="bg-gray-50 p-8 rounded-lg border-l-4 border-primary text-xl italic font-heading text-dark my-8 relative">
        <span className="text-5xl text-primary absolute top-4 left-4 opacity-20">"</span>
        <div className="relative z-10 pl-6">{children}</div>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-none space-y-3 mb-6 pl-0">
        {React.Children.map(children, (child) => (
          <li className="flex items-start">
            <span className="text-primary mr-3 mt-1">•</span>
            <span className="text-gray-700 text-lg leading-relaxed">{child}</span>
          </li>
        ))}
      </ul>
    ),
  },
}

export function PortableTextRenderer({ value }: { value: any }) {
  if (!value) return null
  return (
    <div className="prose prose-lg max-w-none">
      <PortableText value={value} components={customComponents} />
    </div>
  )
}
