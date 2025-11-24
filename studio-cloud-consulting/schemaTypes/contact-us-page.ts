import {defineField, defineType} from 'sanity'

export const contactUsPage = defineType({
  name: 'contactUsPage',
  title: 'Contact Us Page',
  type: 'document',
  fields: [
    // Hero Section
    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'mainHeading',
          title: 'Main Heading',
          type: 'text',
          rows: 3,
          description: 'The main heading text (supports HTML-like structure)',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'subheading',
          title: 'Subheading',
          type: 'text',
          rows: 2,
          description: 'Subheading text below the main heading',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2,
          description: 'Additional description text',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'bullets',
          title: 'Bullet Points',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Bullet points displayed in the hero section',
          validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
          name: 'ctaButtons',
          title: 'CTA Buttons',
          type: 'array',
          of: [{type: 'button'}],
          description: 'Main CTA buttons (Book a call, WhatsApp, Signup)',
          validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
          name: 'phoneNumber',
          title: 'Phone Number',
          type: 'string',
          description: 'Phone number for call CTA (e.g., +91-96255-96336)',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'phoneLink',
          title: 'Phone Link',
          type: 'url',
          description: 'Phone link (tel: URL)',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'emailAddress',
          title: 'Email Address',
          type: 'string',
          description: 'Email address for email CTA',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'emailLink',
          title: 'Email Link',
          type: 'url',
          description: 'Email link (mailto: URL)',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    // Form Section
    defineField({
      name: 'formSection',
      title: 'Form Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2,
          description: 'Description text below the title',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    // SEO Fields
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'SEO meta title for the contact us page',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'SEO meta description for the contact us page',
    }),
    defineField({
      name: 'ogImage',
      title: 'OG Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Open Graph image for social sharing',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Alternative text for the image (for accessibility)',
        },
        {
          name: 'title',
          type: 'string',
          title: 'Image Title/Name',
          description: 'Custom name/title for this image (for organization)',
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Contact Us Page',
    }),
  },
})

