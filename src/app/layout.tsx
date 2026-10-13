import type { Metadata } from 'next'
import './globals.css'

import { constructMetadata } from '@/lib/metadata'

export async function generateMetadata(): Promise<Metadata> {
  return constructMetadata()
}

import { Inter, Montserrat } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
  weight: ['400', '500', '600', '700'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`h-full antialiased ${inter.variable} ${montserrat.variable}`}>
      <body className="min-h-full flex flex-col font-sans text-dark bg-light">
        {children}
      </body>
    </html>
  )
}
