import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Home',
    }),
    defineField({
      name: 'heroSlides',
      title: 'Hero Slides',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Slide Title', type: 'string' }),
            defineField({ name: 'subtitle', title: 'Slide Subtitle', type: 'string' }),
            defineField({ name: 'description', title: 'Slide Description', type: 'text' }),
            defineField({ name: 'ctaText', title: 'CTA Button Text', type: 'string' }),
            defineField({ name: 'ctaLink', title: 'CTA Button Link', type: 'string' }),
            defineField({ name: 'backgroundImage', title: 'Background Image', type: 'image', options: { hotspot: true } }),
          ],
        },
      ],
    }),
    defineField({
      name: 'whoWeAre',
      title: 'Who We Are Section',
      type: 'object',
      fields: [
        defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text' }),
      ],
    }),
    defineField({
      name: 'strengths',
      title: 'Strengths / Core Pillars',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text' }),
            defineField({ name: 'icon', title: 'Icon (trophy, calendar, users, handshake)', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'partnershipCta',
      title: 'Partnership CTA',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text' }),
        defineField({ name: 'buttonText', title: 'Button Text', type: 'string' }),
        defineField({ name: 'buttonLink', title: 'Button Link', type: 'string' }),
      ],
    }),
  ],
})
