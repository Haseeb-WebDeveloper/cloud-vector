"use client";

import React, { useState, useEffect, useRef } from "react";
import { BlogPostType } from "@/types/blog";
import Link from "next/link";
import { formatDayMonth } from "@/utils/date";
import RichEditor from "../editor/rich-editor";
import Image from "next/image";
import { extractH2Headings } from "@/utils/extract-heading";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import SocialShareButtons from "./social-share-buttons";
import AnimatedQuoteButton from "./animated-quote-button";

interface BlogPostPageProps {
  blogPost: BlogPostType;
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ blogPost }) => {
  const [activeHeading, setActiveHeading] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredPostId, setHoveredPostId] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Calculate scroll progress for the content area
      const contentElement = document.querySelector("article");
      if (contentElement) {
        const contentHeight = contentElement.scrollHeight;
        const viewportHeight = window.innerHeight;
        const contentTop = contentElement.offsetTop;

        const progress = Math.max(
          0,
          Math.min(
            100,
            ((scrollY + viewportHeight - contentTop) /
              (contentHeight - viewportHeight)) *
              100
          )
        );
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headings = blogPost.content ? extractH2Headings(blogPost.content) : [];

  // Set up Intersection Observer for TOC
  useEffect(() => {
    if (headings.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0% -35% 0%",
        threshold: 0.1,
      }
    );

    // Observe all h2 headings
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [headings]);

  const handleCopySuccess = () => {
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const scrollToHeading = (headingId: string) => {
    const element = document.getElementById(headingId);
    if (element) {
      const headerOffset = 90;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const scrollToContent = () => {
    const contentElement = document.getElementById("content");
    if (contentElement) {
      const elementTop = contentElement.offsetTop;
      const offset = window.innerWidth < 1024 ? 120 : 0;
      window.scrollTo({
        top: elementTop - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <Header />

      {/* Mobile Progress Bar */}
      <div className="lg:hidden fixed top-0 left-0 w-full h-[3px] bg-foreground/20 z-50">
        <div
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="min-h-screen bg-background mb-[5vw]">
        {/* Hero Section */}
        <div className="relative px-6 md:px-[4vw] pb-7 md:pb-[4vw] pt-32 md:pt-[10vw] bg-gradient-to-b from-primary/20 to-background rounded-b-[5.5vw] md:rounded-b-[3vw]">
          <div className="mx-auto flex flex-col justify-between">
            {/* Breadcrumb */}
            <nav className="mb-20 md:mb-[11vw]">
              <ol className="flex items-center space-x-2 uppercase text-xs sm:text-sm md:text-[1vw] font-light">
                <li>
                  <Link
                    href="/blog"
                    className="transition-colors hover:text-foreground/80"
                  >
                    ALL BLOG POSTS
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link
                    href={`/blog/category/${blogPost.category.slug}`}
                    className="transition-colors hover:text-foreground/80"
                  >
                    {blogPost.category.name}
                  </Link>
                </li>
              </ol>
            </nav>

            {/* Article Header */}
            <div className="space-y-6 md:space-y-[2vw]">
              <h1
                className="w-full lg:max-w-[75vw] text-[8vw] lg:text-[5vw] font-semibold mb-10 md:mb-[7vw] leading-[120%]"
                style={{
                  letterSpacing: "-0.02em",
                }}
              >
                {blogPost.title}
              </h1>

              {/* Date */}
              <div className="flex items-center justify-between gap-3 md:gap-[1vw]">
                <div className="flex items-center gap-3 md:gap-[1vw]">
                  <Image
                    src={"/icons/calendar.svg"}
                    alt="calendar"
                    width={100}
                    height={100}
                    className="w-6 h-6"
                  />
                  <span className="uppercase text-[4.5vw] md:text-[1vw] font-light">
                    {formatDayMonth(blogPost._updatedAt)}
                  </span>
                </div>
                <div
                  // onClick={() => scrollToContent()}
                  className=" flex items-center gap-3 md:gap-[1vw]"
                >
                  <div className="rounded-full border border-foreground">
                    <img
                      src={"/icons/scroll-down.gif"}
                      alt="scroll down"
                      className="w-6 h-6 invert"
                    />
                  </div>
                  <span className="uppercase  text-[4.5vw] md:text-[1vw] font-light">
                    Scroll
                  </span>
                </div>
              </div>
              <div className="w-full h-[1px] bg-foreground/70 lg:mt-8 mt-4"></div>
            </div>
          </div>
        </div>

        {/* Main Content Section */}
        <div
          className="w-full mx-auto px-4 sm:px-6 md:px-[4vw] pt-12 md:pt-[2vw]"
          id="content"
        >
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-[4vw] lg:gap-[4vw] pb-8 sm:pb-12 md:pb-[7vw] border-b-[1px] border-foreground/20">
            {/* Left Sidebar - Share Buttons (Desktop) */}
            <div className="hidden lg:block w-fit">
              <div className="sticky top-[8vw]">
                <SocialShareButtons
                  onCopySuccess={handleCopySuccess}
                  copySuccess={copySuccess}
                />
              </div>
            </div>

            <div className="w-full space-y-8 lg:space-y-[3vw] max-w-[85vw] mx-auto">
              {/* Content and Table of Contents */}
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-[7vw] w-full">
                {/* Rich Text Content */}
                <article className="lg:flex-1 w-full">
                  {/* Featured Image */}
                  <div className="w-full rounded-2xl overflow-hidden mb-8 lg:mb-[3vw]">
                    <Image
                      src={blogPost.featuredImage.asset.url}
                      alt={blogPost.title}
                      width={1200}
                      height={600}
                      className="w-full h-auto object-cover aspect-video"
                      priority
                    />
                  </div>

                  {/* Blog Content */}
                  {blogPost.content && (
                    <RichEditor content={blogPost.content} />
                  )}
                </article>

                {/* Right Sidebar - Table of Contents */}
                <div className="w-full lg:w-[25vw] mt-6 lg:mt-0">
                  <div className="lg:sticky lg:top-[8vw] space-y-4">
                    {/* Table of Contents */}
                    {headings.length > 0 && (
                      <div className="relative hidden lg:block p-6 lg:p-[2vw] border border-foreground/20 rounded-2xl">
                        <h4 className="text-lg sm:text-xl md:text-[1.5vw] font-light text-foreground mb-4 sm:mb-6 md:mb-[2vw] uppercase">
                          Table of Contents
                        </h4>
                        <div
                          data-lenis-prevent
                          className="z-10 h-48 md:h-[18vw] overflow-y-auto space-y-2 sm:space-y-3 md:space-y-[1vw]"
                        >
                          {headings.map((heading, index) => (
                            <button
                              key={index}
                              onClick={() => scrollToHeading(heading.id)}
                              className={`cursor-pointer block w-full text-left text-sm sm:text-base md:text-[1vw] tracking-wide font-light transition-colors ${
                                activeHeading === heading.id
                                  ? "text-foreground font-medium"
                                  : "text-foreground/80 hover:text-foreground"
                              }`}
                            >
                              {index + 1}. {heading.text}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Social Share Buttons (Mobile) */}
                    <div className="lg:hidden">
                      <SocialShareButtons
                        onCopySuccess={handleCopySuccess}
                        copySuccess={copySuccess}
                      />
                    </div>

                    {/* Desktop Progress Bar */}
                    <div className="hidden lg:block w-full h-[3px] rounded-full bg-foreground/50 overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-300 ease-out"
                        style={{ width: `${scrollProgress}%` }}
                      />
                    </div>

                    {/* Desktop Request a Quote Button */}
                    <div className="hidden lg:block">
                      <AnimatedQuoteButton
                        onClick={() => {
                          // You can add contact modal logic here
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="w-full text-[1.3vw] uppercase"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {blogPost.relatedPosts && blogPost.relatedPosts.length > 0 && (
          <div className="px-4 sm:px-6 md:px-[4vw] pb-8 sm:pb-12 md:pb-[4vw] pt-12 sm:pt-16 md:pt-[6vw]">
            <h4 className="text-3xl lg:text-[3vw] font-medium mb-8 md:mb-[3vw]">
              You may also like
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[2vw] lg:gap-y-[6vw] gap-y-16 w-full mx-auto">
              {blogPost.relatedPosts.map((post) => (
                <article
                  key={post._id}
                  className={`group cursor-pointer relative transition-all duration-300 ${
                    hoveredPostId && hoveredPostId !== post._id
                      ? "opacity-30"
                      : "opacity-100"
                  }`}
                  onMouseEnter={() => setHoveredPostId(post._id)}
                  onMouseLeave={() => setHoveredPostId(null)}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="lg:max-h-[18vw] aspect-video h-fit overflow-hidden rounded-2xl">
                      <Image
                        src={post.featuredImage.asset.url}
                        alt={post.title}
                        width={1000}
                        height={1000}
                        className="w-full h-full rounded-2xl object-cover transition-all ease-in-out duration-100"
                      />
                    </div>
                    <div className="space-y-3 mt-4">
                      <div className="flex items-center justify-between">
                        <span className="uppercase text-[3.5vw] lg:text-[1vw] font-light text-foreground">
                          {post.category?.name || "Uncategorized"}
                        </span>
                        <span className="uppercase text-[3.5vw] lg:text-[1vw] font-light text-foreground">
                          {formatDayMonth(post._updatedAt)}
                        </span>
                      </div>
                      <h3 className="text-[5.5vw] lg:text-[1.6vw] font-medium lg:font-semibold text-foreground leading-[150%] line-clamp-3">
                        {post.title}
                      </h3>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default BlogPostPage;
