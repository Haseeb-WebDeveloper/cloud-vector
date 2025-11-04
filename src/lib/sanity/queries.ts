export const getAllDigitalProductsSolutionsSlugQuery = () => `
*[_type == "studioDigitalProductsSolutions"] {
  "slug": slug.current,
  _updatedAt
}
`;



// Blog queries
export const getBlogPageQuery = () => `
*[_type == "blogPage"][0] {
  blogPosts[]->{
    _id,
    "title": title,
    "slug": slug.current,
    featuredImage {
      asset->{
        url
      }
    },
    category->{
      _id,
      "name": name,
      "slug": slug.current
    },
    "metaTitle": metaTitle,
    "metaDescription": metaDescription,
    _createdAt,
    _updatedAt,
  },
  "metaTitle": metaTitle,
  "metaDescription": metaDescription,
  ogImage {
    asset->{
      url
    }
  }
}
`;

export const getAllBlogCategoriesQuery = () => `
*[_type == "blogCategory"] {
  _id,
  "name": name,
  "slug": slug.current,
}
`;

export const getBlogPostBySlugQuery = (slug: string) => `
*[_type == "blogPost" && slug.current == "${slug}"][0] {
  _id,
  "title": title,
  "slug": slug.current,
  featuredImage {
    asset->{
      url
    }
  },
  category->{
    _id,
    "name": name,
    "slug": slug.current
  },
  "content": content[]{
    ...,
    // Handle different custom block types inline for each array member
    _type == "mediaBlock" => {
      width,
      height,
      gap,
      justifyContent,
      files[]{
        file {
          asset->{
            url
          }
        },
        rounded,
        autoplay,
        loop,
        muted
      }
    },
    _type == "titleBlock" => {
      layout,
      text[]{
        content,
        tag
      }
    },
    _type == "centerTextBlock" => {
      text,
      isItalic
    },
    _type == "textImageBlock" => {
      layout,
      height,
      text[]{
        content,
        tag
      },
      image {
        asset->{
          url
        }
      }
    },
    _type == "image" => {
      asset->{
        url
      }
    },
    _type == "imageCarouselBlock" => {
      media[]{
        ...,
        _type == "image" => {
          asset->{
            url
          }
        },
        _type == "file" => {
          asset->{
            url
          }
        }
      }
    },
    _type == "infoBoxesBlock" => {
      items[]{
        icon{
          asset->{
            url
          }
        },
        text
      }
    },
    _type == "testimonialBlock" => {
      text,
      personName,
      designation,
      company,
      photo{
        asset->{
          url
        }
      }
    },
    _type == "keyResultsBlock" => {
      items
    },
    _type == "twoImagesBlock" => {
      images[]{
        asset->{
          url
        }
      }
    }
  },
  relatedPosts[]->{
    _id,
    "title": title,
    "slug": slug.current,
    featuredImage {
      asset->{
        url
      }
    },
    category->{
      _id,
      "name": name,
      "slug": slug.current
    },
    _updatedAt
  },
  "metaTitle": metaTitle,
  "metaDescription": metaDescription,
  ogImage {
    asset->{
      url
    }
  },
  _createdAt,
  _updatedAt,
}
`;

export const getAllBlogPostsSlugsQuery = () => `
*[_type == "blogPost"] {
  "slug": slug.current
}
`;