import CategoryBanner from "@/components/category/CategoryBanner";
import ProductGrid from "@/components/category/ProductGrid";
import { getCategoryBySlug, getProductsByCategory } from "@/lib/api";
import { notFound, redirect } from "next/navigation";

export default async function PaginatedCategoryPage({ params }) {
  const pageNumber = parseInt(params.page) || 1;
  if (pageNumber === 1) {
    redirect(`/product-category/${params.category}`);
  }
  const [category] = await getCategoryBySlug(params.category);
  if (!category) return notFound();

  const { products, totalPages } = await getProductsByCategory(
    params.category,
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
        categorySlug={params.category}
      />
    </>
  );
}
