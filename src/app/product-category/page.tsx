import ProductCategoryGrid from "@/components/category/ProductCategoryGrid";
import PageBanner from "@/components/PageBanner";
import { getMetaData } from "@/lib/api";

import { MetaData } from "@/types";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const meta: MetaData = await getMetaData("category");

  return {
    title: meta.meta_title || "Home | MPG Stone",
    description: meta.meta_description || "Default description",
    keywords: meta.meta_keywords || "",
    openGraph: {
      title: meta.og_title || meta.meta_title || "",
      description: meta.og_description || meta.meta_description || "",
      url: meta.canonical_url || "",
      images: meta.meta_image ? [meta.meta_image] : [],
      type: "website",
      locale: "en_US",
      siteName: "MPG Stone",
    },
    twitter: {
      title: meta.twitter_title || meta.meta_title || "",
      description: meta.twitter_description || meta.meta_description || "",
      images: meta.meta_image ? [meta.meta_image] : [],
    },
    alternates: {
      canonical: meta.canonical_url || "",
    },
    robots: meta.robots_tag,
  };
}

export default function ProductCategory() {
    
  const breadcrum = [
    {
      slug_name: "Product Category",
      slug_url: "/product-category/",
    },
  ];
  return (
    <>
      <PageBanner
        breadcrum={breadcrum}
        bgImg={"/media/category-banner.webp"}
        pageName="Product Category"
      />
      <ProductCategoryGrid />
    </>
  );
}
