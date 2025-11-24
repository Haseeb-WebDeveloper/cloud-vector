import {defineField, defineType} from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
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
          type: 'string',
          description: 'The main heading text (before animated text)',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'animatedTexts',
          title: 'Animated Texts',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Texts that cycle in the hero section',
          validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
          name: 'subheading',
          title: 'Subheading',
          type: 'text',
          rows: 3,
          description: 'Subheading text below the main heading',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'ctaButtons',
          title: 'CTA Buttons',
          type: 'array',
          of: [{type: 'button'}],
          validation: (Rule) => Rule.required().min(1),
        }),
      ],
    }),

    // Client Section
    defineField({
      name: 'clientSection',
      title: 'Client Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'stats',
          title: 'Stats',
          type: 'array',
          of: [{type: 'stat'}],
          validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
          name: 'partnerLogos',
          title: 'Partner Logos',
          type: 'array',
          of: [{type: 'partnerLogo'}],
        }),
      ],
    }),

    // Animated Sections
    defineField({
      name: 'animatedSections',
      title: 'Animated Sections',
      type: 'object',
      fields: [
        defineField({
          name: 'mainTitle',
          title: 'Main Title',
          type: 'string',
          description: 'The main title at the top of animated sections',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'offers',
          title: 'Offers',
          type: 'array',
          of: [{type: 'offer'}],
          validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
          name: 'statsTitle',
          title: 'Stats Section Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'statsSubtitle',
          title: 'Stats Section Subtitle',
          type: 'string',
        }),
        defineField({
          name: 'stats',
          title: 'Stats',
          type: 'array',
          of: [{type: 'animatedStat'}],
          validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
          name: 'centerImage',
          title: 'Center Circle Image',
          type: 'image',
          options: {hotspot: true},
          description: 'The center circle image that moves during scroll',
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
        defineField({
          name: 'stepImages',
          title: 'Step Images',
          type: 'array',
          of: [{
            type: 'image',
            options: {hotspot: true},
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
          }],
          description: 'Images that change based on scroll position',
        }),
      ],
    }),

    // Value Props Section
    defineField({
      name: 'valuePropsSection',
      title: 'Value Props Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'cards',
          title: 'Value Prop Cards',
          type: 'array',
          of: [{type: 'valuePropCard'}],
          validation: (Rule) => Rule.required().min(1),
        }),
      ],
    }),

    // Get Started Section
    defineField({
      name: 'getStartedSection',
      title: 'Get Started Section',
      type: 'object',
      fields: [
        defineField({
          name: 'logo',
          title: 'Logo',
          type: 'image',
          options: {hotspot: true},
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
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'bodyText',
          title: 'Body Text',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'chips',
          title: 'Chips',
          type: 'array',
          of: [{type: 'chip'}],
        }),
        defineField({
          name: 'ctaButtons',
          title: 'CTA Buttons',
          type: 'array',
          of: [{type: 'button'}],
          validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: {hotspot: true},
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
    }),

    // Testimonials Section
    defineField({
      name: 'testimonialsSection',
      title: 'Testimonials Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'testimonials',
          title: 'Testimonials',
          type: 'array',
          of: [
            defineField({
              type: 'object',
              name: 'testimonial',
              title: 'Testimonial',
              fields: [
                defineField({
                  name: 'quote',
                  title: 'Quote',
                  type: 'text',
                  rows: 5,
                  description: 'The testimonial quote',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'name',
                  title: 'Person Name',
                  type: 'string',
                  description: 'Full name of the person giving the testimonial',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'title',
                  title: 'Person Title',
                  type: 'string',
                  description: 'e.g., "Chief Technical Officer", "Founder & CEO", "Co-founder & CEO"',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'company',
                  title: 'Company',
                  type: 'string',
                  description: 'Company name',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'image',
                  title: 'Person Image',
                  type: 'image',
                  options: {hotspot: true},
                  description: 'Photo of the person',
                  validation: (Rule) => Rule.required(),
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
                defineField({
                  name: 'savings',
                  title: 'Savings Percentage',
                  type: 'string',
                  description: 'Optional: e.g., "49%", "51%", "69%" - Cost reduction percentage',
                }),
              ],
              preview: {
                select: {
                  name: 'name',
                  company: 'company',
                  savings: 'savings',
                  media: 'image',
                },
                prepare({name, company, savings, media}) {
                  return {
                    title: name || 'Testimonial',
                    subtitle: `${company || ''}${savings ? ` • ${savings} savings` : ''}`,
                    media,
                  }
                },
              },
            })
          ],
          description: 'Testimonials to display on the homepage',
          validation: (Rule) => Rule.required().min(1),
        }),
      ],
    }),

    // FAQ Section
    defineField({
      name: 'faqSection',
      title: 'FAQ Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'faqs',
          title: 'FAQs',
          type: 'array',
          of: [{type: 'faqItem'}],
          validation: (Rule) => Rule.required().min(1),
        }),
      ],
    }),

    // SEO Fields
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'SEO meta title for the homepage',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'SEO meta description for the homepage',
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
      title: 'Home Page',
    }),
  },
})

