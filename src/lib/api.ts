// src/lib/api.ts

import { Banner, Blog, Category, ContactDetails, HomepageContent, Product, SocialMedia } from "@/types";
export interface Testimonial {
  id: number;
  name: string;
  profile_image: string;
  rating: number;
  testimonial: string;
}
const API_URL = process.env.API_URL!;

export async function getHomePageData(): Promise<HomepageContent> {
  const res = await fetch(`${API_URL}/homepage-content`, { next: { revalidate: 2 } });
  if (!res.ok) {
    throw new Error(`Failed to fetch home page content: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function getHomeBanners(): Promise<Banner[]> {
  const res = await fetch(`${API_URL}/banners`, { next: { revalidate: 2 } });
  if (!res.ok) {
    throw new Error(`Failed to fetch banners: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function getAllCategorys(): Promise<Category[]> {
  const res = await fetch(`${API_URL}/categories`, { next: { revalidate: 2 } });
  if (!res.ok) {
    throw new Error(`Failed to fetch categories: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function getCategoryBySlug(category: string): Promise<Category[]> {
  const res = await fetch(`${API_URL}/categories/?category_slug=${category}`, { next: { revalidate: 2 } });
  if (!res.ok) {
    throw new Error(`Failed to fetch category: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

// For category paginated products

const PRODUCTS_PER_PAGE = 2;
interface paginatedProducts {
  products: Product[];
  totalPages: number;
}
export async function getProductsByCategory(slug: string, page: number): Promise<paginatedProducts> {
  const res = await fetch(`${API_URL}/products/`, { next: { revalidate: 2 } });
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
  console.log(allProducts)
  return {
    products: paginatedProducts,
    totalPages,
  };
}


export async function getProductDetails(slug: string): Promise<Product> {
  const res = await fetch(`${API_URL}/products/?slug=${slug}`, { next: { revalidate: 2 } });
  if (!res.ok) {
    throw new Error(`Failed to fetch product details: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  return data[0];
}
export async function getContactDetails(): Promise<ContactDetails[]> {
  const res = await fetch(`${API_URL}/contactdetails`, { next: { revalidate: 2 } });
  if (!res.ok) {
    throw new Error(`Failed to fetch contact details: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function getTestimonials(): Promise<{ testimonials: Testimonial[] }> {
  const res = await fetch(`${API_URL}/testimonials`, { next: { revalidate: 2 } });
  if (!res.ok) {
    throw new Error(`Failed to fetch testimonials: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function getBlogs(): Promise<{ blogs: Blog[] }> {
  const res = await fetch(`${API_URL}/blogs`, { next: { revalidate: 2 } });
  if (!res.ok) {
    throw new Error(`Failed to fetch blogs: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function getSocialMedia(): Promise<{ social_media_links: SocialMedia[] }> {
  const res = await fetch(`${API_URL}/social-media`, { next: { revalidate: 2 } });
  if (!res.ok) {
    throw new Error(`Failed to fetch social media icons: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

