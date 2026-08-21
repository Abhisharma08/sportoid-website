'use client'

import dynamic from 'next/dynamic'
import config from '../../../../../sanity/sanity.config'

// Dynamic import with ssr:false prevents @sanity/sdk-react (which ships raw JSX
// in its dist bundle) from being included in Turbopack's SSR/RSC chunk pass,
// which would otherwise crash with: SyntaxError: Unexpected token '<'
const NextStudio = dynamic(
  () => import('next-sanity/studio').then((mod) => ({ default: mod.NextStudio })),
  { ssr: false }
)

export default function StudioPage() {
  return <NextStudio config={config} />
}
