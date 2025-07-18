// src/lib/api.ts

import { Banner, Blog, Category, ContactDetails, HomepageContent, SocialMedia } from "@/types";
export interface Testimonial {
  id: number;
  name: string;
  profile_image: string;
  rating: number;
  testimonial: string;
}
const API_URL = process.env.API_URL!;

export async function getHomePageData(): Promise<HomepageContent> {
  const res = await fetch(`${API_URL}/homepage-content`, { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error(`Failed to fetch home page content: ${res.status} ${res.statusText}`);
  }
  return res.json();
}
export async function getHomeBanners(): Promise<Banner[]> {
  const res = await fetch(`${API_URL}/banners`, { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error(`Failed to fetch banners: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function getAllCategorys(): Promise<Category[]> {
  const res = await fetch(`${API_URL}/categories`, { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error(`Failed to fetch categories: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function getContactDetails(): Promise<ContactDetails[]> {
  const res = await fetch(`${API_URL}/contactdetails`, { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error(`Failed to fetch contact details: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function getTestimonials(): Promise<{ testimonials: Testimonial[] }> {
  const res = await fetch(`${API_URL}/testimonials`, { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error(`Failed to fetch testimonials: ${res.status} ${res.statusText}`);
  }
  return res.json();
}
export async function getBlogs(): Promise<{ blogs: Blog[] }> {
  const res = await fetch(`${API_URL}/blogs`, { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error(`Failed to fetch blogs: ${res.status} ${res.statusText}`);
  }
  return res.json();
}
export async function getSocialMedia(): Promise<{ social_media_links: SocialMedia[] }> {
  const res = await fetch(`${API_URL}/social-media`, { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error(`Failed to fetch social media icons: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

