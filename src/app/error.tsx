'use client'

import * as React from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  React.useEffect(() => {
    // Log error securely without exposing internals to client UI
    console.error('Production runtime error caught by boundary:', error)
  }, [error])

  return (
    <div className="min-h-[70vh] bg-dark flex items-center justify-center py-24">
      <Container>
        <div className="max-w-xl mx-auto text-center">
          <div className="inline-block px-4 py-1 rounded bg-red-900/30 text-red-400 font-semibold text-sm uppercase tracking-widest mb-6">
            Something went wrong
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-semibold text-white leading-tight mb-6">
            UNEXPECTED <span className="text-primary">ERROR.</span>
          </h1>
          <p className="text-gray-300 text-lg mb-10 leading-relaxed">
            We encountered an issue processing your request. Please try again or return to our homepage.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button variant="primary" size="lg" onClick={() => reset()}>
              Try Again
            </Button>
            <Link href="/">
              <Button variant="outline" size="lg">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}
