import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'galleryItem',
  title: 'Gallery Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title / Caption',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Cover Photo',
      type: 'image',
      description: 'Shown on the portfolio card. If empty, the first album photo is used.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'photos',
      title: 'Album Photos',
      type: 'array',
      description: 'Photos shown when a visitor opens this portfolio. Drag several files in at once to bulk upload; drag to reorder.',
      options: { layout: 'grid' },
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Describe the photo for screen readers. Falls back to the caption, then the portfolio title.',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'galleryCategory' }],
    }),
    defineField({
      name: 'eventDate',
      title: 'Event Date',
      type: 'date',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Item',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      cover: 'image',
      firstPhoto: 'photos.0',
      photos: 'photos',
    },
    prepare({ title, cover, firstPhoto, photos }) {
      const count = Array.isArray(photos) ? photos.length : 0
      return { title, media: cover || firstPhoto, subtitle: `${count} photo${count === 1 ? '' : 's'}` }
    },
  },
})
