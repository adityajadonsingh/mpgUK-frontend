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
    publisher:null;
    schema_markup:string;
    is_active: boolean;
}

export interface ContactDetails {
    phones: string[];
    emails: string[];
    address: string[];
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

// export interface Testimonial {
//   testimonials: TestimonialArray[];
// }
export interface Testimonial {
  id: number;
  name: string;
  profile_image: string;
  rating: number;
  testimonial: string;
}




// --------------------------------------------

// export interface Product {
//   id: string;
//   name: string;
//   price: number;
//   imageUrl: string;
// }

// export interface Category {
//   id: string;
//   name: string;
//   slug: string;
// }

// export interface Blog {
//   id: string;
//   title: string;
//   content: string;
//   slug: string;
// }

// export interface HomeData {
//   title: string;
//   // Add other home page fields
// }
