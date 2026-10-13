// Read-only checks; never print form contents or credentials.
import nextEnv from '@next/env'
import { createClient } from '@sanity/client'
nextEnv.loadEnvConfig(process.cwd())
const client = createClient({ projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, apiVersion: '2024-01-01', useCdn: false })
const result = await client.fetch(`{
  "publicFormDocuments": count(*[_type in ["contactSubmission", "newsletterSubscriber"] && !(_id in path("**.*"))]),
  "pages": *[_type in ["homePage", "aboutPage", "siteSettings", "navigation", "footerSettings", "blogPage", "contactPage", "galleryPage", "peoplePage"]]{_type, _id},
  "postsMissingSlugs": count(*[_type == "post" && !defined(slug.current)])
}`)
console.log(JSON.stringify({ ...result, revalidationSecretConfigured: !!process.env.SANITY_REVALIDATE_SECRET, writeTokenConfigured: !!(process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN) }, null, 2))
