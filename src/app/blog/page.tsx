import type { Metadata } from "next";
import { getBlogPageData, getAllBlogCategoriesData } from "@/lib/sanity/fetch";
import { BlogPageType } from "@/types/blog";
import BlogPageComponent from "@/components/blog/blog-page-component";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.cloudvictor.com";

export default async function Blog() {
  const blogData = await getBlogPageData();
  const allCategories = await getAllBlogCategoriesData();

  if (!blogData) {
    return <div>Blog content not available</div>;
  }

  return (
    <BlogPageComponent
      blogData={blogData as BlogPageType}
      allCategories={allCategories || []}
    />
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const blogData = await getBlogPageData();

  const url = `${SITE_URL}/blog`;
  const title =
    blogData?.metaTitle || "AWS & FinOps Blog | CloudVictor";
  const description =
    blogData?.metaDescription ||
    "Insights from running AWS at scale: FinOps, cost optimisation, reliability and security best practices from ex-Amazon/AWS engineers.";

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
