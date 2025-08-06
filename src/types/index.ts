// src/types/index.ts

export interface Banner {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  alt_text: string;
  enquiry_button_text: string;
}

export interface Category {
  id: number;
  category_name: string;
  slug: string;
  short_description: string;
  descriptions: string;
  image: string;
  alt_text: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  meta_image: string;
  og_title: string;
  og_description: string;
  twitter_title: string;
  twitter_decriptions: string;
  canonical_url: string;
  robots_tag: string;
  publisher: null;
  schema_markup: string;
  is_active: boolean;
}

export interface GalleryType {
  image: string;
  alt_text: string;
}
export interface AttributeType {
  title: string;
  value: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  descriptions: string;
  image: string;
  alt_text: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  meta_image: string;
  og_title: string;
  og_description: string;
  twitter_title: string;
  twitter_decriptions: string;
  canonical_url: string;
  robots_tag: string;
  publisher: null;
  schema_markup: string;
  is_active: boolean;
  gallery_images: GalleryType[];
  attributes: AttributeType[];
}

export interface ContactDetails {
  phones: string[];
  emails: string[];
  address: string;
}

export interface HomepageContent {
  title: string;
  content: string;
  meta_title: string;
  meta_description: string;
  meta_image: string | null;
  og_title: string;
  og_description: string;
  twitter_title: string;
  twitter_description: string;
  meta_keywords: string;
  canonical_url: string | null;
  robots_tag: string;
  publisher: string | null;
  schema_markup: string;
  main_heading: string;
  description_paragraph: string;
  about_section: AboutSection;
}


export interface AboutSection {
  subtitle: string;
  description: string;
  image: string;
  image_alt_text: string;
  video_url: string;
}

export interface Testimonial {
  id: number;
  name: string;
  profile_image: string;
  rating: number;
  testimonial: string;
}

export interface Blog {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  alt_text: string;
  meta_title: string;
  meta_description: string;
  meta_keyword: string;
  meta_img: string;
  og_title: string;
  og_description: string;
  twitter_title: string;
  twitter_description: string;
  canonical_url: string;
  robot_tag: string;
  publisher: string;
  schema_markup: string;
  date_posted: string;
  category: BlogCategory;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone_number: string;
  message: string;
}
export interface SocialMedia {
  id: number;
  platform: string;
  iconclass: string;
  url: string;
}
export interface Review {
  id: number;
  name: string,
  email: string,
  rating: number,
  comment: string,
}
export interface BlogCategory{
  id: number;
  name: string;
  slug: string;
  blog_count: number;
}