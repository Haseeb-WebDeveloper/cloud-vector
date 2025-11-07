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
  const sidebarRef = useRef<HTMLElement>(null);

  // --- Make sidebar sticky: Remove unnecessary observer scroll handling for stickiness, only keep Table of Contents intersection observer and progress bar ---

  const observerRef = useRef<IntersectionObserver | null>(null);

  // Scroll progress bar logic
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
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
    window.addEventListener("resize", handleScroll);
    setTimeout(handleScroll, 10);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const headings = blogPost.content ? extractH2Headings(blogPost.content) : [];

  // Apply sticky positioning only on desktop
  useEffect(() => {
    const applySticky = () => {
      if (sidebarRef.current) {
        const isDesktop = window.innerWidth >= 1024; // lg breakpoint
        if (isDesktop) {
          sidebarRef.current.style.position = "sticky";
          sidebarRef.current.style.top = "5rem";
        } else {
          sidebarRef.current.style.position = "";
          sidebarRef.current.style.top = "";
        }
      }
    };

    applySticky();
    window.addEventListener("resize", applySticky);
    return () => window.removeEventListener("resize", applySticky);
  }, []);

  // Enable Intersection Observer for Table of Contents
  useEffect(() => {
    if (headings.length === 0) return;

    observerRef.current = new window.IntersectionObserver(
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
        <div className="relative px-6 md:px-[2vw] pb-7 md:pb-[2vw] pt-32 md:pt-[8vw] bg-gradient-to-b from-primary/20 to-background rounded-b-[3vw] md:rounded-b-[2vw]">
          <div className="mx-auto flex flex-col justify-between">
            {/* Removed Breadcrumb navigation here */}
            <div className="space-y-5 md:space-y-[1vw] flex flex-col items-center text-center">
              <h1
                className="w-full lg:max-w-[58vw] text-[7vw] lg:text-[3.9vw] font-semibold mb-7 md:mb-[3vw] leading-[120%] pt-[30px] pb-[30px]"
                style={{
                  letterSpacing: "-0.02em",
                }}
              >
                {blogPost.title}
              </h1>
              <div className="w-full h-[1px] bg-foreground/70 lg:mt-6 mt-3"></div>
            </div>
          </div>
        </div>

        {/* Main Content Section */}
        <div
          className="w-full mx-auto max-w-[100vw] md:max-w-[100vw] xl:max-w-[90vw] px-2 sm:px-4 md:px-[1vw] pt-8 md:pt-[1vw]"
          id="content"
        >
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-[1.6vw] lg:gap-[2vw] pb-6 sm:pb-10 md:pb-[4vw] border-b-[1px] border-foreground/20 items-start">
            {/* Main Content */}
            <article className="lg:flex-1 w-full min-w-0">
              {/* Featured Image */}
              <div className="w-full rounded-xl overflow-hidden mb-6 lg:mb-[1.7vw]">
                <Image
                  src={blogPost.featuredImage.asset.url}
                  alt={blogPost.title}
                  width={1200}
                  height={600}
                  className="w-full h-auto object-cover aspect-video"
                  priority
                />
              </div>

              {/* Meta: Published Date */}
              <div className="w-full flex items-center justify-start gap-3 md:gap-[0.6vw] mb-6">
                <Image
                  src={"/icons/calendar.svg"}
                  alt="calendar"
                  width={100}
                  height={100}
                  className="w-6 h-6"
                />
                <span className="uppercase text-[3.8vw] md:text-[0.88vw] font-light">
                  {formatDayMonth(blogPost._updatedAt)}
                </span>
              </div>

              {/* Blog Content */}
              {blogPost.content && (
                <RichEditor content={blogPost.content} />
              )}
            </article>

            {/* Vertical Divider (Desktop) */}
            <div className="hidden lg:block w-px bg-foreground/20 mx-2 flex-shrink-0" />

            {/* Sticky Right Sidebar */}
            <aside 
              ref={sidebarRef}
              className="w-full lg:w-[19vw] mt-6 lg:mt-0 flex-shrink-0 lg:self-start"
              style={{
                maxHeight: "calc(100vh - 5rem)",
                alignSelf: "flex-start",
              }}
            >
              {/* Desktop Sidebar Content */}
              <div className="hidden lg:block">
                <div 
                  className="flex flex-col gap-6 z-40 w-full"
                >
                  {/* Table of Contents */}
                  {headings.length > 0 && (
                    <div className="relative px-4 pt-4 md:px-[0.7vw] md:pt-[1vw] border border-foreground/20 rounded-xl bg-background/60 backdrop-blur-sm shadow-md overflow-hidden">
                      <h4 className="text-[1.1vw] uppercase font-semibold text-primary/90 mb-3 tracking-wide leading-tight">
                        Table of Contents
                      </h4>
                      <div
                        data-lenis-prevent
                        className="z-10 overflow-y-auto md:h-[13vw] max-h-[36vh] xl:max-h-[23vw] pr-1 space-y-2 custom-scrollbar text-[0.92vw] font-light"
                      >
                        {headings.map((heading, index) => (
                          <button
                            key={index}
                            onClick={() => scrollToHeading(heading.id)}
                            className={`cursor-pointer block w-full truncate text-left transition-colors px-1 py-1 rounded
                                  ${activeHeading === heading.id
                                ? "text-primary font-semibold bg-primary/10"
                                : "text-foreground/80 hover:text-primary/90"
                              }
                                `}
                            aria-current={activeHeading === heading.id}
                          >
                            <span className="opacity-50 pr-1">{index + 1}.</span>{" "}
                            <span className="truncate inline">
                              {heading.text}
                            </span>
                          </button>
                        ))}
                      </div>
                      <div className="absolute bottom-0 left-0 w-full h-[2vw] bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
                    </div>
                  )}

                  {/* Desktop Progress Bar */}
                  <div className="w-full h-[3px] rounded-full bg-foreground/40 overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300 ease-out"
                      style={{ width: `${scrollProgress}%` }}
                    />
                  </div>

                  {/* Static card with CTA */}
                  <div>
                    <div className="w-full bg-secondary/10 rounded-xl p-4 border text-center shadow-sm">
                      <h2
                        className="text-[1vw] xl:text-[1.2vw] uppercase font-bold leading-tight text-primary"
                      >
                        Reduce your monthly AWS bill by up to <span className="text-primary/90">(68%)</span>
                      </h2>
                      <p className="text-[0.85vw] xl:text-[0.95vw] font-light text-foreground/90 mt-1">
                        EffDog automates the tedious work of analyzing your AWS
                        usage and optimizing it to keep your AWS monthly bills
                        in check.
                      </p>
                    </div>
                    <div className="mt-2">
                      <AnimatedQuoteButton
                        onClick={() => {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="w-full text-[0.92vw] uppercase"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Social Share Buttons (Mobile) */}
              <div className="lg:hidden">
                <SocialShareButtons
                  onCopySuccess={handleCopySuccess}
                  copySuccess={copySuccess}
                />
              </div>
            </aside>
          </div>
        </div>

        {/* Related Posts */}
        {blogPost.relatedPosts && blogPost.relatedPosts.length > 0 && (
          <div className="px-3 sm:px-4 md:px-[1.6vw] pb-6 sm:pb-10 md:pb-[2vw] pt-10 sm:pt-12 md:pt-[3vw] max-w-[96vw] md:max-w-[82vw] xl:max-w-[90vw] mx-auto">
            <h4 className="text-2xl lg:text-[2vw] font-medium mb-6 md:mb-[2vw]">
              You may also like
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[1vw] lg:gap-y-[2.7vw] gap-y-8 w-full mx-auto">
              {blogPost.relatedPosts.map((post) => (
                <article
                  key={post._id}
                  className={`group cursor-pointer relative transition-all duration-300 flex flex-col ${hoveredPostId && hoveredPostId !== post._id
                      ? "opacity-30"
                      : "opacity-100"
                    }`}
                  onMouseEnter={() => setHoveredPostId(post._id)}
                  onMouseLeave={() => setHoveredPostId(null)}
                >
                  <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                    <div className="w-full aspect-video overflow-hidden rounded-xl mb-3 flex-shrink-0">
                      <Image
                        src={post.featuredImage.asset.url}
                        alt={post.title}
                        width={1000}
                        height={1000}
                        className="w-full h-full rounded-xl object-cover transition-all ease-in-out duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col flex-grow space-y-2 mt-auto">
                      <div className="flex items-center justify-between gap-2">
                        <span className="uppercase text-[2.3vw] lg:text-[0.92vw] font-light text-foreground truncate">
                          {post.category?.name || "Uncategorized"}
                        </span>
                        <span className="uppercase text-[2.3vw] lg:text-[0.92vw] font-light text-foreground whitespace-nowrap flex-shrink-0">
                          {formatDayMonth(post._updatedAt)}
                        </span>
                      </div>
                      <h3 className="text-[3.4vw] lg:text-[1.1vw] font-medium lg:font-semibold text-foreground leading-[150%] line-clamp-3">
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
