import { client } from "./client";
import { type QueryParams } from "next-sanity";
import { 
  getBlogPageQuery, 
  getAllBlogCategoriesQuery,
  getBlogPostBySlugQuery,
  getAllBlogPostsSlugsQuery 
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
