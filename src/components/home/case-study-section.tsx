import { getBlogPageData, getAllBlogCategoriesData } from "@/lib/sanity/fetch";
import { BlogPostType, BlogCategoryType } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";
import { formatDayMonth } from "@/utils/date";

export default async function CaseStudySection() {
  const blogData = await getBlogPageData();
  const allCategories = await getAllBlogCategoriesData();

  if (!blogData || !allCategories) {
    return null;
  }

  // Find the case study category - try different possible slugs
  const caseStudyCategory = allCategories.find(
    (cat: BlogCategoryType) =>
      cat.slug?.toLowerCase() === "case-study" ||
      cat.name?.toLowerCase() === "case study"
  );

  if (!caseStudyCategory) {
    return null;
  }

  // Filter posts by case study category
  const caseStudyPosts =
    blogData.blogPosts?.filter(
      (post: BlogPostType) => post.category?.slug === caseStudyCategory.slug
    ) || [];

  // Take only the first 3 posts
  const displayPosts = caseStudyPosts.slice(0, 3);

  // If no posts, don't render the section
  if (displayPosts.length === 0) {
    return null;
  }

  return (
    <section className="pt-10 bg-background">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-semibold mb-4 leading-tight">
            <span 
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(to right, #FF9900 0%, #FF9900 75%, #FFB84D 90%, white 100%)'
              }}
            >
              Real Numbers Delivered. Hear it from them.
            </span>
          </h2>
          <p className="text-lg lg:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Explore how tech-driven businesses cut costs & scaled better with
            CloudVictor
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {displayPosts.map((post: BlogPostType) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className="group transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="h-full flex flex-col">
                {/* Image */}
                <div className="relative w-full aspect-video overflow-hidden rounded-2xl mb-4">
                  <Image
                    src={post.featuredImage?.asset?.url || ""}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="uppercase text-sm font-light text-foreground/70">
                      {post.category?.name || "Case Study"}
                    </span>
                    <span className="uppercase text-sm font-light text-foreground/70">
                      {formatDayMonth(post._updatedAt)}
                    </span>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-semibold text-foreground leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            href={`/blog/category/${caseStudyCategory.slug}`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FF9900]/90 to-[#E85409]/90 hover:from-[#FF9900] hover:to-[#E85409] text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
          >
            View All Case Studies
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 15L12.5 10L7.5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

