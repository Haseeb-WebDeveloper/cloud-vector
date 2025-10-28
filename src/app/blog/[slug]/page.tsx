import { Metadata } from "next";
import { getBlogPostBySlug, getAllBlogPostsSlugs } from "@/lib/sanity/fetch";
import BlogPostPage from "@/components/blog/blog-post-page-component";
import { BlogPostType } from "@/types/blog";
import { notFound } from "next/navigation";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blogPost = await getBlogPostBySlug(slug);

  if (!blogPost) {
    notFound();
  }

  return <BlogPostPage blogPost={blogPost as BlogPostType} />;
}

export async function generateStaticParams() {
  const slugs = await getAllBlogPostsSlugs();

  if (!slugs) return [];

  return slugs.map((post: any) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blogPost = await getBlogPostBySlug(slug);

  if (!blogPost) {
    return {
      title: "Blog Post Not Found",
    };
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.cloudvictor.com";
  const postUrl = `${baseUrl}/blog/${slug}`;

  const metadata: Metadata = {
    title: blogPost.metaTitle || blogPost.title,
    description: blogPost.metaDescription || "",
    authors: [{ name: "CloudVictor" }],
    creator: "CloudVictor",
    publisher: "CloudVictor",
    openGraph: {
      title: blogPost.metaTitle || blogPost.title,
      description: blogPost.metaDescription || "",
      url: postUrl,
      siteName: "CloudVictor",
      locale: "en",
      type: "article",
      images: [
        {
          url: blogPost.ogImage?.asset.url || blogPost.featuredImage.asset.url,
          width: 1200,
          height: 630,
          alt: blogPost.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blogPost.metaTitle || blogPost.title,
      description: blogPost.metaDescription || blogPost.description,
      creator: "@cloudvictor",
      images: [blogPost.ogImage?.asset.url || blogPost.featuredImage.asset.url],
    },
    formatDetection: {
      telephone: false,
      date: false,
      email: false,
      address: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: postUrl,
    },
    robots: {
      follow: true,
      index: true,
      nocache: true,
      googleBot:
        "index, follow, nocache, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    },
    manifest: "/site.webmanifest",
  };

  return metadata;
}
