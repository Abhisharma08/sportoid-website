import * as React from 'react'
import { Container } from '@/components/ui/Container'

export interface ArticleHeaderProps {
  title: string
  category: string
}

export function ArticleHeader({ title, category }: ArticleHeaderProps) {
  return (
    <div className="relative w-full py-24 md:py-32 bg-dark overflow-hidden flex items-center">
      <div className="absolute inset-0 bg-[url('/blog-single-bg.jpg')] bg-cover bg-right opacity-40 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-transparent"></div>
      
      <Container className="relative z-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-1 bg-primary"></div>
            <span className="font-semibold text-sm uppercase tracking-widest text-primary">BLOG / {category}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-semibold text-white leading-tight mb-6">
            {title}
          </h1>
        </div>
      </Container>
    </div>
  )
}
