"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ChevronLeft, ChevronRight, X, Filter } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { BlogCategoryType, BlogPageType } from "@/types/blog";
import { formatDayMonth } from "@/utils/date";

interface BlogPageComponentProps {
  blogData: BlogPageType;
  allCategories: BlogCategoryType[];
}

const BlogPageComponent: React.FC<BlogPageComponentProps> = ({
  blogData,
  allCategories,
}) => {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [hoveredPostId, setHoveredPostId] = useState<string | null>(null);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const postsPerPage = 6;

  // Check if we're on the main blog page or a category page
  const isMainBlogPage = pathname === `/blog`;
  const currentCategorySlug = pathname.includes("/category/")
    ? pathname.split("/category/")[1]
    : null;

  // Filter posts based on search
  const filteredPosts = useMemo(() => {
    let filtered = blogData.blogPosts || [];

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.metaDescription
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [blogData.blogPosts, searchQuery]);

  // Pagination - Always show exactly 6 posts per page
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (isSearchExpanded) {
      setSearchQuery("");
    }
  };

  const toggleFilterDropdown = () => {
    setIsFilterDropdownOpen(!isFilterDropdownOpen);
  };

  return (
    <>
      <div className="min-h-screen bg-background lg:pt-[12vw] pt-[20vh]">
        {/* Categories and Search Section */}
        <div className="flex flex-wrap gap-4 lg:gap-4 w-full lg:max-w-[80vw] mx-auto justify-center items-center px-6">
          {/* Desktop Layout - Categories and Search */}
          <div className="hidden lg:flex flex-wrap gap-[0.8vw] w-full justify-center items-center">
            {/* Categories - Hidden when search is expanded */}
            <div
              className={`flex flex-wrap gap-[0.8vw] transition-all duration-300 ${
                isSearchExpanded
                  ? "hidden pointer-events-none scale-95"
                  : "block"
              }`}
            >
              {/* All Posts Button */}
              <Link
                href={`/blog`}
                className={`cursor-pointer rounded-full px-6 py-3 border border-foreground/20 transition-all group hover:bg-foreground hover:text-background ${
                  isMainBlogPage
                    ? "bg-foreground text-background"
                    : "bg-background text-foreground"
                }`}
              >
                <div className="relative overflow-hidden">
                  <span
                    className={`uppercase text-[4.5v] lg:text-[1vw] font-light block transition-transform duration-300 group-hover:-translate-y-[200%] group-hover:text-background z-10 ${
                      isMainBlogPage ? "text-background" : ""
                    }`}
                  >
                    ALL POSTS
                  </span>
                  <span className="uppercase text-[4.5v] lg:text-[1vw] font-light absolute inset-0 flex items-center justify-center transition-transform duration-300 translate-y-full group-hover:translate-y-0 group-hover:text-background z-10">
                    ALL POSTS
                  </span>
                </div>
              </Link>

              {/* Category Buttons */}
              {allCategories?.map((category) => {
                const isActiveCategory = currentCategorySlug === category.slug;

                return (
                  <Link
                    key={category._id}
                    href={`/blog/category/${category.slug}`}
                    className={`cursor-pointer rounded-full px-6 py-3 border border-foreground/20 transition-all group hover:bg-foreground group-hover:text-background z-10 ${
                      isActiveCategory
                        ? "bg-foreground text-background"
                        : "bg-background text-foreground"
                    }`}
                  >
                    <div className="relative overflow-hidden ">
                      <span
                        className={`uppercase text-[4.5v] lg:text-[1vw] font-light block transition-transform duration-300 group-hover:-translate-y-[200%] group-hover:text-background z-10 ${
                          isActiveCategory ? "text-background" : ""
                        }`}
                      >
                        {category.name}
                      </span>
                      <span className="uppercase text-[4.5v] lg:text-[1vw] font-light absolute inset-0 flex items-center justify-center transition-transform duration-300 translate-y-full group-hover:translate-y-0 group-hover:text-background">
                        {category.name}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Desktop Search Section */}
            <div
              className={`flex items-center justify-center transition-all duration-300 ${
                isSearchExpanded ? "w-full max-w-md mx-auto" : "w-auto"
              }`}
            >
              <div
                className={`flex items-center transition-all duration-300 ease-in-out ${
                  isSearchExpanded
                    ? "bg-foreground text-background border border-foreground/20 rounded-full px-4 py-3 w-full"
                    : "cursor-pointer rounded-full px-6 py-3 bg-background text-foreground border border-foreground/20 group hover:bg-foreground hover:text-background"
                }`}
                onClick={!isSearchExpanded ? toggleSearch : undefined}
              >
                {isSearchExpanded ? (
                  <>
                    <Search size={16} className="mr-3 text-background" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      placeholder="I am looking for..."
                      className="w-full bg-transparent text-background placeholder:font-light placeholder-background/50 outline-none uppercase text-[4.5vw] lg:text-[1vw] font-light"
                      autoFocus
                    />
                    <button
                      onClick={toggleSearch}
                      className="cursor-pointer ml-3 text-background transition-colors"
                    >
                      <X size={16} className="text-background" />
                    </button>
                  </>
                ) : (
                  <div className="relative overflow-hidden">
                    <span className="uppercase text-[4.5v] lg:text-[1vw] font-light flex items-center gap-2 transition-transform duration-300 group-hover:-translate-y-[200%] group-hover:text-background z-10">
                      SEARCH
                      <Search size={16} />
                    </span>
                    <span className="uppercase text-[4.5v] lg:text-[1vw] font-light absolute inset-0 flex items-center justify-center gap-2 transition-transform duration-300 translate-y-full group-hover:translate-y-0 group-hover:text-background">
                      SEARCH
                      <Search size={16} />
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Layout - Filter Button and Search Input */}
          <div className="relative lg:hidden flex items-center gap-2 w-full">
            {/* Filter Button */}
            <div className="w-fit">
              <button
                onClick={toggleFilterDropdown}
                className="cursor-pointer aspect-square rounded-full px-4 py-3 bg-background text-foreground border-[1px] border-foreground/90 transition-all hover:bg-foreground hover:text-background"
              >
                <Filter size={20} />
              </button>

              {/* Filter Dropdown */}
              {isFilterDropdownOpen && (
                <div className="absolute top-full w-full left-0 mt-2 bg-foreground border-[1px] border-foreground/90 rounded-[5vw] shadow-lg z-50 min-w-[200px]">
                  <div className="p-1 space-y-1">
                    {/* All Posts Option */}
                    <Link
                      href={`/blog`}
                      onClick={() => setIsFilterDropdownOpen(false)}
                      className={`block w-full text-left px-4 py-2 rounded-t-[4vw] text-background  transition-colors ${
                        isMainBlogPage
                          ? "bg-[#e9e9e9]"
                          : "hover:bg-foreground/10"
                      }`}
                    >
                      <span className="uppercase text-base">ALL POSTS</span>
                    </Link>

                    {/* Category Options */}
                    {allCategories?.map((category, index) => {
                      const isActiveCategory =
                        currentCategorySlug === category.slug;

                      return (
                        <Link
                          key={category._id}
                          href={`/blog/category/${category.slug}`}
                          onClick={() => setIsFilterDropdownOpen(false)}
                          className={`block w-full text-left px-4 py-2 text-background transition-colors ${
                            isActiveCategory
                              ? "bg-[#e9e9e9]"
                              : "hover:bg-foreground/10"
                          } 
                          ${isActiveCategory && index === allCategories.length - 1 ? "rounded-b-[4vw]" : ""}
                          
                          `}
                        >
                          <span className="uppercase text-base">
                            {category.name}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Search Input */}
            <div className="w-full overflow-hidden">
              <div className="flex bg-background items-center w-full border-[1px] border-foreground/90 rounded-full px-2 py-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="I am looking for..."
                  className="w-full px-2 py-1 bg-transparent text-foreground placeholder-foreground/90  outline-none uppercase text-[4vw] font-light"
                />
                <div className=" rounded-full bg-foreground p-2">
                  <Search size={16} className="text-background" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid - Always show exactly 6 posts per page */}
        <div className="mt-[16vw] lg:mt-[4vw] px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[2vw] lg:gap-y-[6vw] gap-y-16 w-full lg:max-w-[90vw] mx-auto">
            {currentPosts.map((post) => (
              <div
                key={post._id}
                className={`group relative transition-all duration-300 ${
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
                    {/* <Image
                      src="/folder-bg.png"
                      alt={post.title}
                      width={1000}
                      height={1000}
                      className="w-full h-full object-contain"
                    /> */}
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
              </div>
            ))}
          </div>
        </div>

        {/* Pagination - Only show if there are more than 6 posts total */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-[8vw] pb-[4vw]">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="cursor-pointer w-10 h-10 rounded-full bg-background border border-foreground/20 flex items-center justify-center text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              // Show first page, last page, current page, and pages around current
              const shouldShow =
                page === 1 ||
                page === totalPages ||
                Math.abs(page - currentPage) <= 1;

              if (shouldShow) {
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`cursor-pointer w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                      currentPage === page
                        ? "bg-foreground text-background"
                        : "bg-background text-foreground border border-foreground/20"
                    }`}
                  >
                    {page}
                  </button>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                // Show ellipsis
                return (
                  <span
                    key={page}
                    className="w-10 h-10 flex items-center justify-center text-foreground/50"
                  >
                    ...
                  </span>
                );
              }
              return null;
            })}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="cursor-pointer w-10 h-10 rounded-full bg-background border border-foreground/20 flex items-center justify-center text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* No Results Message */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-[8vw]">
            <p className="text-foreground/70 text-lg">
              {searchQuery
                ? `No posts found for "${searchQuery}"`
                : "No posts found"}
            </p>
          </div>
        )}

        <div className="flex justify-center items-center gap-2 mt-[8vw] h-[5vw]"></div>
      </div>
    </>
  );
};

export default BlogPageComponent;
