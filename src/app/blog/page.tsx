import { Metadata } from "next";
import { getBlogPageData, getAllBlogCategoriesData } from "@/lib/sanity/fetch";
import { BlogPageType } from "@/types/blog";
import BlogPageComponent from "@/components/blog/blog-page-component";

export default async function Blog({}) {
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

export async function generateMetadata({}: {}): Promise<Metadata> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.figmenta.com";
  const blogUrl = `${baseUrl}/blog`;

  const metadata = {
    title: "",
    description: "",
    authors: [{ name: "" }],
    creator: "Figmenta Studio",
    publisher: "",
    openGraph: {
      title: "",
      description: "",
      url: blogUrl,
      siteName: "",
      locale: "en",
      type: "website",
      images: [
        {
          url: `${baseUrl}/logo.webp`,
          width: 1200,
          height: 630,
          alt: "",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "",
      description: "",
      creator: "",
      images: [`/logo.webp`],
    },
    formatDetection: {
      telephone: false,
      date: false,
      email: false,
      address: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: blogUrl,
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
