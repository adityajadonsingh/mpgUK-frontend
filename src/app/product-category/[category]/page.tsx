import CategoryBanner from "@/components/category/CategoryBanner";
import ProductGrid from "@/components/category/ProductGrid";
import FooterContent from "@/components/FooterContent";
import {
  getAllCategorys,
  getCategoryBySlug,
  getProductsByCategory,
} from "@/lib/api";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const categories = await getAllCategorys();
  return categories.map((category: { slug: string }) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const getParams = await params;
  const [category] = await getCategoryBySlug(getParams.category);

  return {
    title: category.meta_title || "Home | MPG Stone",
    description: category.meta_description || "Default description",
    keywords: category.meta_keywords || "",
    openGraph: {
      title: category.og_title || category.meta_title || "",
      description: category.og_description || category.meta_description || "",
      url: category.canonical_url || "",
      images: category.meta_image ? [category.meta_image] : [],
      type: "website",
      locale: "en_US",
      siteName: "MPG Stone",
    },
    twitter: {
      title: category.twitter_title || category.meta_title || "",
      description:
        category.twitter_decriptions || category.meta_description || "",
      images: category.meta_image ? [category.meta_image] : [],
    },
    alternates: {
      canonical: category.canonical_url || "",
    },
    robots: category.robots_tag,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const getParams = await params;
  const [category] = await getCategoryBySlug(getParams.category);
  if (!category) return notFound();

  const { products, totalPages } = await getProductsByCategory(
    getParams.category,
    1
  );

  return (
    <>
      <CategoryBanner
        pageName={category.category_name}
        bgImg={category.image}
        breadcrum={[
          { slug_name: "Product Category", slug_url: "/product-category/" },
          {
            slug_name: category.category_name,
            slug_url: `/product-category/${category.slug}`,
          },
        ]}
        short_description={category.short_description}
      />
      <ProductGrid
        products={products}
        currentPage={1}
        totalPages={totalPages}
        categorySlug={getParams.category}
      />
      <FooterContent content={category.descriptions} isFullPage={false} />
    </>
  );
}
