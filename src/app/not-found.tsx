import * as React from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-dark flex items-center justify-center py-24">
      <Container>
        <div className="max-w-xl mx-auto text-center">
          <div className="inline-block px-4 py-1 rounded bg-primary/20 text-primary font-bold text-sm uppercase tracking-widest mb-6">
            404 Error
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-black text-white leading-none mb-6">
            PAGE NOT <span className="text-primary">FOUND.</span>
          </h1>
          <p className="text-gray-300 text-lg mb-10 leading-relaxed">
            The page you are looking for might have been moved, removed, or is temporarily unavailable.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/">
              <Button variant="primary" size="lg">
                Back to Home
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}
