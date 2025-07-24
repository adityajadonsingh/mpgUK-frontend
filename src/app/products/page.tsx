import ProductGrid from "@/components/category/ProductGrid";
import PageBanner from "@/components/PageBanner";
import { getAllProducts } from "@/lib/api";

export default async function ProductsPage() {
  const { products, totalPages } = await getAllProducts(1);
  console.log(products)
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
