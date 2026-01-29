import type { Metadata } from "next";
import { getBlogPageData, getAllBlogCategoriesData } from "@/lib/sanity/fetch";
import { BlogPostType, BlogCategoryType } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";
import { formatDayMonth } from "@/utils/date";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.cloudvictor.com";

export const metadata: Metadata = {
  title: "Case Studies | CloudVictor",
  description:
    "Real-world success stories and implementation examples. Explore how tech-driven businesses cut costs & scaled better with CloudVictor.",
  alternates: {
    canonical: `${SITE_URL}/case-studies`,
  },
  openGraph: {
    title: "AWS Cost Optimisation Case Studies | CloudVictor",
    description:
      "See how CloudVictor helped engineering-led teams cut AWS bills, improve performance and strengthen security with Amazon-grade FinOps.",
    url: `${SITE_URL}/case-studies`,
    siteName: "CloudVictor",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${SITE_URL}/og-case-studies.jpg`,
        width: 1200,
        height: 630,
        alt: "CloudVictor Case Studies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies | CloudVictor",
    description:
      "Real-world success stories and implementation examples. Explore how tech-driven businesses cut costs & scaled better with CloudVictor.",
    images: [`${SITE_URL}/og-case-studies.jpg`],
  },
};

export default async function CaseStudiesPage() {
  const blogData = await getBlogPageData();
  const allCategories = await getAllBlogCategoriesData();

  if (!blogData || !allCategories) {
    return (
      <div className="min-h-screen pt-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl py-16">
          <p className="text-center text-foreground/70">Case studies content not available</p>
        </div>
      </div>
    );
  }

  // Find the case study category - try different possible slugs
  const caseStudyCategory = allCategories.find(
    (cat: BlogCategoryType) =>
      cat.slug?.toLowerCase() === "case-study" ||
      cat.name?.toLowerCase() === "case study" ||
      cat.slug?.toLowerCase() === "case-studies" ||
      cat.name?.toLowerCase() === "case studies"
  );

  if (!caseStudyCategory) {
    return (
      <div className="min-h-screen pt-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl py-16">
          <p className="text-center text-foreground/70">Case study category not found</p>
        </div>
      </div>
    );
  }

  // Filter posts by case study category
  const caseStudyPosts =
    blogData.blogPosts?.filter(
      (post: BlogPostType) => post.category?.slug === caseStudyCategory.slug
    ) || [];

  return (
    <div className="min-h-screen pt-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl py-16">
        {/* Hero Section */}
        <div className="text-center mb-12 lg:mb-16">
          <h1 className="text-4xl lg:text-6xl font-semibold mb-6 leading-tight">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #FF9900 0%, #FF9900 75%, #FFB84D 90%, white 100%)",
              }}
            >
              Real Numbers Delivered. Hear it from them.
            </span>
          </h1>
          <p className="text-lg lg:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Explore how tech-driven businesses cut costs & scaled better with CloudVictor. Real
            teams. Real stories. Real numbers.
          </p>
        </div>

        {/* Case Studies Grid */}
        {caseStudyPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {caseStudyPosts.map((post: BlogPostType) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug}`}
                className="group transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="h-full flex flex-col bg-foreground/5 rounded-2xl overflow-hidden border border-foreground/10 hover:border-primary/50 transition-all">
                  {/* Image */}
                  <div className="relative w-full aspect-video overflow-hidden">
                    <Image
                      src={post.featuredImage?.asset?.url || "/placeholder-case-study.jpg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="uppercase text-sm font-light text-primary">
                        {post.category?.name || "Case Study"}
                      </span>
                      <span className="uppercase text-sm font-light text-foreground/70">
                        {formatDayMonth(post._updatedAt)}
                      </span>
                    </div>
                    <h3 className="text-xl lg:text-2xl font-semibold text-foreground leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    {post.metaDescription && (
                      <p className="text-foreground/70 text-sm line-clamp-2">
                        {post.metaDescription}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-foreground/70 text-lg">
              No case studies available at the moment. Check back soon!
            </p>
          </div>
        )}

        {/* Back to Blog Link */}
        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 text-foreground/80 hover:text-primary transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5 15L7.5 10L12.5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
}

