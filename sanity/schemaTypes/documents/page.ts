import { defineField, defineType } from 'sanity'
const reserved = new Set(['about', 'people', 'gallery', 'events', 'blog', 'contact', 'studio', 'api', 'og', 'sitemap.xml', 'robots.txt'])
export default defineType({
  name: 'page', title: 'Additional Page', type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', title: 'URL slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (rule) => rule.required().custom((value) => {
      if (!value?.current) return true
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.current)) return 'Use lowercase letters, numbers and hyphens.'
      return reserved.has(value.current) ? 'This URL belongs to an existing page.' : true
    }) }),
    defineField({ name: 'description', title: 'Introduction', type: 'text', rows: 3 }),
    defineField({ name: 'image', title: 'Page image', type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', title: 'Image description', type: 'string' }] }),
    defineField({ name: 'body', title: 'Content', type: 'array', of: [{ type: 'block' }, { type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', title: 'Image description', type: 'string' }, { name: 'caption', title: 'Caption', type: 'string' }] }] }),
    defineField({ name: 'seo', title: 'Search & Social', type: 'seo' }),
  ],
})
