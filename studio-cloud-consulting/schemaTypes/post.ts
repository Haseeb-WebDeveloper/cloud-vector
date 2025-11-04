import {defineField, defineType} from 'sanity'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'The title of the blog post',
    }),
    defineField({
      name: 'slug',
      title: 'Slugs',
      type: 'slug',
      options: {
        source: 'title',
      },
      description: 'The slug of the blog post',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'The featured image of the blog post',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Blog Category',
      type: 'reference',
      to: [{type: 'blogCategory'}],
      description: 'The category of the blog post',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {type: 'block'},
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {type: 'titleBlock'},
        {type: 'centerTextBlock'},
        {type: 'textImageBlock'},
        {type: 'twoImagesBlock'},
        {type: 'imageCarouselBlock'},
        {type: 'mediaBlock'},
        {type: 'infoBoxesBlock'},
      ],
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Related Blog Posts',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'blogPost'}]}],
      description: 'The related blog posts of the blog post',
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'The meta title of the blog post',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'The meta description of the blog post',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ogImage',
      title: 'OG Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'featuredImage',
      category: 'category.name',
    },
    prepare: ({title, media, category}) => ({
      title: title || 'Untitled Blog Post',
      subtitle: `${category || 'Uncategorized'}`,
      media,
    }),
  },
})
