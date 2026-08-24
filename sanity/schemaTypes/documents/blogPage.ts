import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'blogPage',
  title: 'Blog Page Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Blog & Editorial',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle / Breadcrumb',
      type: 'string',
      initialValue: 'OUR BLOG',
    }),
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      initialValue: 'INSIGHTS.\nSTRATEGIES.\nSPORTS.',
    }),
    defineField({
      name: 'heroBackgroundImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Upload background image for Blog hero section',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      initialValue: 'Perspectives, stories and strategies from the world of sports management.',
    }),
  ],
})
