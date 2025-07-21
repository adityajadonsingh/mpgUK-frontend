import CategoryBanner from "@/components/category/CategoryBanner";
import ProductGrid from "@/components/category/ProductGrid";
import { getCategoryBySlug, getProductsByCategory } from "@/lib/api";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const categoryData = await getCategoryBySlug(params.category);
  const category = categoryData?.[0];
  if (!category) return notFound();
  const { products, totalPages } = await getProductsByCategory(
    params.category,
    1
  );
  const bread = [
    {
      slug_name: "Product Category",
      slug_url: "/product-category/",
    },
    {
      slug_name: category.category_name,
      slug_url: `/product-category/${category.slug}/`,
    },
  ];
  console.log(category);
  console.log(products, totalPages);
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
        currentPage={1}
        totalPages={totalPages}
        categorySlug={params.category}
      />
    </>
  );
}
