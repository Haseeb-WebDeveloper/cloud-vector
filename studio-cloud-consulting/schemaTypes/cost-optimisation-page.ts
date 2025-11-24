import {defineField, defineType} from 'sanity'

export const costOptimisationPage = defineType({
  name: 'costOptimisationPage',
  title: 'Cost Optimisation Page',
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
          name: 'animatedTexts',
          title: 'Animated Texts',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Texts that cycle in the hero section (e.g., "Cost", "Size", "Configuration")',
          validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
          name: 'animatedTextPrefix',
          title: 'Animated Text Prefix',
          type: 'string',
          description: 'Text before animated text (e.g., "Optimize")',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'animatedTextSuffix',
          title: 'Animated Text Suffix',
          type: 'string',
          description: 'Text after animated text (e.g., "of your AWS Infrastructure")',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'ctaButtons',
          title: 'CTA Buttons',
          type: 'array',
          of: [{type: 'button'}],
          validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
          name: 'heroImage',
          title: 'Hero Image',
          type: 'image',
          options: {hotspot: true},
          description: 'Hero section image',
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

    // Industry Facts Section
    defineField({
      name: 'industryFactsSection',
      title: 'Industry Facts Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'text',
          rows: 2,
          description: 'Main title (supports HTML-like structure)',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'text',
          rows: 2,
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'facts',
          title: 'Industry Facts',
          type: 'array',
          of: [{type: 'industryFact'}],
          validation: (Rule) => Rule.required().min(1),
        }),
      ],
    }),

    // Root Case Section
    defineField({
      name: 'rootCaseSection',
      title: 'Root Case Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'text',
          rows: 2,
          description: 'Title for the root case section',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'video',
          title: 'Video File',
          type: 'file',
          options: {
            accept: 'video/*',
          },
          description: 'Video file for the root case section',
        }),
        defineField({
          name: 'videoUrl',
          title: 'Video URL',
          type: 'string',
          description: 'Alternative: URL to video (e.g., "/videos/root-case.mp4")',
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
                  description: 'e.g., "Chief Technical Officer", "Founder & CEO"',
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
          description: 'Testimonials to display on the cost optimisation page',
          validation: (Rule) => Rule.required().min(1),
        }),
      ],
    }),

    // Our Approach Section
    defineField({
      name: 'ourApproachSection',
      title: 'Our Approach Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'text',
          rows: 2,
          description: 'Main title for the approach section',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'text',
          rows: 2,
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'steps',
          title: 'Approach Steps',
          type: 'array',
          of: [{type: 'approachStep'}],
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
        defineField({
          name: 'whatsappLink',
          title: 'WhatsApp Link',
          type: 'url',
          description: 'WhatsApp link for the section',
        }),
        defineField({
          name: 'scheduleLink',
          title: 'Schedule Link',
          type: 'url',
          description: 'Schedule meeting link for the section',
        }),
      ],
    }),

    // Steps Section
    defineField({
      name: 'stepsSection',
      title: 'Steps Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'text',
          rows: 2,
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'steps',
          title: 'Steps',
          type: 'array',
          of: [{type: 'costOptimisationStep'}],
          validation: (Rule) => Rule.required().min(1),
        }),
      ],
    }),

    // SEO Fields
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'SEO meta title for the cost optimisation page',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'SEO meta description for the cost optimisation page',
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
      title: 'Cost Optimisation Page',
    }),
  },
})

