import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Contact Us',
    }),
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      initialValue: 'Let’s Build the Future of Sports Together',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      initialValue:
        'Have a question, partnership proposal, or athlete inquiry? Connect with the Sportoid team.',
    }),
    defineField({
      name: 'phone',
      title: 'Contact Phone Number',
      type: 'string',
      initialValue: '+91 12345 67890',
    }),
    defineField({
      name: 'email',
      title: 'Contact Email Address',
      type: 'string',
      initialValue: 'info@sportoid.com',
    }),
    defineField({
      name: 'address',
      title: 'Office Address',
      type: 'text',
      initialValue: 'Sportoid Headquarters, Mumbai, Maharashtra, India',
    }),
    defineField({
      name: 'officeHours',
      title: 'Office Hours',
      type: 'string',
      initialValue: 'Mon-Fri, 9am - 6pm IST',
    }),
  ],
})
