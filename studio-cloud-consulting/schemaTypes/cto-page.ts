import {defineField, defineType} from 'sanity'

export const ctoPage = defineType({
  name: 'ctoPage',
  title: 'CTO Page',
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
          name: 'animatedTextLabel',
          title: 'Animated Text Label',
          type: 'string',
          description: 'Text before the animated text (e.g., "Your AWS infra engineered for")',
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

    // HowWeSolve Section
    defineField({
      name: 'howWeSolveSection',
      title: 'How We Solve Section',
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
          name: 'painPoints',
          title: 'Pain Points',
          type: 'array',
          of: [{type: 'painPoint'}],
          validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
          name: 'solutions',
          title: 'Solutions',
          type: 'array',
          of: [{type: 'solution'}],
          validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
          name: 'video',
          title: 'Video File',
          type: 'file',
          options: {
            accept: 'video/*',
          },
          description: 'Video file for the center section',
        }),
        defineField({
          name: 'videoUrl',
          title: 'Video URL',
          type: 'string',
          description: 'Alternative: URL to video (e.g., "/videos/root-case.mp4")',
        }),
      ],
    }),

    // HowItWorks Section
    defineField({
      name: 'howItWorksSection',
      title: 'How It Works Section',
      type: 'object',
      fields: [
        defineField({
          name: 'mainTitle',
          title: 'Main Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string',
          description: 'Text below main title (e.g., "I want to:")',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'tabs',
          title: 'Tabs',
          type: 'array',
          of: [{type: 'ctoTab'}],
          validation: (Rule) => Rule.required().min(1),
        }),
      ],
    }),

    // Stats Section
    defineField({
      name: 'statsSection',
      title: 'Stats Section',
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
          name: 'stats',
          title: 'Stats',
          type: 'array',
          of: [{type: 'animatedStat'}],
          validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
          name: 'centerImage',
          title: 'Center Image',
          type: 'image',
          options: {hotspot: true},
          description: 'Center image displayed in the stats section',
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
          description: 'Testimonials to display on the CTO page',
          validation: (Rule) => Rule.required().min(1),
        }),
      ],
    }),

    // SEO Fields
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'SEO meta title for the CTO page',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'SEO meta description for the CTO page',
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
      title: 'CTO Page',
    }),
  },
})

