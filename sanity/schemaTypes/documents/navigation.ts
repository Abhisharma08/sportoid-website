import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'navigation',
  title: 'Header & Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Main Header Navigation',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Navigation Menu Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Menu Label', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'href', title: 'Link Destination (e.g. /about)', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'isExternal', title: 'External Link?', type: 'boolean', initialValue: false }),
          ],
        },
      ],
    }),
    defineField({
      name: 'ctaButton',
      title: 'Optional Header CTA Button',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Button Label', type: 'string' }),
        defineField({ name: 'href', title: 'Button Link', type: 'string' }),
        defineField({ name: 'show', title: 'Show Button in Header', type: 'boolean', initialValue: false }),
      ],
    }),
  ],
})
