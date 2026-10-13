import { defineField, defineType } from 'sanity'
export default defineType({
  name: 'eventsPage', title: 'Events Page', type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Page title', type: 'string', initialValue: 'Sports Events' }),
    defineField({ name: 'seo', title: 'Search & Social', type: 'seo' }),
  ],
})
