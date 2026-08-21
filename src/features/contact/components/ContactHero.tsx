import * as React from 'react'
import { Container } from '@/components/ui/Container'

export function ContactHero() {
  return (
    <div className="relative w-full py-24 md:py-32 bg-dark overflow-hidden flex items-center">
      <div className="absolute inset-0 bg-[url('/contact-hero-bg.jpg')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
      
      <Container className="relative z-10">
        <div className="max-w-2xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-1 bg-primary"></div>
            <span className="font-bold text-sm uppercase tracking-widest text-primary">Get in Touch</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-black text-white leading-none mb-6">
            LET'S BUILD <br />
            <span className="text-primary">TOGETHER.</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Have a question, proposal, or want to explore a partnership? We'd love to hear from you.
          </p>
        </div>
      </Container>
    </div>
  )
}
