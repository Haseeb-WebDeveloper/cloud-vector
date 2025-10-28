import {defineField, defineType} from 'sanity'

export const blogCategory = defineType({
  name: 'blogCategory',
  title: 'Blog Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (Rule) => Rule.required(),
      description: 'The name of the blog category',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'name',
      },
      description: 'The slug of the blog category',
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
    prepare: ({title}) => ({
      title: title || 'Untitled Blog Category',
    }),
  },
})
