import CategoryBanner from "@/components/category/CategoryBanner";
import ProductGrid from "@/components/category/ProductGrid";
import { getCategoryBySlug, getProductsByCategory } from "@/lib/api";
import { notFound, redirect } from "next/navigation";

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
        bgImg={category.image}
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
