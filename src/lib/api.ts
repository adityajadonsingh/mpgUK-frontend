// src/lib/api.ts

import { Banner, Blog, BlogCategory, Category, ContactDetails, HomepageContent, Product, ProductCatalouge, Review, SocialMedia, Testimonial } from "@/types";

interface paginatedBlogs {
  blogs: Blog[];
  totalPages: number;
}

interface paginatedProducts {
  products: Product[];
  totalPages: number;
}

const API_URL = process.env.API_URL!;
const revalidateTime = 2;
const PRODUCTS_PER_PAGE = 2;
const BLOGS_PER_PAGE = 2;

export async function getHomePageData(): Promise<HomepageContent> {
  const res = await fetch(`${API_URL}/homepage-content`, { next: { revalidate: revalidateTime } });
  if (!res.ok) {
    throw new Error(`Failed to fetch home page content: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function getHomeBanners(): Promise<Banner[]> {
  const res = await fetch(`${API_URL}/banners`, { next: { revalidate: revalidateTime } });
  if (!res.ok) {
    throw new Error(`Failed to fetch banners: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function getAllCategorys(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_URL}/categories`, { next: { revalidate: revalidateTime } });

    if (!res.ok) {
      console.error("Error fetching categories:", res.status, res.statusText);
      return [];
    }

    return res.json();
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

export async function getCategoryBySlug(category: string): Promise<Category[]> {
  const res = await fetch(`${API_URL}/categories/?category_slug=${category}`, { next: { revalidate: revalidateTime } });
  if (!res.ok) {
    throw new Error(`Failed to fetch category: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

// For category paginated products

export async function getProductsByCategory(slug: string, page: number): Promise<paginatedProducts> {
  const res = await fetch(`${API_URL}/products/`, { next: { revalidate: revalidateTime } });
  const allProducts = await res.json();

  const filteredProducts = allProducts.filter(
    (product: Product) => product.category.replace(/ /g, "-").toLowerCase() == slug
  );

  const total = filteredProducts.length;
  const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);

  // Paginate
  const start = (page - 1) * PRODUCTS_PER_PAGE;
  const end = start + PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(start, end);
  return {
    products: paginatedProducts,
    totalPages,
  };
}
export async function getAllProducts(page: number): Promise<paginatedProducts> {
  const res = await fetch(`${API_URL}/products/`, { next: { revalidate: revalidateTime } });
  const allProducts = await res.json();

  const total = allProducts.length;
  const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);

  // Paginate
  const start = (page - 1) * PRODUCTS_PER_PAGE;
  const end = start + PRODUCTS_PER_PAGE;
  const paginatedProducts = allProducts.slice(start, end);
  return {
    products: paginatedProducts,
    totalPages,
  };
}
export async function getProductDetails(slug: string): Promise<Product> {
  const res = await fetch(`${API_URL}/products/?slug=${slug}`, { next: { revalidate: revalidateTime } });
  if (!res.ok) {
    throw new Error(`Failed to fetch product details: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  return data[0];
}
export async function getProductReviews(product_id: number): Promise<Review[]> {
  const res = await fetch(`${API_URL}/reviews/?product_id=${product_id}`, { next: { revalidate: revalidateTime } });
  if (!res.ok) {
    throw new Error(`Failed to fetch product reviews: ${res.status} ${res.statusText}`);
  }
  return res.json();
}
export async function getContactDetails(): Promise<ContactDetails[]> {
  const res = await fetch(`${API_URL}/contactdetails`, { next: { revalidate: revalidateTime } });
  if (!res.ok) {
    throw new Error(`Failed to fetch contact details: ${res.status} ${res.statusText}`);
  }
  return res.json();
}


export async function getTestimonials(): Promise<{ testimonials: Testimonial[] }> {
  const res = await fetch(`${API_URL}/testimonials`, { next: { revalidate: revalidateTime } });
  if (!res.ok) {
    throw new Error(`Failed to fetch testimonials: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function getBlogs(): Promise<{ blogs: Blog[] }> {
  const res = await fetch(`${API_URL}/blogs`, { next: { revalidate: revalidateTime } });
  if (!res.ok) {
    throw new Error(`Failed to fetch blogs: ${res.status} ${res.statusText}`);
  }
  return res.json();
}
export async function getBlogsPaginated(page: number): Promise<paginatedBlogs> {
  const res = await fetch(`${API_URL}/blogs`, { next: { revalidate: revalidateTime } });
  const rawBlogs = await res.json();
  const allBlogs: Blog[] = rawBlogs.blogs;
  const total = allBlogs.length;
  const totalPages = Math.ceil(total / BLOGS_PER_PAGE);

  // Paginate
  const start = (page - 1) * BLOGS_PER_PAGE;
  const end = start + BLOGS_PER_PAGE;
  const paginatedBlogs = allBlogs.slice(start, end);
  return {
    blogs: paginatedBlogs,
    totalPages,
  };
}
export async function getSingleBlog(slug: string): Promise<Blog | undefined> {
  const res = await fetch(`${API_URL}/blogs`, { next: { revalidate: revalidateTime } });

  if (!res.ok) {
    throw new Error(`Failed to fetch blogs for single blog: ${res.status} ${res.statusText}`);
  }

  const data: { blogs: Blog[] } = await res.json();

  const blog = data.blogs.find((b) => b.slug === slug);

  return blog;
}
export async function getAllBlogCategory(): Promise<BlogCategory[]> {
  const res = await fetch(`${API_URL}/blog-categories`, { next: { revalidate: revalidateTime } });
  if (!res.ok) {
    throw new Error(`Failed to fetch blog categories: ${res.status} ${res.statusText}`);
  }
  return res.json();
}
export async function getBlogPerCategory(categorySlug: string, page: number): Promise<paginatedBlogs> {
const res = await fetch(`${API_URL}/blogs`, { next: { revalidate: revalidateTime } });
  const rawBlogs = await res.json();
  const allBlogs: Blog[] = rawBlogs.blogs.filter((blog : Blog) => blog.category.slug === categorySlug);
  const total = allBlogs.length;
  const totalPages = Math.ceil(total / BLOGS_PER_PAGE);

  // Paginate
  const start = (page - 1) * BLOGS_PER_PAGE;
  const end = start + BLOGS_PER_PAGE;
  const paginatedBlogs = allBlogs.slice(start, end);
  return {
    blogs: paginatedBlogs,
    totalPages,
  };
}
export async function getSocialMedia(): Promise<{ social_media_links: SocialMedia[] }> {
  const res = await fetch(`${API_URL}/social-media`, { next: { revalidate: revalidateTime } });
  if (!res.ok) {
    throw new Error(`Failed to fetch social media icons: ${res.status} ${res.statusText}`);
  }
  return res.json();
}
export async function getProductCatalouge(): Promise<ProductCatalouge[]> {
  const res = await fetch(`${API_URL}/product-catalogues`, { next: { revalidate: revalidateTime } });
  if (!res.ok) {
    throw new Error(`Failed to fetch product catalouges: ${res.status} ${res.statusText}`);
  }
  return res.json();
}



