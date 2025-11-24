import { client } from "./client";
import { type QueryParams } from "next-sanity";
import { 
  getBlogPageQuery, 
  getAllBlogCategoriesQuery,
  getBlogPostBySlugQuery,
  getAllBlogPostsSlugsQuery,
  getHomePageQuery,
  getCTOPageQuery,
  getCostOptimisationPageQuery,
  getContactUsPageQuery
} from "./queries";

const IS_DEVELOPMENT = process.env.NODE_ENV === "development";

export const fetchSanityData = async <T>(
  query: string,
  params: QueryParams = {},
  options: { revalidate?: number } = {}
): Promise<T> => {
  return client.fetch(query, params, {
    ...(options.revalidate && { next: { revalidate: options.revalidate } }),
  });
};

// Blog functions
export async function getBlogPageData(): Promise<any> {
  try {
    const data = await fetchSanityData<any>(
      getBlogPageQuery(),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    );
    const count = Array.isArray((data as any)?.blogPosts)
      ? (data as any).blogPosts.length
      : 0;
    console.log(`Sanity blog posts count: ${count}`);
    return data;
  } catch (error) {
    console.error("Error fetching blog page data:", error);
    return null;
  }
}

export async function getAllBlogCategoriesData(): Promise<any> {
  try {
    const data = await fetchSanityData<any>(
      getAllBlogCategoriesQuery(),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    );
    return data;
  } catch (error) {
    console.error("Error fetching all blog categories data:", error);
    return null;
  }
}

export async function getBlogPostBySlug(slug: string): Promise<any> {
  try {
    const data = await fetchSanityData<any>(
      getBlogPostBySlugQuery(slug),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    );
    return data;
  } catch (error) {
    console.error(`Error fetching blog post by slug (${slug}):`, error);
    return null;
  }
}

export async function getAllBlogPostsSlugs(): Promise<any> {
  try {
    const data = await fetchSanityData<any>(
      getAllBlogPostsSlugsQuery(),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    );
    return data;
  } catch (error) {
    console.error("Error fetching all blog posts slugs:", error);
    return null;
  }
}

// Homepage function
export async function getHomePageData(): Promise<any> {
  try {
    const data = await fetchSanityData<any>(
      getHomePageQuery(),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    );
    console.log("Sanity homepage data fetched:", data ? "Success" : "No data");
    return data;
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return null;
  }
}

// CTO Page function
export async function getCTOPageData(): Promise<any> {
  try {
    const data = await fetchSanityData<any>(
      getCTOPageQuery(),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    );
    console.log("Sanity CTO page data fetched:", data ? "Success" : "No data");
    return data;
  } catch (error) {
    console.error("Error fetching CTO page data:", error);
    return null;
  }
}

// Cost Optimisation Page function
export async function getCostOptimisationPageData(): Promise<any> {
  try {
    const data = await fetchSanityData<any>(
      getCostOptimisationPageQuery(),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    );
    
    if (IS_DEVELOPMENT && data) {
      console.log("✅ Sanity Cost Optimisation page data fetched successfully");
      console.log("📊 Data summary:", {
        hasHeroSection: !!data.heroSection,
        hasClientSection: !!data.clientSection,
        hasIndustryFacts: !!data.industryFactsSection?.facts?.length,
        hasTestimonials: !!data.testimonialsSection?.testimonials?.length,
        hasApproachSteps: !!data.ourApproachSection?.steps?.length,
        hasSteps: !!data.stepsSection?.steps?.length,
      });
    } else if (!data) {
      console.warn("⚠️  No Cost Optimisation page data found in Sanity. Make sure to run the seed script or create the document in Sanity Studio.");
    }
    
    return data;
  } catch (error) {
    console.error("❌ Error fetching Cost Optimisation page data:", error);
    return null;
  }
}

// Contact Us Page function
export async function getContactUsPageData(): Promise<any> {
  try {
    const data = await fetchSanityData<any>(
      getContactUsPageQuery(),
      {},
      { revalidate: IS_DEVELOPMENT ? 10 : 60 }
    );
    console.log("Sanity Contact Us page data fetched:", data ? "Success" : "No data");
    return data;
  } catch (error) {
    console.error("Error fetching Contact Us page data:", error);
    return null;
  }
}