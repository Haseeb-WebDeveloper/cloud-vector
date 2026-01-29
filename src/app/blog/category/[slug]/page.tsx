import type { Metadata } from "next";
import { getBlogPageData, getAllBlogCategoriesData } from "@/lib/sanity/fetch";
import { BlogPageType, BlogPostType, BlogCategoryType } from "@/types/blog";
import BlogPageComponent from "@/components/blog/blog-page-component";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.cloudvictor.com";

export default async function BlogCategory({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blogData = await getBlogPageData();
  const allCategories = await getAllBlogCategoriesData();

  if (!blogData) {
    return <div>Blog content not available</div>;
  }

  // Filter posts by category
  const categoryPosts =
    blogData.blogPosts?.filter(
      (post: BlogPostType) => post.category?.slug === slug
    ) || [];

  // Find the category name
  const category = allCategories?.find(
    (cat: BlogCategoryType) => cat.slug === slug
  );

  // Create a modified blogData with only the filtered posts
  const filteredBlogData = {
    ...blogData,
    blogPosts: categoryPosts,
  };

  return (
    <BlogPageComponent
      blogData={filteredBlogData as BlogPageType}
      allCategories={allCategories || []}
    />
  );
}

export async function generateStaticParams() {
  const allCategories = await getAllBlogCategoriesData();

  if (!allCategories) return [];

  return allCategories.map((category: BlogCategoryType) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blogData = await getBlogPageData();
  const allCategories = await getAllBlogCategoriesData();

  const url = `${SITE_URL}/blog/category/${slug}`;

  const category = allCategories?.find(
    (cat: BlogCategoryType) => cat.slug === slug
  );

  const baseTitle =
    blogData?.metaTitle || "AWS & FinOps Blog | CloudVictor";
  const baseDescription =
    blogData?.metaDescription ||
    "Insights from running AWS at scale: FinOps, cost optimisation, reliability and security best practices from ex-Amazon/AWS engineers.";

  const title = category
    ? `${category.name} | CloudVictor Blog`
    : baseTitle;
  const description = baseDescription;

  const ogImage =
    blogData?.ogImage?.asset?.url || `${SITE_URL}/og-blog.jpg`;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "CloudVictor",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: {
      follow: true,
      index: true,
    },
  };
}
