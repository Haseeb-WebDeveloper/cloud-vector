export interface BlogPostType {
  _id: string;
  title: string;
  slug: string;
  featuredImage: {
    asset: {
      url: string;
    };
  };
  category: {
    _id: string;
    name: string;
    slug: string;
  };
  content?: any[];
  relatedPosts?: BlogPostType[];
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: {
    asset: {
      url: string;
    };
  };
  _createdAt: string;
  _updatedAt: string;
}

export interface BlogCategoryType {
  _id: string;
  name: string;
  slug: string;
}

export interface BlogPageType {
  blogPosts: BlogPostType[];
  metaTitle: string;
  metaDescription: string;
  ogImage: {
    asset: {
      url: string;
    };
  };
}
