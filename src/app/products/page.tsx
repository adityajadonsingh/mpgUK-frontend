import ProductGrid from "@/components/category/ProductGrid";
import PageBanner from "@/components/PageBanner";
import { getPaginatedProducts, getMetaData } from "@/lib/api";
import { MetaData } from "@/types";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const meta: MetaData = await getMetaData("products");

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

export default async function ProductsPage() {
  const { products, totalPages } = await getPaginatedProducts(1);
  return (
    <>
      <PageBanner
        bgImg={"/media/product_category_banner.jpeg"}
        pageName={"Products"}
        breadcrum={[{ slug_name: "Products", slug_url: "" }]}
      />
      <ProductGrid products={products} currentPage={1} totalPages={totalPages} categorySlug={null} />
    </>
  );
}
