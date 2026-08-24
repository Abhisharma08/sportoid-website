import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'About Us',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
      initialValue: 'Who We Are',
    }),
    defineField({
      name: 'heroBackgroundImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Upload background image for About Us hero section',
    }),
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      initialValue: 'PASSION BEYOND PLAY.',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      initialValue:
        'Sportoid is a young start-up committed to the professional representation, execution and valuation of sporting properties in India.',
    }),
    defineField({
      name: 'missionTitle',
      title: 'Mission Title',
      type: 'string',
      initialValue: 'Our Mission',
    }),
    defineField({
      name: 'missionDescription',
      title: 'Mission Description',
      type: 'text',
      initialValue:
        'To grow the game, create value and leave a lasting legacy in the world of sport.',
    }),
    defineField({
      name: 'visionTitle',
      title: 'Vision Title',
      type: 'string',
      initialValue: 'Our Vision',
    }),
    defineField({
      name: 'visionDescription',
      title: 'Vision Description',
      type: 'text',
      initialValue:
        "To be India's most trusted partner in sports management and property representation.",
    }),
    defineField({
      name: 'beliefTitle',
      title: 'Belief Title',
      type: 'string',
      initialValue: 'Our Belief',
    }),
    defineField({
      name: 'beliefDescription',
      title: 'Belief Description',
      type: 'text',
      initialValue:
        'Integrity, commitment and performance — on and off the field.',
    }),
    defineField({
      name: 'services',
      title: 'Our Services / Capabilities',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'category', title: 'Category (e.g. Players)', type: 'string' }),
            defineField({ name: 'title', title: 'Heading', type: 'string' }),
            defineField({ name: 'paragraphs', title: 'Paragraphs', type: 'array', of: [{ type: 'text' }] }),
            defineField({ name: 'imageAlignment', title: 'Image Alignment', type: 'string', options: { list: ['left', 'right'] } }),
          ],
        },
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Key Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Value (e.g. 15+)', type: 'string' }),
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'icon', title: 'Icon (trophy, calendar, users, handshake)', type: 'string' }),
          ],
        },
      ],
    }),
  ],
})
