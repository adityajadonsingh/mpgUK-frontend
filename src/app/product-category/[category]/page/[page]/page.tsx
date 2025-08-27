import CategoryBanner from "@/components/category/CategoryBanner";
import ProductGrid from "@/components/category/ProductGrid";
import { getCategoryBySlug, getProductsByCategory } from "@/lib/api";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; page: string; }>;
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
    robots: "noindex, follow",
  };
}

export default async function PaginatedCategoryPage({ params } : {params : Promise<{category: string; page: string}>}) {
  const getParams = await params;
  const pageNumber = parseInt(getParams.page) || 1;
  if (pageNumber === 1) {
    redirect(`/product-category/${getParams.category}`);
  }
  const [category] = await getCategoryBySlug(getParams.category);
  if (!category) return notFound();

  const { products, totalPages } = await getProductsByCategory(
    getParams.category,
    pageNumber
  );
  if(pageNumber > totalPages) return notFound();
  const bread = [
    {
      slug_name: "Product Category",
      slug_url: "/product-category/",
    },
    {
      slug_name: category.category_name,
      slug_url: `/product-category/${category.slug}`,
    },
  ];

  return (
    <>
      <CategoryBanner
        pageName={category.category_name}
        bgImg={category.banner_image}
        bgImgAlt={category.banner_alt_text}
        breadcrum={bread}
        short_description={category.short_description}
      />
      <ProductGrid
        products={products}
        currentPage={pageNumber}
        totalPages={totalPages}
        categorySlug={getParams.category}
      />
    </>
  );
}
