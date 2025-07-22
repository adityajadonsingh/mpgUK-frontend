import CategoryBanner from "@/components/category/CategoryBanner";
import ProductGrid from "@/components/category/ProductGrid";
import FooterContent from "@/components/FooterContent";
import {
  getAllCategorys,
  getCategoryBySlug,
  getProductsByCategory,
} from "@/lib/api";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const categories = await getAllCategorys();
  return categories.map((category: { slug: string }) => ({
    category: category.slug,
  }));
}

export default async function CategoryPage({ params }) {
  const [category] = await getCategoryBySlug(params.category);
  if (!category) return notFound();

  const { products, totalPages } = await getProductsByCategory(
    params.category,
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
        categorySlug={params.category}
      />
      <FooterContent content={category.descriptions}/>
    </>
  );
}
