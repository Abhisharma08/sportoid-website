import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SPORTOID | Coming Back Soon',
  description: 'Our website is currently under revamp. Please send your queries to info@sportoid.com.',
  robots: { index: false, follow: false },
}

const EMAIL = 'info@sportoid.com'

export default function ComingSoonPage() {
  return (
    <main className="relative flex min-h-screen flex-1 items-center justify-center overflow-hidden bg-dark px-4 py-16 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/30 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:56px_56px]"
      />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <span className="font-heading text-3xl font-semibold tracking-tighter md:text-4xl">
          SPORT<span className="text-primary">O</span>ID
        </span>

        <span className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
          <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
          Under Revamp
        </span>

        <h1 className="mt-6 text-4xl leading-tight md:text-6xl">
          We are Coming Back in a <span className="text-primary">New Avatar!</span>
        </h1>

        <p className="mt-6 max-w-xl text-base text-white/70 md:text-lg">
          Our website is currently under revamp. Please send your queries to{' '}
          <a href={`mailto:${EMAIL}`} className="font-semibold text-white underline decoration-primary underline-offset-4">
            {EMAIL}
          </a>
          .
        </p>

        <a
          href={`mailto:${EMAIL}`}
          className="mt-10 inline-flex items-center rounded-full bg-primary px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-primary-dark"
        >
          Email Us
        </a>
      </div>

      <p className="absolute bottom-6 left-0 right-0 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Sportoid. All rights reserved.
      </p>
    </main>
  )
}
