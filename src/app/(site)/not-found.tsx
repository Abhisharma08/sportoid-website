import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
export default function NotFound() {
  return <Section><Container className="py-16 text-center">
    <h1 className="mb-6 font-heading text-4xl font-semibold">Page not found</h1>
    <p className="mb-8 text-gray-600">This page may have moved or is no longer available.</p>
    <Link href="/" className="inline-block rounded bg-primary px-6 py-3 font-semibold text-white">Back to home</Link>
  </Container></Section>
}
