import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'footerSettings',
  title: 'Footer Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Global Footer Settings',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'footerLogo',
      title: 'Footer Logo (Dark background version)',
      type: 'image',
      options: { hotspot: true },
      description: 'Upload a custom footer logo (white/light version). If omitted, siteSettings logo or text branding will be used.',
    }),
    defineField({
      name: 'aboutText',
      title: 'Footer About Blurb',
      type: 'text',
      rows: 3,
      initialValue:
        'Sportoid is a young start-up committed to the professional representation, execution and valuation of sporting properties in India.',
    }),
    defineField({
      name: 'quickLinks',
      title: 'Quick Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Link Label', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'href', title: 'Link Destination', type: 'string', validation: (Rule) => Rule.required() }),
          ],
        },
      ],
    }),
    defineField({
      name: 'contactDetails',
      title: 'Contact Details in Footer',
      type: 'object',
      fields: [
        defineField({ name: 'phone', title: 'Phone Number', type: 'string', initialValue: '+91 12345 67890' }),
        defineField({ name: 'email', title: 'Email Address', type: 'string', initialValue: 'info@sportoid.com' }),
        defineField({ name: 'location', title: 'Location / City', type: 'string', initialValue: 'Mumbai, India' }),
      ],
    }),
    defineField({
      name: 'newsletter',
      title: 'Newsletter Section',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Newsletter' }),
        defineField({ name: 'description', title: 'Description', type: 'string', initialValue: 'Stay updated with the latest news, events and stories.' }),
        defineField({ name: 'placeholder', title: 'Input Placeholder', type: 'string', initialValue: 'Your email address' }),
      ],
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      initialValue: '© Copyright Sportoid. All rights reserved.',
    }),
  ],
})
