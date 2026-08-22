import * as React from 'react'
import { Container } from '@/components/ui/Container'

interface BlogHeroProps {
  title?: string
  subtitle?: string
  breadcrumbs?: string
}

export function BlogHero({ 
  title = "INSIGHTS.\\nSTRATEGIES.\\nSPORTS.", 
  subtitle = "Perspectives, stories and strategies from\\nthe world of sports management.",
  breadcrumbs = "OUR BLOG"
}: BlogHeroProps) {
  return (
    <div className="relative w-full py-24 md:py-32 bg-dark overflow-hidden flex items-center">
      {/* Background image placeholder */}
      <div className="absolute inset-0 bg-[url('/blog-hero-bg.jpg')] bg-cover bg-right opacity-40 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-transparent"></div>
      
      <Container className="relative z-10">
        <div className="max-w-2xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-1 bg-primary"></div>
            <span className="font-bold text-xs md:text-sm uppercase tracking-widest text-primary">{breadcrumbs}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-heading font-black text-white leading-tight mb-6 whitespace-pre-line">
            {title.split('\\n').map((line, i, arr) => (
              <React.Fragment key={i}>
                {i === arr.length - 1 ? <span className="text-primary">{line}</span> : line}
                {i < arr.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed whitespace-pre-line">
            {subtitle.replace('\\\\n', '\\n')}
          </p>
        </div>
      </Container>
    </div>
  )
}
