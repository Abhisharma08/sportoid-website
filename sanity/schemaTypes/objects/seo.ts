import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'seo', title: 'Search & Social', type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Meta title', type: 'string', description: 'Optional. Defaults to the page title.', validation: (rule) => rule.max(70).warning() }),
    defineField({ name: 'description', title: 'Meta description', type: 'text', rows: 3, validation: (rule) => rule.max(170).warning() }),
    defineField({ name: 'image', title: 'Social share image', type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', title: 'Image description' }] }),
    defineField({ name: 'canonicalUrl', title: 'Canonical URL override', type: 'url', description: 'Only for content originally published at a different URL.', validation: (rule) => rule.uri({ scheme: ['https', 'http'] }) }),
    defineField({ name: 'noIndex', title: 'Hide from search results', type: 'boolean', initialValue: false }),
  ],
})
